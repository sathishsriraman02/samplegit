const { test, expect } = require('@playwright/test');

test('Open Google and search - Advanced Test', async ({ page }) => {

  // Open website
  await page.goto('https://www.google.com');

  // Maximize window (optional)
  await page.setViewportSize({ width: 1280, height: 720 });

  // Accept cookies if visible
  const acceptButton = page.locator('button:has-text("Accept all")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Verify Google title
  await expect(page).toHaveTitle(/Google/);

  // Fill search box
  await page.fill('textarea[name="q"]', 'Playwright Automation');

  // Press Enter
  await page.keyboard.press('Enter');

  // Wait for search results
  await page.waitForSelector('h3');

  // Verify at least 5 results exist
  const results = page.locator('h3');
  await expect(results).toHaveCountGreaterThan(4);

  // Scroll down
  await page.mouse.wheel(0, 1000);

  // Take screenshot of results page
  await page.screenshot({ path: 'google-results.png', fullPage: true });

  // Get text of first result
  const firstResultText = await results.first().textContent();
  console.log('First Result:', firstResultText);

  // Click first result
  await results.first().click();

  // Wait for page load
  await page.waitForLoadState('load');

  // Soft validation of page title
  await expect.soft(page).toHaveTitle(/Playwright/i);

  // Wait 2 seconds for demo purpose
  await page.waitForTimeout(2000);

  // Go back to Google results
  await page.goBack();

  // Verify we are back on Google results
  await expect(page).toHaveURL(/googledemo/);

});