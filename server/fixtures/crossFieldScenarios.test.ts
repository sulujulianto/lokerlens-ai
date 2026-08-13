import { describe, expect, it } from "vitest";
import { additionalLiveEvaluationScenarios } from "../../shared/additionalLiveEvaluationScenarios";
import { AnalyzeJobReadinessRequestSchema } from "../../shared/analysisSchemas";
import { crossFieldScenarios } from "../../shared/crossFieldScenarios";

const liveEvaluationScenarios = [
  ...crossFieldScenarios,
  ...additionalLiveEvaluationScenarios,
] as const;

const liveEvaluationFields = [
  "it_digital",
  "administration",
  "customer_service",
  "operations_logistics",
  "culinary",
  "electrical_refrigeration",
] as const;

describe("crossFieldScenarios", () => {
  it.each(liveEvaluationScenarios)(
    "validates the $profile.targetJobField fixture",
    (scenario) => {
      expect(
        AnalyzeJobReadinessRequestSchema.safeParse(scenario).success,
      ).toBe(true);
    },
  );

  it("represents every live-evaluation field", () => {
    const representedFields = new Set(
      liveEvaluationScenarios.map(
        (scenario) => scenario.profile.targetJobField,
      ),
    );

    for (const field of liveEvaluationFields) {
      expect(representedFields.has(field)).toBe(true);
    }
  });

  it.each(liveEvaluationScenarios)(
    "provides a non-empty posting for $profile.targetJobField",
    (scenario) => {
      expect(scenario.jobPosting.trim().length).toBeGreaterThan(0);
    },
  );

  it.each(liveEvaluationScenarios)(
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
    const serialized = JSON.stringify(liveEvaluationScenarios).toLowerCase();

    expect(serialized).not.toContain("gemini_api_key");
    expect(serialized).not.toContain("ai_provider");
    expect(serialized).not.toContain("api key");
    expect(serialized).not.toContain("provider:");
  });
});
