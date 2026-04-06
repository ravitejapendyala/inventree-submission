# UI Coverage Matrix — Phase 1
> Generated: 2026-04-06  
> Purpose: Map each identified UI feature/page to its available test coverage.  
> Legend: ✅ Observed and testable | ⚠️ Inferred / partially observable | ❌ Not covered | ❓ Ambiguous

---

## Coverage by Page / Feature Area

### 1. Login Page

| Feature | Observed in UI | Screenshot | Test Case | Coverage |
|---------|---------------|------------|-----------|----------|
| Login page renders | ✅ | `login_page.png` | TC-01 | ✅ |
| Username field present | ⚠️ | `login_page.png` | TC-01 | ⚠️ |
| Password field present | ⚠️ | `login_page.png` | TC-01 | ⚠️ |
| Submit (login) button | ⚠️ | `login_page.png` | TC-01 | ⚠️ |
| Valid credentials → dashboard | ⚠️ | `login_page.png` + `home_page.png` | TC-01 | ⚠️ |
| Invalid credentials → error | ❓ | Not captured | TC-02 | ❓ |
| Empty form submission | ❓ | Not captured | TC-02 | ❓ |

---

### 2. Dashboard / Home Page

| Feature | Observed in UI | Screenshot | Test Case | Coverage |
|---------|---------------|------------|-----------|----------|
| Dashboard renders after login | ✅ | `home_page.png` | TC-03 | ✅ |
| Left sidebar navigation present | ⚠️ | `home_page.png` | TC-03 | ⚠️ |
| Parts link in sidebar | ⚠️ | `home_page.png` | TC-04 | ⚠️ |
| Other module links present | ⚠️ | `home_page.png` | TC-03 | ⚠️ |
| Top nav bar present | ⚠️ | `home_page.png` | TC-03 | ⚠️ |
| User menu / logout accessible | ❓ | Not confirmed in screenshot | TC-05 | ❓ |

---

### 3. Parts Module — List View

| Feature | Observed in UI | Screenshot | Test Case | Coverage |
|---------|---------------|------------|-----------|----------|
| Parts page accessible from nav | ✅ | `parts_page.png` | TC-04 | ✅ |
| Parts table renders | ✅ | `parts_page.png` | TC-06 | ✅ |
| Name column visible | ⚠️ | `parts_page.png` | TC-06 | ⚠️ |
| Description column visible | ⚠️ | `parts_page.png` | TC-06 | ⚠️ |
| Category column visible | ⚠️ | `parts_page.png` | TC-06 | ⚠️ |
| Stock column visible | ⚠️ | `parts_page.png` | TC-06 | ⚠️ |
| IPN column visible | ⚠️ | `parts_page.png` | TC-06 | ⚠️ |
| Image/thumbnail column | ⚠️ | `parts_page.png` | TC-06 | ⚠️ |
| Search / filter functionality | ⚠️ | `parts_page.png` | TC-07 | ⚠️ |
| "Add Part" button present | ⚠️ | `parts_page.png` | TC-08 | ⚠️ |
| "Import Parts" button present | ⚠️ | `parts_page.png` | TC-16 | ⚠️ |
| Export action present | ⚠️ | `parts_page.png` | TC-07 | ⚠️ |
| Category sidebar/tree visible | ⚠️ | `parts_page.png` | TC-10 | ⚠️ |

---

### 4. Parts Module — Category View

| Feature | Observed in UI | Screenshot | Test Case | Coverage |
|---------|---------------|------------|-----------|----------|
| Category view accessible | ✅ | `parts_category.png` | TC-10 | ✅ |
| Category name as heading | ✅ | `parts_category.png` | TC-10 | ✅ |
| Parts filtered to category | ⚠️ | `parts_category.png` | TC-10 | ⚠️ |
| Sub-categories visible | ⚠️ | `parts_category.png` | TC-11 | ⚠️ |
| Add Part within category | ⚠️ | `parts_category.png` | TC-08 | ⚠️ |
| Edit Category button | ⚠️ | `parts_category.png` | TC-12 | ⚠️ |
| Delete Category button | ⚠️ | `parts_category.png` | TC-13 | ⚠️ |
| Category breadcrumb navigation | ⚠️ | `parts_category.png` | TC-11 | ⚠️ |

---

### 5. Add Part Category

| Feature | Observed in UI | Screenshot | Test Case | Coverage |
|---------|---------------|------------|-----------|----------|
| Add Category form accessible | ✅ | `Add_part_category.png` | TC-09 | ✅ |
| Name field present (required) | ✅ | `Add_part_category.png` | TC-09 | ✅ |
| Parent Category selector | ⚠️ | `Add_part_category.png` | TC-09 | ⚠️ |
| Description field | ⚠️ | `Add_part_category.png` | TC-09 | ⚠️ |
| Default Location field | ⚠️ | `Add_part_category.png` | TC-09 | ⚠️ |
| Category icon/colour picker | ❓ | `Add_part_category.png` | — | ❓ |
| Save / Submit button | ⚠️ | `Add_part_category.png` | TC-09 | ⚠️ |
| Cancel button | ⚠️ | `Add_part_category.png` | TC-09 | ⚠️ |
| Category appears in tree after save | ❌ | Not captured | TC-09 | ❌ |

---

### 6. Add Part — Main Form

| Feature | Observed in UI | Screenshot | Test Case | Coverage |
|---------|---------------|------------|-----------|----------|
| Add Part form accessible | ✅ | `Add_part.png` | TC-08 | ✅ |
| Name field (required) | ✅ | `Add_part.png` | TC-08 | ✅ |
| IPN field | ✅ | `Add_part.png` | TC-08 | ✅ |
| Description field | ✅ | `Add_part.png` | TC-08 | ✅ |
| Category selector | ✅ | `Add_part.png` | TC-08 | ✅ |
| Keywords field | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Link / URL field | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Revision field | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Units field | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Default Location selector | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Minimum Stock field | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Default Expiry field | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Responsible selector | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Active checkbox (default on) | ✅ | `Add_part.png` | TC-08 | ✅ |
| Assembly checkbox | ✅ | `Add_part.png` | TC-08 | ✅ |
| Component checkbox (default on) | ✅ | `Add_part.png` | TC-08 | ✅ |
| Purchaseable checkbox (default on) | ✅ | `Add_part.png` | TC-08 | ✅ |
| Salable checkbox | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Trackable checkbox | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Testable checkbox | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Is Template checkbox | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Virtual checkbox | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Locked checkbox | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Save / Submit button | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Cancel button | ⚠️ | `Add_part.png` | TC-08 | ⚠️ |
| Required field validation | ❌ | Not captured | TC-15 | ❌ |
| Duplicate Name validation | ❌ | Not captured | TC-15 | ❌ |

---

### 7. Add Part — Secondary Modal

| Feature | Observed in UI | Screenshot | Test Case | Coverage |
|---------|---------------|------------|-----------|----------|
| Secondary modal renders | ✅ | `Add_part2.png` | TC-14 | ✅ |
| Modal title/content | ❓ | `Add_part2.png` | TC-14 | ❓ |
| Save action in modal | ⚠️ | `Add_part2.png` | TC-14 | ⚠️ |
| Cancel / close action in modal | ⚠️ | `Add_part2.png` | TC-14 | ⚠️ |

---

### 8. Part Import

| Feature | Observed in UI | Screenshot | Test Case | Coverage |
|---------|---------------|------------|-----------|----------|
| Import interface accessible | ✅ | `import_parts.png` | TC-16 | ✅ |
| File upload control present | ✅ | `import_parts.png` | TC-16 | ✅ |
| Template download link | ⚠️ | `import_parts.png` | TC-16 | ⚠️ |
| Column mapping step | ⚠️ | `import_parts.png` | TC-16 | ⚠️ |
| Import / Submit button | ⚠️ | `import_parts.png` | TC-16 | ⚠️ |
| Cancel button | ⚠️ | `import_parts.png` | TC-16 | ⚠️ |
| Validation of required fields | ❌ | Not captured | TC-17 | ❌ |
| Success confirmation | ❌ | Not captured | TC-16 | ❌ |
| Invalid file handling | ❌ | Not captured | TC-17 | ❌ |

---

## Coverage Summary by Area

| Area | Total Features | ✅ Observed | ⚠️ Inferred | ❓ Ambiguous | ❌ Not Covered |
|------|---------------|------------|------------|-------------|---------------|
| Login | 7 | 1 | 4 | 2 | 0 |
| Dashboard | 6 | 1 | 4 | 1 | 0 |
| Parts List | 13 | 3 | 10 | 0 | 0 |
| Parts Category | 8 | 2 | 5 | 1 | 0 |
| Add Category | 9 | 3 | 4 | 1 | 1 |
| Add Part (main) | 26 | 7 | 15 | 0 | 4 |
| Add Part (modal) | 4 | 1 | 2 | 1 | 0 |
| Part Import | 9 | 2 | 4 | 0 | 3 |
| **Total** | **82** | **20 (24%)** | **48 (59%)** | **6 (7%)** | **8 (10%)** |

---

## Coverage Gaps

The following areas have **no screenshot coverage** and require additional captures:

| Gap | Type | Priority |
|-----|------|----------|
| Part Detail page (all tabs) | Missing screenshot | High |
| Invalid login error state | Missing screenshot | Medium |
| Form validation errors (add part) | Missing screenshot | Medium |
| Part import success message | Missing screenshot | Medium |
| Part import with invalid CSV | Missing screenshot | Medium |
| Logout flow | Missing screenshot | Low |
| Part search results | Missing screenshot | Medium |
| Stock overview for a part | Missing screenshot | High |
