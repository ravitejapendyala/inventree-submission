# UI Manual Test Cases — Phase 1: InvenTree Parts Module
> Generated: 2026-04-06  
> Based on: 8 screenshots + CSV import template  
> Scope: Login, Dashboard, Parts Module (list, category, add, import)  
> **Label Confirmation Note:** Exact button/field labels marked ⚠️ must be visually confirmed against `Add_part.png`, `parts_page.png`, etc. before executing tests.

---

## Test Case Format

| Field | Description |
|-------|-------------|
| **ID** | Unique test case identifier |
| **Scenario** | What is being tested |
| **Preconditions** | Setup required before test starts |
| **Steps** | Numbered sequence of actions |
| **Expected Result** | What correct behaviour looks like |
| **Priority** | High / Medium / Low |
| **Source Screenshot** | Which screenshot supports this test |
| **Confidence** | ✅ Confirmed / ⚠️ Inferred / ❓ Ambiguous |

---

## Area 1 — Authentication

---

### TC-01 — Successful Login with Valid Credentials

| Field | Value |
|-------|-------|
| **ID** | TC-01 |
| **Scenario** | User logs in with valid username and password |
| **Priority** | High |
| **Source Screenshot** | `login_page.png`, `home_page.png` |
| **Confidence** | ⚠️ (exact label for button may differ) |

**Preconditions:**
- InvenTree application is running and accessible via browser
- A valid user account exists (e.g. username: `admin`, password: `inventree`)
- User is not already logged in

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to the InvenTree URL in a web browser | The login page renders with InvenTree branding |
| 2 | Observe the login form | A text field labelled "Username" (or similar) is visible |
| 3 | Observe the login form | A password field labelled "Password" is visible |
| 4 | Observe the form | A submit button labelled "Sign In" or "Login" is visible |
| 5 | Enter a valid username in the username field | The username text appears in the field |
| 6 | Enter the correct password in the password field | Characters are masked (shown as dots/asterisks) |
| 7 | Click the login/submit button | The page redirects away from the login page |
| 8 | Observe the resulting page | The dashboard/home page loads; the left sidebar navigation is visible |

**Expected Result:**  
A valid username + password successfully authenticates the user and redirects to the home/dashboard page. The login page is no longer displayed.

---

### TC-02 — Failed Login with Invalid Credentials

| Field | Value |
|-------|-------|
| **ID** | TC-02 |
| **Scenario** | User attempts login with wrong password |
| **Priority** | High |
| **Source Screenshot** | `login_page.png` (error state not captured) |
| **Confidence** | ❓ (error state screenshot missing) |

**Preconditions:**
- InvenTree application is running and accessible
- User is not logged in

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to the InvenTree login page | Login form is displayed |
| 2 | Enter a valid username | Username entered |
| 3 | Enter an **incorrect** password | Password characters masked |
| 4 | Click the submit button | The page does NOT redirect to dashboard |
| 5 | Observe the page | An error message is displayed (e.g. "Invalid credentials" or "Please enter a correct username and password") |
| 6 | Observe the URL | URL remains on the login page |

**Expected Result:**  
Invalid credentials show an error message; the user remains on the login page and access to the application is denied.

---

### TC-03 — Login Form — Empty Submission Validation

| Field | Value |
|-------|-------|
| **ID** | TC-03 |
| **Scenario** | User submits the login form with no credentials entered |
| **Priority** | Medium |
| **Source Screenshot** | `login_page.png` |
| **Confidence** | ❓ |

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to InvenTree login page | Login form visible |
| 2 | Leave username and password fields empty | Fields are blank |
| 3 | Click the submit button | Page does not proceed to dashboard |
| 4 | Observe | Validation error or browser native "required field" message shown |

**Expected Result:**  
Empty form submission is prevented with validation feedback; no authentication attempt is made.

---

## Area 2 — Dashboard Navigation

---

### TC-04 — Dashboard Renders After Login

| Field | Value |
|-------|-------|
| **ID** | TC-04 |
| **Scenario** | Verify the home/dashboard page loads after successful login |
| **Priority** | High |
| **Source Screenshot** | `home_page.png` |
| **Confidence** | ✅ |

**Preconditions:** User is logged in.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Log in as a valid user (see TC-01) | Redirected to dashboard |
| 2 | Observe the left side of the page | A navigation sidebar is visible |
| 3 | Observe the sidebar | Module links are present (Parts, Stock, Build, Purchasing, Sales, Return — or similar) |
| 4 | Observe the top of the page | A top navigation bar with InvenTree branding and user controls is visible |
| 5 | Observe the main content area | Dashboard content/statistics are displayed |

**Expected Result:**  
The dashboard renders with sidebar navigation, top nav bar, and dashboard content widgets.

---

### TC-05 — Navigate to Parts Module from Dashboard

| Field | Value |
|-------|-------|
| **ID** | TC-05 |
| **Scenario** | User clicks Parts (or Parts catalogue) link in sidebar |
| **Priority** | High |
| **Source Screenshot** | `home_page.png` → `parts_page.png` |
| **Confidence** | ⚠️ |

**Preconditions:** User is on the dashboard.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Locate "Parts" link (or "Catalogue" or similar) in the left sidebar | Link is clearly labelled and visible |
| 2 | Click the Parts link | Navigation occurs |
| 3 | Observe the resulting page | The Parts list page loads showing a table of parts |
| 4 | Observe the page heading | "Parts" or similar heading is displayed |

**Expected Result:**  
Clicking the Parts link in the sidebar navigates to the Parts list page.

---

### TC-06 — Logout

| Field | Value |
|-------|-------|
| **ID** | TC-06 |
| **Scenario** | User logs out of InvenTree |
| **Priority** | Medium |
| **Source Screenshot** | `home_page.png` (logout flow not captured) |
| **Confidence** | ❓ |

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | From any page, locate the user menu in the top navigation bar | User icon or username visible in top right |
| 2 | Click the user menu | A dropdown appears with options including "Logout" or "Sign Out" |
| 3 | Click "Logout" | User is redirected to the login page |
| 4 | Attempt to navigate to a protected page (e.g. `/part/`) | Redirected back to login page |

**Expected Result:**  
Logout clears the session; navigating to authenticated pages redirects to the login page.

---

## Area 3 — Parts List

---

### TC-07 — Parts List Page Renders with Data Table

| Field | Value |
|-------|-------|
| **ID** | TC-07 |
| **Scenario** | Verify the parts list displays a populated data table |
| **Priority** | High |
| **Source Screenshot** | `parts_page.png` |
| **Confidence** | ✅ |

**Preconditions:** User is logged in. At least one part exists in the system.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to the Parts module from the sidebar | Parts list page loads |
| 2 | Observe the main content area | A table of parts is displayed |
| 3 | Observe the table columns | At minimum: Name, Description, Category, Stock columns are visible |
| 4 | Observe the table rows | Parts are listed (at least one row) |
| 5 | Observe the top of the table | An action toolbar is present (buttons for add, import, etc.) |
| 6 | Observe the left panel | A category tree or category list is visible |

**Expected Result:**  
The parts list renders a multi-column sortable table of parts with at least Name and Category columns. A category navigation panel and action toolbar are both visible.

---

### TC-08 — Search / Filter Parts

| Field | Value |
|-------|-------|
| **ID** | TC-08 |
| **Scenario** | User searches or filters the parts list |
| **Priority** | Medium |
| **Source Screenshot** | `parts_page.png` |
| **Confidence** | ⚠️ |

**Preconditions:** Parts list is loaded with multiple parts.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Locate the search input or filter control on the parts list page | A search text box or filter button is visible |
| 2 | Type a part name (e.g. "Blue Widget") into the search field | The table filters in real time or on submit |
| 3 | Observe the results | Only parts matching the search term are displayed |
| 4 | Clear the search field | All parts are shown again |

**Expected Result:**  
The search/filter narrows the parts list to matching rows. Clearing the filter restores the full list.

---

## Area 4 — Category Management

---

### TC-09 — Navigate to a Part Category

| Field | Value |
|-------|-------|
| **ID** | TC-09 |
| **Scenario** | User navigates to a specific part category |
| **Priority** | High |
| **Source Screenshot** | `parts_category.png` |
| **Confidence** | ✅ |

**Preconditions:** User is on the parts list page. At least one category exists (e.g. "Widgets").

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Locate the category tree or category list on the parts page | Category names are listed in a sidebar or panel |
| 2 | Click on a category name (e.g. "Widgets" or "Enclosures") | The page navigates to that category's detail view |
| 3 | Observe the page heading | The category name is displayed as the heading |
| 4 | Observe the parts table | Only parts belonging to that category are listed |
| 5 | Observe the breadcrumb (if present) | Navigation path shows e.g. "Home > Parts > Widgets" |

**Expected Result:**  
Clicking a category filters the parts view to show only parts in that category. The category name is the page heading.

---

### TC-10 — Create a New Part Category

| Field | Value |
|-------|-------|
| **ID** | TC-10 |
| **Scenario** | User creates a new part category |
| **Priority** | Medium |
| **Source Screenshot** | `Add_part_category.png` |
| **Confidence** | ✅ |

**Preconditions:** User is logged in with permission to create categories.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to the Parts page or a category page | Page is loaded |
| 2 | Locate the "Add Category" or "New Category" button or menu item ⚠️ | Button is visible in the action area |
| 3 | Click "Add Category" | The Add Category form opens (full page or modal) |
| 4 | Observe the form fields | At minimum a "Name" field is required; optionally Parent Category, Description, Default Location |
| 5 | Enter a Name value (e.g. "Test Category") | Text entered in Name field |
| 6 | Optionally select a Parent Category | A dropdown allows selection of existing category |
| 7 | Optionally enter a Description | Text area is available |
| 8 | Click the Save/Submit button ⚠️ | Form is submitted |
| 9 | Observe the category tree/list | "Test Category" appears in the category list |

**Expected Result:**  
A new category is created and appears in the category hierarchy. Required: Name field. Optional: Parent, Description, Default Location.

---

### TC-11 — Category Hierarchy — Sub-Categories Visible

| Field | Value |
|-------|-------|
| **ID** | TC-11 |
| **Scenario** | Verify that sub-categories are displayed when viewing a parent category |
| **Priority** | Medium |
| **Source Screenshot** | `parts_category.png` |
| **Confidence** | ⚠️ |

**Preconditions:** A parent-child category hierarchy exists (e.g. "Furniture" with sub-categories "Tables" and "Chairs").

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to the "Furniture" category | Category page loads |
| 2 | Observe the page | Sub-categories "Tables" and "Chairs" are listed (in a panel or tab) |
| 3 | Click on "Tables" sub-category | The Tables category page loads |
| 4 | Observe | Parts in the Tables category are displayed |

**Expected Result:**  
Parent categories display their sub-categories; sub-category links are navigable.

---

### TC-12 — Edit a Part Category

| Field | Value |
|-------|-------|
| **ID** | TC-12 |
| **Scenario** | User edits an existing part category |
| **Priority** | Medium |
| **Source Screenshot** | `parts_category.png` |
| **Confidence** | ⚠️ |

**Preconditions:** Category exists. User has edit permissions.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to an existing category page | Category page loads |
| 2 | Locate the Edit button (pencil icon or "Edit" label) ⚠️ | Button is in the action toolbar |
| 3 | Click Edit | Edit form opens with current values pre-filled |
| 4 | Change the Description field value | New text entered |
| 5 | Click Save ⚠️ | Changes are saved |
| 6 | Observe the category page | Updated description is displayed |

**Expected Result:**  
Edits to a category are saved and immediately reflected on the category detail page.

---

### TC-13 — Delete a Part Category

| Field | Value |
|-------|-------|
| **ID** | TC-13 |
| **Scenario** | User deletes an existing part category that has no parts |
| **Priority** | Low |
| **Source Screenshot** | `parts_category.png` |
| **Confidence** | ⚠️ |

**Preconditions:** An empty category exists. User has delete permissions.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to an empty category (no parts) | Category page loads; parts table is empty |
| 2 | Locate the Delete button (trash icon or "Delete" label) ⚠️ | Button visible in action area |
| 3 | Click Delete | A confirmation dialog appears |
| 4 | Confirm deletion | Category is removed |
| 5 | Observe the category tree | The deleted category no longer appears |

**Expected Result:**  
An empty category can be deleted after confirmation. The category is removed from the hierarchy.

---

## Area 5 — Add Part

---

### TC-14 — Create a New Part with Required Fields Only

| Field | Value |
|-------|-------|
| **ID** | TC-14 |
| **Scenario** | User creates a new part by filling in only the required Name field |
| **Priority** | High |
| **Source Screenshot** | `Add_part.png` |
| **Confidence** | ✅ |

**Preconditions:** User is logged in with permission to create parts.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Navigate to the Parts list page | Parts list visible |
| 2 | Click the "Add Part" or "New Part" button ⚠️ | The Add Part form opens (full page or modal) |
| 3 | Observe the form | Required fields are marked (e.g. with asterisk *) |
| 4 | Enter a part Name (e.g. "TEST-PART-001") | Text entered in Name field |
| 5 | Leave all other fields at defaults | Defaults remain |
| 6 | Click the Save / Submit / Create button ⚠️ | Form is submitted |
| 7 | Observe the result | Part is created; redirected to parts list or part detail page |
| 8 | Search for "TEST-PART-001" in the parts list | The new part appears in the list |

**Expected Result:**  
A new part can be created with only the Name field filled in. After saving, the part appears in the parts list.

---

### TC-15 — Create a New Part with All Core Fields

| Field | Value |
|-------|-------|
| **ID** | TC-15 |
| **Scenario** | User creates a new part filling in all main form fields |
| **Priority** | High |
| **Source Screenshot** | `Add_part.png` |
| **Confidence** | ✅ |

**Preconditions:** At least one category exists. User is logged in.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Click "Add Part" / "New Part" button ⚠️ | Add Part form opens |
| 2 | Enter Name: "Test Resistor 100Ω" | Name field accepts text |
| 3 | Enter IPN: "R-100-0402" | IPN field accepts text |
| 4 | Enter Description: "SMD Resistor 100 Ohm 0402" | Description field accepts text |
| 5 | Select Category: e.g. "Capacitors" or appropriate category | Dropdown shows available categories |
| 6 | Enter Keywords: "resistor smd" | Keywords field accepts text |
| 7 | Enter Link: "https://datasheet.example.com" | Link field accepts URL |
| 8 | Enter Units: "Ω" or "Ohm" | Units field accepts text |
| 9 | Check "Assembly" checkbox | Checkbox toggled | 
| 10 | Check "Trackable" checkbox | Checkbox toggled |
| 11 | Enter Minimum Stock: "100" | Number field accepts integer |
| 12 | Click Save ⚠️ | Part is created |
| 13 | Locate the new part in the parts list | Part appears with correct Name, IPN, and Description |

**Expected Result:**  
All filled fields are saved correctly. Part appears in the list with the correct attributes.

---

### TC-16 — Add Part Form — Required Field Validation

| Field | Value |
|-------|-------|
| **ID** | TC-16 |
| **Scenario** | User attempts to save a new part without filling in the required Name field |
| **Priority** | High |
| **Source Screenshot** | `Add_part.png` (validation state not captured) |
| **Confidence** | ❓ |

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Open the Add Part form | Form is displayed |
| 2 | Leave the Name field empty | Field is blank |
| 3 | Fill in optional fields if desired | Other fields filled |
| 4 | Click Save ⚠️ | Form does not submit |
| 5 | Observe | An error message appears near the Name field indicating it is required |

**Expected Result:**  
The form rejects submission when the required Name field is empty. An inline validation error is shown.

---

### TC-17 — Add Part — Secondary Modal Step

| Field | Value |
|-------|-------|
| **ID** | TC-17 |
| **Scenario** | Observe and interact with the secondary modal that appears during the add-part flow |
| **Priority** | Medium |
| **Source Screenshot** | `Add_part2.png` |
| **Confidence** | ❓ (exact content ambiguous) |

**Preconditions:** User is on the Add Part form.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Interact with the Add Part form by filling in required fields | Form partially filled |
| 2 | Trigger the action that opens the secondary modal ❓ (e.g. clicking a category selector, image upload icon, or a "Continue" button) | A smaller modal dialog (approximately 776×759 / modal overlay) appears |
| 3 | Observe the modal title | A descriptive title is present |
| 4 | Observe the modal content | Fields or content specific to this step are shown |
| 5 | Complete the modal action and click Save / Confirm ⚠️ | Modal closes; parent form updated |
| 6 | Alternatively, click Cancel or the X button ⚠️ | Modal closes without saving; parent form unchanged |

**Expected Result:**  
The secondary modal opens in context, allows interaction, and saves or cancels cleanly without data loss in the parent form.

> ⚠️ **Action required:** Manually confirm what triggers `Add_part2.png` modal (category picker? image upload? step 2 of multi-step form?). Update this test once confirmed.

---

### TC-18 — Add Part — Boolean Field Defaults

| Field | Value |
|-------|-------|
| **ID** | TC-18 |
| **Scenario** | Verify default states of checkbox/toggle fields in the Add Part form |
| **Priority** | Medium |
| **Source Screenshot** | `Add_part.png` |
| **Confidence** | ✅ (confirmed from CSV sample data defaults) |

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Open the Add Part form without pre-filling anything | Form is at default state |
| 2 | Observe the **Active** checkbox | Should be **checked** (default: true) |
| 3 | Observe the **Component** checkbox | Should be **checked** (default: true) |
| 4 | Observe the **Purchaseable** checkbox | Should be **checked** (default: true) |
| 5 | Observe the **Assembly** checkbox | Should be **unchecked** (default: false) |
| 6 | Observe the **Salable** checkbox | Note the default state |
| 7 | Observe the **Trackable** checkbox | Note the default state |
| 8 | Observe the **Virtual** checkbox | Note the default state |
| 9 | Observe the **Is Template** checkbox | Note the default state |

**Expected Result:**  
Active, Component, and Purchaseable are enabled by default. Assembly is disabled by default. Other flags default to unchecked.

---

## Area 6 — Part Import

---

### TC-19 — Open Import Parts Interface

| Field | Value |
|-------|-------|
| **ID** | TC-19 |
| **Scenario** | Navigate to the import parts interface |
| **Priority** | Medium |
| **Source Screenshot** | `import_parts.png` |
| **Confidence** | ✅ |

**Preconditions:** User is on the parts list page.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Locate the "Import Parts" button or upload icon ⚠️ in the parts page toolbar | Button is visible |
| 2 | Click "Import Parts" ⚠️ | Import interface opens (full page or modal/dialog) |
| 3 | Observe the interface | A file upload control is visible |
| 4 | Observe for a template download link | A "Download Template" or similar link is present ⚠️ |
| 5 | Observe for column mapping section | Column mapping UI may be visible |

**Expected Result:**  
The import interface opens and presents a file upload control. A template download option is available.

---

### TC-20 — Download Import Template

| Field | Value |
|-------|-------|
| **ID** | TC-20 |
| **Scenario** | User downloads the part import CSV template |
| **Priority** | Medium |
| **Source Screenshot** | `import_parts.png` |
| **Confidence** | ⚠️ |

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Open the Import Parts interface (see TC-19) | Import interface visible |
| 2 | Locate and click the "Download Template" link or button ⚠️ | A CSV file is downloaded |
| 3 | Open the downloaded file | CSV has header row with column names |
| 4 | Verify column headers | Must include at least: Name, IPN, Description, Category, Active, Assembly, Component, Purchaseable |
| 5 | Verify additional columns | Columns for Trackable, Salable, Virtual, Is Template, Keywords, Link, Units, Minimum Stock, Default Expiry, Revision should be present |

**Expected Result:**  
The downloaded template CSV contains all 51 standard part field headers as documented in `InvenTree_Part_import_file_template.csv`.

---

### TC-21 — Import Parts from Valid CSV File

| Field | Value |
|-------|-------|
| **ID** | TC-21 |
| **Scenario** | User imports parts using a valid CSV file |
| **Priority** | Medium |
| **Source Screenshot** | `import_parts.png` |
| **Confidence** | ⚠️ |

**Preconditions:** A valid CSV file prepared using the InvenTree import template, containing at least 3 parts with Name, Description, and Category filled in.

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Open the Import Parts interface | Import interface visible |
| 2 | Click the file upload control or drag-and-drop area | File picker opens |
| 3 | Select the prepared valid CSV file | File is accepted and loaded |
| 4 | Observe the column mapping step ⚠️ | CSV columns are mapped to InvenTree fields |
| 5 | Review mappings; adjust if necessary | Mapping controls allow correction |
| 6 | Click "Import" or "Submit" ⚠️ | Import processes |
| 7 | Observe the result | Success message shown; imported parts count displayed |
| 8 | Navigate to the parts list | Newly imported parts appear in the list |

**Expected Result:**  
Valid CSV import creates new parts in the system. A success confirmation is shown and parts appear in the list.

---

### TC-22 — Import Parts — Invalid or Malformed CSV

| Field | Value |
|-------|-------|
| **ID** | TC-22 |
| **Scenario** | User attempts to import a CSV file with missing required fields |
| **Priority** | Medium |
| **Source Screenshot** | `import_parts.png` (error state not captured) |
| **Confidence** | ❓ |

**Steps:**

| # | Action | Expected Behaviour |
|---|--------|--------------------|
| 1 | Open Import Parts interface | Interface visible |
| 2 | Upload a CSV file that is missing the required Name column | File accepted |
| 3 | Proceed through the column mapping step | Mapping shows Name as unmapped |
| 4 | Attempt to submit the import | Validation error shown |
| 5 | Observe the error | Error message identifies missing required field |

**Expected Result:**  
Import with missing required fields fails gracefully with a descriptive error message. No partial imports should occur silently.

---

## Test Case Summary

| ID | Scenario | Area | Priority | Confidence |
|----|----------|------|----------|------------|
| TC-01 | Successful login | Authentication | High | ⚠️ |
| TC-02 | Failed login — wrong password | Authentication | High | ❓ |
| TC-03 | Empty login form validation | Authentication | Medium | ❓ |
| TC-04 | Dashboard renders after login | Dashboard | High | ✅ |
| TC-05 | Navigate to Parts from sidebar | Navigation | High | ⚠️ |
| TC-06 | Logout | Authentication | Medium | ❓ |
| TC-07 | Parts list renders with data table | Parts List | High | ✅ |
| TC-08 | Search / filter parts | Parts List | Medium | ⚠️ |
| TC-09 | Navigate to a part category | Category | High | ✅ |
| TC-10 | Create a new part category | Category | Medium | ✅ |
| TC-11 | Sub-categories visible in parent | Category | Medium | ⚠️ |
| TC-12 | Edit a part category | Category | Medium | ⚠️ |
| TC-13 | Delete an empty part category | Category | Low | ⚠️ |
| TC-14 | Create part with required fields only | Add Part | High | ✅ |
| TC-15 | Create part with all core fields | Add Part | High | ✅ |
| TC-16 | Add part — required field validation | Add Part | High | ❓ |
| TC-17 | Add part — secondary modal step | Add Part | Medium | ❓ |
| TC-18 | Add part — boolean field defaults | Add Part | Medium | ✅ |
| TC-19 | Open import parts interface | Import | Medium | ✅ |
| TC-20 | Download import template | Import | Medium | ⚠️ |
| TC-21 | Import parts from valid CSV | Import | Medium | ⚠️ |
| TC-22 | Import parts — invalid CSV | Import | Medium | ❓ |

**Total test cases: 22**

---

## Confidence Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Test steps confirmed against screenshots or CSV data |
| ⚠️ | Steps inferred from screenshot filenames or standard InvenTree patterns — exact labels must be confirmed before first run |
| ❓ | Cannot be confirmed without additional screenshots or live system access — treat as draft until validated |
