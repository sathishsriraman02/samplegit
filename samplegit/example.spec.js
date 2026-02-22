const { test, expect } = require('@playwright/test');

test('Open Google and search', async ({ page }) => {

  // Open website
  await page.goto('https://www.google.com');

  // Accept cookies if visible (optional safety)
  const acceptButton = page.locator('button:has-text("Accept all")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Type in search box
  await page.fill('textarea[name="q"]', 'Playwright Automation');

  // Press Enter
  await page.keyboard.press('Enter');

  // Wait for results page to load
  await page.waitForSelector('h3');

  // Verify results are displayed
  const results = await page.locator('h3');
  await expect(results.first()).toBeVisible();

  // Click first search result
  await results.first().click();

  // Wait for navigation
  await page.waitForLoadState('load');

  // Validate page title contains Playwright
  await expect(page).toHaveTitle(/Playwright/i);

});