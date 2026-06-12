import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { formValuesFromRequest } from "../form/profileForm";
import { demoScenarios } from "../demoScenarios";
import { ProfileForm } from "./ProfileForm";

describe("ProfileForm", () => {
  it("renders all ten stable job fields and manual profile sections", () => {
    const html = renderToStaticMarkup(
      <ProfileForm
        values={formValuesFromRequest(demoScenarios[0].request)}
        disabled={false}
        onChange={() => undefined}
      />,
    );

    expect((html.match(/<option/g) ?? [])).toHaveLength(12);
    expect(html).toContain("IT &amp; Digital");
    expect(html).toContain("Administrasi");
    expect(html).toContain("Keuangan &amp; Akuntansi");
    expect(html).toContain("Bidang Lainnya");
    expect(html).toContain("Pengalaman formal tidak wajib");
    expect(html).toContain("Bukti kompetensi atau proyek");
  });
});
