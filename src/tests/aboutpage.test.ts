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

    const introParagraph = page.locator(
      "text=This intuitive tool is designed to make your data entry tasks simpler and more efficient.",
    );
    await expect(introParagraph).toBeVisible();

    const mainContent = page.locator("[data-testid='about-main-content']");
    const listItems = mainContent.locator("ul >> li");
    await expect(listItems).toHaveCount(8);

    await expect(listItems.first()).toContainText("Enter Your Data");
    await expect(listItems.nth(1)).toContainText("Process Your Data:");
    await expect(listItems.nth(2)).toContainText("Download Your CSV");
    await expect(listItems.nth(3)).toContainText("Clear Data:");

    await expect(listItems.nth(4)).toContainText("データを入力する：");
    await expect(listItems.nth(5)).toContainText("データを処理する：");
    await expect(listItems.nth(6)).toContainText("CSV をダウンロードする：");
    await expect(listItems.last()).toContainText("データをクリアする：");
  });
});
