import { errors, expect, type Page } from "@playwright/test";

const navigationTimeoutMs = 15_000;

async function expectServerReady(page: Page): Promise<void> {
  const response = await page.request.get("/api/health", {
    timeout: navigationTimeoutMs,
  });

  try {
    expect(response.ok(), "the production server should be healthy").toBe(
      true,
    );
  } finally {
    await response.dispose();
  }
}

async function navigateToApplication(page: Page): Promise<void> {
  await page.goto("/", {
    timeout: navigationTimeoutMs,
    waitUntil: "commit",
  });
}

export async function openApplication(page: Page): Promise<void> {
  await expectServerReady(page);

  try {
    await navigateToApplication(page);
  } catch (error) {
    if (!(error instanceof errors.TimeoutError)) {
      throw error;
    }

    await page.evaluate(() => window.stop()).catch(() => undefined);
    await expectServerReady(page);
    await navigateToApplication(page);
  }

  await expect(
    page.getByRole("heading", { level: 1, name: "LokerLens AI" }),
  ).toBeVisible();
}
