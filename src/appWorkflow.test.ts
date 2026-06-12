import { describe, expect, it } from "vitest";
import { demoScenarios } from "./demoScenarios";
import {
  resetFrontendContent,
  selectDemoContent,
} from "./appWorkflow";

describe("frontend content workflow", () => {
  it("selects the matching demo form and offline analysis", () => {
    const selected = selectDemoContent(demoScenarios, 2, true);

    expect(selected.activeDemo).toBe(2);
    expect(selected.formValues.targetRole).toBe(
      demoScenarios[2].request.profile.targetRole,
    );
    expect(selected.analysis).toEqual(demoScenarios[2].analysis);
    expect(selected.isDemoResult).toBe(true);
  });

  it("selects demo form data without confusing it with a result", () => {
    const selected = selectDemoContent(demoScenarios, 3, false);

    expect(selected.activeDemo).toBe(3);
    expect(selected.analysis).toBeNull();
    expect(selected.isDemoResult).toBe(false);
  });

  it("resets content to default field and language", () => {
    const reset = resetFrontendContent();

    expect(reset.formValues.targetJobField).toBe("it_digital");
    expect(reset.formValues.preferredOutputLanguage).toBe("id");
    expect(reset.formValues.targetRole).toBe("");
    expect(reset.formValues.jobPosting).toBe("");
    expect(reset.activeDemo).toBeNull();
    expect(reset.analysis).toBeNull();
    expect(reset.isDemoResult).toBe(false);
  });
});
