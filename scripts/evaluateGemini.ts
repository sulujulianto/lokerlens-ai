import "dotenv/config";
import type { JobReadinessAnalysis } from "../shared/analysisSchemas";
import { crossFieldScenarios } from "../shared/crossFieldScenarios";
import { GeminiProvider } from "../server/ai/geminiProvider";
import { loadServerConfig } from "../server/config";
import { AppError } from "../server/errors";
import { JobReadinessService } from "../server/services/jobReadinessService";

interface EvaluationResult {
  label: string;
  durationMs: number;
  score: number;
  verdict: JobReadinessAnalysis["verdict"];
  mustHaveStatuses: string[];
  warnings: string[];
}

interface EvaluationFailure {
  label: string;
  durationMs: number;
  code: string;
  detail: string;
}

const API_KEY_PATTERN = /\bAIza[\w-]{20,}\b/g;
const MAX_DIAGNOSTIC_LENGTH = 1_200;

function sanitizeDiagnostic(message: string): string {
  return message
    .replace(API_KEY_PATTERN, "[REDACTED_API_KEY]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_DIAGNOSTIC_LENGTH);
}

function describeEvaluationError(error: unknown): {
  code: string;
  detail: string;
} {
  if (error instanceof AppError) {
    const causeDetail =
      error.cause instanceof Error ? ` Cause: ${error.cause.message}` : "";

    return {
      code: error.code,
      detail: sanitizeDiagnostic(
        `${error.logMessage ?? error.publicMessage}${causeDetail}`,
      ),
    };
  }

  return {
    code: "UNEXPECTED_ERROR",
    detail: sanitizeDiagnostic(
      error instanceof Error ? error.message : String(error),
    ),
  };
}

const delayedApplication =
  /(?:melamar\s+setelah|baru\s+melamar|tunda\s+(?:dulu\s+)?(?:untuk\s+)?melamar|jangan\s+melamar\s+(?:dulu|sebelum))/i;

function findEvaluationWarnings(
  analysis: JobReadinessAnalysis,
): string[] {
  const warnings: string[] = [];

  if (
    analysis.verdict !== "NOT_READY_YET" &&
    delayedApplication.test(analysis.readinessSummary)
  ) {
    warnings.push("Waktu melamar pada ringkasan tidak selaras dengan verdict.");
  }

  if (analysis.requirementMatches.length === 0) {
    warnings.push("Tidak ada persyaratan lowongan yang berhasil diekstrak.");
  }

  if (analysis.riskFactors.some((item) => item.trim().length < 45)) {
    warnings.push("Setidaknya satu faktor risiko terlalu singkat untuk diperiksa.");
  }

  return warnings;
}

async function evaluate(): Promise<void> {
  const config = loadServerConfig();

  if (config.aiProvider !== "gemini") {
    throw new Error("Set AI_PROVIDER=gemini before running this evaluation.");
  }
  if (!config.geminiApiKey) {
    throw new Error("GEMINI_API_KEY is required for the live evaluation.");
  }

  const provider = new GeminiProvider(
    config.geminiApiKey,
    config.aiRequestTimeoutMs,
    config.geminiModel,
  );
  const service = new JobReadinessService(provider);
  const runs = [
    { label: "Frontend #1", scenario: crossFieldScenarios[0] },
    { label: "Frontend #2", scenario: crossFieldScenarios[0] },
    { label: "Frontend #3", scenario: crossFieldScenarios[0] },
    { label: "Administrasi", scenario: crossFieldScenarios[1] },
    { label: "Customer Service", scenario: crossFieldScenarios[2] },
    { label: "Warehouse", scenario: crossFieldScenarios[3] },
  ] as const;
  const results: EvaluationResult[] = [];
  const failures: EvaluationFailure[] = [];

  console.log(`Running ${runs.length} sequential Gemini evaluations...`);

  for (const run of runs) {
    const startedAt = performance.now();
    try {
      const analysis = await service.analyze(run.scenario);
      const durationMs = Math.round(performance.now() - startedAt);
      const result: EvaluationResult = {
        label: run.label,
        durationMs,
        score: analysis.matchScore,
        verdict: analysis.verdict,
        mustHaveStatuses: analysis.requirementMatches
          .filter((item) => item.priority === "MUST_HAVE")
          .map((item) => `${item.status}: ${item.requirement}`),
        warnings: findEvaluationWarnings(analysis),
      };
      results.push(result);

      console.log(
        `${result.label}: ${result.score} (${result.verdict}) in ${result.durationMs} ms`,
      );
    } catch (error: unknown) {
      const durationMs = Math.round(performance.now() - startedAt);
      const diagnostic = describeEvaluationError(error);
      const failure: EvaluationFailure = {
        label: run.label,
        durationMs,
        ...diagnostic,
      };
      failures.push(failure);
      console.error(
        `${failure.label}: FAILED [${failure.code}] in ${failure.durationMs} ms`,
      );
      console.error(`  ${failure.detail}`);
    }
  }

  const frontendRuns = results.filter((item) =>
    item.label.startsWith("Frontend"),
  );
  const frontendScores = frontendRuns.map((item) => item.score);
  const verdicts = new Set(frontendRuns.map((item) => item.verdict));
  const warnings = results.flatMap((item) =>
    item.warnings.map((warning) => `${item.label}: ${warning}`),
  );

  console.log("\nSummary");
  if (results.length > 0) console.table(results);
  if (failures.length > 0) {
    console.log("\nFailed evaluations");
    console.table(failures);
  }

  if (frontendRuns.length === 3) {
    const scoreSpread =
      Math.max(...frontendScores) - Math.min(...frontendScores);
    console.log(`Frontend score spread: ${scoreSpread} point(s)`);
    console.log(`Frontend verdict count: ${verdicts.size}`);

    if (scoreSpread > 10) {
      warnings.push(
        `Frontend score spread exceeds 10 points (${scoreSpread} points).`,
      );
    }
  } else {
    warnings.push(
      `Only ${frontendRuns.length} of 3 Frontend evaluations completed successfully.`,
    );
  }

  warnings.push(
    ...failures.map(
      (failure) =>
        `${failure.label}: ${failure.code} - ${failure.detail}`,
    ),
  );

  if (warnings.length > 0) {
    console.error("\nQuality warnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
    process.exitCode = 1;
    return;
  }

  console.log("\nAll automated live-quality checks passed.");
}

evaluate().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
