import { describe, expect, it } from "vitest";
import { AnalyzeJobReadinessRequestSchema } from "../../shared/analysisSchemas";
import { crossFieldScenarios } from "../../shared/crossFieldScenarios";

const specializedFields = [
  "it_digital",
  "administration",
  "customer_service",
  "operations_logistics",
] as const;

describe("crossFieldScenarios", () => {
  it.each(crossFieldScenarios)(
    "validates the $profile.targetJobField fixture",
    (scenario) => {
      expect(
        AnalyzeJobReadinessRequestSchema.safeParse(scenario).success,
      ).toBe(true);
    },
  );

  it("represents all specialized fields", () => {
    const representedFields = new Set(
      crossFieldScenarios.map((scenario) => scenario.profile.targetJobField),
    );

    for (const field of specializedFields) {
      expect(representedFields.has(field)).toBe(true);
    }
  });

  it.each(crossFieldScenarios)(
    "provides a non-empty posting for $profile.targetJobField",
    (scenario) => {
      expect(scenario.jobPosting.trim().length).toBeGreaterThan(0);
    },
  );

  it.each(crossFieldScenarios)(
    "provides experience or evidence for $profile.targetJobField",
    (scenario) => {
      const profile = scenario.profile;
      const evidenceSources = [
        "workExperience" in profile ? profile.workExperience : undefined,
        "internshipOrOrganizationalExperience" in profile
          ? profile.internshipOrOrganizationalExperience
          : undefined,
        "responsibilities" in profile ? profile.responsibilities : undefined,
        "evidenceOrProjects" in profile ? profile.evidenceOrProjects : undefined,
      ];

      expect(evidenceSources.some((value) => Boolean(value?.trim()))).toBe(true);
    },
  );

  it("contains no provider configuration or secrets", () => {
    const serialized = JSON.stringify(crossFieldScenarios).toLowerCase();

    expect(serialized).not.toContain("gemini_api_key");
    expect(serialized).not.toContain("ai_provider");
    expect(serialized).not.toContain("api key");
    expect(serialized).not.toContain("provider:");
  });
});
