import { test, expect } from "@playwright/test";

test.describe("About Page test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/about");
  });

  test("About page contains correct headings and content", async ({ page }) => {
    // Check for the main heading
    const mainHeading = page.locator("h2", {
      hasText: "Welcome to Simply CSV!",
    });
    await expect(mainHeading).toBeVisible();
  });
});
