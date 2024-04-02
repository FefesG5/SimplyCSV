import { test, expect } from "@playwright/test";

test.describe("Home Page test", () => {
  // Setup before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where the Header component is rendered
    await page.goto("http://localhost:3000");
  });

  test("navigation links are present and correct", async ({ page }) => {
    // Check for the existence of navigation links
    await expect(page.locator("text=About")).toHaveAttribute("href", "/about");
    await expect(page.locator("text=Administrator Access")).toHaveAttribute(
      "href",
      "/administrator-access",
    );
    await expect(page.locator("text=Contact")).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  test("homepage has a title 'Simply CSV'", async ({ page }) => {
    // Check for page title
    await expect(page).toHaveTitle(/Simply CSV/);

    // Check for heading text
    const heading = page.locator("h1", { hasText: "Simply CSV" });
    await expect(heading).toBeVisible();
  });
});
