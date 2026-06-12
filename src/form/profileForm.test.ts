import { describe, expect, it } from "vitest";
import { emptyProfileForm } from "./profileForm";
import {
  createAnalyzeRequest,
  normalizeListInput,
} from "./profileForm";

const validValues = {
  ...emptyProfileForm,
  targetJobField: "administration" as const,
  targetRole: "Junior Administrative Staff",
  educationBackground: "SMK Manajemen Perkantoran",
  internshipOrOrganizationalExperience:
    "Membantu sekretariat acara sekolah.",
  mainSkills: "Data entry, Pengarsipan\nMicrosoft Excel",
  jobPosting: "Wajib teliti dan mampu menggunakan Excel.",
};

describe("normalizeListInput", () => {
  it("splits commas and new lines while preserving order", () => {
    expect(normalizeListInput("Excel, Word\nPengarsipan")).toEqual([
      "Excel",
      "Word",
      "Pengarsipan",
    ]);
  });

  it("trims and removes blank entries", () => {
    expect(normalizeListInput(" Excel, , \n Word ")).toEqual([
      "Excel",
      "Word",
    ]);
  });
});

describe("createAnalyzeRequest", () => {
  it("creates a valid normalized request", () => {
    const result = createAnalyzeRequest(validValues);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.profile.mainSkills).toEqual([
        "Data entry",
        "Pengarsipan",
        "Microsoft Excel",
      ]);
      expect(result.data.profile.targetJobField).toBe("administration");
    }
  });

  it.each([
    { workExperience: "Membantu toko keluarga.", evidenceOrProjects: "" },
    {
      workExperience: "",
      internshipOrOrganizationalExperience: "Menjadi panitia acara.",
    },
    { workExperience: "", responsibilities: "Mencatat stok harian." },
    { workExperience: "", evidenceOrProjects: "Membuat spreadsheet contoh." },
  ])("accepts non-formal evidence source %#", (evidence) => {
    expect(
      createAnalyzeRequest({
        ...validValues,
        internshipOrOrganizationalExperience: "",
        responsibilities: "",
        evidenceOrProjects: "",
        ...evidence,
      }).success,
    ).toBe(true);
  });

  it("rejects a profile with no evidence source", () => {
    expect(
      createAnalyzeRequest({
        ...validValues,
        workExperience: "",
        internshipOrOrganizationalExperience: "",
        responsibilities: "",
        evidenceOrProjects: "",
      }).success,
    ).toBe(false);
  });

  it("rejects blank required fields", () => {
    expect(
      createAnalyzeRequest({ ...validValues, targetRole: " " }).success,
    ).toBe(false);
  });

  it("rejects arrays above the shared schema maximum", () => {
    expect(
      createAnalyzeRequest({
        ...validValues,
        mainSkills: Array.from({ length: 31 }, (_, index) => `Skill ${index}`).join(
          ",",
        ),
      }).success,
    ).toBe(false);
  });
});
