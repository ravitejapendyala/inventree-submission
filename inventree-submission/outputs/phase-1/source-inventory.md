# Source Inventory — Phase 1
> Generated: 2026-04-06  
> Purpose: Catalogue every file found in `agents/phase-1-requirements-ui-tests/source/` before analysis begins.

---

## 1. Folder Structure

```
agents/phase-1-requirements-ui-tests/source/
├── docs/
│   └── InvenTree_Part_import_file_template.csv
├── notes/
│   └── (empty)
└── screenshots/
    ├── Add_part.png
    ├── Add_part2.png
    ├── Add_part_category.png
    ├── home_page.png
    ├── import_parts.png
    ├── login_page.png
    ├── parts_category.png
    └── parts_page.png
```

---

## 2. Screenshots

| File | Dimensions (px) | Inferred Page / Context | Priority |
|------|----------------|------------------------|----------|
| `login_page.png` | 1917 × 792 | Login / authentication page | High |
| `home_page.png` | 1916 × 843 | Dashboard / home page after login | High |
| `parts_page.png` | 1906 × 999 | Parts module — full parts list view | High |
| `parts_category.png` | 1916 × 931 | Parts module — category-filtered parts view | High |
| `Add_part.png` | 1920 × 1000 | Add Part — full-page creation form (step 1 / main form) | High |
| `Add_part2.png` | 776 × 759 | Add Part — small modal dialog (step 2 or secondary panel) | High |
| `Add_part_category.png` | 1910 × 986 | Add Part Category — category creation form | Medium |
| `import_parts.png` | 1922 × 679 | Import Parts — file import interface | Medium |

**Note:** Screenshots are full browser-window captures at approximately 1920×1000 resolution.  
`Add_part2.png` is the only screenshot with a significantly smaller resolution (776×759), indicating it captures a modal/dialog overlay rather than a full page.

---

## 3. Documentation Files

| File | Location | Format | Description |
|------|----------|--------|-------------|
| `InvenTree_Part_import_file_template.csv` | `docs/` | CSV | Part import template — 50 column headers defining all importable part fields; also contains ~100 rows of real sample data |

### CSV Column Headers (50 fields)

| # | Field Name | Notes |
|---|-----------|-------|
| 1 | Active | Boolean |
| 2 | Assembly | Boolean — part can be assembled from other parts |
| 3 | Barcode Hash | String |
| 4 | Category | Integer (ID) |
| 5 | Category Name | String |
| 6 | Component | Boolean — part can be used as component |
| 7 | Creation Date | Date |
| 8 | Creation user | Integer (user ID) |
| 9 | Default Expiry | Integer (days) |
| 10 | Default Location | Integer (location ID) |
| 11 | Description | String |
| 12 | Full name | String (e.g. "IPN \| Name \| Revision") |
| 13 | Image | String (media path) |
| 14 | IPN | String — Internal Part Number |
| 15 | Is Template | Boolean |
| 16 | Keywords | String |
| 17 | Link | URL |
| 18 | Locked | Boolean |
| 19 | Minimum Stock | Integer |
| 20 | Name | String |
| 21 | ID | Integer |
| 22 | Purchaseable | Boolean |
| 23 | Revision | String |
| 24 | Revision Of | Integer (parent part ID) |
| 25 | Revisions | Integer (count) |
| 26 | Salable | Boolean |
| 27 | Starred | Boolean |
| 28 | Thumbnail | String (media path) |
| 29 | Testable | Boolean |
| 30 | Trackable | Boolean |
| 31 | Units | String |
| 32 | Variant Of | Integer (parent part ID) |
| 33 | Virtual | Boolean |
| 34 | Pricing min | Decimal |
| 35 | Pricing max | Decimal |
| 36 | Pricing updated | DateTime |
| 37 | Responsible | String |
| 38 | Allocated to build orders | Integer |
| 39 | Allocated to sales orders | Integer |
| 40 | Building | Integer |
| 41 | Scheduled to Build | Integer |
| 42 | Category default location | Integer |
| 43 | In Stock | Integer |
| 44 | On Order | Integer |
| 45 | Required for build orders | Integer |
| 46 | Required for sales orders | Integer |
| 47 | Stock Items | Integer |
| 48 | Total Stock | Decimal |
| 49 | External Stock | Integer |
| 50 | Unallocated Stock | Decimal |
| 51 | Variant Stock | Integer |

> **Note:** Header count is 51 (one extra not originally numbered); the template row itself contains 50 delimiters.

### CSV Sample Data — Part Categories Observed

| Category ID | Category Name |
|------------|---------------|
| 1 | Electronics |
| 3 | Fasteners |
| 6 | Capacitors |
| 13 | Connectors |
| 14 | Widgets |
| 15 | Enclosures |
| 17 | Furniture |
| 18 | Tables |
| 19 | Chairs |
| 20 | Paint |
| 29 | Bahan Baku |
| 33 | Cyan |

---

## 4. Notes Folder

The `notes/` directory is **empty**. No additional analyst notes or markdown summaries are present.

---

## 5. Inventory Summary

| Category | Count | Status |
|----------|-------|--------|
| Screenshots | 8 | Present and readable |
| Documentation files | 1 (CSV) | Present and structured |
| Notes / markdown summaries | 0 | Folder empty |
| Total input artefacts | 9 | — |

---

## 6. Observations and Gaps

- **No notes files present.** Analysis must rely entirely on screenshots and the CSV template.
- **Notes folder is empty.** Any analyst annotations are absent.
- **No URL/web-fetched docs** were found in the source folder.
- **8 screenshots cover** login, dashboard, parts list, category view, add-part (2 screenshots), add category, and import — this is a reasonable baseline for the Parts module.
- **CSV provides strong field-level evidence** for what data the Parts module manages, but it does not describe specific UI labels, navigation structure, or button names.
- The `Add_part2.png` small-modal capture (776×759) suggests the add-part workflow involves at least one modal dialog in addition to the main form page.
