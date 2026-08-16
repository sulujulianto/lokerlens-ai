import { expect, test, type Locator } from "@playwright/test";

import { openApplication } from "./navigation";

async function expectEffectivelyImmediateTransition(
  locator: Locator,
) {
  const longestDurationMs = await locator.evaluate((element) =>
    Math.max(
      ...window
        .getComputedStyle(element)
        .transitionDuration.split(",")
        .map((duration) => {
          const normalized = duration.trim();
          return normalized.endsWith("ms")
            ? Number.parseFloat(normalized)
            : Number.parseFloat(normalized) * 1_000;
        }),
    ),
  );

  expect(longestDurationMs).toBeLessThanOrEqual(0.01);
}

test("reduces spinner, scrolling, and transition motion when requested", async ({
  browserName,
  page,
}) => {
  test.slow(
    browserName === "firefox",
    "the reduced-motion browser flow needs additional time on Firefox",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/api/health", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      json: { analysisAvailable: true, ok: true },
      status: 200,
    });
  });

  let releaseAnalysis!: () => void;
  const analysisRelease = new Promise<void>((resolve) => {
    releaseAnalysis = resolve;
  });
  await page.route("**/api/analyze", async (route) => {
    await analysisRelease;
    await route.abort("failed");
  });

  await openApplication(page);

  expect(
    await page.evaluate(() =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expectEffectivelyImmediateTransition(
    page.getByLabel("Bidang pekerjaan"),
  );
  await expectEffectivelyImmediateTransition(
    page.getByTestId("demo-analysis-button"),
  );

  const liveAnalysisButton = page.getByTestId("live-analysis-button");
  await expect(liveAnalysisButton).toBeEnabled();

  try {
    await liveAnalysisButton.click();
    const loadingStatus = page
      .getByRole("status")
      .filter({ hasText: "Menyusun analisis kesiapan" });
    await expect(loadingStatus).toBeVisible();
    await expect(
      loadingStatus.locator('[aria-hidden="true"]').first(),
    ).toHaveCSS("animation-name", "none");
  } finally {
    releaseAnalysis();
  }
});
