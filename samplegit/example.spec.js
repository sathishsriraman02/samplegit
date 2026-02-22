const { test, expect } = require('@playwright/test');

test('Open Google and search', async ({ page }) => {

  // Open website
  await page.goto('https://www.google.com');

  // Type in search box
  await page.fill('textarea[name="q"]', 'Playwright Automation');

  // Press Enter
  await page.keyboard.press('Enter');

  // Wait for results
  await page.waitForTimeout(3000);

});