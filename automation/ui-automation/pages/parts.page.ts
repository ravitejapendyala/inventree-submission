/**
 * parts.page.ts
 * Page Object for the InvenTree Parts section.
 * Covers: Parts List, Part Categories, Add Part modal, New Part Category modal.
 *
 * Evidence sources:
 * - parts_page.png: URL /web/part/category/index/parts
 *   - Left sidebar: "Category Details", "Part Categories", "Parts" (active)
 *   - Table columns: Part, IPN, Revision, Units, Description, Category, Total Stock
 *   - Toolbar: print dropdown, action dropdown, "+ ▼" split dropdown → "Create Part" / "Import from File"
 *   - Top right: Search input (placeholder "Search"), refresh, filter, download icons
 *
 * - parts_category.png: URL /web/part/category/index/subcategories
 *   - "Part Categories" label active in sidebar
 *   - Table columns: Name, Description, Path, Parts
 *   - "+" button in toolbar (no dropdown, single button)
 *   - Pagination "1-8/8"
 *
 * - Add_part.png: Modal ("Add Part")
 *   - Fields: Category (search dropdown), Name* (required), IPN, Description, Revision, Revision Of, Variant Of
 *   - Footer: "Keep form open" toggle, "Cancel" button (outlined), "Submit" button (green/filled)
 *   - X close button top right
 *
 * - Add_part_category.png: Modal ("New Part Category")
 *   - Fields: Parent Category (dropdown), Name* (focused, required), Description,
 *             Default Location (dropdown), Default keywords, Structural toggle, Icon
 *   - Footer: "Keep form open" toggle, "Cancel" button, "Submit" button (green)
 *   - X close button top right
 */

import { type Page, type Locator } from '@playwright/test';
import { waitForTableRows, waitForModalClose } from '../utils/waits';

export class PartsPage {
  readonly page: Page;

  // ─── Left sidebar (parts_page.png) ─────────────────────────────────────────
  readonly sidebarPartCategories: Locator;
  readonly sidebarParts: Locator;

  // ─── Main: Parts list toolbar ───────────────────────────────────────────────
  // The "+" split button dropdown (parts_page.png shows collapsed state with "+" icon + caret)
  readonly addDropdownCaret: Locator;
  readonly createPartMenuItem: Locator;
  readonly importFromFileMenuItem: Locator;

  // Search input on parts list (parts_page.png: "Search" placeholder)
  readonly searchInput: Locator;

  // Parts table (parts_page.png)
  readonly partsTable: Locator;

  // ─── Main: Part Categories toolbar ─────────────────────────────────────────
  // Single "+" button on categories page (parts_category.png)
  readonly addCategoryButton: Locator;

  // ─── Add Part modal (Add_part.png) ─────────────────────────────────────────
  // Scoped to the dialog element
  readonly addPartDialog: Locator;
  readonly addPartNameInput: Locator;
  readonly addPartIpnInput: Locator;
  readonly addPartDescriptionInput: Locator;
  readonly addPartSubmitButton: Locator;
  readonly Partsbreadcrumb: Locator;
  readonly addPartCancelButton: Locator;
  readonly addPartCloseButton: Locator;

  // ─── New Part Category modal (Add_part_category.png) ───────────────────────
  readonly newCategoryDialog: Locator;
  readonly newCategoryNameInput: Locator;
  readonly newCategoryDescriptionInput: Locator;
  readonly newCategorySubmitButton: Locator;
  readonly newCategoryCancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sidebar — text confirmed in parts_page.png
    this.sidebarPartCategories = page.getByRole('link', { name: 'Part Categories' });
    // Codegen: scoped to panel aria-label="panel-tabs-partcategory"
    this.sidebarParts = page.getByLabel('panel-tabs-partcategory').getByRole('link', { name: 'Parts' });
    this.Partsbreadcrumb = page.getByRole('link', { name: 'breadcrumb-0-parts' });

    // Codegen: aria-label="action-menu-add-parts" on the split button
    this.addDropdownCaret = page.getByRole('button', { name: 'action-menu-add-parts' });
    // Codegen: role="menuitem" aria-label="action-menu-add-parts-create-"
    this.createPartMenuItem = page.getByRole('menuitem', { name: 'action-menu-add-parts-create-' });
    this.importFromFileMenuItem = page.getByRole('menuitem', { name: 'action-menu-add-parts-import' });

    // Search — placeholder "Search" confirmed in parts_page.png
    this.searchInput = page.getByPlaceholder('Search');

    // Parts table
    this.partsTable = page.getByRole('table').first();

    // Categories "+" button (parts_category.png — single + icon, no dropdown)
    this.addCategoryButton = page.getByRole('button', { name: 'action-button-add-part-' });

    // ─── Add Part Modal ─────────────────────────────────────────────────────
    // All modal selectors are scoped to the dialog element to avoid conflicts
    this.addPartDialog = page.getByRole('dialog');
    // Codegen: aria-label="text-field-name" — InvenTree/Mantine renders inputs with aria-label=text-field-{fieldName}
    this.addPartNameInput = page.getByRole('dialog').getByRole('textbox', { name: 'text-field-name' });
    // Codegen: aria-label="text-field-IPN"
    this.addPartIpnInput = page.getByRole('dialog').getByRole('textbox', { name: 'text-field-IPN' });
    // Codegen: aria-label="text-field-description"
    this.addPartDescriptionInput = page.getByRole('dialog').getByRole('textbox', { name: 'text-field-description' });
    // Per Add_part.png: "Submit" green button in modal footer
    this.addPartSubmitButton = page.getByRole('dialog').getByRole('button', { name: 'Submit' });
    this.addPartCancelButton = page.getByRole('dialog').getByRole('button', { name: 'Cancel' });
    // X close button in top right of Add Part modal
    this.addPartCloseButton = page.getByRole('dialog').getByRole('button', { name: /close|×|✕/i });

    // ─── New Category Modal ─────────────────────────────────────────────────
    this.newCategoryDialog = page.getByRole('dialog');
    this.newCategoryNameInput = page.getByRole('dialog').getByLabel('Name');
    this.newCategoryDescriptionInput = page.getByRole('dialog').getByLabel('Description');
    this.newCategorySubmitButton = page.getByRole('dialog').getByRole('button', { name: 'Submit' });
    this.newCategoryCancelButton = page.getByRole('dialog').getByRole('button', { name: 'Cancel' });
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  /** Navigate to the Parts list page */
  async gotoPartsList(): Promise<void> {
    await this.page.goto('/web/part/category/index/parts');
    await this.page.waitForLoadState('networkidle');
  }

  /** Navigate to Part Categories page */
  async gotoCategoriesPage(): Promise<void> {
    await this.page.goto('/web/part/category/index/subcategories');
    await this.page.waitForLoadState('networkidle');
  }

  /** Click "Part Categories" in left sidebar */
  async clickSidebarPartCategories(): Promise<void> {
    await this.sidebarPartCategories.click();
    await this.page.waitForURL(/subcategories/);
  }
  /** Click "Part breadcrumbs" */
  async clickPartbreadcrumb(): Promise<void> {
    await this.Partsbreadcrumb.click();
    await this.page.waitForURL(/details/);
  }

  // ─── Parts list interactions ────────────────────────────────────────────────

  /**
   * Open "Add Part" modal by clicking the "+" dropdown caret then "Create Part".
   * Evidence: parts_page.png shows collapsed dropdown with "Create Part" and "Import from File"
   */
  async openAddPartModal(): Promise<void> {
    // Click the "+" split-button dropdown to reveal the menu items
    await this.addDropdownCaret.click();
    await this.createPartMenuItem.waitFor({ state: 'visible' });
    await this.createPartMenuItem.click();
    // Wait for the "Add Part" dialog to appear
    await this.addPartDialog.waitFor({ state: 'visible' });
  }

  /**
   * Search in the parts list.
   * Evidence: parts_page.png shows search input with "Search" placeholder.
   */
  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    // InvenTree's React table filters are debounced — wait for table to update
    await this.page.waitForTimeout(600);
  }

  /** Clear the search field */
  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
    await this.page.waitForTimeout(600);
  }

  /**
   * Get all visible row text in the parts table.
   * Used to assert that search filtering works.
   */
  async getTableRowTexts(): Promise<string[]> {
    const rows = await this.partsTable.locator('tbody tr').all();
    return Promise.all(rows.map((r) => r.textContent().then((t) => t ?? '')));
  }

  // ─── Add Part modal interactions ────────────────────────────────────────────

  /**
   * Create a new part by submitting the Add Part modal with only the Name field.
   * Evidence: Add_part.png — Name* is the only required field (marked with asterisk)
   */
  async createPartWithNameOnly(name: string): Promise<void> {
    await this.openAddPartModal();
    await this.addPartNameInput.fill(name);
    await this.addPartSubmitButton.click();
    await waitForModalClose(this.page);
  }

  /**
   * Attempt to submit the Add Part modal with an empty Name field.
   * Used for validation test (UI-10).
   */
  async submitAddPartWithEmptyName(): Promise<void> {
    await this.openAddPartModal();
    // Leave Name empty
    await this.addPartSubmitButton.click();
    // Do NOT wait for modal close — modal should remain open with validation error
  }

  // ─── Part Categories interactions ──────────────────────────────────────────

  /**
   * Open the "New Part Category" modal.
   * Evidence: parts_category.png — "+" single button in toolbar
   */
  async openNewCategoryModal(): Promise<void> {
    await this.addCategoryButton.click();
    await this.newCategoryDialog.waitFor({ state: 'visible' });
  }

  /**
   * Create a new part category.
   * Evidence: Add_part_category.png — Name* is required, Description is optional
   */
  async createCategory(name: string, description?: string): Promise<void> {
    await this.openNewCategoryModal();
    await this.newCategoryNameInput.fill(name);
    if (description) {
      await this.newCategoryDescriptionInput.fill(description);
    }
    await this.newCategorySubmitButton.click();
    await waitForModalClose(this.page);
  }
}
