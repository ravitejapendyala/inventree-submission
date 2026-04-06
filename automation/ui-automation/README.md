# InvenTree Parts Module — Playwright UI Automation (Phase 3)

End-to-end UI automation for the InvenTree Parts module, grounded in real application screenshots captured during Phase 1 analysis.

---

## Evidence Base

All selectors and flows derive from actual screenshots — not documentation or guesswork:

| Screenshot | What It Confirmed |
|-----------|-------------------|
| `login_page.png` | URL, field labels ("Username", "Password"), "Log In" button, demo credentials |
| `home_page.png` | Top nav links (Dashboard, Parts, Stock, Manufacturing, Purchasing, Sales), "Ally Access" user dropdown |
| `parts_page.png` | Parts list URL, left sidebar labels, table columns, "+" dropdown menu ("Create Part", "Import from File"), Search input |
| `Add_part.png` | "Add Part" modal title, field labels (Category, Name*, IPN, Description, Revision), Submit/Cancel buttons |
| `Add_part2.png` | Scrolled Add Part modal: toggle switches (Purchaseable, Active), Initial Stock section |
| `parts_category.png` | Part Categories URL, table columns (Name, Description, Path, Parts), "+" button |
| `Add_part_category.png` | "New Part Category" modal, field labels (Parent Category, Name*, Description), Submit/Cancel |
| `import_parts.png` | "Import Parts" modal, "Data File *" field, "Select file to upload" |

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 18 LTS |
| npm | ≥ 9 |

---

## Setup

### 1. Install dependencies

```bash
cd outputs/phase-3/ui-automation
npm install
npx playwright install --with-deps chromium
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` if targeting a non-demo instance:

```env
INVENTREE_BASE_URL=https://demo.inventree.org
INVENTREE_USERNAME=allaccess
INVENTREE_PASSWORD=nolimits
```

---

## Running Tests

```bash
# Run all 10 critical UI tests
npm test

# Run headed (visible browser)
npm run test:headed

# Run a single test by title
npx playwright test -g "UI-01"

# Debug a single test
npx playwright test --debug -g "UI-09"

# Open HTML report after run
npm run test:report
```

---

## Project Structure

```
ui-automation/
├── .env.example                   # Environment template
├── package.json
├── playwright.config.ts           # headless Chromium, screenshot on failure
├── tsconfig.json
├── README.md
├── test-data/
│   └── partData.ts                # Credentials, part names, category names
├── pages/
│   ├── login.page.ts              # Login form interactions
│   ├── dashboard.page.ts          # Top nav + dashboard assertions
│   ├── parts.page.ts              # Parts list, categories, Add Part modal
│   └── partDetails.page.ts        # Part detail view (future expansion)
├── utils/
│   ├── testHelpers.ts             # Auth setup, shared UI actions
│   ├── waits.ts                   # Explicit wait helpers for modals / tables
│   └── selectors.md               # Selector rationale indexed per page
└── tests/
    └── part-critical.spec.ts      # All 10 critical test cases
```

---

## 10 Automated Test Cases

| ID | Title | Phase 1 Ref | Priority | Screenshot Evidence |
|----|-------|------------|----------|---------------------|
| UI-01 | Successful login with valid credentials | TC-01 | High | login_page.png ✅ |
| UI-02 | Failed login with invalid credentials shows error | TC-02 | High | login_page.png (inferred) |
| UI-03 | Dashboard loads with expected navigation | TC-04 | High | home_page.png ✅ |
| UI-04 | Navigate to Parts via top nav | TC-05 | High | home_page.png + parts_page.png ✅ |
| UI-05 | Parts list page renders with data table | TC-07 | High | parts_page.png ✅ |
| UI-06 | Search filters the parts list | TC-08 | Medium | parts_page.png ⚠️ |
| UI-07 | Navigate to Part Categories in sidebar | TC-09 | High | parts_category.png ✅ |
| UI-08 | Create a new part category via modal | TC-10 | Medium | Add_part_category.png ✅ |
| UI-09 | Create a new part with name only | TC-14 | High | Add_part.png ✅ |
| UI-10 | Add Part form rejects empty name submission | TC-16 | High | Add_part.png (inferred validation) |

---

## Selector Notes

See [utils/selectors.md](utils/selectors.md) for full selector rationale per page.

Key patterns:
- Form fields: `page.getByLabel('...')` — matches visible label text
- Buttons: `page.getByRole('button', { name: '...' })` — matches accessible name
- Nav links: `page.getByRole('link', { name: '...' })` — top nav and sidebar
- Modals: `page.getByRole('dialog')` — scopes all subsequent modal queries
- Tables: `page.locator('table')` or `.getByRole('table')`

---

## Known Limitations

- Part detail page (viewing individual part) is not tested — no detail screenshot was available
- Import from File flow is not tested — step 2 (column mapping) was not captured in screenshots
- Edit/delete part flows: no screenshot evidence for those states — excluded per SKILL.md guidance
- `demo.inventree.org` is a shared public demo — tests creating data may be affected by concurrent users
