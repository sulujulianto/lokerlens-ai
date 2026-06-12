import { describe, expect, it, vi } from "vitest";
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

const analysis: JobReadinessAnalysis = {
  matchScore: 70,
  verdict: "APPLY_WITH_IMPROVEMENTS",
  readinessSummary: "Fondasi kandidat cukup relevan.",
  candidateStrengths: ["Pernah menangani pencatatan"],
  mainGaps: ["Belum menunjukkan contoh laporan"],
  mustHaveRequirements: ["Ketelitian input data"],
  niceToHaveRequirements: [],
  riskFactors: [],
  roadmap30Days: {
    week1: ["Pelajari format data"],
    week2: ["Latihan input data"],
    week3: ["Buat contoh laporan"],
    week4: ["Latihan wawancara"],
  },
  evidenceOfCompetenceSuggestions: ["Buat spreadsheet contoh"],
  cvMaterialSuggestions: ["Jelaskan tugas pencatatan"],
  applicationMessage: "Saya melamar posisi Administrative Staff.",
  possibleInterviewQuestions: ["Bagaimana menjaga akurasi data?"],
  disclaimer: "Analisis ini adalah panduan, bukan jaminan kerja.",
};

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
      message: "Live analysis is currently unavailable.",
      code: "PROVIDER_NOT_CONFIGURED",
    });
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
