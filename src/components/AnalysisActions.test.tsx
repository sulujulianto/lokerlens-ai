import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AnalysisActions } from "./AnalysisActions";

function buttonTag(html: string, testId: string): string {
  return (
    html.match(
      new RegExp(`<button[^>]*data-testid="${testId}"[^>]*>`),
    )?.[0] ?? ""
  );
}

describe("AnalysisActions", () => {
  it("keeps offline demos available when live analysis is unavailable", () => {
    const html = renderToStaticMarkup(
      <AnalysisActions
        analysisAvailable={false}
        healthChecked
        isLoading={false}
        onDemo={() => undefined}
      />,
    );

    expect(buttonTag(html, "live-analysis-button")).toMatch(
      /\sdisabled(?:=""|(?=\s|>))/,
    );
    expect(buttonTag(html, "demo-analysis-button")).not.toMatch(
      /\sdisabled(?:=""|(?=\s|>))/,
    );
    expect(html).toContain("Analisis langsung belum dikonfigurasi");
    expect(html).toContain("empat demo offline");
    expect(html).toContain(
      'aria-describedby="analysis-unavailable-description"',
    );
    expect(html).not.toMatch(/Gemini|model/i);
  });

  it("prevents duplicate live and demo actions while loading", () => {
    const html = renderToStaticMarkup(
      <AnalysisActions
        analysisAvailable
        healthChecked
        isLoading
        onDemo={() => undefined}
      />,
    );

    expect(buttonTag(html, "live-analysis-button")).toMatch(
      /\sdisabled(?:=""|(?=\s|>))/,
    );
    expect(buttonTag(html, "demo-analysis-button")).toMatch(
      /\sdisabled(?:=""|(?=\s|>))/,
    );
    expect(html).toContain("Analisis sedang diproses");
  });

  it("asks for a demo selection without disabling scenario access", () => {
    const html = renderToStaticMarkup(
      <AnalysisActions
        analysisAvailable={false}
        healthChecked
        isLoading={false}
        demoAvailable={false}
        onDemo={() => undefined}
      />,
    );

    expect(html).toContain("Pilih skenario demo dahulu");
    expect(buttonTag(html, "demo-analysis-button")).toMatch(
      /\sdisabled(?:=""|(?=\s|>))/,
    );
  });
});
