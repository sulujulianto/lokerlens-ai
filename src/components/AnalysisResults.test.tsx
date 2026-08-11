import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createJobReadinessAnalysisFixture } from "../../shared/analysisTestFixtures";
import { AnalysisResults } from "./AnalysisResults";

const analysis = createJobReadinessAnalysisFixture({
  matchScore: 74,
  readinessSummary: "Kandidat memiliki fondasi yang relevan.",
  candidateStrengths: ["Pengalaman pencatatan"],
  mainGaps: [],
  requirementMatches: [
    {
      requirement: "Ketelitian",
      priority: "MUST_HAVE",
      status: "MATCHED",
      evidence: "Profil menyebut pemeriksaan ulang data.",
      recommendation: "Siapkan contoh pemeriksaan data.",
    },
  ],
  riskFactors: [],
  evidenceOfCompetenceSuggestions: ["Buat spreadsheet contoh"],
  cvImprovementPrompt:
    "Tinjau CV saya dan pertahankan seluruh fakta yang tersedia.",
  applicationMessage: "Saya melamar posisi ini.",
  disclaimer: "Panduan ini bukan jaminan kerja.",
});

describe("AnalysisResults", () => {
  it("renders normalized result sections and localized verdict", () => {
    const html = renderToStaticMarkup(
      <AnalysisResults analysis={analysis} language="id" isDemo={false} />,
    );

    expect(html).toContain("74");
    expect(html).toContain("Melamar Sambil Melakukan Perbaikan");
    expect(html).toContain("Minggu 1");
    expect(html).toContain("Minggu 4");
    expect(html).toContain("Dasar Perhitungan Skor");
    expect(html).toContain("Kecocokan dengan Persyaratan Lowongan");
    expect(html).toContain("Empat Pertanyaan untuk Latihan Wawancara");
    expect(html).toContain("Prompt untuk Memperbaiki CV");
    expect(html).toContain("Tinjau CV saya");
    expect(html).toContain("Buat spreadsheet contoh");
    expect(html).toContain("Saya melamar posisi ini.");
    expect(html).toContain("Panduan ini bukan jaminan kerja.");
    expect(html).not.toContain("APPLY_WITH_IMPROVEMENTS");
    expect(html).toContain('id="analysis-results-title"');
    expect(html).toContain('aria-label="Salin pesan lamaran"');
    expect(html).toContain('aria-label="Salin prompt perbaikan CV"');
  });

  it("renders restrained empty states for optional lists", () => {
    const html = renderToStaticMarkup(
      <AnalysisResults
        analysis={{
          ...analysis,
          mainGaps: [],
          requirementMatches: [],
          riskFactors: [],
        }}
        language="id"
        isDemo
      />,
    );

    expect(html).toContain(
      "Tidak ada kesenjangan utama yang teridentifikasi.",
    );
    expect(html).toContain(
      "Teks lowongan tidak menyatakan persyaratan yang cukup jelas",
    );
    expect(html).toContain("Tidak ada risiko material yang teridentifikasi.");
    expect(html).toContain("Panduan ini bukan jaminan kerja.");
  });

  it("preserves long material guidance without truncating it", () => {
    const longContent = `Panduan-${"sangatpanjang".repeat(80)}`;
    const html = renderToStaticMarkup(
      <AnalysisResults
        analysis={{
          ...analysis,
          readinessSummary: longContent,
          mainGaps: [longContent],
          roadmap30Days: {
            ...analysis.roadmap30Days,
            week1: [longContent],
          },
          applicationMessage: longContent,
        }}
        language="id"
        isDemo={false}
      />,
    );

    expect(html).toContain(longContent);
    expect(html).toContain("[overflow-wrap:anywhere]");
    expect(html).toContain("Catatan Penting");
  });
});
