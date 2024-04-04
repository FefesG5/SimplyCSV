import { test, expect } from "@playwright/test";

test.describe("Home Page test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test.describe("Navigation Tests", () => {
    test("navigation links are correctly set", async ({ page }) => {
      await expect(page.locator("text=About")).toHaveAttribute(
        "href",
        "/about",
      );
      await expect(page.locator("text=Administrator Access")).toHaveAttribute(
        "href",
        "/administrator-access",
      );
      await expect(page.locator("text=Contact")).toHaveAttribute(
        "href",
        "/contact",
      );
    });

    test("sidebar functionality", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const hamburger = page.locator("button", { hasText: "☰" });
      await hamburger.click();
      const sidebar = page.locator("aside");
      await expect(sidebar).toBeVisible();

      const outsideArea = page.locator("header");
      await outsideArea.click();
      await expect(sidebar).not.toBeVisible();
    });
  });

  test.describe("Content Tests", () => {
    test("homepage displays the correct title", async ({ page }) => {
      await expect(page).toHaveTitle(/Simply CSV/);
      const heading = page.locator("h1", { hasText: "Simply CSV" });
      await expect(heading).toBeVisible();
    });

    test("footer contains correct information and branding", async ({
      page,
    }) => {
      const poweredByText = page.locator("footer >> text=Powered by");
      await expect(poweredByText).toBeVisible();

      const vercelLink = page.locator("footer >> a[href='https://vercel.com']");
      await expect(vercelLink).toBeVisible();
      const vercelLogo = vercelLink.locator("img[alt='Vercel Logo']");
      await expect(vercelLogo).toBeVisible();
    });
  });
});
