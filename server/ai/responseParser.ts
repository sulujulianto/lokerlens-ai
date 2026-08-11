import {
  JobReadinessAnalysisSchema,
  type JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import { AppError } from "../errors";

const MAX_REPORTED_SCHEMA_ISSUES = 8;

function formatSchemaIssues(
  issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>,
): string {
  const reportedIssues = issues
    .slice(0, MAX_REPORTED_SCHEMA_ISSUES)
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "<root>";
      return `${path}: ${issue.message}`;
    });
  const remainingCount = issues.length - reportedIssues.length;

  if (remainingCount > 0) {
    reportedIssues.push(`and ${remainingCount} more issue(s)`);
  }

  return reportedIssues.join("; ");
}

function extractJsonText(responseText: string): string {
  const trimmed = responseText.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fencedMatch?.[1]?.trim() ?? trimmed;
}

export function parseJobReadinessResponse(
  responseText: string,
): JobReadinessAnalysis {
  try {
    const parsed: unknown = JSON.parse(extractJsonText(responseText));
    const result = JobReadinessAnalysisSchema.safeParse(parsed);

    if (!result.success) {
      throw new AppError(
        "PROVIDER_RESPONSE_INVALID",
        502,
        "The analysis provider returned an invalid response.",
        {
          logMessage: `Provider response failed schema validation: ${formatSchemaIssues(result.error.issues)}`,
        },
      );
    }

    return result.data;
  } catch (error: unknown) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "PROVIDER_RESPONSE_INVALID",
      502,
      "The analysis provider returned an invalid response.",
      {
        cause: error,
        logMessage: "Provider response was not valid JSON.",
      },
    );
  }
}
