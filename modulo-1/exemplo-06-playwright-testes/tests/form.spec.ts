import { test, expect } from '@playwright/test';

const appUrl = '/vanilla-js-web-app-example/';

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('renders the starter cards on first load', async ({ page }) => {
  await expect(page.locator('#card-list')).toContainText('AI Alien');
  await expect(page.locator('#card-list')).toContainText('Predator Night Vision');
  await expect(page.locator('#card-list')).toContainText('ET Bilu');
});

test('submits the form and updates the list with the new card', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Image Title' }).fill('New AI Card');
  await page.getByRole('textbox', { name: 'Image URL' }).fill('https://example.com/new-image.png');
  await page.getByRole('button', { name: 'Submit Form' }).click();

  await expect(page.locator('#card-list')).toContainText('New AI Card');
  await expect(page.locator('#card-list img').last()).toHaveAttribute('src', 'https://example.com/new-image.png');
});

test('resets the form after a successful submission', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Image Title' }).fill('Reset Me');
  await page.getByRole('textbox', { name: 'Image URL' }).fill('https://example.com/reset.png');
  await page.getByRole('button', { name: 'Submit Form' }).click();

  await expect(page.getByRole('textbox', { name: 'Image Title' })).toHaveValue('');
  await expect(page.getByRole('textbox', { name: 'Image URL' })).toHaveValue('');
});

test('keeps the initial cards after reloading the page', async ({ page }) => {
  await page.reload();

  await expect(page.locator('#card-list')).toContainText('AI Alien');
  await expect(page.locator('#card-list')).toContainText('Predator Night Vision');
  await expect(page.locator('#card-list')).toContainText('ET Bilu');
});

test('shows validation feedback when the form is submitted with invalid values', async ({ page }) => {
  await page.getByRole('button', { name: 'Submit Form' }).click();

  await expect(page.getByText('Please type a title for the image.')).toBeVisible();
  await expect(page.getByText('Please type a valid URL')).toBeVisible();
  await expect(page.locator('#card-list')).not.toContainText('Please type');
});
