import { describe, expect, it } from "vitest";
import { JobFieldSchema } from "../shared/analysisSchemas";
import { jobFieldOptions } from "./jobFields";

describe("jobFieldOptions", () => {
  it("exposes all ten stable identifiers with Indonesian labels", () => {
    expect(jobFieldOptions).toHaveLength(10);
    expect(jobFieldOptions.map((option) => option.value)).toEqual(
      JobFieldSchema.options,
    );
    expect(jobFieldOptions).toContainEqual({
      value: "operations_logistics",
      label: "Operasional, Gudang & Logistik",
    });
  });
});
