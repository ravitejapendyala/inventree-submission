# API Schema Analysis — Phase 2: InvenTree Parts Module
> Generated: 2026-04-06  
> Source: `agents/phase-2-api-analysis-tests/source/schema/inventree_part_api_schema.md` + `.json`  
> URL scraped: `https://docs.inventree.org/en/stable/api/schema/part/`  
> Total endpoints: **24**

---

## 1. Authentication

All 24 endpoints require authentication. Supported methods (per schema):

| Method | Header/Location | Format |
|--------|----------------|--------|
| `tokenAuth` | `Authorization` header | `Token <token>` |
| `basicAuth` | `Authorization` header | `Basic <base64(user:pass)>` |
| `cookieAuth` | Cookie | API key value |
| `oauth2` | `Authorization` header | OAuth2 Bearer |

**Recommended for testing:** `tokenAuth` — send header `Authorization: Token <token>`

---

## 2. Resource Groups and Entities

### 2.1 Parts — `/api/part/`

**Entity: Part**  
**Serializer:** `PartSerializer` (detail variant)

#### Writeable Fields (POST/PATCH/PUT)

| Field | Type | Max Length | Default | Required | Nullable | Constraints | Notes |
|-------|------|-----------|---------|----------|----------|-------------|-------|
| `name` | string | 100 | — | ✅ Yes | No | Part name description | Required by schema |
| `IPN` | string | 100 | `""` | No | No | Internal Part Number | Defaults to empty string |
| `description` | string | 250 | — | No | No | Part description | Optional |
| `category` | integer | — | — | No | ✅ Yes | FK to PartCategory | Can be null (uncategorised) |
| `assembly` | boolean | — | — | No | No | Can be built from other parts | — |
| `component` | boolean | — | — | No | No | Can be used to build other parts | — |
| `active` | boolean | — | — | No | No | Is this part active? | — |
| `is_template` | boolean | — | — | No | No | Is this part a template? | — |
| `variant_of` | integer | — | — | No | ✅ Yes | FK to parent template part | Nullable |
| `revision` | string | 100 | `""` | No | ✅ Yes | Revision label | — |
| `revision_of` | integer | — | — | No | ✅ Yes | FK to parent revision part | — |
| `purchaseable` | boolean | — | — | No | No | Can be purchased externally | — |
| `salable` | boolean | — | — | No | No | Can be sold to customers | — |
| `trackable` | boolean | — | — | No | No | Has per-unit tracking | — |
| `testable` | boolean | — | — | No | No | Can have test results | — |
| `virtual` | boolean | — | — | No | No | Software/license type part | — |
| `locked` | boolean | — | — | No | No | Locked = cannot be edited | — |
| `keywords` | string | 250 | — | No | ✅ Yes | Search keywords | — |
| `link` | string (uri) | 2000 | — | No | ✅ Yes | External URL | URI format enforced |
| `units` | string | 20 | — | No | ✅ Yes | Units of measure | — |
| `notes` | string | 50000 | — | No | ✅ Yes | Markdown notes | — |
| `minimum_stock` | number (double) | — | `0.0` | No | No | Minimum stock threshold | Default 0.0 |
| `default_expiry` | integer | — | — | No | No | Days until stock expires | Min: 0, Max: 9223372036854775807 |
| `default_location` | integer | — | — | No | ✅ Yes | FK to StockLocation | — |
| `default_supplier` | integer | — | — | No | ✅ Yes | FK to SupplierPart | — |
| `responsible` | integer | — | — | No | ✅ Yes | FK to Owner | — |
| `creation_user` | integer | — | — | No | ✅ Yes | FK to User | — |
| `tags` | array[string] | — | — | No | No | Tag list | — |
| `image` | string (uri) | — | — | No | ✅ Yes | Image URI | — |
| `remote_image` | string (uri) | — | — | No | No | Remote image URL | writeOnly |
| `existing_image` | string | — | — | No | No | Filename of existing image | writeOnly |
| `copy_category_parameters` | boolean | — | `true` | No | No | Copy params from category | writeOnly |
| `duplicate` | object | — | — | No | No | `DuplicatePart` schema | writeOnly — copy from another part |
| `initial_stock` | object | — | — | No | No | `InitialStock` schema | writeOnly — create with stock |
| `initial_supplier` | object | — | — | No | No | `InitialSupplier` schema | writeOnly — add supplier |

#### Read-Only Fields (GET response only)

| Field | Type | Description |
|-------|------|-------------|
| `pk` | integer | Primary key / ID |
| `full_name` | string | Formatted full name (IPN\|Name\|Revision) |
| `barcode_hash` | string | Unique barcode hash |
| `category_name` | string | Category name string |
| `category_path` | array | Full category path |
| `category_detail` | object | `Category` serializer |
| `category_default_location` | integer | Default location from category |
| `default_location_detail` | object | `DefaultLocation` serializer |
| `creation_date` | string (date) | Auto-set on creation |
| `starred` | boolean | Whether current user starred this part |
| `thumbnail` | string | Thumbnail image URL |
| `parameters` | array | Parameter values |
| `price_breaks` | array | Sale price breaks |
| `pricing_min` | string (decimal) | Min pricing |
| `pricing_max` | string (decimal) | Max pricing |
| `pricing_updated` | string (datetime) | Last pricing update |
| `in_stock` | number | Current stock |
| `total_in_stock` | number | Total including variants |
| `unallocated_stock` | number | Available stock |
| `external_stock` | number | External stock |
| `variant_stock` | number | Stock from variants |
| `ordering` | number | On order quantity |
| `building` | number | In production |
| `scheduled_to_build` | number | Scheduled for builds |
| `allocated_to_build_orders` | number | Allocated quantity (builds) |
| `allocated_to_sales_orders` | number | Allocated quantity (sales) |
| `required_for_build_orders` | integer | Required quantity |
| `required_for_sales_orders` | integer | Required quantity |
| `stock_item_count` | integer | Number of stock items |
| `revision_count` | integer | Number of revisions |

#### Required Fields for POST (schema-level)
`name`, `barcode_hash` (auto), `category_name` (auto), `full_name` (auto), `pk` (auto), `starred` (auto), `thumbnail` (auto)

**In practice, only `name` is the mandatory user-supplied field.**

---

#### GET /api/part/ — Query Parameters

| Parameter | Type | Purpose |
|-----------|------|---------|
| `search` | string | Full-text search across: IPN, category__name, description, keywords, manufacturer_parts__MPN, name, revision, supplier_parts__SKU, tags__name, tags__slug |
| `limit` | integer | Page size |
| `offset` | integer | Page start index |
| `ordering` | string | Field to order by |
| `active` | boolean | Filter: active parts only |
| `category` | integer | Filter: by category ID (or `"null"`) |
| `cascade` | boolean | Include child category parts |
| `assembly` | boolean | Filter: assembly parts |
| `component` | boolean | Filter: component parts |
| `is_template` | boolean | Filter: template parts |
| `is_variant` | boolean | Filter: variant parts |
| `variant_of` | integer | Filter: variants of specific part |
| `is_revision` | boolean | Filter: revision parts |
| `revision_of` | integer | Filter: revisions of specific part |
| `trackable` | boolean | Filter |
| `testable` | boolean | Filter |
| `purchaseable` | boolean | Filter |
| `salable` | boolean | Filter |
| `virtual` | boolean | Filter |
| `locked` | boolean | Filter |
| `has_stock` | boolean | Parts with stock > 0 |
| `has_pricing` | boolean | Parts with pricing data |
| `has_ipn` | boolean | Parts with IPN set |
| `has_units` | boolean | Parts with units set |
| `has_revisions` | boolean | Parts with revisions |
| `low_stock` | boolean | Parts below minimum stock |
| `depleted_stock` | boolean | Parts with zero stock |
| `unallocated_stock` | boolean | Parts with unallocated stock |
| `starred` | boolean | User-starred parts |
| `IPN` | string | Exact IPN match |
| `IPN_regex` | string | Regex match on IPN |
| `name_regex` | string | Regex match on name |
| `created_after` | string | Creation date filter |
| `created_before` | string | Creation date filter |
| `bom_valid` | boolean | BOM validation status |
| `ancestor` | integer | Filter by ancestor part |
| `exclude_id` | array | Exclude by IDs |
| `exclude_related` | number | Exclude related to part ID |
| `exclude_tree` | integer | Exclude entire tree |
| `in_bom_for` | integer | Parts in BOM of given part |
| `related` | number | Show parts related to given ID |
| `convert_from` | integer | Filter for conversion |
| `stock_to_build` | boolean | Required for build orders |
| `default_location` | integer | Filter by default location |
| `parameters` | boolean | Include parameters in response |
| `price_breaks` | boolean | Include price breaks in response |
| `tags` | boolean | Include tags in response |
| `category_detail` | boolean | Include category detail |
| `location_detail` | boolean | Include location detail |
| `path_detail` | boolean | Include path detail |

---

### 2.2 Part Categories — `/api/part/category/`

**Entity: PartCategory**  
**Serializer:** `CategorySerializer`

#### Fields

| Field | Type | Max Length | Required | Nullable | Read-Only | Constraints |
|-------|------|-----------|----------|----------|-----------|-------------|
| `pk` | integer | — | ✅ (auto) | No | ✅ | ID |
| `name` | string | 100 | ✅ Yes | No | No | Category name |
| `description` | string | 250 | No | No | No | Optional description |
| `parent` | integer | — | No | ✅ Yes | No | FK to parent category |
| `default_location` | integer | — | No | ✅ Yes | No | Default stock location |
| `default_keywords` | string | 250 | No | ✅ Yes | No | Default keywords for parts |
| `icon` | string | 100 | No | ✅ Yes | No | Icon identifier |
| `structural` | boolean | — | No | No | No | Structural = no parts directly assigned |
| `level` | integer | — | ✅ (auto) | No | ✅ | Depth level in tree |
| `pathstring` | string | — | ✅ (auto) | No | ✅ | Full path string |
| `starred` | boolean | — | ✅ (auto) | No | ✅ | User starred flag |
| `part_count` | integer | — | No | ✅ Yes | ✅ | Parts in this category |
| `subcategories` | integer | — | No | ✅ Yes | ✅ | Count of sub-categories |
| `parent_default_location` | integer | — | No | ✅ Yes | ✅ | Parent's default location |
| `path` | array | — | No | ✅ Yes | ✅ | Full path objects |

**Required for POST (user-supplied):** `name`

#### GET /api/part/category/ — Query Parameters

| Parameter | Purpose |
|-----------|---------|
| `search` | Searched fields: description, name, pathstring |
| `limit` / `offset` | Pagination |
| `ordering` | Sort field |
| `name` | Filter by name |
| `parent` | Filter by parent category ID |
| `cascade` | Include sub-categories |
| `depth` | Filter by category depth |
| `exclude_tree` | Exclude a tree branch |
| `path_detail` | Include path detail |
| `starred` | Filter starred categories |
| `structural` | Filter structural categories |
| `top_level` | Filter top-level only |

---

### 2.3 Category Parameter Templates — `/api/part/category/parameters/`

**Entity: CategoryParameterTemplate**  
**Serializer:** `CategoryParameterTemplateSerializer`

| Field | Type | Required | Read-Only | Constraints |
|-------|------|----------|-----------|-------------|
| `pk` | integer | ✅ (auto) | ✅ | ID |
| `category` | integer | ✅ Yes | No | FK to PartCategory |
| `template` | integer | ✅ Yes | No | FK to ParameterTemplate |
| `default_value` | string | No | No | Max 500 chars |
| `category_detail` | object | No | ✅ | Category serializer |
| `template_detail` | object | ✅ (auto) | ✅ | ParameterTemplate serializer |

**GET query params:** `limit`, `offset` only.

---

### 2.4 Category Tree — `/api/part/category/tree/`

**Entity: CategoryTree**  
**Serializer (list):** `CategoryTreeSerializer` with fields: `pk`, `name`, `parent`, `structural`, `subcategories`, `icon`

**GET query params:** `limit`, `offset`, `ordering`

---

### 2.5 Internal Pricing — `/api/part/internal-price/`

**Entity: PartInternalPrice**  
**Serializer:** `PartInternalPriceSerializer`

| Field | Type | Required | Nullable | Constraints |
|-------|------|----------|----------|-------------|
| `pk` | integer | ✅ (auto) | No | Read-only |
| `part` | integer | ✅ Yes | No | FK to Part |
| `quantity` | number (double) | ✅ Yes | No | Break quantity |
| `price` | string (decimal) | No | ✅ Yes | Pattern: `^-?\d{0,13}(?:\.\d{0,6})?$` |
| `price_currency` | string | No | No | Enum: AUD, CAD, CNY, EUR, GBP, JPY, NZD, USD |

**POST required fields:** `part`, `quantity`  
**GET query params:** `limit`, `offset`, `ordering`, `part`, `search`

---

### 2.6 Related Parts — `/api/part/related/`

**Entity: PartRelation**  
**Serializer:** `PartRelationSerializer`

| Field | Type | Required | Read-Only | Constraints |
|-------|------|----------|-----------|-------------|
| `pk` | integer | ✅ (auto) | ✅ | ID |
| `part_1` | integer | ✅ Yes | No | FK to Part |
| `part_2` | integer | ✅ Yes | No | FK to Part — "Select Related Part" |
| `note` | string | No | No | Max 500 chars |
| `part_1_detail` | object | ✅ (auto) | ✅ | Part serializer |
| `part_2_detail` | object | ✅ (auto) | ✅ | Part serializer |

**POST required fields:** `part_1`, `part_2`  
**GET query params:** `limit`, `offset`, `ordering`, `part`, `part_1`, `part_2`, `search` (part_1__name, part_2__name)

---

### 2.7 Sale Pricing — `/api/part/sale-price/`

**Entity: PartSalePrice**  
**Serializer:** `PartSalePriceSerializer`

| Field | Type | Required | Nullable | Constraints |
|-------|------|----------|----------|-------------|
| `pk` | integer | ✅ (auto) | No | Read-only |
| `part` | integer | ✅ Yes | No | FK to Part |
| `quantity` | number (double) | ✅ Yes | No | Break quantity |
| `price` | string (decimal) | No | ✅ Yes | Pattern: `^-?\d{0,13}(?:\.\d{0,6})?$` |
| `price_currency` | string | No | No | Enum: AUD, CAD, CNY, EUR, GBP, JPY, NZD, USD |

**POST required fields:** `part`, `quantity`  
**GET query params:** `limit`, `offset`, `ordering`, `part`, `search`

---

### 2.8 Stocktake — `/api/part/stocktake/`

**Entity: PartStocktake**  
**Serializer:** `PartStocktakeSerializer`

| Field | Type | Required | Read-Only | Nullable | Constraints |
|-------|------|----------|-----------|----------|-------------|
| `pk` | integer | ✅ (auto) | ✅ | No | ID |
| `part` | integer | ✅ Yes | No | No | FK to Part — "Part for stocktake" |
| `quantity` | number (double) | ✅ Yes | No | No | Stock quantity at time of count |
| `date` | string (date) | ✅ (auto) | ✅ | No | Auto-set on creation |
| `part_name` | string | ✅ (auto) | ✅ | No | Read-only |
| `item_count` | integer | No | No | No | Number of stock entries; int64, range: -9223372036854775808 to 9223372036854775807 |
| `cost_min` | string (decimal) | No | No | ✅ Yes | Cost range low; pattern `^-?\d{0,13}(?:\.\d{0,6})?$` |
| `cost_min_currency` | string | No | No | No | Enum: AUD, CAD, CNY, EUR, GBP, JPY, NZD, USD |
| `cost_max` | string (decimal) | No | No | ✅ Yes | Cost range high |
| `cost_max_currency` | string | No | No | No | Enum: same |
| `part_description` | string | No | ✅ | ✅ Yes | Read-only |
| `part_ipn` | string | No | ✅ | ✅ Yes | Read-only |
| `part_detail` | object | No | ✅ | ✅ Yes | PartBrief serializer |

**POST required fields:** `part`, `quantity`  
**DELETE:** Bulk delete — returns 204 No Content  
**GET query params:** `limit`, `offset`, `ordering`, `part`

---

### 2.9 Stocktake Generate — `/api/part/stocktake/generate/`

**Entity:** Generates stocktake entries/report  
**Serializer:** `GenerateStocktakeSerializer`

| Field | Type | Required | Nullable | Constraints |
|-------|------|----------|----------|-------------|
| `part` | integer | No | ✅ Yes | Part to generate for (and variants) |
| `category` | integer | No | ✅ Yes | Category (includes subcategories) |
| `location` | integer | No | ✅ Yes | Location (includes sub-locations) |
| `generate_entry` | boolean | No | No | Save entries; writeOnly; default false |
| `generate_report` | boolean | No | No | Generate report; writeOnly; default false |
| `output` | object | ✅ (auto) | No | DataOutput serializer; readOnly |

**POST required fields:** None user-required (all optional filters)

---

### 2.10 Test Templates — `/api/part/test-template/`

**Entity: PartTestTemplate**  
**Serializer:** `PartTestTemplateSerializer`

| Field | Type | Required | Read-Only | Nullable | Constraints |
|-------|------|----------|-----------|----------|-------------|
| `pk` | integer | ✅ (auto) | ✅ | No | ID |
| `part` | integer | ✅ Yes | No | No | FK to Part; must be testable |
| `test_name` | string | ✅ Yes | No | No | Max 100 chars |
| `key` | string | ✅ (auto) | ✅ | No | Auto-generated key |
| `results` | integer | ✅ (auto) | ✅ | No | Count of results |
| `description` | string | No | No | ✅ Yes | Max 100 chars |
| `enabled` | boolean | No | No | No | Is test enabled? |
| `required` | boolean | No | No | No | Must pass to complete |
| `requires_value` | boolean | No | No | No | Value required with result |
| `requires_attachment` | boolean | No | No | No | Attachment required |
| `choices` | string | No | No | No | Max 5000 chars comma-separated |

**POST required fields:** `part`, `test_name`  
**GET query params:** `limit`, `offset`, `ordering`, `part`, `search` (description, test_name), `enabled`, `required`, `requires_value`, `requires_attachment`, `key`, `has_results`

---

### 2.11 Thumbnails — `/api/part/thumbs/`

**Entity: PartThumb**  
**Serializer (list):** `PartThumbSerializer` — fields: `image` (uri), `count` (integer)

**GET query params:** `limit`, `offset`, `search` (IPN, category__name, description, keywords, name, revision)

---

## 3. Response Envelope (List endpoints)

All list endpoints return a paginated envelope:

```json
{
  "count": 123,
  "next": "http://...?offset=X&limit=Y",
  "previous": "http://...?offset=A&limit=B",
  "results": [...]
}
```

Required response fields: `count`, `results`.  
`next` and `previous` are nullable URIs.

---

## 4. Schema-Level Constraints Summary

| Constraint | Evidence |
|-----------|----------|
| `name` is required for Part POST | `"required": ["name", "barcode_hash", "category_name", "full_name", "pk", "starred", "thumbnail"]` — name is the only user-required field |
| `name` max 100 chars | `"maxLength": 100` |
| `description` max 250 chars | `"maxLength": 250` |
| `keywords` max 250 chars | `"maxLength": 250` |
| `link` is URI format, max 2000 | `"format": "uri", "maxLength": 2000` |
| `units` max 20 chars | `"maxLength": 20` |
| `notes` max 50,000 chars | `"maxLength": 50000` |
| `IPN` max 100 chars | `"maxLength": 100` |
| `revision` max 100 chars | `"maxLength": 100` |
| `default_expiry` min 0 | `"minimum": 0` |
| `minimum_stock` default 0.0 | `"default": 0.0` |
| Pricing fields use decimal pattern | `"^-?\d{0,13}(?:\.\d{0,6})?$"` |
| Currency enum | AUD, CAD, CNY, EUR, GBP, JPY, NZD, USD |
| Category `name` max 100 chars | `"maxLength": 100` |
| Category `description` max 250 | `"maxLength": 250` |
| Category `icon` max 100 chars | `"maxLength": 100` |
| CategoryParameterTemplate `default_value` max 500 | `"maxLength": 500` |
| PartTestTemplate `test_name` max 100 | `"maxLength": 100` |
| PartTestTemplate `choices` max 5000 | `"maxLength": 5000` |
| PartRelation `note` max 500 | `"maxLength": 500` |
| Stocktake `item_count` int64 range | min -9223372036854775808, max 9223372036854775807 |

---

## 5. write-Only Fields

These fields are accepted in POST/PATCH but never returned in GET responses:

| Field | Context | Purpose |
|-------|---------|---------|
| `copy_category_parameters` | Part | Copy parameter templates from category on create |
| `duplicate` | Part | Duplicate from another part (DuplicatePart schema) |
| `initial_stock` | Part | Create initial stock entries on part create |
| `initial_supplier` | Part | Add initial supplier info on create |
| `existing_image` | Part | Reference existing image by filename |
| `remote_image` | Part | Pull image from remote URL |
| `generate_entry` | Stocktake generate | Save stocktake entries |
| `generate_report` | Stocktake generate | Generate report |

---

## 6. Relationships Map

```
Part ──────────────────> PartCategory (category FK, nullable)
Part ──────────────────> StockLocation (default_location FK, nullable)
Part ──────────────────> SupplierPart (default_supplier FK, nullable)
Part ──────────────────> Part (variant_of FK, nullable — template variant)
Part ──────────────────> Part (revision_of FK, nullable — revision parent)
Part ──────────────────> Owner (responsible FK, nullable)
Part ──────────────────> User (creation_user FK, nullable)

PartCategory ──────────> PartCategory (parent FK, nullable)
PartCategory ──────────> StockLocation (default_location FK, nullable)

CategoryParameterTemplate > PartCategory (category FK)
CategoryParameterTemplate > ParameterTemplate (template FK)

PartInternalPrice ─────> Part (part FK)
PartSalePrice ─────────> Part (part FK)
PartRelation ──────────> Part × 2 (part_1, part_2)
PartStocktake ─────────> Part (part FK)
PartTestTemplate ──────> Part (part FK)
```
