import { describe, expect, it, vi } from "vitest";
import { createJobReadinessAnalysisFixture } from "../../shared/analysisTestFixtures";
import type {
  AnalyzeJobReadinessRequest,
  JobReadinessAnalysis,
} from "../../shared/analysisSchemas";
import {
  AnalysisClientError,
  analyzeJobReadiness,
  getAnalysisHealth,
} from "./analysisClient";

const request: AnalyzeJobReadinessRequest = {
  profile: {
    targetJobField: "administration",
    targetRole: "Administrative Staff",
    educationBackground: "SMK administration",
    responsibilities: "Maintained school event records.",
    mainSkills: ["Data entry"],
    preferredOutputLanguage: "id",
  },
  jobPosting: "Wajib teliti dalam input data.",
};

const analysis: JobReadinessAnalysis = createJobReadinessAnalysisFixture({
  matchScore: 70,
  readinessSummary: "Fondasi kandidat cukup relevan.",
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("analyzeJobReadiness", () => {
  it("accepts a valid normalized response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(analysis));

    await expect(analyzeJobReadiness(request, fetchMock)).resolves.toEqual(
      analysis,
    );
  });

  it("rejects malformed or incomplete successful responses", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ matchScore: 70 }));

    await expect(analyzeJobReadiness(request, fetchMock)).rejects.toMatchObject({
      code: "INVALID_RESPONSE",
    });
  });

  it("rejects an inconsistent normalized response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        ...analysis,
        matchScore: 40,
        verdict: "APPLY_NOW",
      }),
    );

    await expect(analyzeJobReadiness(request, fetchMock)).rejects.toMatchObject({
      message: "Hasil analisis tidak sesuai format yang diharapkan.",
      code: "INVALID_RESPONSE",
    });
  });

  it("rejects invalid JSON with a safe frontend error", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("{not-json", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(analyzeJobReadiness(request, fetchMock)).rejects.toMatchObject({
      message: "Server mengembalikan respons yang tidak dapat dibaca.",
      code: "INVALID_RESPONSE",
    });
  });

  it("sanitizes network failures", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new Error("provider socket secret"));

    const promise = analyzeJobReadiness(request, fetchMock);
    await expect(promise).rejects.toMatchObject({
      message:
        "Tidak dapat terhubung ke layanan analisis. Periksa koneksi dan coba lagi.",
      code: "NETWORK_ERROR",
    });
    await expect(promise).rejects.not.toMatchObject({
      message: expect.stringContaining("provider"),
    });
  });

  it("exposes only safe API error information", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse(
        {
          error: "Live analysis is currently unavailable.",
          code: "PROVIDER_NOT_CONFIGURED",
          stack: "provider internal stack",
        },
        503,
      ),
    );

    const promise = analyzeJobReadiness(request, fetchMock);
    await expect(promise).rejects.toBeInstanceOf(AnalysisClientError);
    await expect(promise).rejects.toMatchObject({
      message:
        "Analisis langsung belum tersedia. Gunakan demo offline untuk mempelajari alurnya.",
      code: "PROVIDER_NOT_CONFIGURED",
    });
  });

  it("passes an abort signal and reports a deliberate cancellation", async () => {
    const controller = new AbortController();
    const fetchMock = vi.fn().mockImplementation(
      (_url: string, init?: RequestInit) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        }),
    );

    const promise = analyzeJobReadiness(request, {
      fetchImplementation: fetchMock,
      signal: controller.signal,
    });
    controller.abort();

    await expect(promise).rejects.toMatchObject({
      message: "Analisis dibatalkan. Data formulir Anda tetap tersimpan.",
      code: "REQUEST_CANCELLED",
    });
    expect(fetchMock.mock.calls[0]?.[1]?.signal).toBe(controller.signal);
  });
});

describe("getAnalysisHealth", () => {
  it("uses the generic analysisAvailable field", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        ok: true,
        analysisAvailable: false,
        geminiConfigured: true,
      }),
    );

    await expect(getAnalysisHealth(fetchMock)).resolves.toEqual({
      ok: true,
      analysisAvailable: false,
    });
  });
});
