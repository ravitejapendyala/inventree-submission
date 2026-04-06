/**
 * waits.ts
 * Explicit wait helpers for InvenTree's React SPA.
 *
 * InvenTree uses a React frontend that renders tables and modals asynchronously.
 * These helpers prevent flaky tests caused by interacting with elements before
 * the relevant async operations complete.
 */

import { type Page } from '@playwright/test';

/**
 * Wait until a dialog/modal is no longer visible.
 * Used after clicking Submit or Cancel in modals like "Add Part" and "New Part Category".
 */
export async function waitForModalClose(page: Page, timeoutMs = 8_000): Promise<void> {
  await page.waitForFunction(
    () => !document.querySelector('[role="dialog"]'),
    { timeout: timeoutMs },
  );
}

/**
 * Wait until the parts table contains at least one visible data row (tbody tr).
 * Use after navigating to the parts list to ensure data has loaded.
 */
export async function waitForTableRows(page: Page, minRows = 1, timeoutMs = 15_000): Promise<void> {
  await page.waitForFunction(
    (min: number) => document.querySelectorAll('table tbody tr').length >= min,
    minRows,
    { timeout: timeoutMs },
  );
}

/**
 * Wait for a specific URL pattern.
 * Wraps page.waitForURL with a sensible default timeout.
 */
export async function waitForUrl(page: Page, pattern: RegExp, timeoutMs = 15_000): Promise<void> {
  await page.waitForURL(pattern, { timeout: timeoutMs });
}

/**
 * Wait for InvenTree's React app to settle after page load.
 * InvenTree renders an initial shell, then populates data asynchronously.
 * Using 'networkidle' helps but is not always sufficient on slow connections.
 */
export async function waitForAppLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  // Extra buffer for React hydration
  await page.waitForTimeout(300);
}
