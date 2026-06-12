import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { emptyProfileForm } from "../form/profileForm";
import { ApplicationContext } from "./ApplicationContext";

describe("ApplicationContext", () => {
  it("associates labels, counter, required state, and errors", () => {
    const html = renderToStaticMarkup(
      <ApplicationContext
        values={{
          ...emptyProfileForm,
          jobPosting: "Lowongan ".repeat(300),
        }}
        disabled={false}
        errors={{ jobPosting: "Teks lowongan wajib diisi." }}
        onChange={() => undefined}
      />,
    );

    expect(html).toContain('for="applicationChallenge"');
    expect(html).toContain('for="jobPosting"');
    expect(html).toContain("(Opsional)");
    expect(html).toContain("(Wajib)");
    expect(html).toContain(
      'aria-describedby="jobPosting-counter jobPosting-error"',
    );
    expect(html).toContain('id="jobPosting-counter"');
    expect(html).toContain('id="jobPosting-error"');
  });
});
