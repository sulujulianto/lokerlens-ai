import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { formValuesFromRequest } from "../form/profileForm";
import { demoScenarios } from "../demoScenarios";
import { ProfileForm } from "./ProfileForm";

describe("ProfileForm", () => {
  it("renders all stable job fields and vocational-training context", () => {
    const html = renderToStaticMarkup(
      <ProfileForm
        values={formValuesFromRequest(demoScenarios[0].request)}
        disabled={false}
        onChange={() => undefined}
      />,
    );

    expect((html.match(/<optgroup/g) ?? [])).toHaveLength(7);
    expect(html).toContain("Teknologi Informasi &amp; Digital");
    expect(html).toContain("Administrasi &amp; Perkantoran");
    expect(html).toContain("Kuliner, Tata Boga &amp; Barista");
    expect(html).toContain("Manufaktur, Mesin &amp; Pengelasan");
    expect(html).toContain("Keuangan &amp; Akuntansi");
    expect(html).toContain("Data, Analitik &amp; Kecerdasan Buatan");
    expect(html).toContain("Kesehatan, Caregiver &amp; Layanan Perawatan");
    expect(html).toContain("Pertanian, Perikanan &amp; Lingkungan");
    expect(html).toContain("Bidang Lainnya");
    expect(html).toContain("Lembaga pelatihan");
    expect(html).toContain("Sumber pelatihan");
    expect(html).toContain("Program atau kejuruan pelatihan");
    expect(html).not.toContain("<datalist");
    expect(html).not.toContain('list="training-provider-examples"');
    expect(html).not.toContain('list="training-program-examples"');
    expect(html).toContain('placeholder="Tulis nama lembaga pelatihan"');
    expect(html).toContain(
      'placeholder="Tulis nama program atau kejuruan pelatihan"',
    );
    expect(html).toContain("Pengalaman formal tidak wajib");
    expect(html).toContain("Bukti kompetensi atau proyek");
  });

  it("associates required and optional labels, hints, and errors", () => {
    const html = renderToStaticMarkup(
      <ProfileForm
        values={{
          ...formValuesFromRequest(demoScenarios[0].request),
          targetRole: "Peran sangat panjang ".repeat(20),
        }}
        disabled={false}
        errors={{
          targetRole: "Peran yang ditargetkan wajib diisi.",
          mainSkills: "Keahlian utama wajib diisi.",
        }}
        onChange={() => undefined}
      />,
    );

    expect(html).toContain('for="targetRole"');
    expect(html).toContain('id="targetRole"');
    expect(html).toContain("(Wajib)");
    expect(html).toContain("(Opsional)");
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('aria-describedby="targetRole-error"');
    expect(html).toContain(
      'aria-describedby="mainSkills-hint mainSkills-error"',
    );
    expect(html).toContain("Pisahkan dengan koma atau baris baru");
    expect(html).toContain(
      'placeholder="Contoh: teliti, sabar menghadapi pelanggan, cepat belajar"',
    );
    expect(html).not.toContain("Optional");
  });
});
