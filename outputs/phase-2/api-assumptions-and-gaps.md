# API Assumptions and Gaps — Phase 2: InvenTree Parts Module
> Generated: 2026-04-06  
> Source: Scraped schema from `https://docs.inventree.org/en/stable/api/schema/part/`

---

## 1. Working Assumptions

These are decisions made during analysis and test authoring that require confirmation or configuration before test execution.

---

### A-001 — Base URL Is `http://localhost:8000`

| Item | Detail |
|------|--------|
| **ID** | A-001 |
| **Assumption** | Tests target a locally running InvenTree instance at `http://localhost:8000` |
| **Rationale** | InvenTree defaults to port 8000 in development. No production URL was specified in source materials. |
| **Impact** | If the test environment uses a different host or port, the `.env` file must be updated before running the automation suite |
| **Configuration** | Set `INVENTREE_BASE_URL` in `.env.example` → `.env` |

---

### A-002 — Auth Token Is Obtained via Django Admin or Setup Wizard

| Item | Detail |
|------|--------|
| **ID** | A-002 |
| **Assumption** | A valid API token is pre-provisioned and stored in the environment as `INVENTREE_API_TOKEN` |
| **Rationale** | The schema documents tokenAuth (`Authorization: Token <token>`) as the primary auth mechanism. The token acquisition process (login endpoint, admin panel, or CLI) is not part of the scraped schema page and is assumed to be out-of-scope for the test run. |
| **Impact** | If no token is available, all tests will fail with 401/403 |
| **Resolution** | Document token setup in README; provide a setup script or manual step in test prerequisites |
| **InvenTree endpoint** | `POST /api/user/token/` (not in scraped schema — assumed to exist per InvenTree documentation) |

---

### A-003 — Seed Data Must Pre-Exist

| Item | Detail |
|------|--------|
| **ID** | A-003 |
| **Assumption** | The database contains at least: one category, one testable part, and one non-testable part when tests run |
| **Rationale** | Several test cases require referencing existing `pk` values for category, part, and parameter template records. The scraped schema page does not provide a way to set up these fixtures via the collection-level API alone (detail endpoints are out of scope). |
| **Impact** | Tests AT-003, AT-008, AT-019, AT-025, AT-027, AT-033, AT-036, AT-038, AT-040, AT-041 depend on seeded data |
| **Resolution** | Provide a `dataFactory.ts` helper that creates the minimum required records via POST during `beforeAll`, and deletes them during `afterAll` teardown |

---

### A-004 — Currency Enum Values Are a Hard-Coded Subset

| Item | Detail |
|------|--------|
| **ID** | A-004 |
| **Assumption** | The `price_currency` field accepts only: `AUD`, `CAD`, `CNY`, `EUR`, `GBP`, `JPY`, `NZD`, `USD` |
| **Rationale** | These are the currency codes listed in the scraped schema for `PartInternalPrice` and `PartSalePrice` serializers |
| **Impact** | Using any other ISO 4217 code (e.g. `CHF`, `SEK`) may return a 400 error — tests AT-028 and AT-031 depend on this constraint being enforced |
| **Risk** | InvenTree may be configured to use a different currency subset depending on the `INVENTREE_SETTINGS` — the actual enum may be dynamic |
| **Resolution** | Verify against a running instance; update `partPayloads.ts` if the actual enum differs |

---

### A-005 — Bulk PATCH on `/api/part/` Behaviour Is Ambiguous

| Item | Detail |
|------|--------|
| **ID** | A-005 |
| **Assumption** | PATCH to `/api/part/` performs a bulk partial update on multiple parts |
| **Rationale** | The schema documents PATCH → 200 for `/api/part/`, which is unusual at the collection level. The request body schema for PATCH is not distinct from POST in the scraped page, making the exact semantics unclear. |
| **Impact** | No automated test covers PATCH `/api/part/` in the current suite (AT-001 through AT-016) |
| **Resolution** | Manual exploratory test recommended; if bulk PATCH is documented elsewhere, add a test case |

---

### A-006 — Decimal Precision Pattern Verified from Schema

| Item | Detail |
|------|--------|
| **ID** | A-006 |
| **Assumption** | `price` fields accept up to 6 decimal places and 13 integer digits |
| **Rationale** | Schema pattern `^-?\d{0,13}(?:\.\d{0,6})?$` was captured directly from the scraped JSON |
| **Impact** | AT-029 (decimal format validation) uses a 7-decimal value `1.12345678901` to force a 400; if InvenTree rounds rather than rejects, this test will need revision |

---

### A-007 — Self-Relation Constraint for `/api/part/related/` Is Assumed

| Item | Detail |
|------|--------|
| **ID** | A-007 |
| **Assumption** | Setting `part_1 == part_2` in a PartRelation POST should return 400 |
| **Rationale** | A self-relation is logically invalid. This constraint is not explicitly documented in the scraped schema, but is a typical API guard in InvenTree. |
| **Impact** | AT-034 may receive 201 instead of 400 if the constraint is not enforced at the API level |
| **Risk Level** | Medium |
| **Resolution** | Mark as exploratory; update expected status code after running against live instance |

---

## 2. Schema Gaps

These are limitations inherent to the source schema page that could not be resolved without access to additional documentation or a live instance.

---

### G-001 — Detail Endpoints (`/api/part/{id}/`) Not Scraped

| Item | Detail |
|------|--------|
| **ID** | G-001 |
| **Type** | Missing scope |
| **Description** | The scraped schema page (`https://docs.inventree.org/en/stable/api/schema/part/`) covers collection-level endpoints only. Detail-level endpoints — `GET /api/part/{id}/`, `PUT /api/part/{id}/`, `PATCH /api/part/{id}/`, `DELETE /api/part/{id}/` — are present in the API but were not captured by the scraper. |
| **Impact** | No automated test cases exist for: single-part retrieval, updating a specific part, deleting a specific part |
| **Missing Tests** | `GET /api/part/{id}/` → retrieve by PK; `PATCH /api/part/{id}/` → update single part; `DELETE /api/part/{id}/` → delete part |
| **Resolution** | Re-run scraper against `https://docs.inventree.org/en/stable/api/schema/` (full schema) or use OpenAPI spec if available; add detail-endpoint specs to Phase 3 |

---

### G-002 — No Sorting / Ordering Constraints Documented per Endpoint

| Item | Detail |
|------|--------|
| **ID** | G-002 |
| **Type** | Incomplete parameter documentation |
| **Description** | The schema lists `ordering` as a parameter for some endpoints but does not enumerate the valid field names. The ordering fields were inferred from test experience (e.g. `name`, `-name`, `pk`). |
| **Impact** | Tests using `?ordering=name` may fail if the field name differs from InvenTree's actual implementation |
| **Resolution** | Verify by inspecting the DRF `OrderingFilter` fields in InvenTree source code |

---

### G-003 — Write-Only Fields Cannot Be Validated via GET

| Item | Detail |
|------|--------|
| **ID** | G-003 |
| **Type** | Observability gap |
| **Description** | The following fields are marked `writeOnly: true` and never appear in GET responses: `initial_stock`, `initial_supplier`, `copy_category_parameters`, `duplicate` (part copy), `revision_of`, `responsible` |
| **Impact** | After a POST, the effect of write-only fields (e.g., initial stock created) cannot be confirmed by re-fetching the Part object — side-effects must be verified via separate endpoints (e.g., `/api/stock/`) |
| **Resolution** | Add cross-endpoint verification in automation: after POST with `initial_stock`, check `/api/stock/?part=<pk>` to confirm stock record was created |

---

### G-004 — `image` Upload Field — Multipart Not Tested

| Item | Detail |
|------|--------|
| **ID** | G-004 |
| **Type** | Out-of-scope operation |
| **Description** | The `image` field on Part supports file upload (PNG/JPEG). This requires `multipart/form-data` encoding, which is different from JSON API calls. |
| **Impact** | Image upload functionality is not covered by the current test suite |
| **Resolution** | Add a dedicated multipart upload test case using Playwright's `fetch` with `FormData` or a direct `fs.createReadStream` approach |

---

### G-005 — Pagination: No Maximum `limit` Documented

| Item | Detail |
|------|--------|
| **ID** | G-005 |
| **Type** | Undocumented constraint |
| **Description** | The schema documents `limit` and `offset` parameters but does not specify a maximum `limit` value. InvenTree may enforce a server-side maximum (e.g. 200). |
| **Impact** | Tests using `limit=1000` may receive fewer results without error, potentially causing false positives |
| **Resolution** | Test with `limit=1000` and verify whether capped; document the cap in assumptions |

---

### G-006 — `category/parameters/` Filter Params Unclear

| Item | Detail |
|------|--------|
| **ID** | G-006 |
| **Type** | Incomplete schema |
| **Description** | The scraped schema for `GET /api/part/category/parameters/` does not list filter parameters. It is not clear whether `?category=<pk>` or `?template=<pk>` filtering is supported. |
| **Impact** | AT-024 tests a bare list only; category-scoped filter testing is skipped |
| **Resolution** | Test manually and observe supported filter params via 400 responses or DRF browsable API |

---

### G-007 — `stocktake/generate/` — Part Field Optionality Unclear

| Item | Detail |
|------|--------|
| **ID** | G-007 |
| **Type** | Ambiguous required vs optional |
| **Description** | The `StocktakeGenerate` serializer shows `part` as not explicitly required in the schema. It is unclear whether omitting `part` triggers a global stocktake report or a 400 error. |
| **Impact** | AT-038 uses `part` in the payload; the case of omitting `part` is untested |
| **Resolution** | Run both variants manually; document which fields are truly required |

---

### G-008 — `/api/part/thumbs/` — POST Behaviour Unknown

| Item | Detail |
|------|--------|
| **ID** | G-008 |
| **Type** | Undocumented operation |
| **Description** | The schema documents `GET` and `PATCH` for `/api/part/thumbs/` only. There is no POST method to upload new thumbnails documented in the scraped schema. |
| **Impact** | Thumbnail creation testing is not included in the automation suite |
| **Resolution** | Inspect the InvenTree source `PartThumbsView` to confirm whether POST is supported |

---

## 3. Environment Preconditions Checklist

Before running the automation suite, confirm:

| # | Precondition | Owner | Status |
|---|-------------|-------|--------|
| 1 | InvenTree instance running at `INVENTREE_BASE_URL` | QA/Dev | ⬜ |
| 2 | Valid API token in `.env` as `INVENTREE_API_TOKEN` | QA/Dev | ⬜ |
| 3 | At least one PartCategory exists (note its `pk`) | QA/Dev | ⬜ |
| 4 | At least one Part with `testable=true` exists | QA/Dev | ⬜ |
| 5 | At least one Part with `testable=false` exists | QA/Dev | ⬜ |
| 6 | `dataFactory.ts` teardown removes all test-created records | Dev | ⬜ |
| 7 | Node.js (≥ 18) and npm installed locally | Dev | ⬜ |
| 8 | Playwright installed (`npx playwright install`) | Dev | ⬜ |

---

## 4. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Detail endpoints exist but not tested | High | High | Add Phase 3 scope for full OpenAPI scrape |
| Currency enum differs in non-standard InvenTree build | Low | Medium | Parameterize enum in test data; catch 400 gracefully |
| Self-relation constraint unenforced | Medium | Low | Mark AT-034 as exploratory |
| Write-only field side-effects not verified | High | Medium | Add cross-endpoint assertions in automation |
| Max pagination limit surprises | Low | Low | Clamp test limit values to ≤ 100 |
| Token expires during long test run | Low | High | Implement token refresh or use long-lived tokens in test env |
