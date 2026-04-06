# InvenTree Parts Module — QA Assignment Submission

**Application under test:** [InvenTree](https://demo.inventree.org) — open-source inventory management system  
**Scope:** Parts module (UI + REST API)  
**Date:** April 2026

---

## Repository Structure

```
inventree-submission/
│
├── agents/                         # Prompts and SKILL.md methodology files used per phase
│   ├── phase-1-requirements-ui-tests/
│   ├── phase-2-api-analysis-tests/
│   └── phase-3-ui-automation/
│
├── outputs/                        # All structured deliverables by phase
│   ├── phase-1/                    # UI analysis outputs (6 documents)
│   │   ├── source-inventory.md
│   │   ├── ui-observation-map.md
│   │   ├── requirements-summary.md
│   │   ├── ui-coverage-matrix.md
│   │   ├── ui-manual-tests.md      # 22 manual UI test cases (TC-01 – TC-22)
│   │   └── ui-doc-vs-screenshot-mismatches.md
│   │
│   └── phase-2/                    # API analysis outputs (5 documents)
│       ├── source-inventory.md
│       ├── api-schema-analysis.md
│       ├── api-endpoint-matrix.md
│       ├── api-manual-tests.md     # 45 manual API test cases (AT-001 – AT-045)
│       └── api-assumptions-and-gaps.md
│
├── test-cases/                     # Consolidated test case reference copies
│   ├── ui-manual-tests.md
│   └── api-manual-tests.md
│
├── automation/
│   └── ui-automation/              # Playwright TypeScript UI automation project
│       ├── pages/                  # Page Object Model classes
│       │   ├── login.page.ts
│       │   ├── dashboard.page.ts
│       │   ├── parts.page.ts
│       │   └── partDetails.page.ts
│       ├── tests/
│       │   └── part-critical.spec.ts   # 10 critical UI test cases (UI-01 – UI-10)
│       ├── utils/
│       │   ├── testHelpers.ts
│       │   ├── waits.ts
│       │   └── selectors.md        # Selector rationale and evidence references
│       ├── test-data/
│       │   └── partData.ts
│       ├── playwright.config.ts
│       ├── tsconfig.json
│       ├── package.json
│       └── .env.example
│
├── scripts/                        # Utility scripts used during analysis
│   └── inventree_part_schema_scraper.py
│
└── README.md                       # This file
```

---

## Approach Summary

The assignment was completed in three sequential phases, each building on the outputs of the last.

### Phase 1 — UI Observation and Manual Test Design

**Goal:** Understand the real UI behaviour from screenshots and derive testable requirements.

**Method:**
- Analysed 8 screenshots of the live application: `login_page.png`, `home_page.png`, `parts_page.png`, `Add_part.png`, `Add_part2.png`, `parts_category.png`, `Add_part_category.png`, `import_parts.png`
- Cross-referenced a 51-column CSV import template to understand the full data model
- Built an observation map linking each UI element to its screenshot evidence
- Identified mismatches between documentation and actual UI
- Produced a requirements summary and a test coverage matrix

**Output:** 22 manual UI test cases (TC-01 – TC-22) covering:
- Authentication (login, logout, invalid credentials)
- Dashboard navigation
- Parts list display, search, and filtering
- Add Part modal (required fields, validation, toggles, initial stock)
- Part Categories (create, navigate, breadcrumb)
- Import from CSV (file picker, format validation)

---

### Phase 2 — API Schema Analysis and API Test Design

**Goal:** Derive structured API test cases from the official InvenTree REST API schema.

**Method:**
- Scraped the InvenTree Parts API schema page (`https://docs.inventree.org/en/stable/api/schema/part/`) using a Python script, producing a structured Markdown and JSON representation of all endpoints, fields, types, and constraints
- Analysed all `/api/part/` endpoints (GET list, GET detail, POST, PATCH, DELETE) plus related sub-resources: parameters, attachments, stock items, BOM
- Documented 7 assumptions and 8 identified gaps (undocumented behaviours, missing edge-case specs)
- Produced an endpoint matrix mapping HTTP method × expected status codes × auth requirements

**Output:** 45 manual API test cases (AT-001 – AT-045) covering:
- CRUD operations on `/api/part/`
- Pagination, filtering, ordering, and search parameters
- Field-level validation (required fields, type constraints, boundary values)
- Authentication and authorisation (401, 403 scenarios)
- Category and subcategory management

---

### Phase 3 — UI Test Automation

**Goal:** Convert the 10 highest-priority Phase 1 manual tests into a runnable Playwright TypeScript automation suite.

**Method:**
- Selected 10 critical test cases from Phase 1 (UI-01 – UI-10), covering login, dashboard, parts list, add-part modal, and category navigation
- Built a Page Object Model (POM) framework from first principles, using screenshot evidence for initial element identification
- Ran Playwright codegen against the live demo instance to validate and correct all selectors — InvenTree uses the Mantine UI library which sets non-obvious `aria-label` attributes on inputs rather than connecting visible `<label>` elements via `htmlFor`
- Replaced all inferred selectors with codegen-confirmed ones; documented every selector decision in `utils/selectors.md`

**Codegen-discovered selector patterns:**

| Pattern | Example |
|---------|---------|
| Text inputs | `aria-label="text-field-{fieldName}"` (e.g. `text-field-name`, `text-field-IPN`) |
| Number inputs | `aria-label="number-field-{fieldName}."` (trailing dot — e.g. `number-field-initial_stock.`) |
| Auth inputs | `aria-label="login-username"` / `aria-label="login-password"` |
| Toolbar action buttons | `aria-label="action-menu-{context}"` (e.g. `action-menu-add-parts`) |
| Toolbar menu items | `aria-label="action-menu-{context}-{action}-"` (e.g. `action-menu-add-parts-create-`) |
| Sidebar panel tabs | `aria-label="panel-tabs-{entity}"` (e.g. `panel-tabs-partcategory`) |

**Output:** 10 automated UI test cases mapped from Phase 1:

| Automation ID | Phase 1 Source | Description |
|--------------|---------------|-------------|
| UI-01 | TC-01 | Successful login navigates to dashboard |
| UI-02 | TC-02 | Invalid credentials shows error |
| UI-03 | TC-04 | Dashboard displays all top-level nav links |
| UI-04 | TC-05 | Clicking Parts navigates to parts list |
| UI-05 | TC-07 | Parts table renders correct column headers |
| UI-06 | TC-08 | Search input is present on parts list |
| UI-07 | TC-09 | Add Part menu item opens modal |
| UI-08 | TC-10 | Submitting empty Add Part form shows validation error |
| UI-09 | TC-14 | Navigate to Part Categories |
| UI-10 | TC-16 | Import from File menu item opens import modal |

---

## Tool Choices

| Tool | Purpose | Rationale |
|------|---------|-----------|
| **Playwright** | UI and API automation | First-class TypeScript support, auto-waiting, built-in codegen, fast Chromium execution, excellent trace viewer for debugging |
| **TypeScript** | Automation language | Type safety catches selector mismatches and missing properties at compile time; works natively with Playwright's typed API |
| **Page Object Model** | Test architecture | Decouples selectors from test logic; a single POM update propagates across all affected tests when the UI changes |
| **dotenv** | Environment config | Keeps base URL and credentials out of source code; makes the suite portable across demo, staging, and local instances |
| **Python** (scraper) | Schema extraction | Quick one-off script to convert the InvenTree HTML schema docs into structured Markdown/JSON for systematic analysis |
| **Playwright Codegen** | Selector validation | Running codegen against the live app revealed InvenTree's Mantine aria-label naming conventions, which differ from what visible labels suggest — preventing flaky `getByLabel()` calls |

---

## Setup — Running the UI Automation

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 18 LTS |
| npm | ≥ 9 |

### Steps

**1. Install dependencies**

```bash
cd automation/ui-automation
npm install
```

**2. Install Playwright browsers**

```bash
npx playwright install --with-deps chromium
```

**3. Configure environment**

```bash
copy .env.example .env
```

The `.env.example` is already pre-filled for the public InvenTree demo:

```env
INVENTREE_BASE_URL=https://demo.inventree.org
INVENTREE_USERNAME=allaccess
INVENTREE_PASSWORD=nolimits
```

No edits are required to run against the demo instance.

**4. Run the tests**

```bash
# Run all 10 critical UI tests (headless)
npm test

# Run with a visible browser
npm run test:headed

# Run a single test by ID
npx playwright test -g "UI-01"

# Open the HTML report after a run
npm run test:report
```

---

## Key Design Decisions

**Evidence-first selectors** — Every selector in the Page Objects is backed by either a screenshot annotation or codegen output. The rationale is recorded in [`automation/ui-automation/utils/selectors.md`](automation/ui-automation/utils/selectors.md).

**No hard `waitForTimeout` calls** — All synchronisation uses Playwright's built-in auto-waiting assertions (`toBeVisible`, `toHaveURL`) and purpose-built `waitForTableRows` / `waitForAppLoad` helpers in `utils/waits.ts`.

**Single-worker, sequential execution** — The tests share browser session state (login persists between tests in the same group). `workers: 1` and `fullyParallel: false` are set in `playwright.config.ts` to prevent race conditions on the shared demo server.

**Stable aria-label selectors over CSS classes** — InvenTree is built on Mantine + Emotion CSS-in-JS. Generated class names like `.css-8mmkcg` are unstable across builds. The codegen session surfaced explicit `aria-label` attributes that InvenTree sets intentionally — these are stable and preferred.
