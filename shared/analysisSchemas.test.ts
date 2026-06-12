import { describe, expect, it } from "vitest";
import {
  AnalyzeJobReadinessRequestSchema,
  CareerProfileV2Schema,
  JobFieldSchema,
  JobReadinessAnalysisSchema,
  OutputLanguageSchema,
} from "./analysisSchemas";

const validJobFields = [
  "it_digital",
  "administration",
  "customer_service",
  "sales_marketing",
  "operations_logistics",
  "hospitality",
  "technical_vocational",
  "education_training",
  "finance_accounting",
  "other",
] as const;

const validProfile = {
  targetJobField: "administration",
  targetRole: "Junior Administrative Assistant",
  educationBackground: "SMK graduate in office administration.",
  workExperience: "Six months supporting document filing and data entry.",
  mainSkills: ["Document filing", "Spreadsheet data entry"],
  toolsOrEquipment: ["Microsoft Excel"],
  responsibilities: "Maintained records and prepared weekly reports.",
  achievements: "Reduced duplicate records during an archive cleanup.",
  certificationsOrTraining: "Basic spreadsheet training.",
  personalStrengths: ["Careful", "Organized"],
  applicationChallenge: "Explaining informal experience clearly.",
  evidenceOrProjects: "A sample inventory spreadsheet and filing index.",
  preferredOutputLanguage: "id",
} as const;

const validRequest = {
  profile: validProfile,
  jobPosting: "Seeking an entry-level administrative assistant.",
};

const validAnalysis = {
  matchScore: 74,
  verdict: "APPLY_WITH_IMPROVEMENTS",
  readinessSummary: "The candidate meets most entry-level requirements.",
  candidateStrengths: ["Relevant document-handling experience"],
  mainGaps: ["No stated experience with the employer's filing software"],
  mustHaveRequirements: ["Accurate data entry"],
  niceToHaveRequirements: ["Experience with digital filing systems"],
  riskFactors: ["The posting does not state a salary range"],
  roadmap30Days: {
    week1: ["Practice spreadsheet formatting"],
    week2: ["Create a document filing sample"],
    week3: ["Prepare interview examples"],
    week4: ["Polish application materials"],
  },
  evidenceOfCompetenceSuggestions: ["Create a sanitized filing index sample"],
  cvMaterialSuggestions: ["Describe the number and type of records handled"],
  applicationMessage: "I am applying for the administrative assistant role.",
  possibleInterviewQuestions: ["How do you prevent data-entry errors?"],
  disclaimer: "This analysis is guidance and not a hiring guarantee.",
} as const;

describe("JobFieldSchema", () => {
  it.each(validJobFields)("accepts %s", (jobField) => {
    expect(JobFieldSchema.safeParse(jobField).success).toBe(true);
  });

  it("rejects unsupported job fields", () => {
    expect(JobFieldSchema.safeParse("software_only").success).toBe(false);
  });
});

describe("OutputLanguageSchema", () => {
  it.each(["id", "en"])("accepts %s", (language) => {
    expect(OutputLanguageSchema.safeParse(language).success).toBe(true);
  });

  it("rejects unsupported languages", () => {
    expect(OutputLanguageSchema.safeParse("Indonesian").success).toBe(false);
  });
});

describe("CareerProfileV2Schema", () => {
  it("accepts a valid profile with formal work experience", () => {
    const result = CareerProfileV2Schema.safeParse(validProfile);

    expect(result.success).toBe(true);
  });

  it("accepts organizational experience without formal employment", () => {
    const result = CareerProfileV2Schema.safeParse({
      ...validProfile,
      workExperience: undefined,
      responsibilities: undefined,
      evidenceOrProjects: undefined,
      internshipOrOrganizationalExperience:
        "Managed registration records for a student organization.",
    });

    expect(result.success).toBe(true);
  });

  it("accepts evidence or projects without formal employment", () => {
    const result = CareerProfileV2Schema.safeParse({
      ...validProfile,
      workExperience: undefined,
      internshipOrOrganizationalExperience: undefined,
      responsibilities: undefined,
      evidenceOrProjects: "Created a sample stock tracking workbook.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a profile without experience, responsibilities, or evidence", () => {
    const result = CareerProfileV2Schema.safeParse({
      ...validProfile,
      workExperience: undefined,
      internshipOrOrganizationalExperience: undefined,
      responsibilities: undefined,
      evidenceOrProjects: undefined,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toContain(
      "Provide at least one meaningful source",
    );
  });

  it("rejects blank skill values", () => {
    expect(
      CareerProfileV2Schema.safeParse({
        ...validProfile,
        mainSkills: ["Document filing", "   "],
      }).success,
    ).toBe(false);
  });

  it("rejects skill arrays above the maximum", () => {
    expect(
      CareerProfileV2Schema.safeParse({
        ...validProfile,
        mainSkills: Array.from({ length: 31 }, (_, index) => `Skill ${index}`),
      }).success,
    ).toBe(false);
  });

  it("rejects oversized fields", () => {
    expect(
      CareerProfileV2Schema.safeParse({
        ...validProfile,
        educationBackground: "a".repeat(2_001),
      }).success,
    ).toBe(false);
  });

  it("rejects blank required values", () => {
    expect(
      CareerProfileV2Schema.safeParse({
        ...validProfile,
        targetRole: "   ",
      }).success,
    ).toBe(false);
  });

  it("rejects unknown fields", () => {
    expect(
      CareerProfileV2Schema.safeParse({
        ...validProfile,
        provider: "gemini",
      }).success,
    ).toBe(false);
  });
});

describe("AnalyzeJobReadinessRequestSchema", () => {
  it("accepts a valid request and trims the job posting", () => {
    const result = AnalyzeJobReadinessRequestSchema.safeParse({
      ...validRequest,
      jobPosting: "  Seeking an entry-level administrative assistant.  ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.jobPosting).toBe(
        "Seeking an entry-level administrative assistant.",
      );
    }
  });

  it("rejects a blank job posting", () => {
    expect(
      AnalyzeJobReadinessRequestSchema.safeParse({
        ...validRequest,
        jobPosting: "   ",
      }).success,
    ).toBe(false);
  });

  it("rejects a job posting above 12,000 characters", () => {
    expect(
      AnalyzeJobReadinessRequestSchema.safeParse({
        ...validRequest,
        jobPosting: "a".repeat(12_001),
      }).success,
    ).toBe(false);
  });

  it("rejects a missing profile", () => {
    expect(
      AnalyzeJobReadinessRequestSchema.safeParse({
        jobPosting: validRequest.jobPosting,
      }).success,
    ).toBe(false);
  });
});

describe("JobReadinessAnalysisSchema", () => {
  it("accepts a valid normalized response", () => {
    expect(JobReadinessAnalysisSchema.safeParse(validAnalysis).success).toBe(
      true,
    );
  });

  it.each([-1, 101, 75.5])("rejects invalid match score %s", (matchScore) => {
    expect(
      JobReadinessAnalysisSchema.safeParse({
        ...validAnalysis,
        matchScore,
      }).success,
    ).toBe(false);
  });

  it("rejects an invalid verdict", () => {
    expect(
      JobReadinessAnalysisSchema.safeParse({
        ...validAnalysis,
        verdict: "Apply now",
      }).success,
    ).toBe(false);
  });

  it("rejects a missing roadmap week", () => {
    const { week4: _week4, ...incompleteRoadmap } =
      validAnalysis.roadmap30Days;

    expect(
      JobReadinessAnalysisSchema.safeParse({
        ...validAnalysis,
        roadmap30Days: incompleteRoadmap,
      }).success,
    ).toBe(false);
  });

  it("rejects malformed list entries", () => {
    expect(
      JobReadinessAnalysisSchema.safeParse({
        ...validAnalysis,
        mainGaps: ["Valid gap", "   "],
      }).success,
    ).toBe(false);
  });

  it("rejects a missing disclaimer", () => {
    const { disclaimer: _disclaimer, ...withoutDisclaimer } = validAnalysis;

    expect(
      JobReadinessAnalysisSchema.safeParse(withoutDisclaimer).success,
    ).toBe(false);
  });

  it("rejects unknown top-level fields", () => {
    expect(
      JobReadinessAnalysisSchema.safeParse({
        ...validAnalysis,
        provider: "gemini",
      }).success,
    ).toBe(false);
  });

  it.each([
    [0, "NOT_READY_YET"],
    [49, "NOT_READY_YET"],
    [50, "APPLY_WITH_IMPROVEMENTS"],
    [74, "APPLY_WITH_IMPROVEMENTS"],
    [75, "APPLY_NOW"],
    [100, "APPLY_NOW"],
  ] as const)("accepts score %i with verdict %s", (matchScore, verdict) => {
    expect(
      JobReadinessAnalysisSchema.safeParse({
        ...validAnalysis,
        matchScore,
        verdict,
      }).success,
    ).toBe(true);
  });

  it.each(
    (
      [
        [0, "NOT_READY_YET"],
        [49, "NOT_READY_YET"],
        [50, "APPLY_WITH_IMPROVEMENTS"],
        [74, "APPLY_WITH_IMPROVEMENTS"],
        [75, "APPLY_NOW"],
        [100, "APPLY_NOW"],
      ] as const
    ).flatMap(([matchScore, validVerdict]) =>
      (
        [
          "APPLY_NOW",
          "APPLY_WITH_IMPROVEMENTS",
          "NOT_READY_YET",
        ] as const
      )
        .filter((verdict) => verdict !== validVerdict)
        .map((verdict) => [matchScore, verdict] as const),
    ),
  )("rejects mismatched score %i with verdict %s", (matchScore, verdict) => {
    expect(
      JobReadinessAnalysisSchema.safeParse({
        ...validAnalysis,
        matchScore,
        verdict,
      }).success,
    ).toBe(false);
  });
});
