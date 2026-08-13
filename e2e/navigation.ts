import { expect, type Page } from "@playwright/test";

export async function openApplication(page: Page): Promise<void> {
  await page.goto("/", { waitUntil: "commit" });
  await expect(
    page.getByRole("heading", { level: 1, name: "LokerLens AI" }),
  ).toBeVisible();
}
