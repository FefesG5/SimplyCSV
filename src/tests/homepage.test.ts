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

  test.describe("Home Page test", () => {
    test("sidebar opens and closes", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("http://localhost:3000");

      // Locate and click the hamburger icon to open the sidebar
      const hamburger = page.locator("button", { hasText: "☰" });
      await hamburger.click();

      // Ensure the sidebar is visible
      const sidebar = page.locator("aside");
      await expect(sidebar).toBeVisible();

      // Click outside the sidebar to close it
      // Choose a selector that exists outside the sidebar
      // For example, the main content area or a header logo could be good targets
      const outsideArea = page.locator("header");
      await outsideArea.click();

      // Verify the sidebar is closed
      await expect(sidebar).not.toBeVisible();
    });
  });

  test("homepage has a title 'Simply CSV'", async ({ page }) => {
    // Check for page title
    await expect(page).toHaveTitle(/Simply CSV/);

    // Check for heading text
    const heading = page.locator("h1", { hasText: "Simply CSV" });
    await expect(heading).toBeVisible();
  });

  test("footer should display correct information", async ({ page }) => {
    // Check for the presence of 'Powered by' text and Vercel logo in the footer
    const poweredByText = page.locator("footer >> text=Powered by");
    await expect(poweredByText).toBeVisible();

    const vercelLink = page.locator("footer >> a[href='https://vercel.com']");
    await expect(vercelLink).toBeVisible();

    const vercelLogo = vercelLink.locator("img[alt='Vercel Logo']");
    await expect(vercelLogo).toBeVisible();
  });
});
