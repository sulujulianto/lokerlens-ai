import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { JobReadinessAnalysis } from "../../shared/analysisSchemas";
import { AnalysisResults } from "./AnalysisResults";

const analysis: JobReadinessAnalysis = {
  matchScore: 74,
  verdict: "APPLY_WITH_IMPROVEMENTS",
  readinessSummary: "Kandidat memiliki fondasi yang relevan.",
  candidateStrengths: ["Pengalaman pencatatan"],
  mainGaps: [],
  mustHaveRequirements: ["Ketelitian"],
  niceToHaveRequirements: [],
  riskFactors: [],
  roadmap30Days: {
    week1: ["Pelajari kebutuhan"],
    week2: ["Latihan tugas"],
    week3: ["Buat bukti"],
    week4: ["Latihan wawancara"],
  },
  evidenceOfCompetenceSuggestions: ["Buat spreadsheet contoh"],
  cvMaterialSuggestions: ["Jelaskan tugas pencatatan"],
  applicationMessage: "Saya melamar posisi ini.",
  possibleInterviewQuestions: ["Bagaimana menjaga akurasi?"],
  disclaimer: "Panduan ini bukan jaminan kerja.",
};

describe("AnalysisResults", () => {
  it("renders normalized result sections and localized verdict", () => {
    const html = renderToStaticMarkup(
      <AnalysisResults analysis={analysis} language="id" isDemo={false} />,
    );

    expect(html).toContain("74");
    expect(html).toContain("Melamar Sambil Melakukan Perbaikan");
    expect(html).toContain("Minggu 1");
    expect(html).toContain("Minggu 4");
    expect(html).toContain("Kemungkinan Pertanyaan Wawancara");
    expect(html).toContain("Buat spreadsheet contoh");
    expect(html).toContain("Saya melamar posisi ini.");
    expect(html).toContain("Panduan ini bukan jaminan kerja.");
    expect(html).not.toContain("APPLY_WITH_IMPROVEMENTS");
  });

  it("renders restrained empty states for optional lists", () => {
    const html = renderToStaticMarkup(
      <AnalysisResults
        analysis={{
          ...analysis,
          mainGaps: [],
          niceToHaveRequirements: [],
          riskFactors: [],
          possibleInterviewQuestions: [],
        }}
        language="id"
        isDemo
      />,
    );

    expect(html).toContain(
      "Tidak ada kesenjangan utama yang teridentifikasi.",
    );
    expect(html).toContain(
      "Tidak ada nilai tambah yang dinyatakan secara jelas.",
    );
    expect(html).toContain("Tidak ada risiko material yang teridentifikasi.");
    expect(html).toContain("Belum ada pertanyaan wawancara tambahan.");
    expect(html).toContain("Panduan ini bukan jaminan kerja.");
  });
});
