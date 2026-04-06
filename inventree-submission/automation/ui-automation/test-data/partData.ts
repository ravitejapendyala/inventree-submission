/**
 * partData.ts
 * Test data for InvenTree UI automation.
 *
 * Evidence sources:
 * - Credentials: login_page.png — username "allaccess", password "nolimits" visible in fields
 * - Base URL: login_page.png URL bar shows "demo.inventree.org/web/login"
 * - Part names prefixed with "__TEST-" to be identifiable for cleanup
 */

export const CREDENTIALS = {
  valid: {
    username: process.env.INVENTREE_USERNAME ?? 'allaccess',
    password: process.env.INVENTREE_PASSWORD ?? 'nolimits',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

/** Part data for UI-09 — create part with name only */
export const TEST_PART = {
  name: `__UI-TEST-PART-${Date.now()}`,
};

/** Full part data for potential future tests */
export const FULL_TEST_PART = {
  name: `__UI-TEST-PART-FULL-${Date.now()}`,
  ipn: `UITEST-${Date.now()}`,
  description: 'Created by Playwright UI test — Phase 3',
};

/** Category data for UI-08 — create part category */
export const TEST_CATEGORY = {
  name: `__UI-TEST-CAT-${Date.now()}`,
  description: 'Created by Playwright UI automation test',
};

/** URL paths confirmed from screenshots */
export const ROUTES = {
  login: '/web/login',
  dashboard: '/web/home',
  partsIndex: '/web/part/category/index/parts',
  categoriesIndex: '/web/part/category/index/subcategories',
} as const;

/** Visible column headers confirmed in parts_page.png */
export const PARTS_TABLE_HEADERS = ['Part', 'IPN', 'Revision', 'Units', 'Description', 'Category', 'Total Stock'];

/** Visible column headers confirmed in parts_category.png */
export const CATEGORIES_TABLE_HEADERS = ['Name', 'Description', 'Path', 'Parts'];
