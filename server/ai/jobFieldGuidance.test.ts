import { describe, expect, it } from "vitest";
import { JobFieldSchema, type JobField } from "../../shared/analysisSchemas";
import { getJobFieldGuidance } from "./jobFieldGuidance";

const allJobFields = JobFieldSchema.options;
const specializedFields: JobField[] = [
  "it_digital",
  "administration",
  "customer_service",
  "operations_logistics",
];

describe("getJobFieldGuidance", () => {
  it.each(allJobFields)("returns guidance for %s", (jobField) => {
    const guidance = getJobFieldGuidance(jobField);

    expect(guidance.fieldLabel.length).toBeGreaterThan(0);
    expect(guidance.competencyAreas.length).toBeGreaterThan(0);
    expect(guidance.evidenceExamples.length).toBeGreaterThan(0);
    expect(guidance.analysisCautions.length).toBeGreaterThan(0);
  });

  it.each(specializedFields)(
    "returns substantive specialized guidance for %s",
    (jobField) => {
      const guidance = getJobFieldGuidance(jobField);

      expect(guidance.competencyAreas.length).toBeGreaterThanOrEqual(5);
      expect(guidance.evidenceExamples.length).toBeGreaterThanOrEqual(4);
    },
  );

  it("includes technical-project evidence for IT and digital", () => {
    const guidance = getJobFieldGuidance("it_digital");
    const text = guidance.evidenceExamples.join(" ").toLowerCase();

    expect(text).toContain("source code");
    expect(text).toContain("github");
  });

  it("includes administrative evidence for administration", () => {
    const guidance = getJobFieldGuidance("administration");
    const text = guidance.evidenceExamples.join(" ").toLowerCase();

    expect(text).toContain("spreadsheet");
    expect(text).toContain("filing");
  });

  it("includes communication and complaint evidence for customer service", () => {
    const guidance = getJobFieldGuidance("customer_service");
    const competencyText = guidance.competencyAreas.join(" ").toLowerCase();
    const evidenceText = guidance.evidenceExamples.join(" ").toLowerCase();

    expect(competencyText).toContain("communication");
    expect(evidenceText).toContain("complaint");
  });

  it("includes inventory and process evidence for operations and logistics", () => {
    const guidance = getJobFieldGuidance("operations_logistics");
    const text = [
      ...guidance.competencyAreas,
      ...guidance.evidenceExamples,
    ]
      .join(" ")
      .toLowerCase();

    expect(text).toContain("inventory");
    expect(text).toContain("process");
  });

  it.each([
    "sales_marketing",
    "hospitality",
    "technical_vocational",
    "education_training",
    "finance_accounting",
    "other",
  ] as const)("uses conservative fallback guidance for %s", (jobField) => {
    const guidance = getJobFieldGuidance(jobField);
    const cautionText = guidance.analysisCautions.join(" ").toLowerCase();

    expect(guidance.fieldLabel).toBe("General Entry-Level Role");
    expect(cautionText).toContain("do not claim deep specialist coverage");
  });

  it.each([
    "administration",
    "customer_service",
    "operations_logistics",
  ] as const)("does not require software evidence for %s", (jobField) => {
    const guidance = getJobFieldGuidance(jobField);
    const guidanceText = [
      ...guidance.competencyAreas,
      ...guidance.evidenceExamples,
    ]
      .join(" ")
      .toLowerCase();

    expect(guidanceText).not.toContain("github");
    expect(guidanceText).not.toContain("api");
    expect(guidanceText).not.toContain("deployment");
  });
});
