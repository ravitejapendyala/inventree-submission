# Requirements Summary — Phase 1: InvenTree Parts Module
> Generated: 2026-04-06  
> Sources: Screenshots (primary), CSV import template (supporting documentation)  
> Scope: Parts module of InvenTree  

---

## Overview

InvenTree is an open-source inventory management system. The Parts module is the core catalogue of all components, materials, assemblies, and virtual items tracked in the system. This requirements summary is derived from 8 screenshots of the live application and a 51-column CSV export template.

---

## REQ-01 — Authentication

| Attribute | Value |
|-----------|-------|
| Source | `login_page.png` (Observed in UI) |
| Priority | High |
| Status | Observed in UI |

**Description:**  
The system must present an authentication form before granting access to any module.

**Requirements:**
- R01.1 — The login page must display an application logo or branding.
- R01.2 — The login page must include a username input field.
- R01.3 — The login page must include a password input field.
- R01.4 — The login page must include a submit button to authenticate.
- R01.5 — Unauthenticated users must not be able to access the Parts module.
- R01.6 — Successful login must redirect the user to the home/dashboard page.

---

## REQ-02 — Dashboard / Home Page

| Attribute | Value |
|-----------|-------|
| Source | `home_page.png` (Observed in UI) |
| Priority | Medium |
| Status | Observed in UI |

**Description:**  
After login, a dashboard is displayed providing navigation to all modules.

**Requirements:**
- R02.1 — The dashboard must display a left-side navigation sidebar.
- R02.2 — The navigation sidebar must include a link to the Parts module.
- R02.3 — The dashboard must display a top navigation bar with user controls.
- R02.4 — The user must be able to log out from the dashboard.

---

## REQ-03 — Parts Module Navigation

| Attribute | Value |
|-----------|-------|
| Source | `parts_page.png`, `parts_category.png` (Observed in UI) |
| Priority | High |
| Status | Observed in UI |

**Description:**  
The Parts module must be accessible from the main navigation and must support hierarchical category browsing.

**Requirements:**
- R03.1 — The Parts page must display a list of all parts in the system.
- R03.2 — Parts must be organisable into categories.
- R03.3 — Categories must be navigable from the Parts page (e.g. sidebar tree or category list).
- R03.4 — Navigating to a category must filter the parts list to show only parts in that category.
- R03.5 — The category name must be displayed as the page heading when viewing a specific category.

---

## REQ-04 — Parts List View

| Attribute | Value |
|-----------|-------|
| Source | `parts_page.png` (Observed in UI) |
| Priority | High |
| Status | Observed in UI |

**Description:**  
The parts list must present a tabular view of parts with key attributes visible at a glance.

**Requirements:**
- R04.1 — The parts table must display a part Name column.
- R04.2 — The parts table must display a part Description column.
- R04.3 — The parts table should display a part Category column.
- R04.4 — The parts table should display a Stock quantity column.
- R04.5 — The parts table should display an IPN (Internal Part Number) column.
- R04.6 — The parts table should display a part thumbnail/image column.
- R04.7 — The parts list must support searching and/or filtering.
- R04.8 — The parts list must include an action to add a new part.
- R04.9 — The parts list must include an action to import parts from a file.
- R04.10 — The parts list should include an action to export parts data.

---

## REQ-05 — Part Category Management

| Attribute | Value |
|-----------|-------|
| Source | `parts_category.png`, `Add_part_category.png` (Observed in UI) |
| Priority | Medium |
| Status | Observed in UI |

**Description:**  
Users must be able to create, view, and manage part categories.

**Requirements:**
- R05.1 — The system must support creating a new part category.
- R05.2 — A new category must require a Name field.
- R05.3 — A new category must allow selecting a Parent Category (for nested hierarchy).
- R05.4 — A new category should allow entering a Description.
- R05.5 — A new category should allow selecting a Default Location.
- R05.6 — The category view must list all parts belonging to that category.
- R05.7 — The category view should show sub-categories.
- R05.8 — The system must support editing an existing category.
- R05.9 — The system must support deleting an existing category.

---

## REQ-06 — Add Part (Core Fields)

| Attribute | Value |
|-----------|-------|
| Source | `Add_part.png` (Observed in UI), CSV template (supporting) |
| Priority | High |
| Status | Observed in UI |

**Description:**  
Users must be able to create new parts through a structured form.

**Requirements:**
- R06.1 — The add part form must include a Name field (required).
- R06.2 — The add part form must include an IPN (Internal Part Number) field.
- R06.3 — The add part form must include a Description field.
- R06.4 — The add part form must include a Category selector.
- R06.5 — The add part form must include a Keywords field.
- R06.6 — The add part form must include a Link (URL) field.
- R06.7 — The add part form must include a Revision field.
- R06.8 — The add part form must include Units field.
- R06.9 — The add part form must include a Default Location selector.
- R06.10 — The add part form must include a Minimum Stock field.
- R06.11 — The add part form must include a Default Expiry field.
- R06.12 — The add part form must include a Responsible (user/group) field.

---

## REQ-07 — Add Part (Boolean / Status Fields)

| Attribute | Value |
|-----------|-------|
| Source | `Add_part.png` (Observed in UI), CSV template (supporting) |
| Priority | High |
| Status | Observed in UI |

**Description:**  
The add part form must include boolean toggle fields that control part behaviour.

**Requirements:**
- R07.1 — The add part form must include an **Active** checkbox (default: checked/true).
- R07.2 — The add part form must include an **Assembly** checkbox (default: unchecked).
- R07.3 — The add part form must include a **Component** checkbox (default: checked).
- R07.4 — The add part form must include a **Purchaseable** checkbox (default: checked).
- R07.5 — The add part form must include a **Salable** checkbox.
- R07.6 — The add part form must include a **Trackable** checkbox.
- R07.7 — The add part form must include a **Testable** checkbox.
- R07.8 — The add part form must include an **Is Template** checkbox.
- R07.9 — The add part form must include a **Virtual** checkbox.
- R07.10 — The add part form must include a **Locked** checkbox.

---

## REQ-08 — Add Part (Secondary Modal / Step 2)

| Attribute | Value |
|-----------|-------|
| Source | `Add_part2.png` (Observed in UI — modal) |
| Priority | Medium |
| Status | Observed in UI — exact content ambiguous |

**Description:**  
The add-part workflow may include a secondary modal dialog step.

**Requirements:**
- R08.1 — The add-part workflow must support at least one secondary interaction step or modal dialog.
- R08.2 — The secondary step must include a confirm/save action.
- R08.3 — The secondary step must include a cancel/close action.

> ❓ **Exact content of `Add_part2.png` must be confirmed by visual review.**

---

## REQ-09 — Part Import

| Attribute | Value |
|-----------|-------|
| Source | `import_parts.png` (Observed in UI), `InvenTree_Part_import_file_template.csv` (documented) |
| Priority | Medium |
| Status | Observed in UI |

**Description:**  
The system must support bulk import of parts via a structured CSV/spreadsheet file.

**Requirements:**
- R09.1 — The import interface must allow uploading a CSV file.
- R09.2 — The import interface must provide a downloadable template file.
- R09.3 — The import interface must support column mapping (CSV columns → InvenTree fields).
- R09.4 — The CSV template must include all 51 standard part fields (as defined in `InvenTree_Part_import_file_template.csv`).
- R09.5 — The import must validate required fields.
- R09.6 — The import interface must include an import submission action.
- R09.7 — The import interface must include a cancel action.

---

## REQ-10 — Part Data Fields (Documented in CSV — Not All Confirmed in UI)

| Attribute | Value |
|-----------|-------|
| Source | `InvenTree_Part_import_file_template.csv` |
| Priority | Low–Medium |
| Status | Documented but not all observed in UI screenshots |

**Description:**  
The CSV export template documents 51 fields that the system tracks for each part. Fields not visible in add-part screenshots may appear in the part detail view (not captured in screenshots).

**Documented-Only Fields (not confirmed in add-part form screenshots):**

| Field | Description |
|-------|-------------|
| Barcode Hash | System-generated barcode identifier |
| Image | Full-size image media path |
| Thumbnail | Thumbnail image media path |
| Is Template | Boolean — part is a template for variants |
| Revision Of | ID of the parent revision part |
| Revisions | Count of revisions |
| Variant Of | ID of parent template part |
| Pricing min | Minimum pricing |
| Pricing max | Maximum pricing |
| Pricing updated | Timestamp of last pricing update |
| Allocated to build orders | Quantity allocated |
| Allocated to sales orders | Quantity allocated |
| Building | Quantity in build |
| Scheduled to Build | Quantity scheduled |
| Category default location | Default location from category |
| In Stock | Quantity in stock |
| On Order | Quantity on order |
| Required for build orders | Required quantity |
| Required for sales orders | Required quantity |
| Stock Items | Number of stock items |
| Total Stock | Total stock quantity |
| External Stock | External stock quantity |
| Unallocated Stock | Available stock quantity |
| Variant Stock | Stock in variant parts |
| Starred | Boolean — user has starred/watched this part |
| Creation Date | Auto-set on creation |
| Creation user | Auto-set on creation |

---

## Requirements Summary Matrix

| REQ ID | Area | Priority | Status |
|--------|------|----------|--------|
| REQ-01 | Authentication | High | Observed in UI |
| REQ-02 | Dashboard / Home | Medium | Observed in UI |
| REQ-03 | Parts Navigation | High | Observed in UI |
| REQ-04 | Parts List | High | Observed in UI |
| REQ-05 | Category Management | Medium | Observed in UI |
| REQ-06 | Add Part — Core Fields | High | Observed in UI |
| REQ-07 | Add Part — Boolean Fields | High | Observed in UI |
| REQ-08 | Add Part — Secondary Modal | Medium | Ambiguous |
| REQ-09 | Part Import | Medium | Observed in UI |
| REQ-10 | Part Data Fields (full set) | Low–Medium | Documented only |
