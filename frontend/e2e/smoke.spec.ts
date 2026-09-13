import { test, expect } from '@playwright/test';

// baseURL is set in playwright.config.ts, so relative paths work here.
test('home page renders', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator('main')).toBeVisible();
});
