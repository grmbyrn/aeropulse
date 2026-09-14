import { test, expect } from '@playwright/test';

// baseURL is set in playwright.config.ts, so relative paths work here.
test('filters by status narrows the flight table', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', {name: "Operations overview"})).toBeVisible()
  await expect(page.getByRole('table')).toBeVisible()

  await page.getByLabel('Status').selectOption('cancelled')

  await expect(page).toHaveURL(/status=cancelled/)
  await expect(page.getByRole('cell', {name: 'arrived'})).toHaveCount(0)

  await page.getByLabel('Status').selectOption('departed')

  await expect(page.getByText('No flights match this filter.')).toBeVisible()
});
