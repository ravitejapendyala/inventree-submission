# Selector Reference — InvenTree UI Automation

This document records the rationale for every selector used in the Page Objects,
grounded in the Phase 3 screenshot evidence.

---

## Login Page (`/web/login`)
**Evidence:** `login_page.png` + Playwright codegen

| Element | Selector | Source |
|---------|----------|--------|
| Username field | `page.getByRole('textbox', { name: 'login-username' })` | **Codegen** — InvenTree sets `aria-label="login-username"` on the Mantine input |
| Password field | `page.getByRole('textbox', { name: 'login-password' })` | **Codegen** — InvenTree sets `aria-label="login-password"` |
| Login button | `page.getByRole('button', { name: 'Log In' })` | Screenshot + Codegen confirmed |
| Error message | `locator('[class*="error"], [class*="alert"], .errorlist').first()` | Inferred — error state not captured in screenshots |
| Send email link | `page.getByText('Send me an email')` | Screenshot confirmed |

**URL pattern:** `/web/login`

---

## Dashboard (`/web/home`)
**Evidence:** `home_page.png` + Playwright codegen

| Element | Selector | Source |
|---------|----------|--------|
| Dashboard nav link | `page.getByRole('link', { name: 'Dashboard' })` | Screenshot confirmed |
| Parts nav link | `page.getByRole('link', { name: 'Parts' }).first()` | Screenshot confirmed |
| Stock nav link | `page.getByRole('link', { name: 'Stock' })` | Screenshot confirmed |
| Manufacturing nav link | `page.getByRole('link', { name: 'Manufacturing' })` | Screenshot confirmed |
| Purchasing nav link | `page.getByRole('link', { name: 'Purchasing' })` | Screenshot confirmed |
| Sales nav link | `page.getByRole('link', { name: 'Sales' })` | Screenshot confirmed |
| User menu | `page.getByText('Ally Access')` | Screenshot confirmed |
| Page heading | `page.getByText('InvenTree Demo Server - Ally Access')` | **Codegen**: `expect(page.locator('#root')).toContainText('InvenTree Demo Server - Ally Access')` |

**URL pattern:** `/web/home`

---

## Parts List (`/web/part/category/index/parts`)
**Evidence:** `parts_page.png` + Playwright codegen

| Element | Selector | Source |
|---------|----------|--------|
| Left sidebar "Part Categories" | `page.getByRole('link', { name: 'Part Categories' })` | Screenshot confirmed |
| Left sidebar "Parts" | `page.getByLabel('panel-tabs-partcategory').getByRole('link', { name: 'Parts' })` | **Codegen** — sidebar panel has `aria-label="panel-tabs-partcategory"` |
| Add parts menu button | `page.getByRole('button', { name: 'action-menu-add-parts' })` | **Codegen** — button has `aria-label="action-menu-add-parts"` |
| "Create Part" menu item | `page.getByRole('menuitem', { name: 'action-menu-add-parts-create-' })` | **Codegen** — menuitem `aria-label="action-menu-add-parts-create-"` |
| "Import from File" item | `page.getByRole('menuitem', { name: 'action-menu-add-parts-import' })` | **Codegen** pattern (inferred suffix) |
| Search input | `page.getByPlaceholder('Search')` | Screenshot confirmed |
| Parts table | `page.getByRole('table').first()` | Screenshot confirmed |
| Table header assertions | `expect(page.locator('thead')).toContainText('Part')` | **Codegen** — uses `page.locator('thead')` directly |

**Table columns confirmed:** Part, IPN, Revision, Units, Description, Category, Total Stock

**URL pattern:** `/web/part/category/index/parts`

---

## Part Categories (`/web/part/category/index/subcategories`)
**Evidence:** `parts_category.png`

| Element | Selector | Evidence |
|---------|----------|----------|
| "+" button (add category) | `page.locator('button').filter({ hasText: /^\+$/ })` | Single "+" button in toolbar (no dropdown on this page) |
| Search input | `page.getByPlaceholder('Search')` | Search input in top right of table |
| Categories table | `page.getByRole('table').first()` | Table visible with categories |

**Table columns confirmed:** Name, Description, Path, Parts  
**Pagination text confirmed:** "1-8/8", "Records per page: 25"

**URL pattern:** `/web/part/category/index/subcategories`

---

## Add Part Modal
**Evidence:** `Add_part.png`, `Add_part2.png`

| Element | Selector | Evidence |
|---------|----------|----------|
| Dialog container | `page.getByRole('dialog')` | Modal overlay with role=dialog |
| Modal title | `dialog.getByText('Add Part')` | "Add Part" heading confirmed in blue |
| Category dropdown | `dialog.getByLabel('Category')` | Label "Category" with "Part category" hint |
| Name field | `dialog.getByRole('textbox', { name: 'text-field-name' })` | **Codegen** — InvenTree Mantine inputs use `aria-label="text-field-{fieldName}"` |
| IPN field | `dialog.getByRole('textbox', { name: 'text-field-IPN' })` | **Codegen** confirmed |
| Description field | `dialog.getByRole('textbox', { name: 'text-field-description' })` | **Codegen** confirmed |
| Revision field | `dialog.getByRole('textbox', { name: 'text-field-revision' })` | **Codegen** confirmed |
| Units field | `dialog.getByRole('textbox', { name: 'text-field-units' })` | **Codegen** confirmed |
| Initial Stock Qty | `dialog.getByRole('textbox', { name: 'number-field-initial_stock.' })` | **Codegen** — number inputs use `aria-label="number-field-{fieldName}."` |
| Submit button | `dialog.getByRole('button', { name: 'Submit' })` | Screenshot + Codegen confirmed |
| Cancel button | `dialog.getByRole('button', { name: 'Cancel' })` | Screenshot + Codegen confirmed |
| Close (X) button | `dialog.getByRole('button', { name: /close/i })` | Screenshot confirmed |

> **InvenTree Mantine aria-label pattern (from codegen):**
> - Text inputs: `aria-label="text-field-{camelCaseName}"` e.g. `text-field-name`, `text-field-IPN`
> - Number inputs: `aria-label="number-field-{camelCaseName}."` (with trailing dot) e.g. `number-field-initial_stock.`
> - Avoid `getByLabel('Name')` — InvenTree does NOT set `htmlFor` on visible labels; use `getByRole('textbox', { name: ... })` instead

**From Add_part2.png (scrolled):**
- Trackable toggle (off in screenshot)
- Purchaseable toggle (on — blue)
- Salable toggle (off)
- Virtual toggle (off)
- Locked toggle (off)
- Active toggle (on — blue)
- Copy Category Parameters toggle (on — blue)
- Initial Stock Quantity spinner (value: 0)
- Initial Stock Location dropdown

---

## New Part Category Modal
**Evidence:** `Add_part_category.png`

| Element | Selector | Evidence |
|---------|----------|----------|
| Dialog container | `page.getByRole('dialog')` | Modal overlay |
| Modal title | `dialog.getByText('New Part Category')` | "New Part Category" heading confirmed in blue |
| Parent Category dropdown | `dialog.getByLabel('Parent Category')` | Label "Parent Category" |
| Name field | `dialog.getByLabel('Name')` | "Name *" — focused/blue border in screenshot |
| Description field | `dialog.getByLabel('Description')` | Label "Description" with "(optional)" hint |
| Default Location dropdown | `dialog.getByLabel('Default Location')` | Search dropdown |
| Default keywords field | `dialog.getByLabel('Default keywords')` | Label "Default keywords" |
| Structural toggle | `dialog.getByLabel('Structural')` | Toggle with "Structural" label |
| Icon field | `dialog.getByLabel('Icon')` | "No icon selected" placeholder |
| Submit button | `dialog.getByRole('button', { name: 'Submit' })` | Green "Submit" button |
| Cancel button | `dialog.getByRole('button', { name: 'Cancel' })` | "Cancel" button |

---

## Import Parts Modal
**Evidence:** `import_parts.png`

| Element | Selector | Evidence |
|---------|----------|----------|
| Dialog | `page.getByRole('dialog')` | Modal overlay |
| Title | `dialog.getByText('Import Parts')` | "Import Parts" confirmed |
| Data File input | `dialog.locator('input[type="file"]')` or `dialog.getByLabel('Data File')` | "Data File *" required field |
| Submit | `dialog.getByRole('button', { name: 'Submit' })` | Green Submit button |
| Cancel | `dialog.getByRole('button', { name: 'Cancel' })` | Cancel button |

**Note:** Import flow is NOT automated (2-step wizard, mapping step not captured).

---

## Risk Notes

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| `getByLabel` may not match if InvenTree uses aria-labelledby instead of htmlFor | Medium | Fall back to `locator('input').near(getByText('Name'))` |
| "+" button selector may match multiple elements | Medium | Scope to specific toolbar context or use `.nth(index)` |
| Modal title selector may use a heading element not a plain text node | Low | Add `.getByRole('heading', { name: 'Add Part' })` as fallback |
| Search debounce time varies by InvenTree version | Medium | `waitForTimeout(600)` may need to increase |
| Demo server may be slow or data may differ | High | Use `networkidle` + extra 300ms buffer in `waitForAppLoad` |
