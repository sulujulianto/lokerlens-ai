import { expect, test } from "@playwright/test";

test("disables the loading spinner animation when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  expect(
    await page.evaluate(() =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);

  await page.getByTestId("demo-analysis-button").click();
  const loadingStatus = page
    .getByRole("status")
    .filter({ hasText: "Menyusun analisis kesiapan" });
  await expect(loadingStatus).toBeVisible();
  await expect(
    loadingStatus.locator('[aria-hidden="true"]').first(),
  ).toHaveCSS("animation-name", "none");
});
