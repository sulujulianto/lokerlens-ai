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

interface AnalyzeJobReadinessOptions {
  fetchImplementation?: typeof fetch;
  signal?: AbortSignal;
}

const apiErrorMessages: Record<string, string> = {
  VALIDATION_ERROR:
    "Data yang dikirim belum valid. Periksa formulir dan coba lagi.",
  PROVIDER_NOT_CONFIGURED:
    "Analisis langsung belum tersedia. Gunakan demo offline untuk mempelajari alurnya.",
  PROVIDER_TIMEOUT:
    "Layanan analisis terlalu lama merespons. Silakan coba kembali beberapa saat lagi.",
  PROVIDER_RESPONSE_INVALID:
    "Hasil dari layanan analisis tidak dapat digunakan. Silakan coba lagi.",
  PROVIDER_REQUEST_FAILED:
    "Layanan analisis sedang mengalami gangguan. Silakan coba lagi.",
  RATE_LIMITED:
    "Terlalu banyak permintaan analisis. Tunggu sebentar sebelum mencoba lagi.",
  INTERNAL_ERROR:
    "Terjadi masalah pada server. Silakan coba kembali beberapa saat lagi.",
};

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
  optionsOrFetch: AnalyzeJobReadinessOptions | typeof fetch = {},
): Promise<JobReadinessAnalysis> {
  const options =
    typeof optionsOrFetch === "function"
      ? { fetchImplementation: optionsOrFetch }
      : optionsOrFetch;
  const fetchImplementation = options.fetchImplementation ?? fetch;
  let response: Response;
  try {
    response = await fetchImplementation("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: options.signal,
    });
  } catch (error: unknown) {
    if (
      options.signal?.aborted ||
      (error instanceof DOMException && error.name === "AbortError")
    ) {
      throw new AnalysisClientError(
        "Analisis dibatalkan. Data formulir Anda tetap tersimpan.",
        "REQUEST_CANCELLED",
      );
    }

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
    const code =
      typeof safeError.code === "string" ? safeError.code : "REQUEST_FAILED";
    throw new AnalysisClientError(
      apiErrorMessages[code] ??
        "Analisis belum dapat diproses. Silakan coba lagi.",
      code,
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
