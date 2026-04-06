---
name: phase-3-ui-automation
description: 
  Reads Phase 3 local source files first, especially UI screenshots, and converts critical Phase 1 manual test cases into Playwright + TypeScript UI automation for the InvenTree Parts module. Uses screenshots as the primary source of truth for visible UI behavior, labels, flows, and selectors.
---

# InvenTree Phase 3 — UI Automation from Real UI Evidence

Use this skill when the goal is to generate accurate Playwright + TypeScript UI automation for the InvenTree Parts module based on the actual application UI.

This phase must be grounded in:
1. real screenshots from the application's UI
2. corrected manual test cases from Phase 1
3. local notes or docs if provided

Do not generate documentation-only automation.

---

## Primary local source folder

Always inspect this folder first:

`agents/phase-3-ui-automation/source/`

Possible contents:
- screenshots
- docs
- notes
- manually curated flow descriptions
- copied UI observations
- exported Phase 1 outputs if placed locally

Also read these Phase 1 outputs if available:
- `outputs/phase-1/source-inventory.md`
- `outputs/phase-1/ui-observation-map.md`
- `outputs/phase-1/requirements-summary.md`
- `outputs/phase-1/ui-coverage-matrix.md`
- `outputs/phase-1/ui-manual-tests.md`
- `outputs/phase-1/ui-doc-vs-screenshot-mismatches.md`

---

## Source priority order

Use this order of trust:

1. Phase 3 screenshots in the source folder
2. Phase 1 corrected UI/manual test outputs
3. Local notes and docs in the Phase 3 source folder
4. Official docs only as supporting context
5. Inference only when clearly labeled

If there is any conflict:
- trust screenshots for visible labels, menus, navigation, buttons, tabs, forms, and layout
- use manual tests for intent and coverage
- document mismatches rather than silently assuming

---

## Objective

Convert the most critical and stable manual UI test cases into Playwright + TypeScript automation.

The goal is not to automate everything.

The goal is to automate:
- the most valuable flows
- the most stable flows
- the flows clearly supported by screenshots and Phase 1 outputs

---

## Required output scope

Generate automation for exactly **10 critical manual UI test cases**.

These 10 should be selected from Phase 1 based on:
- business importance
- user frequency
- stability of the visible UI
- confidence from screenshots
- feasibility for end-to-end automation

Typical high-value areas may include:
- login
- dashboard to parts navigation
- parts list page access
- search / filter on parts page
- create part
- view part details
- edit part
- validation behavior
- open part from table
- cancel / reset / basic negative flow if stable

Do not force all categories if the UI evidence is weak.

---

## Framework requirement

Use:
- Playwright
- TypeScript

Use Page Object Model.

---

## Required project structure

Generate a clean automation project structure like this:

```text
ui-automation/
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
├── .env.example
├── test-data/
│   └── partData.ts
├── pages/
│   ├── login.page.ts
│   ├── dashboard.page.ts
│   ├── parts.page.ts
│   └── partDetails.page.ts
├── utils/
│   ├── testHelpers.ts
│   ├── waits.ts
│   └── selectors.md
└── tests/
    └── part-critical.spec.ts