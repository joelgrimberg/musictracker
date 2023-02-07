import { test, expect } from "@playwright/test";

test("open the application", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /tabtracker/i
  );
});
