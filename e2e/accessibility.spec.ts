import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const wcagTags: string[] = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22a",
  "wcag22aa",
];

async function expectNoWcagViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

  expect(results.violations).toEqual([]);
}

test("initial form has no detectable WCAG A or AA violations", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("status").first()).toContainText(
    "Analisis langsung belum dikonfigurasi",
  );

  await expectNoWcagViolations(page);
});

test("offline result has no detectable WCAG A or AA violations", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByTestId("demo-analysis-button").click();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Hasil analisis kesiapan kerja",
    }),
  ).toBeVisible();

  await expectNoWcagViolations(page);
});

test("keyboard users can reset the form and reach its first control", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Form baru" })).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Bidang pekerjaan")).toBeFocused();
  await expect(page.getByLabel("Peran yang ditargetkan")).toHaveValue("");
});
