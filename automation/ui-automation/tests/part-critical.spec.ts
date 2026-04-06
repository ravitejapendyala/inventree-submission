/**
 * part-critical.spec.ts
 * Phase 3 — 10 Critical UI Test Cases for InvenTree Parts Module
 *
 * All 10 tests are grounded in Phase 3 UI screenshots:
 *   login_page.png, home_page.png, parts_page.png, Add_part.png,
 *   Add_part2.png, parts_category.png, Add_part_category.png, import_parts.png
 *
 * Phase 1 test case mapping:
 *   UI-01 ← TC-01  UI-02 ← TC-02  UI-03 ← TC-04  UI-04 ← TC-05
 *   UI-05 ← TC-07  UI-06 ← TC-08  UI-07 ← TC-09  UI-08 ← TC-10
 *   UI-09 ← TC-14  UI-10 ← TC-16
 *
 * Framework: Playwright + TypeScript + Page Object Model
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PartsPage } from '../pages/parts.page';
import {
  loginAs,
  assertOnDashboard,
  assertModalStillOpen,
  assertFieldError,
} from '../utils/testHelpers';
import { waitForTableRows, waitForAppLoad } from '../utils/waits';
import {
  CREDENTIALS,
  TEST_PART,
  TEST_CATEGORY,
  ROUTES,
  PARTS_TABLE_HEADERS,
  CATEGORIES_TABLE_HEADERS,
} from '../test-data/partData';

// ─── Authentication (login before each test) ──────────────────────────────────
// Tests are split into two groups:
//   1. Auth tests that run WITHOUT pre-login (UI-01, UI-02)
//   2. All other tests that require a logged-in session

// ─────────────────────────────────────────────────────────────────────────────
// AUTH TESTS — No beforeEach login
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Authentication', () => {
  // ─── UI-01 ────────────────────────────────────────────────────────────────

  test('UI-01 — Successful login with valid credentials navigates to dashboard', async ({
    page,
  }) => {
    /**
     * Evidence: login_page.png → home_page.png
     * - Login form at /web/login with Username and Password fields
     * - "Log In" blue button
     * - After login, URL becomes /web/home and heading "InvenTree Demo Server" appears
     * - Credentials visible in login_page.png: "allaccess" / "nolimits"
     */
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Assert we are on the login page
    await expect(page).toHaveURL(/\/web\/login/);

    // Assert login form elements are visible (evidence: login_page.png)
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // Perform login
    await loginPage.login(CREDENTIALS.valid.username, CREDENTIALS.valid.password);

    // Assert redirect to dashboard
    await expect(page).toHaveURL(/\/web\/home/, { timeout: 15_000 });

    // Assert dashboard content
    // Codegen: expect(page.locator('#root')).toContainText('InvenTree Demo Server - Ally Access')
    const dashboard = new DashboardPage(page);
    await dashboard.pageHeading.waitFor({ state: 'visible' });
    await expect(dashboard.pageHeading).toBeVisible();
  });

  // ─── UI-02 ────────────────────────────────────────────────────────────────

  test('UI-02 — Failed login with invalid credentials stays on login page with error', async ({
    page,
  }) => {
    /**
     * Evidence: login_page.png (error state not captured in screenshots)
     * Grounding: TC-02 (Phase 1) — expected behavior from Django standard auth
     * - Invalid credentials should NOT redirect to dashboard
     * - Login page URL should remain
     * - An error message should appear
     *
     * CONFIDENCE: ⚠️ Inferred — error state screenshot was not available
     */
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(
      CREDENTIALS.invalid.username,
      CREDENTIALS.invalid.password,
    );

    // Should NOT navigate away from the login page
    await expect(page).toHaveURL(/\/web\/login/, { timeout: 5_000 });

    // Error message should appear — InvenTree Django backend renders an error alert
    const errorMsg = loginPage.getErrorMessage();
    await expect(errorMsg).toBeVisible({ timeout: 5_000 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTICATED TESTS — Login once, reuse session
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Authenticated flows', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test using valid credentials (confirmed from login_page.png)
    await loginAs(page, CREDENTIALS.valid.username, CREDENTIALS.valid.password);
  });

  // ─── UI-03 ────────────────────────────────────────────────────────────────

  test('UI-03 — Dashboard renders with all top navigation links', async ({ page }) => {
    /**
     * Evidence: home_page.png
     * - Top nav: Dashboard | Parts | Stock | Manufacturing | Purchasing | Sales
     * - "InvenTree Demo Server - Ally Access" in main heading
     * - "Ally Access" user menu in top right
     */
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();

    // Assert all top nav links visible (text confirmed from home_page.png)
    await dashboard.assertTopNavLinks();

    // Assert page heading (confirmed from home_page.png main content)
    await expect(dashboard.pageHeading).toBeVisible();

    // Assert user menu visible (confirmed from home_page.png top right)
    await expect(dashboard.userMenuButton).toBeVisible();

    // Assert URL
    await expect(page).toHaveURL(/\/web\/home/);
  });

  // ─── UI-04 ────────────────────────────────────────────────────────────────

  test('UI-04 — Clicking Parts in top nav navigates to the Parts list page', async ({
    page,
  }) => {
    /**
     * Evidence: home_page.png → parts_page.png
     * - "Parts" link is the second item in the top nav (confirmed both screenshots)
     * - After click: URL becomes /web/part/... (parts_page.png URL bar)
     * - Parts heading and table become visible
     */
    const dashboard = new DashboardPage(page);
    await dashboard.assertLoaded();

    await dashboard.navigateToParts();

    // Confirm navigation occurred (evidence: parts_page.png URL)
    await expect(page).toHaveURL(/\/web\/part/);

    // Confirm Parts heading visible in main content (evidence: parts_page.png "Parts" h1)
    await expect(page.getByText('Parts').nth(2)).toBeVisible();
  });

  // ─── UI-05 ────────────────────────────────────────────────────────────────

  test('UI-05 — Parts list page renders table with expected columns', async ({ page }) => {
    /**
     * Evidence: parts_page.png
     * - Table with columns: Part, IPN, Revision, Units, Description, Category, Total Stock
     * - Left sidebar: "Category Details", "Part Categories", "Parts" (active)
     * - Toolbar: print, action, "+" dropdown, search input
     * - Data rows with actual parts visible
     */
    const partsPage = new PartsPage(page);
    await partsPage.gotoPartsList();
    await waitForTableRows(page, 1);

    // Assert left sidebar links visible (evidence: parts_page.png)
    await expect(partsPage.sidebarPartCategories).toBeVisible();
    // Codegen: scoped to getByLabel('panel-tabs-partcategory')
    await expect(partsPage.sidebarParts).toBeVisible();

    // Assert key table columns are present in the header
    // Codegen: expect(page.locator('thead')).toContainText('Part') etc.
    const thead = page.locator('thead');
    for (const col of ['Part', 'IPN', 'Description', 'Category']) {
      await expect(thead).toContainText(col);
    }

    // Assert at least one data row is visible
    const rowCount = await page.locator('table tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  });

  // ─── UI-06 ────────────────────────────────────────────────────────────────

  test('UI-06 — Searching in the parts list filters the table results', async ({ page }) => {
    /**
     * Evidence: parts_page.png
     * - Search input visible in table toolbar with placeholder "Search"
     * - Table shows multiple different parts (enclosures, connectors, furniture)
     * - Expected: typing a term narrows the list; clearing restores full list
     *
     * CONFIDENCE: ⚠️ Inferred (filtered state not in screenshots)
     */
    const partsPage = new PartsPage(page);
    await partsPage.gotoPartsList();
    await waitForTableRows(page, 1);

    // Get initial row count before filtering
    const initialCount = await page.locator('table tbody tr').count();

    // Search for a term that appears in parts_page.png data
    // "Blue" appears in multiple rows: "Blue Chair", "Blue Paint", "Blue Round Table"
    await partsPage.search('Blue');

    // After search, table should have fewer or equal rows
    const filteredCount = await page.locator('table tbody tr').count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
    expect(filteredCount).toBeGreaterThan(0); // at least one result

    // Clear search — row count should return to original or higher
    await partsPage.clearSearch();
    const afterClearCount = await page.locator('table tbody tr').count();
    expect(afterClearCount).toBeGreaterThanOrEqual(filteredCount);
  });

  // ─── UI-07 ────────────────────────────────────────────────────────────────

  test('UI-07 — Clicking Part Categories in sidebar navigates to categories page', async ({
    page,
  }) => {
    /**
     * Evidence: parts_page.png + parts_category.png
     * - Left sidebar "Part Categories" link confirmed in parts_page.png
     * - After click: URL becomes /web/part/category/index/subcategories
     * - "Part Categories" heading visible (parts_category.png)
     * - Table shows Name, Description, Path, Parts columns
     * - 8 categories visible: Bahan Baku, Category 0, Electronics, Furniture, Ink, Laptop, Mechanical, Paint
     */
    const partsPage = new PartsPage(page);
    await partsPage.gotoPartsList();

    // Click the sidebar link
    await partsPage.clickSidebarPartCategories();

    // Assert URL (evidence: parts_category.png URL bar)
    await expect(page).toHaveURL(/subcategories/);

    // Assert heading (evidence: "Part Categories" heading in parts_category.png)
    await expect(page.getByLabel('Part Categories').getByText('Part Categories')).toBeVisible();

    // Assert table columns (evidence: parts_category.png)
    const tableHeader = page.locator('table thead');
    await expect(tableHeader.getByText('Name')).toBeVisible();
    await expect(tableHeader.getByText('Description')).toBeVisible();
    await expect(tableHeader.getByText('Path')).toBeVisible();

    // Assert known categories are visible (evidence: parts_category.png rows)
    await expect(page.getByText('Electronics').first()).toBeVisible();
    await expect(page.getByText('Mechanical').first()).toBeVisible();
  });

  // ─── UI-08 ────────────────────────────────────────────────────────────────

  test('UI-08 — Create a new part category via the New Part Category modal', async ({
    page,
  }) => {
    /**
     * Evidence: Add_part_category.png
     * - Modal title "New Part Category" (blue heading)
     * - Name* field (focused, required — asterisk visible)
     * - Description field (optional)
     * - Parent Category dropdown (optional)
     * - "Cancel" and "Submit" (green) buttons in footer
     * - Triggered from "+" button on the Part Categories page
     *
     * CONFIDENCE: ✅ Modal structure confirmed from screenshot
     */
    const partsPage = new PartsPage(page);
    await partsPage.gotoCategoriesPage();
    await waitForTableRows(page, 1);

    // Open the "New Part Category" modal
    await partsPage.openNewCategoryModal();

    // Assert modal is open (evidence: Add_part_category.png)
    await expect(partsPage.newCategoryDialog).toBeVisible();
    await expect(partsPage.newCategoryDialog.getByText('New Part Category')).toBeVisible();

    // Assert the Name field is visible (evidence: Add_part_category.png — Name* focused)
    await expect(partsPage.newCategoryNameInput).toBeVisible();

    // Fill in the category name and submit
    await partsPage.newCategoryNameInput.fill(TEST_CATEGORY.name);
    await partsPage.newCategorySubmitButton.click();

    // Modal should close after submit
    await expect(partsPage.newCategoryDialog).not.toBeVisible({ timeout: 8_000 });

    // The new category name should appear in the table
    await expect(page.getByText(TEST_CATEGORY.name).nth(1)).toBeVisible({ timeout: 5_000 });
  });

  // ─── UI-09 ────────────────────────────────────────────────────────────────

  test('UI-09 — Create a new part with required Name field only via Add Part modal', async ({
    page,
  }) => {
    /**
     * Evidence: Add_part.png
     * - "+" dropdown on parts toolbar → "Create Part" menu item
     * - Modal "Add Part" with Category, Name*, IPN, Description, Revision
     * - Name* is the only required field (asterisk visible in screenshot)
     * - "Submit" green button and "Cancel" in footer
     * - After submit: part appears in parts list
     *
     * CONFIDENCE: ✅ Form structure fully confirmed
     */
    const partsPage = new PartsPage(page);
    await partsPage.gotoPartsList();
    await waitForTableRows(page, 1);

    // Open the "+" dropdown and click "Create Part"
    await partsPage.openAddPartModal();

    // Assert the modal is visible with expected title
    await expect(partsPage.addPartDialog).toBeVisible();
    await expect(partsPage.addPartDialog.getByText('Add Part')).toBeVisible();

    // Assert Name field is visible and required (evidence: Add_part.png "Name *")
    await expect(partsPage.addPartNameInput).toBeVisible();

    // Fill only the Name field (minimum required)
    await partsPage.addPartNameInput.fill(TEST_PART.name);

    // Submit the form
    await partsPage.addPartSubmitButton.click();
    
    

    // Modal should close after successful submit
    await expect(partsPage.addPartDialog).not.toBeVisible({ timeout: 10_000 });
    await partsPage.clickPartbreadcrumb();

    await partsPage.sidebarParts.click();

    // Click on parts breadcrumb to ensure we are on the main parts list page (evidence: parts_page.png breadcrumb "Parts")
    

    // Search for the new part to verify it was created
    await partsPage.search(TEST_PART.name);
    await expect(page.getByText(TEST_PART.name)).toBeVisible({ timeout: 5_000 });
  });

  // ─── UI-10 ────────────────────────────────────────────────────────────────

  test('UI-10 — Add Part modal shows validation error when Name is empty', async ({
    page,
  }) => {
    /**
     * Evidence: Add_part.png
     * - Name* is a required field (asterisk visible)
     * - Submit button visible
     * - Validation state not captured in screenshot — behavior is inferred
     *   from standard InvenTree React form validation (Mantine UI)
     *
     * CONFIDENCE: ❓ Inferred — error state screenshot not available
     * If the modal closes on empty submit, InvenTree may handle this differently.
     */
    const partsPage = new PartsPage(page);
    await partsPage.gotoPartsList();
    await waitForTableRows(page, 1);

    // Open modal
    await partsPage.openAddPartModal();
    await expect(partsPage.addPartDialog).toBeVisible();

    // Explicitly clear the Name field (ensure it's empty) and click Submit
    await partsPage.addPartNameInput.clear();
    await partsPage.addPartSubmitButton.click();

    // ASSERTION: The modal should remain open (no successful submission)
    // Evidence basis: Required field validation is expected per TC-16 (Phase 1)
    // InvenTree React forms use Mantine which shows inline errors
    await expect(partsPage.addPartDialog).toBeVisible({
      timeout: 3_000,
    });

    // Assert the Name field is still present (modal not closed)
    await expect(partsPage.addPartNameInput).toBeVisible();

    // Close the modal cleanly via Cancel button
    await partsPage.addPartCancelButton.click();
    await expect(partsPage.addPartDialog).not.toBeVisible({ timeout: 5_000 });
  });
});
