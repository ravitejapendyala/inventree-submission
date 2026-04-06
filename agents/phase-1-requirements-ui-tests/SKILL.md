---
name: inventree-phase-1-ui-test-generation
description: Extracts UI flows from documentation and screenshots to generate accurate manual test cases for InvenTree.
---

# Phase 1 — UI Requirements & Manual Test Case Generation

## 🎯 Objective
Understand the application from:
- Documentation (URLs/files)
- Screenshots (REAL UI)

Generate:
- Accurate UI understanding
- Manual test cases aligned to REAL UI

---

## 📂 Input Source

Read everything inside:

agents/phase-1-requirements-ui-tests/source/

Includes:
- docs (markdown/pdf/url content)
- screenshots (UI images)

---

## 🧠 Source Priority

1. Screenshots (REAL UI)
2. Documentation
3. Inference

---

## 🔍 Step 1 — Source Inventory

Output:
outputs/phase-1/source-inventory.md

---

## 🖼 Step 2 — UI Understanding from Screenshots

Extract:
- Pages (login, dashboard, parts)
- Fields, buttons, menus
- Navigation

Output:
outputs/phase-1/ui-observation-map.md

---

## 📄 Step 3 — Extract Requirements from Docs

Output:
outputs/phase-1/requirements-summary.md

---

## ⚖️ Step 4 — Resolve Mismatches

Compare docs vs screenshots

Output:
outputs/phase-1/ui-doc-vs-screenshot-mismatches.md

---

## 🧪 Step 5 — Generate Manual Test Cases

Rules:
- Must match UI
- Clear steps
- Expected results

Output:
outputs/phase-1/ui-manual-tests.md

Format:

| ID | Scenario | Steps | Expected Result | Priority |

---

## 📊 Step 6 — Coverage Matrix

Output:
outputs/phase-1/ui-coverage-matrix.md

---

## ❌ DO NOT

- Assume UI without screenshots
- Generate generic tests
- Ignore mismatches

---

## ✅ Output Summary

- UI understanding
- Manual test cases (aligned with UI)
- Coverage matrix