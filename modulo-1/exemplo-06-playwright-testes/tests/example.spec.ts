import { test, expect } from '@playwright/test';

test('loads the example app homepage', async ({ page }) => {
  await page.goto('/vanilla-js-web-app-example/');
  await expect(page).toHaveURL(/vanilla-js-web-app-example/);
  await expect(page.locator('body')).toBeVisible();
});
