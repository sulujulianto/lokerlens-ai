import { expect, test, type Page } from "@playwright/test";

import { openApplication } from "./navigation";

const releaseViewports = [
  { name: "small mobile", width: 360, height: 800 },
  { name: "common mobile", width: 390, height: 844 },
  { name: "large mobile", width: 430, height: 932 },
  {
    name: "desktop 200 percent reflow proxy",
    width: 640,
    height: 720,
  },
  { name: "portrait tablet", width: 768, height: 1024 },
] as const;

async function expectNoHorizontalClipping(page: Page, context: string) {
  const layout = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const scrollWidth = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
    );
    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>(
        "header, main, footer, section, aside, article, form, button, input, select, textarea",
      ),
    );
    const offenders = candidates
      .filter((element) => {
        const style = window.getComputedStyle(element);
        const rectangle = element.getBoundingClientRect();
        const visuallyHidden =
          element.classList.contains("sr-only") ||
          style.clip !== "auto" ||
          style.clipPath !== "none";

        if (
          visuallyHidden ||
          style.display === "none" ||
          style.visibility === "hidden" ||
          rectangle.width === 0 ||
          rectangle.height === 0
        ) {
          return false;
        }

        return rectangle.left < -1 || rectangle.right > viewportWidth + 1;
      })
      .map((element) => ({
        ariaLabel: element.getAttribute("aria-label"),
        id: element.id,
        tag: element.tagName.toLowerCase(),
        testId: element.dataset.testid,
      }));

    return { offenders, scrollWidth, viewportWidth };
  });

  expect(layout.scrollWidth, `${context}: document scroll width`).toBeLessThanOrEqual(
    layout.viewportWidth + 1,
  );
  expect(layout.offenders, `${context}: clipped interactive or content regions`).toEqual(
    [],
  );
}

async function tabUntilFocused(page: Page, testId: string, limit = 50) {
  const target = page.getByTestId(testId);

  for (let index = 0; index < limit; index += 1) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((element) => element === document.activeElement)) {
      return;
    }
  }

  throw new Error(`Tab focus did not reach ${testId} within ${limit} steps.`);
}

test("initial form and offline result reflow across release viewports", async ({
  browserName,
  page,
}) => {
  test.slow(
    browserName === "firefox",
    "the multi-viewport release matrix needs additional time on Firefox",
  );
  await openApplication(page);

  for (const viewport of releaseViewports) {
    await page.setViewportSize(viewport);
    await expectNoHorizontalClipping(page, `${viewport.name} initial form`);
  }

  await page.getByTestId("demo-analysis-button").click();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Hasil analisis kesiapan kerja",
    }),
  ).toBeVisible();

  for (const viewport of releaseViewports) {
    await page.setViewportSize(viewport);
    await expectNoHorizontalClipping(page, `${viewport.name} offline result`);
  }
});

test("keyboard users can enter and leave an offline result without a focus trap", async ({
  browserName,
  page,
}) => {
  test.slow(
    browserName === "firefox",
    "the keyboard release flow needs additional time on Firefox",
  );
  await page.setViewportSize({ width: 1280, height: 720 });
  await openApplication(page);

  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Form baru" })).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: /Junior Frontend Developer/ }),
  ).toBeFocused();

  await page.keyboard.press("Tab");
  const secondDemo = page.getByRole("button", {
    name: /Junior Administrative Staff/,
  });
  await expect(secondDemo).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(secondDemo).toHaveAttribute("aria-pressed", "true");

  await tabUntilFocused(page, "demo-analysis-button");
  await page.keyboard.press("Enter");

  const resultHeading = page.getByRole("heading", {
    level: 2,
    name: "Hasil analisis kesiapan kerja",
  });
  await expect(resultHeading).toBeVisible();
  await expect(resultHeading).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  const backButton = page.getByRole("button", { name: "Kembali ke formulir" });
  await expect(backButton).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("demo-analysis-button")).toBeFocused();
});
