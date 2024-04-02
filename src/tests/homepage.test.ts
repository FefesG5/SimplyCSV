import { test, expect } from "@playwright/test";

test.describe("Header component test", () => {
  // Setup before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where the Header component is rendered
    await page.goto("http://localhost:3000");
  });

  test("homepage has a title 'Simply CSV'", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Check for page title
    await expect(page).toHaveTitle(/Simply CSV/);

    // Check for heading text
    const heading = page.locator("h1", { hasText: "Simply CSV" });
    await expect(heading).toBeVisible();
  });
});
