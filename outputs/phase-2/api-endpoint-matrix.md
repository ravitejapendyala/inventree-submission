# API Endpoint Matrix — Phase 2: InvenTree Parts Module
> Generated: 2026-04-06  
> Source: Scraped schema from `https://docs.inventree.org/en/stable/api/schema/part/`  
> Total endpoints: **24**

---

## Endpoint Matrix

| # | Endpoint | Method | Entity | Purpose | Key Query Params | Request Body Fields | Response Codes | Source |
|---|----------|--------|--------|---------|-----------------|---------------------|---------------|--------|
| 1 | `/api/part/` | GET | Part | List all parts with filtering, search, pagination | `search`, `limit`, `offset`, `ordering`, `active`, `category`, `cascade`, `assembly`, `component`, `is_template`, `is_variant`, `variant_of`, `is_revision`, `revision_of`, `trackable`, `testable`, `purchaseable`, `salable`, `virtual`, `locked`, `has_stock`, `has_pricing`, `has_ipn`, `low_stock`, `depleted_stock`, `starred`, `IPN`, `IPN_regex`, `name_regex`, `bom_valid`, `created_after`, `created_before`, `parameters`, `price_breaks`, `tags` | N/A | 200 | Schema |
| 2 | `/api/part/` | POST | Part | Create a new part | — | `name`* (req), `IPN`, `description`, `category`, `assembly`, `component`, `active`, `is_template`, `variant_of`, `revision`, `purchaseable`, `salable`, `trackable`, `testable`, `virtual`, `locked`, `keywords`, `link`, `units`, `notes`, `minimum_stock`, `default_expiry`, `default_location`, `responsible`, `tags`, `image`, `copy_category_parameters`, `duplicate`, `initial_stock`, `initial_supplier` | 201 | Schema |
| 3 | `/api/part/` | PATCH | Part | Bulk partial update parts | — | Same as POST (partial) | 200 | Schema |
| 4 | `/api/part/` | PUT | Part | Bulk full replacement of parts | — | Same as POST (all required) | 200 | Schema |
| 5 | `/api/part/category/` | GET | PartCategory | List categories with filtering and search | `search`, `limit`, `offset`, `ordering`, `name`, `parent`, `cascade`, `depth`, `starred`, `structural`, `top_level`, `path_detail` | N/A | 200 | Schema |
| 6 | `/api/part/category/` | POST | PartCategory | Create a new part category | — | `name`* (req), `description`, `parent`, `default_location`, `default_keywords`, `icon`, `structural` | 201 | Schema |
| 7 | `/api/part/category/` | PATCH | PartCategory | Bulk partial update categories | — | Same as POST (partial) | 200 | Schema |
| 8 | `/api/part/category/` | PUT | PartCategory | Bulk full replacement of categories | — | Same as POST (all required) | 200 | Schema |
| 9 | `/api/part/category/parameters/` | GET | CategoryParameterTemplate | List category parameter templates | `limit`, `offset` | N/A | 200 | Schema |
| 10 | `/api/part/category/parameters/` | POST | CategoryParameterTemplate | Create category parameter template link | — | `category`* (req), `template`* (req), `default_value` | 201, 204, 200 | Schema |
| 11 | `/api/part/category/tree/` | GET | CategoryTree (slim) | Get lightweight category tree for navigation | `limit`, `offset`, `ordering` | N/A | 200 | Schema |
| 12 | `/api/part/internal-price/` | GET | PartInternalPrice | List internal price breaks | `limit`, `offset`, `ordering`, `part`, `search` | N/A | 200 | Schema |
| 13 | `/api/part/internal-price/` | POST | PartInternalPrice | Create internal price break | — | `part`* (req), `quantity`* (req), `price`, `price_currency` | 201, 204, 200 | Schema |
| 14 | `/api/part/related/` | GET | PartRelation | List related part pairs | `limit`, `offset`, `ordering`, `part`, `part_1`, `part_2`, `search` | N/A | 200 | Schema |
| 15 | `/api/part/related/` | POST | PartRelation | Create a related-parts link | — | `part_1`* (req), `part_2`* (req), `note` | 201, 204, 200 | Schema |
| 16 | `/api/part/sale-price/` | GET | PartSalePrice | List sale price breaks | `limit`, `offset`, `ordering`, `part`, `search` | N/A | 200 | Schema |
| 17 | `/api/part/sale-price/` | POST | PartSalePrice | Create sale price break | — | `part`* (req), `quantity`* (req), `price`, `price_currency` | 201, 204, 200 | Schema |
| 18 | `/api/part/stocktake/` | GET | PartStocktake | List stocktake records | `limit`, `offset`, `ordering`, `part` | N/A | 200 | Schema |
| 19 | `/api/part/stocktake/` | POST | PartStocktake | Record a manual stocktake entry | — | `part`* (req), `quantity`* (req), `item_count`, `cost_min`, `cost_min_currency`, `cost_max`, `cost_max_currency` | 201 | Schema |
| 20 | `/api/part/stocktake/` | DELETE | PartStocktake | Bulk delete stocktake entries | — | — | 204 | Schema |
| 21 | `/api/part/stocktake/generate/` | POST | StocktakeGenerate | Trigger generation of stocktake entries/report | — | `part`, `category`, `location`, `generate_entry`, `generate_report` | 201, 204, 200 | Schema |
| 22 | `/api/part/test-template/` | GET | PartTestTemplate | List test templates | `limit`, `offset`, `ordering`, `part`, `search`, `enabled`, `required`, `requires_value`, `requires_attachment`, `key`, `has_results` | N/A | 200 | Schema |
| 23 | `/api/part/test-template/` | POST | PartTestTemplate | Create test template for a (testable) part | — | `part`* (req), `test_name`* (req), `description`, `enabled`, `required`, `requires_value`, `requires_attachment`, `choices` | 201, 204, 200 | Schema |
| 24 | `/api/part/thumbs/` | GET | PartThumb | List part thumbnail images (deduplicated) | `limit`, `offset`, `search` | N/A | 200 | Schema |

> `*` = required field for POST  
> `req` = user-required (not auto-generated by server)

---

## Field Constraints Matrix — Part Entity

| Field | Type | Required | Nullable | Read-Only | Max Length | Min | Max | Default | Constraints |
|-------|------|----------|----------|-----------|-----------|-----|-----|---------|------------|
| `pk` | integer | auto | No | ✅ | — | — | — | auto | Server-generated |
| `name` | string | ✅ Yes | No | No | 100 | — | — | — | User-required |
| `IPN` | string | No | No | No | 100 | — | — | `""` | Internal Part Number |
| `description` | string | No | No | No | 250 | — | — | — | — |
| `category` | integer | No | ✅ Yes | No | — | — | — | — | FK to PartCategory |
| `assembly` | boolean | No | No | No | — | — | — | — | — |
| `component` | boolean | No | No | No | — | — | — | — | — |
| `active` | boolean | No | No | No | — | — | — | — | — |
| `is_template` | boolean | No | No | No | — | — | — | — | — |
| `variant_of` | integer | No | ✅ Yes | No | — | — | — | — | FK to Part |
| `revision` | string | No | ✅ Yes | No | 100 | — | — | `""` | — |
| `revision_of` | integer | No | ✅ Yes | No | — | — | — | — | FK to Part |
| `purchaseable` | boolean | No | No | No | — | — | — | — | — |
| `salable` | boolean | No | No | No | — | — | — | — | — |
| `trackable` | boolean | No | No | No | — | — | — | — | — |
| `testable` | boolean | No | No | No | — | — | — | — | — |
| `virtual` | boolean | No | No | No | — | — | — | — | — |
| `locked` | boolean | No | No | No | — | — | — | — | — |
| `keywords` | string | No | ✅ Yes | No | 250 | — | — | — | — |
| `link` | string | No | ✅ Yes | No | 2000 | — | — | — | URI format |
| `units` | string | No | ✅ Yes | No | 20 | — | — | — | — |
| `notes` | string | No | ✅ Yes | No | 50000 | — | — | — | Markdown |
| `minimum_stock` | number | No | No | No | — | — | — | 0.0 | double |
| `default_expiry` | integer | No | No | No | — | 0 | 9.2e18 | — | int64 |
| `default_location` | integer | No | ✅ Yes | No | — | — | — | — | FK |
| `default_supplier` | integer | No | ✅ Yes | No | — | — | — | — | FK |
| `responsible` | integer | No | ✅ Yes | No | — | — | — | — | FK |
| `creation_user` | integer | No | ✅ Yes | No | — | — | — | — | FK; often auto-set |
| `tags` | array[string] | No | No | No | — | — | — | — | — |
| `image` | string (uri) | No | ✅ Yes | No | — | — | — | — | URI |
| `remote_image` | string (uri) | No | No | No | — | — | — | — | writeOnly, URI |
| `existing_image` | string | No | No | No | — | — | — | — | writeOnly |
| `copy_category_parameters` | boolean | No | No | No | — | — | — | true | writeOnly |
| `duplicate` | object | No | No | No | — | — | — | — | writeOnly |
| `initial_stock` | object | No | No | No | — | — | — | — | writeOnly |
| `initial_supplier` | object | No | No | No | — | — | — | — | writeOnly |
| `barcode_hash` | string | auto | No | ✅ | — | — | — | auto | readOnly |
| `full_name` | string | auto | No | ✅ | — | — | — | auto | readOnly |
| `category_name` | string | auto | No | ✅ | — | — | — | auto | readOnly |
| `thumbnail` | string | auto | No | ✅ | — | — | — | auto | readOnly |
| `starred` | boolean | auto | No | ✅ | — | — | — | — | readOnly; per-user |
| `in_stock` | number | auto | ✅ Yes | ✅ | — | — | — | — | readOnly |
| `total_in_stock` | number | auto | ✅ Yes | ✅ | — | — | — | — | readOnly |
| `pricing_min` | string | auto | ✅ Yes | ✅ | — | — | — | — | readOnly; decimal |
| `pricing_max` | string | auto | ✅ Yes | ✅ | — | — | — | — | readOnly; decimal |

---

## Field Constraints Matrix — PartCategory Entity

| Field | Type | Required | Nullable | Read-Only | Max Length | Notes |
|-------|------|----------|----------|-----------|-----------|-------|
| `pk` | integer | auto | No | ✅ | — | Server-generated |
| `name` | string | ✅ Yes | No | No | 100 | User-required |
| `description` | string | No | No | No | 250 | — |
| `parent` | integer | No | ✅ Yes | No | — | FK to parent cat; null = top-level |
| `default_location` | integer | No | ✅ Yes | No | — | FK |
| `default_keywords` | string | No | ✅ Yes | No | 250 | — |
| `icon` | string | No | ✅ Yes | No | 100 | — |
| `structural` | boolean | No | No | No | — | If true, no direct parts |
| `level` | integer | auto | No | ✅ | — | Auto from tree depth |
| `pathstring` | string | auto | No | ✅ | — | Auto-computed path |
| `starred` | boolean | auto | No | ✅ | — | Per-user |
| `part_count` | integer | auto | ✅ Yes | ✅ | — | — |
| `subcategories` | integer | auto | ✅ Yes | ✅ | — | — |
| `path` | array | auto | ✅ Yes | ✅ | — | — |

---

## HTTP Method Coverage

| Method | Count | Endpoints |
|--------|-------|-----------|
| GET | 10 | part, category, cat/params, cat/tree, internal-price, related, sale-price, stocktake, test-template, thumbs |
| POST | 10 | part, category, cat/params, internal-price, related, sale-price, stocktake, stocktake/generate, test-template, (thumbs – via PATCH in practice) |
| PATCH | 2 | part, category |
| PUT | 2 | part, category |
| DELETE | 1 | stocktake (bulk) |
| **Total** | **24** | |

---

## Missing Standard REST Operations (By Entity)

| Entity | GET-List | GET-Detail | POST | PATCH-Detail | PUT-Detail | DELETE-Detail | Notes |
|--------|----------|------------|------|--------------|------------|---------------|-------|
| Part | ✅ | ❌ not in scope | ✅ | ❌ not in scope | ❌ not in scope | ❌ not in scope | Schema page only covers collection-level endpoints; detail endpoints (`/api/part/{id}/`) exist in a separate schema page |
| PartCategory | ✅ | ❌ not in scope | ✅ | ❌ not in scope | ❌ not in scope | ❌ not in scope | Same |
| CategoryParameterTemplate | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | Detail endpoints at `/api/part/category/parameters/{id}/` |
| PartInternalPrice | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | — |
| PartRelation | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | — |
| PartSalePrice | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | — |
| PartStocktake | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ (bulk) | — |
| PartTestTemplate | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | — |
| PartThumb | ✅ | ❌ | ❌ | — | — | — | Thumbs endpoint is read-only list |

> **Note:** Individual-record detail endpoints (`GET/PATCH/DELETE /api/part/{id}/`) are documented on the InvenTree API schema under a separate part-detail schema page, not the parts-collection schema page that was scraped. Tests should assume these exist at `{base}/api/part/{pk}/`, `{base}/api/part/category/{pk}/`, etc.
