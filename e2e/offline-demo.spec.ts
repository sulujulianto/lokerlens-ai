import { expect, test } from "@playwright/test";

test("loads the production application without a configured provider", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { level: 1, name: "LokerLens AI" }),
  ).toBeVisible();
  await expect(page.getByRole("status").first()).toContainText(
    "Analisis langsung belum dikonfigurasi",
  );
  await expect(
    page.getByTestId("live-analysis-button"),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: /Junior Frontend Developer/ }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("renders a selected offline demo without calling the analysis API", async ({
  page,
}) => {
  const analyzeRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/analyze") {
      analyzeRequests.push(request.url());
    }
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("button", { name: /Entry-Level Customer Service/ })
    .click();
  await expect(page.getByLabel("Peran yang ditargetkan")).toHaveValue(
    "Entry-Level Customer Service",
  );

  await page.getByTestId("demo-analysis-button").click();
  await expect(
    page.getByRole("heading", { name: "Menyusun analisis kesiapan" }),
  ).toBeVisible();

  const resultHeading = page.getByRole("heading", {
    level: 2,
    name: "Hasil analisis kesiapan kerja",
  });
  await expect(resultHeading).toBeVisible();
  await expect(resultHeading).toBeFocused();
  await expect(
    page.locator('[role="status"]').filter({ hasText: "Mode demo:" }),
  ).toBeVisible();
  expect(analyzeRequests).toEqual([]);
});

test("reset clears demo data, restores focus, and stays usable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.getByRole("button", { name: "Form baru" }).click();

  const jobField = page.getByLabel("Bidang pekerjaan");
  await expect(jobField).toBeFocused();
  await expect(page.getByLabel("Peran yang ditargetkan")).toHaveValue("");
  await expect(page.getByTestId("demo-analysis-button")).toBeDisabled();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
