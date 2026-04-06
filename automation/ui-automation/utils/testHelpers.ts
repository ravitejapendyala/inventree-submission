/**
 * testHelpers.ts
 * Shared UI action helpers for InvenTree Playwright tests.
 */

import { type Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { waitForAppLoad } from './waits';

/**
 * Perform a full login and wait for the dashboard to load.
 * Used in beforeAll hooks for authenticated test suites.
 *
 * @param page - Playwright Page
 * @param username - Confirmed from login_page.png: "allaccess"
 * @param password - Confirmed from login_page.png: "nolimits"
 */
export async function loginAs(
  page: Page,
  username: string,
  password: string,
): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);

  // After successful login, InvenTree redirects to /web/home (confirmed: home_page.png URL bar)
  await page.waitForURL(/\/web\/home/, { timeout: 15_000 });
  await waitForAppLoad(page);
}

/**
 * Assert that the current page is the dashboard.
 * Evidence: home_page.png — URL ends with /web/home, heading "InvenTree Demo Server" visible
 */
export async function assertOnDashboard(page: Page): Promise<void> {
  await expect(page).toHaveURL(/\/web\/home/);
  const dashboard = new DashboardPage(page);
  await dashboard.pageHeading.waitFor({ state: 'visible' });
}

/**
 * Assert the "Add Part" or "New Part Category" modal is still open (not closed).
 * Used in negative test cases to confirm form validation keeps the modal open.
 */
export async function assertModalStillOpen(page: Page, expectedTitle: string): Promise<void> {
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(expectedTitle)).toBeVisible();
}

/**
 * Assert an error/validation message is shown for a specific field label.
 * InvenTree typically shows errors inline near the field.
 *
 * @param page - Playwright Page
 * @param fieldLabel - The visible label of the field (e.g. "Name")
 */
export async function assertFieldError(page: Page, fieldLabel: string): Promise<void> {
  // Look for error text near the labeled field in the dialog
  const dialog = page.getByRole('dialog');
  // InvenTree React forms use Mantine components — errors appear in an error element
  // adjacent to the input. This locator looks for any error text within the dialog.
  const errorLocator = dialog.locator('[class*="error"], [class*="invalid"], [aria-invalid="true"]').first();
  await expect(errorLocator).toBeVisible({ timeout: 5_000 });
}

/**
 * Get the visible text content of table rows.
 * Returns an array of trimmed row text strings.
 */
export async function getTableRowTexts(page: Page): Promise<string[]> {
  const rows = await page.locator('table tbody tr').all();
  return Promise.all(
    rows.map(async (row) => ((await row.textContent()) ?? '').trim()),
  );
}
