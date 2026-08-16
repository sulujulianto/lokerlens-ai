import { describe, expect, it } from "vitest";
import { AnalyzeJobReadinessRequestSchema } from "../../shared/analysisSchemas";
import { longBilingualInformalScenario } from "../../shared/robustnessScenarios";

describe("robustness scenarios", () => {
  it("accepts a long request below the public schema limit", () => {
    const result = AnalyzeJobReadinessRequestSchema.safeParse(
      longBilingualInformalScenario,
    );

    expect(result.success).toBe(true);
    expect(longBilingualInformalScenario.jobPosting.length).toBeGreaterThan(
      8_000,
    );
    expect(longBilingualInformalScenario.jobPosting.length).toBeLessThanOrEqual(
      12_000,
    );
  });

  it("preserves explicit informal-experience boundaries", () => {
    expect(longBilingualInformalScenario.profile.workExperience).toContain(
      "secara informal",
    );
    expect(longBilingualInformalScenario.profile.workExperience).toContain(
      "bukan pekerjaan formal",
    );
  });

  it("contains meaningful Indonesian and English vacancy requirements", () => {
    expect(longBilingualInformalScenario.jobPosting).toContain(
      "Persyaratan wajib",
    );
    expect(longBilingualInformalScenario.jobPosting).toContain(
      "Mandatory requirements",
    );
    expect(longBilingualInformalScenario.jobPosting).toContain(
      "Must protect customer and supplier information",
    );
  });

  it("contains no provider configuration or credentials", () => {
    const serialized = JSON.stringify(longBilingualInformalScenario).toLowerCase();

    expect(serialized).not.toContain("api_key");
    expect(serialized).not.toContain("bearer ");
    expect(serialized).not.toContain("provider:");
  });
});
