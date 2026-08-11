import { describe, expect, it } from "vitest";
import { JobFieldSchema } from "../shared/analysisSchemas";
import { jobFieldOptions } from "./jobFields";

describe("jobFieldOptions", () => {
  it("exposes all stable identifiers with Indonesian labels", () => {
    expect(jobFieldOptions).toHaveLength(29);
    expect(jobFieldOptions.map((option) => option.value)).toEqual(
      JobFieldSchema.options,
    );
    expect(jobFieldOptions).toContainEqual({
      value: "operations_logistics",
      label: "Logistik, Gudang & Operasional",
      shortLabel: "Logistik & Gudang",
      group: "service_operations",
      description: expect.any(String),
      exampleRoles: expect.any(Array),
    });
  });
});
