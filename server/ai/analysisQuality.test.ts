import { describe, expect, it } from "vitest";
import { createJobReadinessAnalysisFixture } from "../../shared/analysisTestFixtures";
import type { AnalyzeJobReadinessRequest } from "../../shared/analysisSchemas";
import { findAnalysisQualityIssues } from "./analysisQuality";

const request: AnalyzeJobReadinessRequest = {
  profile: {
    targetJobField: "it_digital",
    targetRole: "Junior Frontend Developer",
    educationBackground: "Lulusan SMK Teknik Komputer dan Jaringan.",
    trainingSourceType: "government",
    trainingProvider: "PPKD Jakarta Pusat",
    trainingProgram: "Web Programming",
    certificationsOrTraining:
      "Mengikuti pelatihan Web Programming dengan materi HTML, CSS, dan JavaScript.",
    workExperience: "Membantu memperbarui halaman informasi usaha keluarga.",
    mainSkills: ["HTML", "CSS", "JavaScript dasar"],
    preferredOutputLanguage: "id",
  },
  jobPosting: "Wajib memahami HTML dan CSS. Dasar React menjadi nilai tambah.",
};

describe("findAnalysisQualityIssues", () => {
  it("accepts formal grounded Indonesian output", () => {
    const analysis = createJobReadinessAnalysisFixture({
      readinessSummary:
        "Anda sudah memiliki dasar HTML dan CSS. Anda dapat melamar sambil memperkuat bukti proyek.",
      applicationMessage:
        "Yth. Tim Rekrutmen, saya bermaksud melamar posisi Junior Frontend Developer.",
    });

    expect(findAnalysisQualityIssues(request, analysis)).toEqual([]);
  });

  it.each(["kamu", "kalian", "kami"])(
    "rejects the Indonesian voice marker %s",
    (pronoun) => {
      const analysis = createJobReadinessAnalysisFixture({
        readinessSummary: `Menurut ${pronoun}, profil ini sudah cukup relevan.`,
      });

      expect(findAnalysisQualityIssues(request, analysis)).not.toEqual([]);
    },
  );

  it("rejects an unsupported training-graduation claim", () => {
    const analysis = createJobReadinessAnalysisFixture({
      applicationMessage:
        "Saya merupakan alumni PPKD Jakarta Pusat dan ingin melamar posisi ini.",
    });

    expect(findAnalysisQualityIssues(request, analysis)).toContain(
      "Training completion or certification claims require explicit profile evidence.",
    );
  });

  it("does not mistake an explicit uncertainty for a completion claim", () => {
    const analysis = createJobReadinessAnalysisFixture({
      readinessSummary:
        "Anda belum memiliki sertifikat yang disebutkan dalam lowongan, sehingga statusnya perlu dikonfirmasi.",
    });

    expect(findAnalysisQualityIssues(request, analysis)).toEqual([]);
  });

  it("accepts a completion claim when the profile explicitly proves it", () => {
    const analysis = createJobReadinessAnalysisFixture({
      applicationMessage:
        "Saya telah menyelesaikan pelatihan Web Programming dan ingin melamar posisi ini.",
    });
    const supportedRequest: AnalyzeJobReadinessRequest = {
      ...request,
      profile: {
        ...request.profile,
        certificationsOrTraining:
          "Telah menyelesaikan pelatihan Web Programming di PPKD Jakarta Pusat dan menerima sertifikat kelulusan.",
      },
    };

    expect(findAnalysisQualityIssues(supportedRequest, analysis)).toEqual([]);
  });

  it("does not apply Indonesian voice rules to English output", () => {
    const analysis = createJobReadinessAnalysisFixture({
      readinessSummary: "Kami can appear in quoted source material.",
    });
    const englishRequest: AnalyzeJobReadinessRequest = {
      ...request,
      profile: { ...request.profile, preferredOutputLanguage: "en" },
    };

    expect(findAnalysisQualityIssues(englishRequest, analysis)).toEqual([]);
  });
});
