import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App shell", () => {
  it("identifies the selected demo beyond color and keeps semantic landmarks", () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain("<header");
    expect(html).toContain("<main");
    expect(html).toContain("<footer");
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain("(Dipilih)");
    expect(html).toContain('role="group"');
    expect(html).toContain("<form");
  });
});
