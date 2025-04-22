import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should have no a11y violations on home page', async ({ page }) => {
  // Navigate to your local server
  await page.goto('http://localhost:3000');

  // Optionally wait for critical elements to load
  await page.waitForSelector('body');

  // Run axe accessibility analysis
  const results = await new AxeBuilder({ page }).analyze();

  // Log any violations, then assert there are none.
  if (results.violations.length) {
    console.log('Accessibility violations:', results.violations);
  }
  expect(results.violations).toHaveLength(0);
});
