import {
  JobReadinessAnalysisSchema,
  type AnalyzeJobReadinessRequest,
  type JobReadinessAnalysis,
} from "../../shared/analysisSchemas";

export class AnalysisClientError extends Error {
  constructor(
    message: string,
    readonly code: string = "REQUEST_FAILED",
  ) {
    super(message);
    this.name = "AnalysisClientError";
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new AnalysisClientError(
      "Server mengembalikan respons yang tidak dapat dibaca.",
      "INVALID_RESPONSE",
    );
  }
}

export async function analyzeJobReadiness(
  request: AnalyzeJobReadinessRequest,
  fetchImplementation: typeof fetch = fetch,
): Promise<JobReadinessAnalysis> {
  let response: Response;
  try {
    response = await fetchImplementation("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  } catch {
    throw new AnalysisClientError(
      "Tidak dapat terhubung ke layanan analisis. Periksa koneksi dan coba lagi.",
      "NETWORK_ERROR",
    );
  }
  const payload = await readJson(response);

  if (!response.ok) {
    const safeError =
      payload && typeof payload === "object"
        ? (payload as { error?: unknown; code?: unknown })
        : {};
    throw new AnalysisClientError(
      typeof safeError.error === "string"
        ? safeError.error
        : "Analisis belum dapat diproses. Silakan coba lagi.",
      typeof safeError.code === "string" ? safeError.code : "REQUEST_FAILED",
    );
  }

  const result = JobReadinessAnalysisSchema.safeParse(payload);
  if (!result.success) {
    throw new AnalysisClientError(
      "Hasil analisis tidak sesuai format yang diharapkan.",
      "INVALID_RESPONSE",
    );
  }

  return result.data;
}

export async function getAnalysisHealth(
  fetchImplementation: typeof fetch = fetch,
): Promise<{ ok: boolean; analysisAvailable: boolean }> {
  const response = await fetchImplementation("/api/health");
  const payload = await readJson(response);

  if (
    !response.ok ||
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as { ok?: unknown }).ok !== "boolean" ||
    typeof (payload as { analysisAvailable?: unknown }).analysisAvailable !==
      "boolean"
  ) {
    throw new AnalysisClientError(
      "Status layanan analisis tidak tersedia.",
      "HEALTH_UNAVAILABLE",
    );
  }

  return {
    ok: (payload as { ok: boolean }).ok,
    analysisAvailable: (
      payload as { analysisAvailable: boolean }
    ).analysisAvailable,
  };
}
