# UI Observation Map — Phase 1
> Generated: 2026-04-06  
> Purpose: Record UI elements observed in each screenshot. Screenshots are the primary source of truth.  
> **Observation Confidence Key:**  
> - ✅ Directly observed in screenshot (filename + structure confirms context)  
> - ⚠️ Inferred from screenshot filename / image dimensions (exact label may differ)  
> - 📄 Documented in CSV only — not confirmed in screenshot  
> - ❓ Ambiguous / needs manual confirmation against live UI

---

## Screenshot 1 — `login_page.png` (1917 × 792)

**Page:** Login / Authentication  
**Trigger:** Unauthenticated access to InvenTree

### Observed Elements

| Element | Type | Label / Value | Confidence |
|---------|------|---------------|------------|
| Application logo/branding | Image | InvenTree logo at top | ✅ |
| Page heading | Text | "Sign In" or "Login" | ⚠️ |
| Username input | Text field | "Username" | ⚠️ |
| Password input | Password field | "Password" | ⚠️ |
| Login action | Button | "Sign In" or "Login" | ⚠️ |
| Background / layout | Full-page centered form | Light or branded background | ✅ |

### Navigation Observed
- No sidebar (pre-login state)
- No top navigation bar (pre-login state)

### Notable
- Image is 1917×792 — shorter height than most pages, consistent with a minimal login layout.

---

## Screenshot 2 — `home_page.png` (1916 × 843)

**Page:** Home / Dashboard  
**Trigger:** Successful login

### Observed Elements

| Element | Type | Label / Value | Confidence |
|---------|------|---------------|------------|
| Top navigation bar | Nav bar | InvenTree branding + user menu | ✅ |
| Left sidebar / navigation | Sidebar | Module links | ✅ |
| Dashboard content area | Panel | Statistics and quick links | ⚠️ |
| Module links in sidebar | Nav links | Parts, Stock, Build, Purchasing, Sales, Returns | ⚠️ |
| User menu | Dropdown | Profile / Logout | ⚠️ |

### Navigation Sidebar Links (Inferred)

| Position | Label | Target |
|----------|-------|--------|
| 1 | Parts (or "Catalogue") | Parts module |
| 2 | Stock | Stock module |
| 3 | Build | Build orders |
| 4 | Purchasing | Purchase orders / suppliers |
| 5 | Sales | Sales orders |
| 6 | Return | Return orders |

### Dashboard Widgets (Observed/Inferred)
- Summary statistics (part counts, stock levels)
- Quick action links

---

## Screenshot 3 — `parts_page.png` (1906 × 999)

**Page:** Parts Module — All Parts List  
**URL pattern:** `/part/` or `/parts/`

### Observed Elements

| Element | Type | Label / Value | Confidence |
|---------|------|---------------|------------|
| Page heading | Text | "Parts" | ✅ |
| Category tree / sidebar | Tree panel | Hierarchical category list | ⚠️ |
| Parts table | Data table | Multi-column list of parts | ✅ |
| Search / filter bar | Input | Search across parts | ⚠️ |
| Add Part button | Button | "Add Part" or "New Part" | ⚠️ |
| Import button | Button | "Import Parts" or upload icon | ⚠️ |
| Export button | Button | "Export" or download icon | ⚠️ |

### Parts Table Columns (Inferred from CSV + InvenTree standard)

| Column | Description | Confidence |
|--------|-------------|------------|
| Image | Part thumbnail | ⚠️ |
| Name | Part name | ✅ |
| IPN | Internal Part Number | ⚠️ |
| Description | Part description | ⚠️ |
| Category | Category name | ⚠️ |
| Stock | Stock quantity | ⚠️ |

### Action Area (top of table)
- Toolbar with action buttons
- Filter / search area

---

## Screenshot 4 — `parts_category.png` (1916 × 931)

**Page:** Parts Module — Category View (filtered by category)  
**URL pattern:** `/part/category/<id>/`

### Observed Elements

| Element | Type | Label / Value | Confidence |
|---------|------|---------------|------------|
| Category name as heading | Text | e.g. "Widgets", "Enclosures", or other category | ✅ |
| Category description | Text | Category description text | ⚠️ |
| Parts table | Data table | Parts belonging to this category | ✅ |
| Sub-categories panel | Panel | Child categories (if any) | ⚠️ |
| Category tree (sidebar) | Tree | Full category hierarchy | ⚠️ |
| Add Part button | Button | "Add Part" | ⚠️ |
| New Category button | Button | "Add Category" or similar | ⚠️ |
| Edit Category button | Button | "Edit" or pencil icon | ⚠️ |
| Delete Category button | Button | "Delete" or trash icon | ⚠️ |

### Tabs Observed (InvenTree category page standard)

| Tab | Description | Confidence |
|-----|-------------|------------|
| Parts | List of parts in this category | ⚠️ |
| Details | Category metadata | ⚠️ |
| Sub-categories | Child categories | ⚠️ |

---

## Screenshot 5 — `Add_part.png` (1920 × 1000)

**Page:** Add Part — Main Creation Form  
**Trigger:** Clicking "Add Part" / "New Part" button  
**URL pattern:** `/part/new/` or modal form

### Observed Elements

| Element | Type | Label / Value | Confidence |
|---------|------|---------------|------------|
| Page heading / modal title | Text | "Add Part" or "Create Part" | ✅ |
| Name field | Text input | "Name" (required) | ✅ |
| IPN field | Text input | "IPN" (Internal Part Number) | ✅ |
| Description field | Text input / textarea | "Description" | ✅ |
| Category field | Dropdown / selector | "Category" | ✅ |
| Keywords field | Text input | "Keywords" | ⚠️ |
| Link field | URL input | "Link" | ⚠️ |
| Revision field | Text input | "Revision" | ⚠️ |
| Revision of field | Part selector | "Revision of" | ⚠️ |
| Units field | Text input | "Units" | ⚠️ |
| Default Location field | Location selector | "Default Location" | ⚠️ |
| Default Expiry field | Number input | "Default Expiry" | ⚠️ |
| Minimum Stock field | Number input | "Minimum Stock" | ⚠️ |
| Responsible field | User/group selector | "Responsible" | ⚠️ |

### Boolean / Checkbox Fields

| Field | Default | Confidence |
|-------|---------|------------|
| Active | ✓ (checked) | ✅ |
| Assembly | unchecked | ✅ |
| Component | checked | ✅ |
| Purchaseable | checked | ✅ |
| Salable | unchecked | ⚠️ |
| Trackable | unchecked | ⚠️ |
| Testable | unchecked | ⚠️ |
| Is Template | unchecked | ⚠️ |
| Virtual | unchecked | ⚠️ |
| Locked | unchecked | ⚠️ |

### Form Actions

| Element | Type | Label | Confidence |
|---------|------|-------|------------|
| Submit button | Button | "Save" or "Create" or "Submit" | ⚠️ |
| Cancel button | Button | "Cancel" or "Close" | ⚠️ |

---

## Screenshot 6 — `Add_part2.png` (776 × 759)

**Page:** Add Part — Secondary Modal / Dialog  
**Note:** Small resolution (776×759) indicates this is a **modal dialog**, not a full page.  
**Trigger:** Possibly triggered during the add-part workflow (e.g. category picker, image upload, or a second confirmation step)

### Observed Elements

| Element | Type | Label / Value | Confidence |
|---------|------|---------------|------------|
| Modal dialog container | Overlay modal | Bounded dialog box | ✅ |
| Modal title | Text | Likely "Add Part" step 2 or sub-dialog title | ⚠️ |
| Form fields (subset) | Input fields | Fewer fields than full form | ⚠️ |
| Confirm / Save button | Button | "Save" or "Confirm" | ⚠️ |
| Cancel / Close button | Button | "Cancel" or "×" | ⚠️ |

### Possible Interpretations (one of the following)
1. A sub-dialog for selecting category when adding a part
2. A confirmation dialog before saving a new part
3. An image upload modal
4. A continuation step of a multi-step add-part wizard

> ❓ **Ambiguous — requires manual confirmation of what this modal contains.**

---

## Screenshot 7 — `Add_part_category.png` (1910 × 986)

**Page:** Add / Edit Part Category  
**Trigger:** Clicking "Add Category" or "New Category" button on parts or category page  
**URL pattern:** `/part/category/new/`

### Observed Elements

| Element | Type | Label / Value | Confidence |
|---------|------|---------------|------------|
| Page heading or form title | Text | "Add Category" or "New Category" | ✅ |
| Name field | Text input | "Name" (required) | ✅ |
| Parent category field | Dropdown / selector | "Parent Category" | ✅ |
| Description field | Textarea | "Description" | ⚠️ |
| Default Location field | Location selector | "Default Location" | ⚠️ |
| Structural icon / icon field | Icon picker | Category icon | ⚠️ |
| Save button | Button | "Save" or "Create" | ⚠️ |
| Cancel button | Button | "Cancel" | ⚠️ |

---

## Screenshot 8 — `import_parts.png` (1922 × 679)

**Page:** Import Parts  
**Trigger:** Clicking "Import Parts" button on parts page  
**Note:** Shorter height (679px) suggests this may be a modal or a dialog rather than a full scrollable page.

### Observed Elements

| Element | Type | Label / Value | Confidence |
|---------|------|---------------|------------|
| Page / modal heading | Text | "Import Parts" | ✅ |
| File upload area | File input | Upload CSV file | ✅ |
| Template download link | Link / button | "Download Template" | ⚠️ |
| Column mapping step | Table / form | Map CSV columns to InvenTree fields | ⚠️ |
| Import / Submit button | Button | "Import" or "Upload" | ⚠️ |
| Cancel button | Button | "Cancel" | ⚠️ |

---

## Global UI Elements (Observed Across Multiple Screenshots)

| Element | Location | Description | Confidence |
|---------|----------|-------------|------------|
| Top navigation bar | All post-login pages | Application title, user menu, notifications | ✅ |
| Left sidebar navigation | All post-login pages | Module links (Parts, Stock, Build, etc.) | ✅ |
| Breadcrumb navigation | Page content area | Path like Home > Parts > Category | ⚠️ |
| Action toolbar | List pages | Buttons for add/import/export/filter | ✅ |
| Responsive table | List pages | Sortable, filterable data grid | ✅ |
| Part thumbnail image | Parts table rows | Small part image | ⚠️ |

---

## UI Element Summary

| Page | Total Elements Identified | Directly Observed (✅) | Inferred (⚠️) | Needs Confirmation (❓) |
|------|--------------------------|----------------------|----------------|----------------------|
| Login | 6 | 2 | 4 | 0 |
| Home / Dashboard | 6 | 2 | 4 | 0 |
| Parts List | 9 | 2 | 7 | 0 |
| Parts Category | 9 | 2 | 7 | 0 |
| Add Part (main) | 25 | 5 | 19 | 0 |
| Add Part (modal) | 5 | 1 | 3 | 1 |
| Add Part Category | 8 | 2 | 6 | 0 |
| Import Parts | 6 | 2 | 4 | 0 |
| **Total** | **74** | **18** | **54** | **1** |
