---
name: phase-2-api-analysis-tests
description: 
  Reads local Phase 2 source files first, scrapes the full InvenTree Parts API schema page to extract all available endpoints and schema definitions, then generates manual API tests and Playwright + TypeScript API automation for the Parts module.
---

# InvenTree Phase 2 — API Schema Scraping, Manual API Tests, and Playwright API Automation

Use this skill when the goal is to build Phase 2 outputs from the InvenTree Parts API schema page by scraping the full webpage first, then generating test design and automation from the extracted endpoint data.

## Primary local source folder

Always inspect this folder first:

`agents/phase-2-api-analysis-tests/source/`

Possible contents:
- schema files
- markdown docs
- screenshots
- notes
- copied request / response examples
- local helper scripts
- previously scraped schema artifacts

## Primary schema URL

Use this URL when schema artifacts are missing or outdated:

`https://docs.inventree.org/en/stable/api/schema/part/`

## Required scraper

Use a Python scraper to traverse the full schema page and extract all available endpoint sections plus schema reference data.

Expected scraper behavior:
- fetch the full HTML page
- locate every endpoint section such as `GET /api/part/`, `POST /api/part/`, `GET /api/part/category/`, and nested endpoints
- extract:
  - method
  - path
  - description
  - input parameters
  - request content types
  - request example
  - request schema
  - response status blocks
  - response examples
  - response schemas
- optionally capture schema reference objects from the `Schemas` section

Preferred scraper output files:
- `inventree_part_api_schema.md`
- `inventree_part_api_schema.json`

If the scraper file already exists locally, use it.
If scraped outputs do not exist, run the scraper before analysis.

## Source priority order

Use this order:

1. Scraped schema artifacts from the InvenTree API schema page
2. Local schema, docs, notes, and examples in the source folder
3. Screenshots that help explain real workflow dependencies
4. Official InvenTree docs for clarification
5. Inference, clearly marked

## Required scope

Cover at minimum:
- CRUD for Parts
- CRUD for Part Categories
- filtering, pagination, and search
- field-level validation
- relational integrity
- invalid payloads
- unauthorized access
- conflict scenarios

Also inspect related endpoints revealed by the scraped schema where relevant to Part workflows, such as:
- category parameter templates
- pricing
- related parts
- stocktake
- test templates
- thumbs
- part detail helper endpoints like requirements, pricing, bom validation, serial numbers

## Framework choice

Use:
- Playwright
- TypeScript
- APIRequestContext

Do not generate pytest or Python API automation in this phase.

## Phase 2 workflow

### Step 1 — Build source inventory

Scan the source folder and record:
- file name
- file type
- purpose
- whether it is scraper output, schema evidence, screenshot evidence, or notes

Output:
- `outputs/phase-2/source-inventory.md`

### Step 2 — Ensure schema scraping is completed

Check whether scraped schema artifacts already exist in the source folder.

Recommended locations:
- `agents/phase-2-api-analysis-tests/source/schema/inventree_part_api_schema.md`
- `agents/phase-2-api-analysis-tests/source/schema/inventree_part_api_schema.json`

If missing:
- run the Python schema scraper against the official schema page
- save the generated files into the source folder

Document:
- scraper file used
- schema URL scraped
- generated artifact locations

### Step 3 — Build endpoint understanding from scraper output

Use the scraped schema output as the primary basis for:
- endpoint inventory
- method map
- field constraints matrix
- relationship matrix
- request / response coverage map

Create:
- `outputs/phase-2/api-schema-analysis.md`
- `outputs/phase-2/api-endpoint-matrix.md`

Recommended endpoint matrix format:

| Endpoint | Method | Entity | Purpose | Query Params | Request Body | Response Codes | Source |
|---|---|---|---|---|---|---|---|

Recommended field matrix format:

| Entity | Field | Type | Required | Nullable | Read-only | Constraints | Evidence |
|---|---|---|---|---|---|---|---|

### Step 4 — Use screenshots and docs as supporting evidence

If screenshots or notes exist, use them only to refine:
- realistic filters
- search behavior
- workflow dependencies
- naming alignment between UI and API
- likely seed data relationships

Do not let screenshots override the scraped API schema.

### Step 5 — Generate manual API test cases

Each test case should include:
- Test Case ID
- Title
- Endpoint
- Method
- Preconditions
- Request Payload
- Steps
- Expected Status Code
- Expected Response
- Type
- Priority
- Evidence Basis

Output:
- `outputs/phase-2/api-manual-tests.md`

Required coverage:
- positive CRUD cases
- filtering, pagination, search
- required-field validation
- invalid payloads
- auth failures
- conflict or duplicate scenarios
- relation integrity checks

### Step 6 — Generate Playwright + TypeScript API automation

Create a runnable project using Playwright API testing.

Recommended structure:

```text
api-automation/
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
├── .env.example
├── test-data/
│   └── partPayloads.ts
├── utils/
│   ├── apiClient.ts
│   ├── auth.ts
│   ├── dataFactory.ts
│   └── schemaHelpers.ts
└── tests/
    ├── part-crud.spec.ts
    ├── part-categories.spec.ts
    ├── part-filters.spec.ts
    ├── part-validations.spec.ts
    └── part-related-endpoints.spec.ts