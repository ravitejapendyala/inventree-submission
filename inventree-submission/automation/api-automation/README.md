# InvenTree Parts API — Playwright TypeScript Automation

Automated API test suite for the InvenTree Parts module, covering CRUD, filtering, validation, and integrity checks using [Playwright](https://playwright.dev/).

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 18 LTS |
| npm | ≥ 9 |
| InvenTree instance | Running at the configured `INVENTREE_BASE_URL` |

---

## Setup

### 1. Install dependencies

```bash
cd outputs/phase-2/api-automation
npm install
npx playwright install --with-deps chromium
```

> Note: Chromium is installed for Playwright internals even though these are API tests (no browser UI is launched).

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set:

```env
INVENTREE_BASE_URL=http://localhost:8000
INVENTREE_API_TOKEN=<your-token>
```

**Obtaining a token:**
- Via Django admin: `http://localhost:8000/admin/authtoken/token/`
- Via API: `POST /api/user/token/` with Basic Auth

### 3. Seed data (if the database is empty)

The `dataFactory.ts` helper creates the minimum required records (`beforeAll`) and tears them down (`afterAll`). If the database is completely empty you may also run the InvenTree demo data loader:

```bash
invoke dev.setup-test-db
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run a single spec file
npx playwright test tests/part-crud.spec.ts

# Run with verbose output
npx playwright test --reporter=list

# Run a single test by title
npx playwright test -g "AT-002"

# Open the HTML report after a run
npm run test:report
```

---

## Project Structure

```
api-automation/
├── .env.example            # Environment variable template
├── package.json
├── playwright.config.ts    # Global config — baseURL, auth headers, reporter
├── tsconfig.json
├── README.md
├── test-data/
│   └── partPayloads.ts     # Pre-built request body objects
├── utils/
│   ├── apiClient.ts        # Thin wrapper around APIRequestContext
│   ├── auth.ts             # Token validation helper
│   ├── dataFactory.ts      # Creates / deletes seed records
│   └── schemaHelpers.ts    # Response shape assertions
└── tests/
    ├── part-crud.spec.ts           # AT-001 – AT-016 (Part list, create, auth)
    ├── part-categories.spec.ts     # AT-017 – AT-023 (Category CRUD, tree, filters)
    ├── part-filters.spec.ts        # AT-008 – AT-014 (Advanced query param tests)
    ├── part-validations.spec.ts    # AT-004 – AT-007, AT-028-AT-029 (Field validation)
    └── part-related-endpoints.spec.ts  # AT-024 – AT-045 (All other endpoints)
```

---

## Authentication

All requests use `Authorization: Token <token>` header (configured globally in `playwright.config.ts`).

Auth failure tests override the header per-request using `apiClient.noAuth()`.

---

## Teardown Strategy

- Each test that creates a record stores the returned `pk`
- An `afterEach` / `afterAll` block issues `DELETE /api/part/{pk}/` (or the appropriate collection endpoint) to clean up
- Tests are **not** idempotent if teardown is skipped — re-runs on a dirty database may produce unexpected results

---

## Known Gaps

See [api-assumptions-and-gaps.md](../api-assumptions-and-gaps.md) for full details.

Key gaps:
- Detail endpoints (`/api/part/{id}/`) not covered — schema was not scraped
- Image upload (`multipart/form-data`) not tested
- Bulk PATCH semantics on `/api/part/` are ambiguous
- Write-only field side-effects (e.g. `initial_stock`) require cross-endpoint verification
