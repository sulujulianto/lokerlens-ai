import { describe, expect, it } from "vitest";
import { AppError } from "../errors";
import { parseJobReadinessResponse } from "./responseParser";

const validAnalysis = {
  matchScore: 72,
  verdict: "APPLY_WITH_IMPROVEMENTS",
  readinessSummary: "The candidate is close to ready.",
  candidateStrengths: ["Relevant entry-level experience"],
  mainGaps: ["Limited evidence of reporting work"],
  mustHaveRequirements: ["Accurate data entry"],
  niceToHaveRequirements: ["Spreadsheet reporting"],
  riskFactors: [],
  roadmap30Days: {
    week1: ["Review spreadsheet basics"],
    week2: ["Create a report sample"],
    week3: ["Practice interview examples"],
    week4: ["Apply with improved materials"],
  },
  evidenceOfCompetenceSuggestions: ["Create a sanitized report sample"],
  cvMaterialSuggestions: ["Describe filing responsibilities"],
  applicationMessage: "I am interested in this role.",
  possibleInterviewQuestions: ["How do you ensure accuracy?"],
  disclaimer: "This is guidance, not a hiring guarantee.",
};

function expectInvalidProviderResponse(input: string): void {
  try {
    parseJobReadinessResponse(input);
    throw new Error("Expected parsing to fail");
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(AppError);
    expect((error as AppError).code).toBe("PROVIDER_RESPONSE_INVALID");
    expect((error as AppError).publicMessage).not.toContain("verdict");
    expect((error as AppError).publicMessage).not.toContain(input);
  }
}

describe("parseJobReadinessResponse", () => {
  it("accepts valid normalized JSON", () => {
    expect(parseJobReadinessResponse(JSON.stringify(validAnalysis))).toEqual(
      validAnalysis,
    );
  });

  it("accepts JSON inside a Markdown code fence", () => {
    const fenced = `\`\`\`json\n${JSON.stringify(validAnalysis)}\n\`\`\``;

    expect(parseJobReadinessResponse(fenced)).toEqual(validAnalysis);
  });

  it.each([
    [0, "NOT_READY_YET"],
    [49, "NOT_READY_YET"],
    [50, "APPLY_WITH_IMPROVEMENTS"],
    [74, "APPLY_WITH_IMPROVEMENTS"],
    [75, "APPLY_NOW"],
    [100, "APPLY_NOW"],
  ] as const)("accepts boundary score %i with verdict %s", (matchScore, verdict) => {
    const boundaryAnalysis = { ...validAnalysis, matchScore, verdict };

    expect(
      parseJobReadinessResponse(JSON.stringify(boundaryAnalysis)),
    ).toEqual(boundaryAnalysis);
  });

  it("rejects malformed JSON", () => {
    expectInvalidProviderResponse("{not-json");
  });

  it("rejects missing required fields", () => {
    const { disclaimer: _disclaimer, ...incomplete } = validAnalysis;

    expectInvalidProviderResponse(JSON.stringify(incomplete));
  });

  it.each([-1, 101])("rejects out-of-range score %s", (matchScore) => {
    expectInvalidProviderResponse(
      JSON.stringify({ ...validAnalysis, matchScore }),
    );
  });

  it("rejects invalid verdict identifiers", () => {
    expectInvalidProviderResponse(
      JSON.stringify({ ...validAnalysis, verdict: "Apply now" }),
    );
  });

  it("rejects an inconsistent score and verdict", () => {
    expectInvalidProviderResponse(
      JSON.stringify({
        ...validAnalysis,
        matchScore: 40,
        verdict: "APPLY_NOW",
      }),
    );
  });

  it("rejects oversized generated text", () => {
    expectInvalidProviderResponse(
      JSON.stringify({
        ...validAnalysis,
        readinessSummary: "a".repeat(4_001),
      }),
    );
  });

  it("rejects unknown fields", () => {
    expectInvalidProviderResponse(
      JSON.stringify({ ...validAnalysis, provider: "gemini" }),
    );
  });
});
