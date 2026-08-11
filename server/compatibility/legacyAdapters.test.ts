import { describe, expect, it } from "vitest";
import { createJobReadinessAnalysisFixture } from "../../shared/analysisTestFixtures";
import type { JobReadinessAnalysis } from "../../shared/analysisSchemas";
import { AppError } from "../errors";
import { adaptLegacyAnalyzeRequest } from "./legacyRequestAdapter";
import { adaptToLegacyAnalysisResponse } from "./legacyResponseAdapter";

const legacyRequest = {
  profile: {
    education: "SMK RPL",
    skills: " JavaScript, React, , Git ",
    projects: "Built a small inventory application.",
    experience: "",
    targetRole: "Junior Web Developer",
    language: "Indonesian",
  },
  jobPosting: "Requires JavaScript, React, and Git.",
};

const normalizedAnalysis: JobReadinessAnalysis =
  createJobReadinessAnalysisFixture({
    matchScore: 80,
    requirementMatches: [
      {
        requirement: "JavaScript",
        priority: "MUST_HAVE",
        status: "MATCHED",
        evidence: "JavaScript is listed in the profile.",
        recommendation: "Show the relevant project.",
      },
      {
        requirement: "Testing",
        priority: "NICE_TO_HAVE",
        status: "NOT_EVIDENCED",
        evidence: "Testing evidence was not supplied.",
        recommendation: "Add one focused test.",
      },
    ],
  });

describe("legacy request adapter", () => {
  it("maps the V1 request to the normalized V2 contract", () => {
    const result = adaptLegacyAnalyzeRequest(legacyRequest);

    expect(result.profile.targetRole).toBe("Junior Web Developer");
    expect(result.profile.educationBackground).toBe("SMK RPL");
    expect(result.profile.evidenceOrProjects).toBe(
      "Built a small inventory application.",
    );
  });

  it("maps the legacy language identifiers", () => {
    expect(
      adaptLegacyAnalyzeRequest(legacyRequest).profile.preferredOutputLanguage,
    ).toBe("id");
    expect(
      adaptLegacyAnalyzeRequest({
        ...legacyRequest,
        profile: { ...legacyRequest.profile, language: "English" },
      }).profile.preferredOutputLanguage,
    ).toBe("en");
  });

  it("normalizes comma-separated skills", () => {
    expect(adaptLegacyAnalyzeRequest(legacyRequest).profile.mainSkills).toEqual(
      ["JavaScript", "React", "Git"],
    );
  });

  it("defaults the legacy job field to IT and digital", () => {
    expect(
      adaptLegacyAnalyzeRequest(legacyRequest).profile.targetJobField,
    ).toBe("it_digital");
  });

  it("rejects insufficient legacy data", () => {
    expect(() =>
      adaptLegacyAnalyzeRequest({
        ...legacyRequest,
        profile: {
          ...legacyRequest.profile,
          projects: "",
          experience: "",
        },
      }),
    ).toThrow(AppError);
  });
});

describe("legacy response adapter", () => {
  it("maps the normalized result to the exact V1 response shape", () => {
    const result = adaptToLegacyAnalysisResponse(normalizedAnalysis);

    expect(Object.keys(result).sort()).toEqual(
      [
        "applicationMessage",
        "cvBulletSuggestions",
        "disclaimer",
        "matchScore",
        "missingSkills",
        "mustHaveRequirements",
        "niceToHaveRequirements",
        "portfolioSuggestions",
        "risks",
        "roadmap30Days",
        "strengths",
        "summary",
        "verdict",
      ].sort(),
    );
    expect(result.summary).toBe(normalizedAnalysis.readinessSummary);
    expect(result.portfolioSuggestions).toEqual(
      normalizedAnalysis.evidenceOfCompetenceSuggestions,
    );
    expect(result.cvBulletSuggestions).toEqual([
      normalizedAnalysis.cvImprovementPrompt,
    ]);
    expect(result.mustHaveRequirements).toEqual(["JavaScript"]);
    expect(result.niceToHaveRequirements).toEqual(["Testing"]);
  });

  it.each([
    ["APPLY_NOW", "Apply now"],
    ["APPLY_WITH_IMPROVEMENTS", "Apply with improvements"],
    ["NOT_READY_YET", "Not ready yet"],
  ] as const)("maps verdict %s to %s", (verdict, expected) => {
    expect(
      adaptToLegacyAnalysisResponse({
        ...normalizedAnalysis,
        verdict,
      }).verdict,
    ).toBe(expected);
  });
});
