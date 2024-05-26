import { test, expect } from "@playwright/test";

test.describe("Administrator Access Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/administrator-access");
  });

  test("should display the correct text above the Google Sign-In button", async ({ page }) => {
    const signInText = page.locator("p", { hasText: "Please sign in to access Administrator features" });
    await expect(signInText).toBeVisible();
  });

  test("should render the login page with Google Sign-In button", async ({ page }) => {
    const googleSignInButton = page.locator("button[aria-label='Sign in with Google']");
    await expect(googleSignInButton).toBeVisible();
  });
});
