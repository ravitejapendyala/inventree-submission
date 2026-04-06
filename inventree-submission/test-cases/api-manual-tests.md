# API Manual Test Cases — Phase 2: InvenTree Parts Module
> Generated: 2026-04-06  
> Source: Scraped schema from `https://docs.inventree.org/en/stable/api/schema/part/`  
> Framework: Manual test specification (Playwright + TypeScript automation in `api-automation/`)

---

## Test Case Format

Each test case includes:
- **ID** — unique identifier
- **Title** — descriptive name
- **Endpoint** — path
- **Method** — HTTP method
- **Preconditions** — setup required
- **Request Payload / Query** — exact data
- **Steps** — execution sequence
- **Expected Status Code** — per schema
- **Expected Response** — key assertions
- **Type** — Positive / Negative / Boundary / Auth
- **Priority** — High / Medium / Low
- **Evidence** — schema reference

---

## Group 1 — Parts CRUD (`/api/part/`)

---

### AT-001 — List All Parts (Default Pagination)

| Field | Value |
|-------|-------|
| **ID** | AT-001 |
| **Title** | GET /api/part/ returns paginated list of parts |
| **Endpoint** | `GET /api/part/` |
| **Type** | Positive |
| **Priority** | High |
| **Evidence** | Schema: GET /api/part/ → 200 OK |

**Preconditions:** Authenticated user. At least one part exists.

**Request:**
```
GET /api/part/
Authorization: Token <token>
```

**Steps:**
1. Send GET request with valid auth token
2. Observe HTTP status code
3. Inspect response body structure

**Expected Status Code:** `200 OK`

**Expected Response:**
- Body is a JSON object with keys `count`, `results`, `next`, `previous`
- `count` is an integer ≥ 0
- `results` is an array
- Each result contains: `pk`, `name`, `full_name`, `barcode_hash`, `category_name`, `thumbnail`, `starred`

---

### AT-002 — Create a Part with Required Fields Only

| Field | Value |
|-------|-------|
| **ID** | AT-002 |
| **Title** | POST /api/part/ creates part with only `name` supplied |
| **Endpoint** | `POST /api/part/` |
| **Type** | Positive |
| **Priority** | High |
| **Evidence** | Schema: POST /api/part/ → 201 Created; `name` is required |

**Preconditions:** Authenticated user with create permission.

**Request:**
```json
POST /api/part/
Authorization: Token <token>
Content-Type: application/json

{
  "name": "API-TEST-PART-001"
}
```

**Steps:**
1. Send POST with valid name and auth token
2. Observe status code
3. Capture `pk` from response for cleanup

**Expected Status Code:** `201 Created`

**Expected Response:**
- `name` = `"API-TEST-PART-001"`
- `pk` is a non-zero integer
- `barcode_hash` is present (string)
- `full_name` is present
- `thumbnail` is present
- `active` = `true` (default)
- `assembly` = `false` (default)
- `component` = `true` (default)

---

### AT-003 — Create a Part with All Core Fields

| Field | Value |
|-------|-------|
| **ID** | AT-003 |
| **Title** | POST /api/part/ creates part with all main fields populated |
| **Endpoint** | `POST /api/part/` |
| **Type** | Positive |
| **Priority** | High |
| **Evidence** | Schema field constraints |

**Preconditions:** Authenticated user. At least one category exists (record its `pk`).

**Request:**
```json
POST /api/part/
Authorization: Token <token>
Content-Type: application/json

{
  "name": "API-FULL-PART-001",
  "IPN": "TEST-IPN-001",
  "description": "Full test part created by API test",
  "category": <category_pk>,
  "assembly": false,
  "component": true,
  "active": true,
  "purchaseable": true,
  "salable": true,
  "trackable": false,
  "testable": false,
  "virtual": false,
  "locked": false,
  "keywords": "api test automation",
  "link": "https://example.com/datasheet",
  "units": "pcs",
  "notes": "Created by API automation test",
  "minimum_stock": 10.0,
  "default_expiry": 365
}
```

**Steps:**
1. Get a valid category `pk` from `GET /api/part/category/`
2. Send POST with full payload
3. Observe status and response body

**Expected Status Code:** `201 Created`

**Expected Response:**
- `name` = `"API-FULL-PART-001"`
- `IPN` = `"TEST-IPN-001"`
- `description` = `"Full test part created by API test"`
- `category` = `<category_pk>`
- `keywords` = `"api test automation"`
- `units` = `"pcs"`
- `minimum_stock` ≥ 10.0
- `default_expiry` = 365

---

### AT-004 — Create Part — Missing Required Field `name`

| Field | Value |
|-------|-------|
| **ID** | AT-004 |
| **Title** | POST /api/part/ without `name` returns 400 |
| **Endpoint** | `POST /api/part/` |
| **Type** | Negative — required field validation |
| **Priority** | High |
| **Evidence** | Schema: `name` is required |

**Request:**
```json
POST /api/part/
Authorization: Token <token>
Content-Type: application/json

{
  "description": "Part with no name"
}
```

**Expected Status Code:** `400 Bad Request`

**Expected Response:**
- Response body identifies `name` as a required field
- Error message references `name` field

---

### AT-005 — Create Part — `name` Exceeds maxLength (100)

| Field | Value |
|-------|-------|
| **ID** | AT-005 |
| **Title** | POST /api/part/ with name > 100 chars returns 400 |
| **Endpoint** | `POST /api/part/` |
| **Type** | Boundary — field length |
| **Priority** | High |
| **Evidence** | Schema: `name` maxLength = 100 |

**Request:**
```json
POST /api/part/
Authorization: Token <token>
Content-Type: application/json

{
  "name": "AAAA...AAAA"  // 101 characters
}
```

**Expected Status Code:** `400 Bad Request`

**Expected Response:**
- Error referencing `name` field length constraint

---

### AT-006 — Create Part — Invalid `link` (Not a URI)

| Field | Value |
|-------|-------|
| **ID** | AT-006 |
| **Title** | POST /api/part/ with non-URI `link` returns 400 |
| **Endpoint** | `POST /api/part/` |
| **Type** | Negative — field format |
| **Priority** | Medium |
| **Evidence** | Schema: `link` format = uri, maxLength = 2000 |

**Request:**
```json
POST /api/part/
Authorization: Token <token>
Content-Type: application/json

{
  "name": "URI-Test-Part",
  "link": "not-a-valid-url"
}
```

**Expected Status Code:** `400 Bad Request`

**Expected Response:**
- Error referencing `link` field format constraint

---

### AT-007 — Create Part — `default_expiry` Below Minimum (0)

| Field | Value |
|-------|-------|
| **ID** | AT-007 |
| **Title** | POST /api/part/ with default_expiry = -1 returns 400 |
| **Endpoint** | `POST /api/part/` |
| **Type** | Boundary — numeric minimum |
| **Priority** | Medium |
| **Evidence** | Schema: `default_expiry` minimum = 0 |

**Request:**
```json
POST /api/part/
Authorization: Token <token>
Content-Type: application/json

{
  "name": "Expiry-Boundary-Part",
  "default_expiry": -1
}
```

**Expected Status Code:** `400 Bad Request`

---

### AT-008 — List Parts — Filter by `category`

| Field | Value |
|-------|-------|
| **ID** | AT-008 |
| **Title** | GET /api/part/?category=<id> returns only parts in that category |
| **Endpoint** | `GET /api/part/` |
| **Type** | Positive — filter |
| **Priority** | High |
| **Evidence** | Schema: `category` query param |

**Preconditions:** At least one part in a known category.

**Request:**
```
GET /api/part/?category=<category_pk>
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- All results have `category` = `<category_pk>` (or `category_name` matching)
- `count` ≥ 1

---

### AT-009 — List Parts — Filter by `category` with `cascade=true`

| Field | Value |
|-------|-------|
| **ID** | AT-009 |
| **Title** | GET /api/part/?category=<parent_id>&cascade=true includes sub-category parts |
| **Endpoint** | `GET /api/part/` |
| **Type** | Positive — cascade filter |
| **Priority** | Medium |
| **Evidence** | Schema: `cascade` — "If true, include items in child categories" |

**Preconditions:** Parent category with at least one child category, each containing parts.

**Request:**
```
GET /api/part/?category=<parent_id>&cascade=true
GET /api/part/?category=<parent_id>&cascade=false
```

**Expected:** `cascade=true` count ≥ `cascade=false` count (cascade includes child parts)

---

### AT-010 — List Parts — Search by Name

| Field | Value |
|-------|-------|
| **ID** | AT-010 |
| **Title** | GET /api/part/?search=<term> returns matching parts |
| **Endpoint** | `GET /api/part/` |
| **Type** | Positive — search |
| **Priority** | High |
| **Evidence** | Schema: `search` — searched fields: IPN, category__name, description, keywords, name, revision, etc. |

**Request:**
```
GET /api/part/?search=widget
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Results contain parts where name, IPN, keywords, description, or category name contains "widget"

---

### AT-011 — List Parts — Pagination with `limit` and `offset`

| Field | Value |
|-------|-------|
| **ID** | AT-011 |
| **Title** | GET /api/part/?limit=5&offset=0 returns exactly 5 results |
| **Endpoint** | `GET /api/part/` |
| **Type** | Positive — pagination |
| **Priority** | High |
| **Evidence** | Schema: `limit`, `offset` params |

**Request:**
```
GET /api/part/?limit=5&offset=0
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- `results` array has length ≤ 5
- `count` reflects total, not page size
- `next` is present if `count` > 5; `previous` is null

---

### AT-012 — List Parts — Filter `active=false`

| Field | Value |
|-------|-------|
| **ID** | AT-012 |
| **Title** | GET /api/part/?active=false returns only inactive parts |
| **Endpoint** | `GET /api/part/` |
| **Type** | Positive — boolean filter |
| **Priority** | Medium |
| **Evidence** | Schema: `active` filter param |

**Request:**
```
GET /api/part/?active=false
Authorization: Token <token>
```

**Expected:** All results have `active` = `false`

---

### AT-013 — List Parts — Filter `has_stock=true`

| Field | Value |
|-------|-------|
| **ID** | AT-013 |
| **Title** | GET /api/part/?has_stock=true returns parts with stock > 0 |
| **Endpoint** | `GET /api/part/` |
| **Type** | Positive — computed filter |
| **Priority** | Medium |
| **Evidence** | Schema: `has_stock` — "Has stock" |

**Request:**
```
GET /api/part/?has_stock=true
Authorization: Token <token>
```

**Expected:** All results have `in_stock` > 0

---

### AT-014 — List Parts — Filter by IPN Exact Match

| Field | Value |
|-------|-------|
| **ID** | AT-014 |
| **Title** | GET /api/part/?IPN=<exact> returns only parts with that exact IPN |
| **Endpoint** | `GET /api/part/` |
| **Type** | Positive — filter |
| **Priority** | Medium |
| **Evidence** | Schema: `IPN` — "Filter by exact IPN" |

**Request:**
```
GET /api/part/?IPN=widget.blue
Authorization: Token <token>
```

**Expected:** Results contain only parts with `IPN` = `"widget.blue"` exactly

---

### AT-015 — List Parts — Unauthenticated Request Returns 401/403

| Field | Value |
|-------|-------|
| **ID** | AT-015 |
| **Title** | GET /api/part/ without auth returns 401 or 403 |
| **Endpoint** | `GET /api/part/` |
| **Type** | Auth — unauthorized |
| **Priority** | High |
| **Evidence** | All endpoints require auth per schema |

**Request:**
```
GET /api/part/
(No Authorization header)
```

**Expected Status Code:** `401 Unauthorized` or `403 Forbidden`

---

### AT-016 — Create Part — Unauthenticated Returns 401/403

| Field | Value |
|-------|-------|
| **ID** | AT-016 |
| **Title** | POST /api/part/ without auth is rejected |
| **Endpoint** | `POST /api/part/` |
| **Type** | Auth — unauthorized |
| **Priority** | High |
| **Evidence** | All write endpoints require auth |

**Request:**
```json
POST /api/part/
Content-Type: application/json

{ "name": "Unauthorized Part" }
```

**Expected Status Code:** `401` or `403`

---

## Group 2 — Part Categories CRUD (`/api/part/category/`)

---

### AT-017 — List All Categories

| Field | Value |
|-------|-------|
| **ID** | AT-017 |
| **Title** | GET /api/part/category/ returns paginated category list |
| **Endpoint** | `GET /api/part/category/` |
| **Type** | Positive |
| **Priority** | High |

**Request:**
```
GET /api/part/category/
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Keys: `count`, `results`, `next`, `previous`
- Each result contains: `pk`, `name`, `level`, `pathstring`, `starred`

---

### AT-018 — Create a New Category

| Field | Value |
|-------|-------|
| **ID** | AT-018 |
| **Title** | POST /api/part/category/ creates a new top-level category |
| **Endpoint** | `POST /api/part/category/` |
| **Type** | Positive |
| **Priority** | High |
| **Evidence** | Schema: POST → 201; `name` required |

**Request:**
```json
POST /api/part/category/
Authorization: Token <token>
Content-Type: application/json

{
  "name": "API-TEST-CATEGORY",
  "description": "Category created by API test"
}
```

**Expected Status Code:** `201 Created`

**Expected Response:**
- `name` = `"API-TEST-CATEGORY"`
- `pk` is non-zero integer
- `level` = 0 (top-level, no parent)
- `parent` = null
- `structural` = false (default)

---

### AT-019 — Create a Sub-Category

| Field | Value |
|-------|-------|
| **ID** | AT-019 |
| **Title** | POST /api/part/category/ creates a child category under a parent |
| **Endpoint** | `POST /api/part/category/` |
| **Type** | Positive |
| **Priority** | Medium |

**Preconditions:** A parent category exists (record `pk`).

**Request:**
```json
POST /api/part/category/
Authorization: Token <token>
Content-Type: application/json

{
  "name": "API-SUB-CATEGORY",
  "parent": <parent_pk>
}
```

**Expected Status Code:** `201 Created`

**Expected Response:**
- `parent` = `<parent_pk>`
- `level` = 1
- `pathstring` contains parent name

---

### AT-020 — Create Category — Missing Required `name`

| Field | Value |
|-------|-------|
| **ID** | AT-020 |
| **Title** | POST /api/part/category/ without `name` returns 400 |
| **Endpoint** | `POST /api/part/category/` |
| **Type** | Negative — required field |
| **Priority** | High |

**Request:**
```json
POST /api/part/category/
Authorization: Token <token>
Content-Type: application/json

{
  "description": "No name category"
}
```

**Expected Status Code:** `400 Bad Request`

---

### AT-021 — List Categories — Filter by `parent`

| Field | Value |
|-------|-------|
| **ID** | AT-021 |
| **Title** | GET /api/part/category/?parent=<id> returns only direct children |
| **Endpoint** | `GET /api/part/category/` |
| **Type** | Positive — filter |
| **Priority** | Medium |

**Request:**
```
GET /api/part/category/?parent=<parent_pk>
Authorization: Token <token>
```

**Expected:** All results have `parent` = `<parent_pk>`

---

### AT-022 — List Top-Level Categories

| Field | Value |
|-------|-------|
| **ID** | AT-022 |
| **Title** | GET /api/part/category/?top_level=true returns only root categories |
| **Endpoint** | `GET /api/part/category/` |
| **Type** | Positive — filter |
| **Priority** | Medium |
| **Evidence** | Schema: `top_level` filter param |

**Request:**
```
GET /api/part/category/?top_level=true
Authorization: Token <token>
```

**Expected:** All results have `parent` = null and `level` = 0

---

### AT-023 — Get Category Tree

| Field | Value |
|-------|-------|
| **ID** | AT-023 |
| **Title** | GET /api/part/category/tree/ returns slim category tree |
| **Endpoint** | `GET /api/part/category/tree/` |
| **Type** | Positive |
| **Priority** | Medium |
| **Evidence** | Schema: CategoryTree serializer (pk, name, parent, structural, subcategories, icon) |

**Request:**
```
GET /api/part/category/tree/
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Results contain: `pk`, `name`, `parent`, `structural`, `subcategories`, `icon`
- No heavy Part data in these results

---

## Group 3 — Category Parameter Templates (`/api/part/category/parameters/`)

---

### AT-024 — List Category Parameter Templates

| Field | Value |
|-------|-------|
| **ID** | AT-024 |
| **Title** | GET /api/part/category/parameters/ returns a list |
| **Endpoint** | `GET /api/part/category/parameters/` |
| **Type** | Positive |
| **Priority** | Low |

**Request:**
```
GET /api/part/category/parameters/
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Each result contains: `pk`, `category`, `template`, `template_detail`

---

### AT-025 — Create Category Parameter Template

| Field | Value |
|-------|-------|
| **ID** | AT-025 |
| **Title** | POST /api/part/category/parameters/ creates a parameter template link |
| **Endpoint** | `POST /api/part/category/parameters/` |
| **Type** | Positive |
| **Priority** | Low |
| **Evidence** | Schema: required `category`, `template` |

**Preconditions:** Category and ParameterTemplate both exist.

**Request:**
```json
POST /api/part/category/parameters/
Authorization: Token <token>
Content-Type: application/json

{
  "category": <category_pk>,
  "template": <template_pk>,
  "default_value": "100"
}
```

**Expected Status Code:** `201 Created`

---

## Group 4 — Internal Pricing (`/api/part/internal-price/`)

---

### AT-026 — List Internal Price Breaks

| Field | Value |
|-------|-------|
| **ID** | AT-026 |
| **Title** | GET /api/part/internal-price/ returns list |
| **Endpoint** | `GET /api/part/internal-price/` |
| **Type** | Positive |
| **Priority** | Medium |

**Request:**
```
GET /api/part/internal-price/?part=<part_pk>
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Array of internal price objects with `pk`, `part`, `quantity`, `price`, `price_currency`

---

### AT-027 — Create Internal Price Break

| Field | Value |
|-------|-------|
| **ID** | AT-027 |
| **Title** | POST /api/part/internal-price/ creates an internal price break |
| **Endpoint** | `POST /api/part/internal-price/` |
| **Type** | Positive |
| **Priority** | Medium |
| **Evidence** | Schema: required `part`, `quantity` |

**Request:**
```json
POST /api/part/internal-price/
Authorization: Token <token>
Content-Type: application/json

{
  "part": <part_pk>,
  "quantity": 100.0,
  "price": "1.500000",
  "price_currency": "USD"
}
```

**Expected Status Code:** `201 Created`

**Expected Response:**
- `part` = `<part_pk>`
- `quantity` = 100.0
- `price` = `"1.500000"` (decimal string)
- `price_currency` = `"USD"`

---

### AT-028 — Create Internal Price — Invalid Currency

| Field | Value |
|-------|-------|
| **ID** | AT-028 |
| **Title** | POST /api/part/internal-price/ with invalid currency code returns 400 |
| **Endpoint** | `POST /api/part/internal-price/` |
| **Type** | Negative — enum validation |
| **Priority** | Medium |
| **Evidence** | Schema: `price_currency` enum: AUD, CAD, CNY, EUR, GBP, JPY, NZD, USD |

**Request:**
```json
{
  "part": <part_pk>,
  "quantity": 1.0,
  "price": "5.00",
  "price_currency": "INVALID"
}
```

**Expected Status Code:** `400 Bad Request`

---

### AT-029 — Create Internal Price — Invalid Decimal Pattern

| Field | Value |
|-------|-------|
| **ID** | AT-029 |
| **Title** | POST /api/part/internal-price/ with price violating decimal pattern returns 400 |
| **Endpoint** | `POST /api/part/internal-price/` |
| **Type** | Negative — format validation |
| **Priority** | Medium |
| **Evidence** | Schema: `price` pattern `^-?\d{0,13}(?:\.\d{0,6})?$` |

**Request:**
```json
{
  "part": <part_pk>,
  "quantity": 1.0,
  "price": "1.12345678901"
}
```

**Expected Status Code:** `400 Bad Request`

---

## Group 5 — Sale Pricing (`/api/part/sale-price/`)

---

### AT-030 — List Sale Price Breaks

| Field | Value |
|-------|-------|
| **ID** | AT-030 |
| **Title** | GET /api/part/sale-price/ returns list |
| **Endpoint** | `GET /api/part/sale-price/` |
| **Type** | Positive |
| **Priority** | Medium |

**Request:**
```
GET /api/part/sale-price/?part=<part_pk>
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

---

### AT-031 — Create Sale Price Break

| Field | Value |
|-------|-------|
| **ID** | AT-031 |
| **Title** | POST /api/part/sale-price/ creates a sale price break |
| **Endpoint** | `POST /api/part/sale-price/` |
| **Type** | Positive |
| **Priority** | Medium |
| **Evidence** | Schema: required `part`, `quantity` |

**Request:**
```json
POST /api/part/sale-price/
Authorization: Token <token>
Content-Type: application/json

{
  "part": <part_pk>,
  "quantity": 10.0,
  "price": "9.990000",
  "price_currency": "USD"
}
```

**Expected Status Code:** `201 Created`

---

## Group 6 — Related Parts (`/api/part/related/`)

---

### AT-032 — List Related Parts

| Field | Value |
|-------|-------|
| **ID** | AT-032 |
| **Title** | GET /api/part/related/ returns related part pairs |
| **Endpoint** | `GET /api/part/related/` |
| **Type** | Positive |
| **Priority** | Medium |

**Request:**
```
GET /api/part/related/?part=<part_pk>
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Results have: `pk`, `part_1`, `part_2`, `part_1_detail`, `part_2_detail`, `note`

---

### AT-033 — Create Related Parts Link

| Field | Value |
|-------|-------|
| **ID** | AT-033 |
| **Title** | POST /api/part/related/ creates a related-parts relationship |
| **Endpoint** | `POST /api/part/related/` |
| **Type** | Positive |
| **Priority** | Medium |
| **Evidence** | Schema: required `part_1`, `part_2` |

**Preconditions:** Two parts exist (part A and part B).

**Request:**
```json
POST /api/part/related/
Authorization: Token <token>
Content-Type: application/json

{
  "part_1": <part_a_pk>,
  "part_2": <part_b_pk>,
  "note": "These parts are alternatives"
}
```

**Expected Status Code:** `201 Created`

**Expected Response:**
- `part_1` = `<part_a_pk>`
- `part_2` = `<part_b_pk>`
- `note` = `"These parts are alternatives"`
- `part_1_detail` and `part_2_detail` present

---

### AT-034 — Create Related Parts — Same Part Twice (Self-Relation)

| Field | Value |
|-------|-------|
| **ID** | AT-034 |
| **Title** | POST /api/part/related/ with part_1 == part_2 should return 400 |
| **Endpoint** | `POST /api/part/related/` |
| **Type** | Negative — relational integrity |
| **Priority** | Medium |

**Request:**
```json
{
  "part_1": <same_part_pk>,
  "part_2": <same_part_pk>
}
```

**Expected Status Code:** `400 Bad Request`

> **Note:** Confirmation needed — schema does not explicitly document this constraint but it is logically invalid and typically enforced by InvenTree.

---

## Group 7 — Stocktake (`/api/part/stocktake/`)

---

### AT-035 — List Stocktake Records

| Field | Value |
|-------|-------|
| **ID** | AT-035 |
| **Title** | GET /api/part/stocktake/ returns stocktake entries |
| **Endpoint** | `GET /api/part/stocktake/` |
| **Type** | Positive |
| **Priority** | Medium |

**Request:**
```
GET /api/part/stocktake/
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Results contain: `pk`, `part`, `quantity`, `date`, `part_name`

---

### AT-036 — Create Stocktake Entry

| Field | Value |
|-------|-------|
| **ID** | AT-036 |
| **Title** | POST /api/part/stocktake/ records a stock count |
| **Endpoint** | `POST /api/part/stocktake/` |
| **Type** | Positive |
| **Priority** | Medium |
| **Evidence** | Schema: required `part`, `quantity` |

**Request:**
```json
POST /api/part/stocktake/
Authorization: Token <token>
Content-Type: application/json

{
  "part": <part_pk>,
  "quantity": 50.0,
  "item_count": 3,
  "cost_min": "1.50",
  "cost_min_currency": "USD",
  "cost_max": "2.50",
  "cost_max_currency": "USD"
}
```

**Expected Status Code:** `201 Created`

**Expected Response:**
- `part` = `<part_pk>`
- `quantity` = 50.0
- `date` is set to today (read-only, auto-generated)
- `part_name` present

---

### AT-037 — Bulk Delete Stocktake Entries

| Field | Value |
|-------|-------|
| **ID** | AT-037 |
| **Title** | DELETE /api/part/stocktake/ bulk deletes entries |
| **Endpoint** | `DELETE /api/part/stocktake/` |
| **Type** | Positive — destructive |
| **Priority** | Medium |
| **Evidence** | Schema: DELETE → 204 No Content |

**Request:**
```
DELETE /api/part/stocktake/
Authorization: Token <token>
```

**Expected Status Code:** `204 No Content`

> **Assumption:** May require filter params or body to limit scope of deletion. Confirm with admin before running against production data.

---

### AT-038 — Generate Stocktake Report

| Field | Value |
|-------|-------|
| **ID** | AT-038 |
| **Title** | POST /api/part/stocktake/generate/ triggers stocktake generation |
| **Endpoint** | `POST /api/part/stocktake/generate/` |
| **Type** | Positive |
| **Priority** | Low |
| **Evidence** | Schema: `generate_entry`, `generate_report` booleans |

**Request:**
```json
POST /api/part/stocktake/generate/
Authorization: Token <token>
Content-Type: application/json

{
  "part": <part_pk>,
  "generate_entry": true,
  "generate_report": false
}
```

**Expected Status Code:** `201 Created`

---

## Group 8 — Test Templates (`/api/part/test-template/`)

---

### AT-039 — List Test Templates

| Field | Value |
|-------|-------|
| **ID** | AT-039 |
| **Title** | GET /api/part/test-template/ returns list of test templates |
| **Endpoint** | `GET /api/part/test-template/` |
| **Type** | Positive |
| **Priority** | Medium |

**Request:**
```
GET /api/part/test-template/?part=<testable_part_pk>
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Results contain: `pk`, `part`, `test_name`, `key`, `results`, `enabled`, `required`, `requires_value`, `requires_attachment`

---

### AT-040 — Create Test Template

| Field | Value |
|-------|-------|
| **ID** | AT-040 |
| **Title** | POST /api/part/test-template/ creates a test template for a testable part |
| **Endpoint** | `POST /api/part/test-template/` |
| **Type** | Positive |
| **Priority** | Medium |
| **Evidence** | Schema: required `part`, `test_name` |

**Preconditions:** Part exists with `testable = true`.

**Request:**
```json
POST /api/part/test-template/
Authorization: Token <token>
Content-Type: application/json

{
  "part": <testable_part_pk>,
  "test_name": "Visual Inspection",
  "description": "Check for physical damage",
  "enabled": true,
  "required": true,
  "requires_value": false,
  "requires_attachment": false
}
```

**Expected Status Code:** `201 Created`

**Expected Response:**
- `test_name` = `"Visual Inspection"`
- `key` is present (auto-generated, read-only)
- `results` = 0 (no results yet)
- `required` = true

---

### AT-041 — Create Test Template for Non-Testable Part

| Field | Value |
|-------|-------|
| **ID** | AT-041 |
| **Title** | POST /api/part/test-template/ for a part with testable=false returns 400 |
| **Endpoint** | `POST /api/part/test-template/` |
| **Type** | Negative — constraints |
| **Priority** | Medium |

**Preconditions:** Part with `testable = false`.

**Request:**
```json
{
  "part": <non_testable_part_pk>,
  "test_name": "Some Test"
}
```

**Expected Status Code:** `400 Bad Request`

---

### AT-042 — Create Test Template — Missing `test_name`

| Field | Value |
|-------|-------|
| **ID** | AT-042 |
| **Title** | POST /api/part/test-template/ without test_name returns 400 |
| **Endpoint** | `POST /api/part/test-template/` |
| **Type** | Negative — required field |
| **Priority** | Medium |

**Request:**
```json
{
  "part": <testable_part_pk>
}
```

**Expected Status Code:** `400 Bad Request`

---

### AT-043 — Filter Test Templates by `required=true`

| Field | Value |
|-------|-------|
| **ID** | AT-043 |
| **Title** | GET /api/part/test-template/?required=true returns only required templates |
| **Endpoint** | `GET /api/part/test-template/` |
| **Type** | Positive — filter |
| **Priority** | Low |

**Request:**
```
GET /api/part/test-template/?required=true
Authorization: Token <token>
```

**Expected:** All results have `required` = true

---

## Group 9 — Thumbnails (`/api/part/thumbs/`)

---

### AT-044 — List Part Thumbnails

| Field | Value |
|-------|-------|
| **ID** | AT-044 |
| **Title** | GET /api/part/thumbs/ returns deduplicated thumbnail list |
| **Endpoint** | `GET /api/part/thumbs/` |
| **Type** | Positive |
| **Priority** | Low |
| **Evidence** | Schema: PartThumb — `image` (uri), `count` (integer) |

**Request:**
```
GET /api/part/thumbs/
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

**Expected Response:**
- Results contain: `image`, `count`
- `image` is a URI string
- `count` is an integer ≥ 1

---

### AT-045 — Search Thumbnails by Part Name

| Field | Value |
|-------|-------|
| **ID** | AT-045 |
| **Title** | GET /api/part/thumbs/?search=<name> filters thumbnail list |
| **Endpoint** | `GET /api/part/thumbs/` |
| **Type** | Positive — search |
| **Priority** | Low |
| **Evidence** | Schema: `search` — searched fields: IPN, category__name, description, keywords, name, revision |

**Request:**
```
GET /api/part/thumbs/?search=widget
Authorization: Token <token>
```

**Expected Status Code:** `200 OK`

---

## Test Case Summary

| ID | Endpoint | Method | Type | Priority |
|----|----------|--------|------|----------|
| AT-001 | `/api/part/` | GET | Positive | High |
| AT-002 | `/api/part/` | POST | Positive | High |
| AT-003 | `/api/part/` | POST | Positive (full fields) | High |
| AT-004 | `/api/part/` | POST | Negative (missing name) | High |
| AT-005 | `/api/part/` | POST | Boundary (name length) | High |
| AT-006 | `/api/part/` | POST | Negative (link format) | Medium |
| AT-007 | `/api/part/` | POST | Boundary (expiry min) | Medium |
| AT-008 | `/api/part/` | GET | Positive (category filter) | High |
| AT-009 | `/api/part/` | GET | Positive (cascade) | Medium |
| AT-010 | `/api/part/` | GET | Positive (search) | High |
| AT-011 | `/api/part/` | GET | Positive (pagination) | High |
| AT-012 | `/api/part/` | GET | Positive (active filter) | Medium |
| AT-013 | `/api/part/` | GET | Positive (has_stock) | Medium |
| AT-014 | `/api/part/` | GET | Positive (IPN filter) | Medium |
| AT-015 | `/api/part/` | GET | Auth (no token) | High |
| AT-016 | `/api/part/` | POST | Auth (no token) | High |
| AT-017 | `/api/part/category/` | GET | Positive | High |
| AT-018 | `/api/part/category/` | POST | Positive | High |
| AT-019 | `/api/part/category/` | POST | Positive (sub-cat) | Medium |
| AT-020 | `/api/part/category/` | POST | Negative (missing name) | High |
| AT-021 | `/api/part/category/` | GET | Positive (parent filter) | Medium |
| AT-022 | `/api/part/category/` | GET | Positive (top_level) | Medium |
| AT-023 | `/api/part/category/tree/` | GET | Positive | Medium |
| AT-024 | `/api/part/category/parameters/` | GET | Positive | Low |
| AT-025 | `/api/part/category/parameters/` | POST | Positive | Low |
| AT-026 | `/api/part/internal-price/` | GET | Positive | Medium |
| AT-027 | `/api/part/internal-price/` | POST | Positive | Medium |
| AT-028 | `/api/part/internal-price/` | POST | Negative (bad currency) | Medium |
| AT-029 | `/api/part/internal-price/` | POST | Negative (price format) | Medium |
| AT-030 | `/api/part/sale-price/` | GET | Positive | Medium |
| AT-031 | `/api/part/sale-price/` | POST | Positive | Medium |
| AT-032 | `/api/part/related/` | GET | Positive | Medium |
| AT-033 | `/api/part/related/` | POST | Positive | Medium |
| AT-034 | `/api/part/related/` | POST | Negative (self-relation) | Medium |
| AT-035 | `/api/part/stocktake/` | GET | Positive | Medium |
| AT-036 | `/api/part/stocktake/` | POST | Positive | Medium |
| AT-037 | `/api/part/stocktake/` | DELETE | Positive | Medium |
| AT-038 | `/api/part/stocktake/generate/` | POST | Positive | Low |
| AT-039 | `/api/part/test-template/` | GET | Positive | Medium |
| AT-040 | `/api/part/test-template/` | POST | Positive | Medium |
| AT-041 | `/api/part/test-template/` | POST | Negative (non-testable) | Medium |
| AT-042 | `/api/part/test-template/` | POST | Negative (missing name) | Medium |
| AT-043 | `/api/part/test-template/` | GET | Positive (required filter) | Low |
| AT-044 | `/api/part/thumbs/` | GET | Positive | Low |
| AT-045 | `/api/part/thumbs/` | GET | Positive (search) | Low |

**Total: 45 manual test cases**
