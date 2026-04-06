# Source Inventory — Phase 2
> Generated: 2026-04-06  
> Purpose: Catalogue every file in `agents/phase-2-api-analysis-tests/source/` before analysis.

---

## 1. Folder Structure

```
agents/phase-2-api-analysis-tests/source/
├── docs/          (empty)
├── notes/         (empty)
├── screenshots/
│   ├── post_api_part_schema.png
│   └── schema_page.png
├── schema/
│   ├── inventree_part_api_schema.json
│   └── inventree_part_api_schema.md
└── scripts/
    └── inventree_part_schema_scraper.py
```

---

## 2. Scraped Schema Artifacts (Primary Source)

| File | Format | Size Indicator | Purpose | Status |
|------|--------|---------------|---------|--------|
| `schema/inventree_part_api_schema.md` | Markdown | 3594 lines | Full endpoint documentation extracted from `https://docs.inventree.org/en/stable/api/schema/part/` | ✅ Present — used as primary source |
| `schema/inventree_part_api_schema.json` | JSON | 2655 lines | Structured JSON version of same extraction | ✅ Present — used for structured analysis |

### Scraper Details
- **Scraper file:** `scripts/inventree_part_schema_scraper.py`
- **Source URL:** `https://docs.inventree.org/en/stable/api/schema/part/`
- **Last run:** Exit code 0 (successful) — confirmed via terminal context
- **Total endpoints extracted:** 24
- **Scraper output saved to:** `agents/phase-2-api-analysis-tests/source/schema/`

---

## 3. Screenshots

| File | Dimensions (estimated) | Content | Used As |
|------|----------------------|---------|---------|
| `screenshots/schema_page.png` | Full page | InvenTree API schema docs page overview | Supporting context |
| `screenshots/post_api_part_schema.png` | Partial page | POST /api/part/ request schema detail | Supporting context |

---

## 4. Scripts

| File | Language | Purpose |
|------|----------|---------|
| `scripts/inventree_part_schema_scraper.py` | Python | Fetches full HTML of schema page, extracts all endpoint sections, request parameters, request/response schemas, and outputs to `.md` and `.json` |

---

## 5. Docs and Notes

- `docs/` folder: **empty**
- `notes/` folder: **empty**

---

## 6. Endpoint Index (from scraped artifacts)

24 endpoints extracted across 7 resource groups:

| # | Method | Endpoint | Resource Group |
|---|--------|----------|----------------|
| 1 | GET | `/api/part/` | Parts — list |
| 2 | PATCH | `/api/part/` | Parts — bulk patch |
| 3 | POST | `/api/part/` | Parts — create |
| 4 | PUT | `/api/part/` | Parts — bulk update |
| 5 | GET | `/api/part/category/` | Categories — list |
| 6 | PATCH | `/api/part/category/` | Categories — bulk patch |
| 7 | POST | `/api/part/category/` | Categories — create |
| 8 | PUT | `/api/part/category/` | Categories — bulk update |
| 9 | GET | `/api/part/category/parameters/` | Category Parameter Templates — list |
| 10 | POST | `/api/part/category/parameters/` | Category Parameter Templates — create |
| 11 | GET | `/api/part/category/tree/` | Category Tree — list |
| 12 | GET | `/api/part/internal-price/` | Internal Pricing — list |
| 13 | POST | `/api/part/internal-price/` | Internal Pricing — create |
| 14 | GET | `/api/part/related/` | Related Parts — list |
| 15 | POST | `/api/part/related/` | Related Parts — create |
| 16 | GET | `/api/part/sale-price/` | Sale Pricing — list |
| 17 | POST | `/api/part/sale-price/` | Sale Pricing — create |
| 18 | DELETE | `/api/part/stocktake/` | Stocktake — bulk delete |
| 19 | GET | `/api/part/stocktake/` | Stocktake — list |
| 20 | POST | `/api/part/stocktake/` | Stocktake — create entry |
| 21 | POST | `/api/part/stocktake/generate/` | Stocktake — generate report |
| 22 | GET | `/api/part/test-template/` | Test Templates — list |
| 23 | POST | `/api/part/test-template/` | Test Templates — create |
| 24 | GET | `/api/part/thumbs/` | Thumbnails — list |

---

## 7. Inventory Summary

| Category | Count | Status |
|----------|-------|--------|
| Scraped schema artifacts | 2 | ✅ Present — primary source |
| Screenshots | 2 | Present — supporting only |
| Scraper scripts | 1 | Present |
| Docs files | 0 | Folder empty |
| Notes files | 0 | Folder empty |
| **Total endpoints covered** | **24** | From scraped schema |
