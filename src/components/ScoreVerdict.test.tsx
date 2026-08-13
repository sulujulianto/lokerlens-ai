import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Verdict } from "../../shared/analysisSchemas";
import { getVerdictLabel } from "../scoreVerdictPresentation";
import { ScoreVerdict } from "./ScoreVerdict";

describe("ScoreVerdict", () => {
  it.each([
    ["APPLY_NOW", "Layak Melamar Sekarang"],
    [
      "APPLY_WITH_IMPROVEMENTS",
      "Melamar Sambil Melakukan Perbaikan",
    ],
    ["NOT_READY_YET", "Belum Siap — Perkuat Fondasi Dahulu"],
  ] as const)("maps %s to its Indonesian label", (verdict, label) => {
    expect(getVerdictLabel(verdict, "id")).toBe(label);
  });

  it.each([
    ["APPLY_NOW", 75],
    ["APPLY_WITH_IMPROVEMENTS", 50],
    ["NOT_READY_YET", 49],
  ] as const)("does not render the %s enum identifier", (verdict, score) => {
    const html = renderToStaticMarkup(
      <ScoreVerdict
        score={score}
        verdict={verdict as Verdict}
        language="id"
        summary="Ringkasan kesiapan."
      />,
    );

    expect(html).toContain(getVerdictLabel(verdict, "id"));
    expect(html).not.toContain(verdict);
    expect(html).toContain("bukan peluang diterima");
  });
});
