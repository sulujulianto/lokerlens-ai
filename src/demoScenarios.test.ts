import { describe, expect, it } from "vitest";
import {
  AnalyzeJobReadinessRequestSchema,
  JobReadinessAnalysisSchema,
} from "../shared/analysisSchemas";
import { demoScenarios } from "./demoScenarios";

describe("demoScenarios", () => {
  it("contains four valid cross-field scenarios", () => {
    expect(demoScenarios).toHaveLength(4);
    for (const scenario of demoScenarios) {
      expect(
        AnalyzeJobReadinessRequestSchema.safeParse(scenario.request).success,
      ).toBe(true);
      expect(
        JobReadinessAnalysisSchema.safeParse(scenario.analysis).success,
      ).toBe(true);
    }
  });

  it("represents all specialized fields", () => {
    expect(
      demoScenarios.map((scenario) => scenario.request.profile.targetJobField),
    ).toEqual([
      "it_digital",
      "administration",
      "customer_service",
      "operations_logistics",
    ]);
  });

  it("keeps non-IT evidence free from software-only assumptions", () => {
    for (const scenario of demoScenarios.slice(1)) {
      const evidence =
        scenario.analysis.evidenceOfCompetenceSuggestions.join(" ").toLowerCase();
      expect(evidence).not.toMatch(/github|rest api|deployment|source code/);
    }
  });

  it("contains no provider configuration or secrets", () => {
    const serialized = JSON.stringify(demoScenarios).toLowerCase();
    expect(serialized).not.toContain("gemini_api_key");
    expect(serialized).not.toContain("ai_provider");
    expect(serialized).not.toContain("server-secret");
  });
});
