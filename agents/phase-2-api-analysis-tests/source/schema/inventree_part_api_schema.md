# InvenTree Parts API Schema Extraction

Source: `https://docs.inventree.org/en/stable/api/schema/part/`

Total endpoints extracted: **24**

## Endpoint Index

- [GET /api/part/](#get-api-part)
- [PATCH /api/part/](#patch-api-part)
- [POST /api/part/](#post-api-part)
- [PUT /api/part/](#put-api-part)
- [GET /api/part/category/](#get-api-part-category)
- [PATCH /api/part/category/](#patch-api-part-category)
- [POST /api/part/category/](#post-api-part-category)
- [PUT /api/part/category/](#put-api-part-category)
- [GET /api/part/category/parameters/](#get-api-part-category-parameters)
- [POST /api/part/category/parameters/](#post-api-part-category-parameters)
- [GET /api/part/category/tree/](#get-api-part-category-tree)
- [GET /api/part/internal-price/](#get-api-part-internal-price)
- [POST /api/part/internal-price/](#post-api-part-internal-price)
- [GET /api/part/related/](#get-api-part-related)
- [POST /api/part/related/](#post-api-part-related)
- [GET /api/part/sale-price/](#get-api-part-sale-price)
- [POST /api/part/sale-price/](#post-api-part-sale-price)
- [DELETE /api/part/stocktake/](#delete-api-part-stocktake)
- [GET /api/part/stocktake/](#get-api-part-stocktake)
- [POST /api/part/stocktake/](#post-api-part-stocktake)
- [POST /api/part/stocktake/generate/](#post-api-part-stocktake-generate)
- [GET /api/part/test-template/](#get-api-part-test-template)
- [POST /api/part/test-template/](#post-api-part-test-template)
- [GET /api/part/thumbs/](#get-api-part-thumbs)

## GET /api/part/
<a id="get-api-part"></a>

Doc anchor: `#get-apipart`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| active | query | boolean |  | No |  |
| ancestor | query | integer |  | No |  |
| assembly | query | boolean |  | No |  |
| bom_valid | query | boolean |  | No | BOM Valid |
| cascade | query | boolean |  | No | If true, include items in child categories of the given category |
| category | query | integer |  | No | Filter by numeric category ID or the literal 'null' |
| category_detail | query | boolean | False | No |  |
| component | query | boolean |  | No |  |
| convert_from | query | integer |  | No |  |
| created_after | query | string |  | No | Updated after |
| created_before | query | string |  | No | Updated before |
| default_location | query | integer |  | No | Default Location |
| depleted_stock | query | boolean |  | No | Depleted Stock |
| exclude_id | query | array |  | No | Exclude parts with these IDs (comma-separated) |
| exclude_related | query | number |  | No | Exclude parts related to this part ID |
| exclude_tree | query | integer |  | No |  |
| has_ipn | query | boolean |  | No | Has IPN |
| has_pricing | query | boolean |  | No | Has Pricing |
| has_revisions | query | boolean |  | No | Has Revisions |
| has_stock | query | boolean |  | No | Has stock |
| has_units | query | boolean |  | No | Has units |
| in_bom_for | query | integer |  | No |  |
| IPN | query | string |  | No | Filter by exact IPN (internal part number) |
| IPN_regex | query | string |  | No | Filter by regex on IPN (internal part number) |
| is_revision | query | boolean |  | No | Is Revision |
| is_template | query | boolean |  | No |  |
| is_variant | query | boolean |  | No | Is Variant |
| limit | query | integer |  | No | Number of results to return per page. |
| location_detail | query | boolean | False | No | Include detailed information about the stock location in the response |
| locked | query | boolean |  | No |  |
| low_stock | query | boolean |  | No | Low stock |
| name_regex | query | string |  | No | Filter by name (regex) |
| offset | query | integer |  | No | The initial index from which to return the results. |
| ordering | query | string |  | No | Which field to use when ordering the results. |
| parameters | query | boolean | False | No | Include part parameters in response |
| path_detail | query | boolean | False | No |  |
| price_breaks | query | boolean | False | No |  |
| purchaseable | query | boolean |  | No |  |
| related | query | number |  | No | Show parts related to this part ID |
| revision_of | query | integer |  | No |  |
| salable | query | boolean |  | No |  |
| search | query | string |  | No | A search term. Searched fields: IPN, category__name, description, keywords, manufacturer_parts__MPN, name, revision, supplier_parts__SKU, tags__name, tags__slug. |
| starred | query | boolean |  | No | Starred |
| stock_to_build | query | boolean |  | No | Required for Build Order |
| tags | query | boolean | False | No |  |
| tags_name | query | string |  | No |  |
| tags_slug | query | string |  | No |  |
| testable | query | boolean |  | No |  |
| trackable | query | boolean |  | No |  |
| unallocated_stock | query | boolean |  | No | Unallocated stock |
| variant_of | query | integer |  | No | Variant Of |
| virtual | query | boolean |  | No |  |

### Request Body

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "IPN" : "string" , "active" : true , "allocated_to_build_orders" : 10.12 , "allocated_to_sales_orders" : 10.12 , "assembly" : true , "barcode_hash" : "string" , "building" : 10.12 , "category" : 0 , "category_default_location" : 0 , "category_detail" : null , "category_name" : "string" , "category_path" : [ {} ], "component" : true , "copy_category_parameters" : true , "creation_date" : "2022-04-13" , "creation_user" : 0 , "default_expiry" : 181 , "default_location" : 0 , "default_location_detail" : null , "default_supplier" : 0 , "description" : "string" , "duplicate" : null , "existing_image" : "string" , "external_stock" : 10.12 , "full_name" : "string" , "image" : "string" , "in_stock" : 10.12 , "initial_stock" : null , "initial_supplier" : null , "is_template" : true , "keywords" : "string" , "link" : "string" , "locked" : true , "minimum_stock" : 10.12 , "name" : "string" , "notes" : "string" , "ordering" : 10.12 , "parameters" : [ { "data" : "string" , "data_numeric" : 10.12 , "model_id" : 260 , "model_type" : null , "note" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null , "updated" : "2022-04-13T15:42:05.901Z" , "updated_by" : 0 , "updated_by_detail" : null } ], "pk" : 0 , "price_breaks" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ], "pricing_max" : "string" , "pricing_min" : "string" , "pricing_updated" : "2022-04-13T15:42:05.901Z" , "purchaseable" : true , "remote_image" : "string" , "required_for_build_orders" : 0 , "required_for_sales_orders" : 0 , "responsible" : 0 , "revision" : "string" , "revision_count" : 0 , "revision_of" : 0 , "salable" : true , "scheduled_to_build" : 10.12 , "starred" : true , "stock_item_count" : 0 , "tags" : [ "string" ], "testable" : true , "thumbnail" : "string" , "total_in_stock" : 10.12 , "trackable" : true , "unallocated_stock" : 10.12 , "units" : "string" , "variant_of" : 0 , "variant_stock" : 10.12 , "virtual" : true } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/Part" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

## PATCH /api/part/
<a id="patch-api-part"></a>

Doc anchor: `#patch-apipart`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "IPN" : "string" , "active" : true , "allocated_to_build_orders" : 10.12 , "allocated_to_sales_orders" : 10.12 , "assembly" : true , "barcode_hash" : "string" , "building" : 10.12 , "category" : 0 , "category_default_location" : 0 , "category_detail" : null , "category_name" : "string" , "category_path" : [ {} ], "component" : true , "copy_category_parameters" : true , "creation_date" : "2022-04-13" , "creation_user" : 0 , "default_expiry" : 23 , "default_location" : 0 , "default_location_detail" : null , "default_supplier" : 0 , "description" : "string" , "duplicate" : null , "existing_image" : "string" , "external_stock" : 10.12 , "full_name" : "string" , "image" : "string" , "in_stock" : 10.12 , "initial_stock" : null , "initial_supplier" : null , "is_template" : true , "keywords" : "string" , "link" : "string" , "locked" : true , "minimum_stock" : 10.12 , "name" : "string" , "notes" : "string" , "ordering" : 10.12 , "parameters" : [ { "data" : "string" , "data_numeric" : 10.12 , "model_id" : 74 , "model_type" : null , "note" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null , "updated" : "2022-04-13T15:42:05.901Z" , "updated_by" : 0 , "updated_by_detail" : null } ], "pk" : 0 , "price_breaks" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ], "pricing_max" : "string" , "pricing_min" : "string" , "pricing_updated" : "2022-04-13T15:42:05.901Z" , "purchaseable" : true , "remote_image" : "string" , "required_for_build_orders" : 0 , "required_for_sales_orders" : 0 , "responsible" : 0 , "revision" : "string" , "revision_count" : 0 , "revision_of" : 0 , "salable" : true , "scheduled_to_build" : 10.12 , "starred" : true , "stock_item_count" : 0 , "tags" : [ "string" ], "testable" : true , "thumbnail" : "string" , "total_in_stock" : 10.12 , "trackable" : true , "unallocated_stock" : 10.12 , "units" : "string" , "variant_of" : 0 , "variant_stock" : 10.12 , "virtual" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for complete detail information of a part.\n\nUsed when displaying all details of a single component." , "properties" : { "IPN" : { "default" : "" , "maxLength" : 100 , "type" : "string" }, "active" : { "description" : "Is this part active?" , "type" : "boolean" }, "allocated_to_build_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "allocated_to_sales_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "assembly" : { "description" : "Can this part be built from other parts?" , "type" : "boolean" }, "barcode_hash" : { "description" : "Unique hash of barcode data" , "readOnly" : true , "type" : "string" }, "building" : { "description" : "Quantity of this part currently being in production" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "category" : { "nullable" : true , "type" : "integer" }, "category_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "category_name" : { "readOnly" : true , "type" : "string" }, "category_path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "component" : { "description" : "Can this part be used to build other parts?" , "type" : "boolean" }, "copy_category_parameters" : { "default" : true , "description" : "Copy parameter templates from selected part category" , "type" : "boolean" , "writeOnly" : true }, "creation_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "creation_user" : { "nullable" : true , "type" : "integer" }, "default_expiry" : { "description" : "Expiry time (in days) for stock items of this part" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : 0 , "type" : "integer" }, "default_location" : { "description" : "Where is this item normally stored?" , "nullable" : true , "type" : "integer" }, "default_location_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/DefaultLocation" } ], "nullable" : true , "readOnly" : true }, "default_supplier" : { "description" : "Default supplier part" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Part description (optional)" , "maxLength" : 250 , "type" : "string" }, "duplicate" : { "allOf" : [ { "$ref" : "#/components/schemas/DuplicatePart" } ], "description" : "Copy initial data from another Part" , "title" : "Duplicate Part" , "writeOnly" : true }, "existing_image" : { "description" : "Filename of an existing part image" , "type" : "string" , "writeOnly" : true }, "external_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "full_name" : { "description" : "Format a 'full name' for this Part based on the format PART_NAME_FORMAT defined in InvenTree settings." , "readOnly" : true , "type" : "string" }, "image" : { "format" : "uri" , "nullable" : true , "type" : "string" }, "in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "initial_stock" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialStock" } ], "description" : "Create Part with initial stock quantity" , "writeOnly" : true }, "initial_supplier" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialSupplier" } ], "description" : "Add initial supplier information for this part" , "title" : "Supplier Information" , "writeOnly" : true }, "is_template" : { "description" : "Is this part a template part?" , "type" : "boolean" }, "keywords" : { "description" : "Part keywords to improve visibility in search results" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "link" : { "description" : "Link to external URL" , "format" : "uri" , "maxLength" : 2000 , "nullable" : true , "type" : "string" }, "locked" : { "description" : "Locked parts cannot be edited" , "type" : "boolean" }, "minimum_stock" : { "default" : 0.0 , "format" : "double" , "type" : "number" }, "name" : { "description" : "Part name" , "maxLength" : 100 , "type" : "string" }, "notes" : { "description" : "Markdown notes (optional)" , "maxLength" : 50000 , "nullable" : true , "type" : "string" }, "ordering" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "On Order" , "type" : "number" }, "parameters" : { "items" : { "$ref" : "#/components/schemas/Parameter" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price_breaks" : { "items" : { "$ref" : "#/components/schemas/PartSalePrice" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pricing_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "purchaseable" : { "description" : "Can this part be purchased from external suppliers?" , "type" : "boolean" }, "remote_image" : { "description" : "URL of remote image file" , "format" : "uri" , "type" : "string" , "writeOnly" : true }, "required_for_build_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "required_for_sales_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "responsible" : { "nullable" : true , "type" : "integer" }, "revision" : { "default" : "" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "revision_count" : { "nullable" : true , "readOnly" : true , "title" : "Revisions" , "type" : "integer" }, "revision_of" : { "description" : "Is this part a revision of another part?" , "nullable" : true , "type" : "integer" }, "salable" : { "description" : "Can this part be sold to customers?" , "type" : "boolean" }, "scheduled_to_build" : { "description" : "Outstanding quantity of this part scheduled to be built" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "starred" : { "description" : "Return \"true\" if the part is starred by the current user." , "readOnly" : true , "type" : "boolean" }, "stock_item_count" : { "nullable" : true , "readOnly" : true , "title" : "Stock Items" , "type" : "integer" }, "tags" : { "items" : { "type" : "string" }, "type" : "array" }, "testable" : { "description" : "Can this part have test results recorded against it?" , "type" : "boolean" }, "thumbnail" : { "readOnly" : true , "type" : "string" }, "total_in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "Total Stock" , "type" : "number" }, "trackable" : { "description" : "Does this part have tracking for unique items?" , "type" : "boolean" }, "unallocated_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "units" : { "description" : "Units of measure for this part" , "maxLength" : 20 , "nullable" : true , "type" : "string" }, "variant_of" : { "description" : "Is this part a variant of another part?" , "nullable" : true , "type" : "integer" }, "variant_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "virtual" : { "description" : "Is this a virtual part, such as a software product or license?" , "type" : "boolean" } }, "required" : [ "barcode_hash" , "category_name" , "full_name" , "name" , "pk" , "starred" , "thumbnail" ], "type" : "object" }`

## POST /api/part/
<a id="post-api-part"></a>

Doc anchor: `#post-apipart`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "IPN" : "string" , "active" : true , "allocated_to_build_orders" : 10.12 , "allocated_to_sales_orders" : 10.12 , "assembly" : true , "barcode_hash" : "string" , "building" : 10.12 , "category" : 0 , "category_default_location" : 0 , "category_detail" : null , "category_name" : "string" , "category_path" : [ {} ], "component" : true , "copy_category_parameters" : true , "creation_date" : "2022-04-13" , "creation_user" : 0 , "default_expiry" : 110 , "default_location" : 0 , "default_location_detail" : null , "default_supplier" : 0 , "description" : "string" , "duplicate" : null , "existing_image" : "string" , "external_stock" : 10.12 , "full_name" : "string" , "image" : "string" , "in_stock" : 10.12 , "initial_stock" : null , "initial_supplier" : null , "is_template" : true , "keywords" : "string" , "link" : "string" , "locked" : true , "minimum_stock" : 10.12 , "name" : "string" , "notes" : "string" , "ordering" : 10.12 , "parameters" : [ { "data" : "string" , "data_numeric" : 10.12 , "model_id" : 262 , "model_type" : null , "note" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null , "updated" : "2022-04-13T15:42:05.901Z" , "updated_by" : 0 , "updated_by_detail" : null } ], "pk" : 0 , "price_breaks" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ], "pricing_max" : "string" , "pricing_min" : "string" , "pricing_updated" : "2022-04-13T15:42:05.901Z" , "purchaseable" : true , "remote_image" : "string" , "required_for_build_orders" : 0 , "required_for_sales_orders" : 0 , "responsible" : 0 , "revision" : "string" , "revision_count" : 0 , "revision_of" : 0 , "salable" : true , "scheduled_to_build" : 10.12 , "starred" : true , "stock_item_count" : 0 , "tags" : [ "string" ], "testable" : true , "thumbnail" : "string" , "total_in_stock" : 10.12 , "trackable" : true , "unallocated_stock" : 10.12 , "units" : "string" , "variant_of" : 0 , "variant_stock" : 10.12 , "virtual" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for complete detail information of a part.\n\nUsed when displaying all details of a single component." , "properties" : { "IPN" : { "default" : "" , "maxLength" : 100 , "type" : "string" }, "active" : { "description" : "Is this part active?" , "type" : "boolean" }, "allocated_to_build_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "allocated_to_sales_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "assembly" : { "description" : "Can this part be built from other parts?" , "type" : "boolean" }, "barcode_hash" : { "description" : "Unique hash of barcode data" , "readOnly" : true , "type" : "string" }, "building" : { "description" : "Quantity of this part currently being in production" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "category" : { "nullable" : true , "type" : "integer" }, "category_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "category_name" : { "readOnly" : true , "type" : "string" }, "category_path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "component" : { "description" : "Can this part be used to build other parts?" , "type" : "boolean" }, "copy_category_parameters" : { "default" : true , "description" : "Copy parameter templates from selected part category" , "type" : "boolean" , "writeOnly" : true }, "creation_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "creation_user" : { "nullable" : true , "type" : "integer" }, "default_expiry" : { "description" : "Expiry time (in days) for stock items of this part" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : 0 , "type" : "integer" }, "default_location" : { "description" : "Where is this item normally stored?" , "nullable" : true , "type" : "integer" }, "default_location_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/DefaultLocation" } ], "nullable" : true , "readOnly" : true }, "default_supplier" : { "description" : "Default supplier part" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Part description (optional)" , "maxLength" : 250 , "type" : "string" }, "duplicate" : { "allOf" : [ { "$ref" : "#/components/schemas/DuplicatePart" } ], "description" : "Copy initial data from another Part" , "title" : "Duplicate Part" , "writeOnly" : true }, "existing_image" : { "description" : "Filename of an existing part image" , "type" : "string" , "writeOnly" : true }, "external_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "full_name" : { "description" : "Format a 'full name' for this Part based on the format PART_NAME_FORMAT defined in InvenTree settings." , "readOnly" : true , "type" : "string" }, "image" : { "format" : "uri" , "nullable" : true , "type" : "string" }, "in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "initial_stock" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialStock" } ], "description" : "Create Part with initial stock quantity" , "writeOnly" : true }, "initial_supplier" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialSupplier" } ], "description" : "Add initial supplier information for this part" , "title" : "Supplier Information" , "writeOnly" : true }, "is_template" : { "description" : "Is this part a template part?" , "type" : "boolean" }, "keywords" : { "description" : "Part keywords to improve visibility in search results" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "link" : { "description" : "Link to external URL" , "format" : "uri" , "maxLength" : 2000 , "nullable" : true , "type" : "string" }, "locked" : { "description" : "Locked parts cannot be edited" , "type" : "boolean" }, "minimum_stock" : { "default" : 0.0 , "format" : "double" , "type" : "number" }, "name" : { "description" : "Part name" , "maxLength" : 100 , "type" : "string" }, "notes" : { "description" : "Markdown notes (optional)" , "maxLength" : 50000 , "nullable" : true , "type" : "string" }, "ordering" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "On Order" , "type" : "number" }, "parameters" : { "items" : { "$ref" : "#/components/schemas/Parameter" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price_breaks" : { "items" : { "$ref" : "#/components/schemas/PartSalePrice" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pricing_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "purchaseable" : { "description" : "Can this part be purchased from external suppliers?" , "type" : "boolean" }, "remote_image" : { "description" : "URL of remote image file" , "format" : "uri" , "type" : "string" , "writeOnly" : true }, "required_for_build_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "required_for_sales_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "responsible" : { "nullable" : true , "type" : "integer" }, "revision" : { "default" : "" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "revision_count" : { "nullable" : true , "readOnly" : true , "title" : "Revisions" , "type" : "integer" }, "revision_of" : { "description" : "Is this part a revision of another part?" , "nullable" : true , "type" : "integer" }, "salable" : { "description" : "Can this part be sold to customers?" , "type" : "boolean" }, "scheduled_to_build" : { "description" : "Outstanding quantity of this part scheduled to be built" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "starred" : { "description" : "Return \"true\" if the part is starred by the current user." , "readOnly" : true , "type" : "boolean" }, "stock_item_count" : { "nullable" : true , "readOnly" : true , "title" : "Stock Items" , "type" : "integer" }, "tags" : { "items" : { "type" : "string" }, "type" : "array" }, "testable" : { "description" : "Can this part have test results recorded against it?" , "type" : "boolean" }, "thumbnail" : { "readOnly" : true , "type" : "string" }, "total_in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "Total Stock" , "type" : "number" }, "trackable" : { "description" : "Does this part have tracking for unique items?" , "type" : "boolean" }, "unallocated_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "units" : { "description" : "Units of measure for this part" , "maxLength" : 20 , "nullable" : true , "type" : "string" }, "variant_of" : { "description" : "Is this part a variant of another part?" , "nullable" : true , "type" : "integer" }, "variant_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "virtual" : { "description" : "Is this a virtual part, such as a software product or license?" , "type" : "boolean" } }, "required" : [ "barcode_hash" , "category_name" , "full_name" , "name" , "pk" , "starred" , "thumbnail" ], "type" : "object" }`

## PUT /api/part/
<a id="put-api-part"></a>

Doc anchor: `#put-apipart`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "IPN" : "string" , "active" : true , "allocated_to_build_orders" : 10.12 , "allocated_to_sales_orders" : 10.12 , "assembly" : true , "barcode_hash" : "string" , "building" : 10.12 , "category" : 0 , "category_default_location" : 0 , "category_detail" : null , "category_name" : "string" , "category_path" : [ {} ], "component" : true , "copy_category_parameters" : true , "creation_date" : "2022-04-13" , "creation_user" : 0 , "default_expiry" : 71 , "default_location" : 0 , "default_location_detail" : null , "default_supplier" : 0 , "description" : "string" , "duplicate" : null , "existing_image" : "string" , "external_stock" : 10.12 , "full_name" : "string" , "image" : "string" , "in_stock" : 10.12 , "initial_stock" : null , "initial_supplier" : null , "is_template" : true , "keywords" : "string" , "link" : "string" , "locked" : true , "minimum_stock" : 10.12 , "name" : "string" , "notes" : "string" , "ordering" : 10.12 , "parameters" : [ { "data" : "string" , "data_numeric" : 10.12 , "model_id" : 86 , "model_type" : null , "note" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null , "updated" : "2022-04-13T15:42:05.901Z" , "updated_by" : 0 , "updated_by_detail" : null } ], "pk" : 0 , "price_breaks" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ], "pricing_max" : "string" , "pricing_min" : "string" , "pricing_updated" : "2022-04-13T15:42:05.901Z" , "purchaseable" : true , "remote_image" : "string" , "required_for_build_orders" : 0 , "required_for_sales_orders" : 0 , "responsible" : 0 , "revision" : "string" , "revision_count" : 0 , "revision_of" : 0 , "salable" : true , "scheduled_to_build" : 10.12 , "starred" : true , "stock_item_count" : 0 , "tags" : [ "string" ], "testable" : true , "thumbnail" : "string" , "total_in_stock" : 10.12 , "trackable" : true , "unallocated_stock" : 10.12 , "units" : "string" , "variant_of" : 0 , "variant_stock" : 10.12 , "virtual" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for complete detail information of a part.\n\nUsed when displaying all details of a single component." , "properties" : { "IPN" : { "default" : "" , "maxLength" : 100 , "type" : "string" }, "active" : { "description" : "Is this part active?" , "type" : "boolean" }, "allocated_to_build_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "allocated_to_sales_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "assembly" : { "description" : "Can this part be built from other parts?" , "type" : "boolean" }, "barcode_hash" : { "description" : "Unique hash of barcode data" , "readOnly" : true , "type" : "string" }, "building" : { "description" : "Quantity of this part currently being in production" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "category" : { "nullable" : true , "type" : "integer" }, "category_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "category_name" : { "readOnly" : true , "type" : "string" }, "category_path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "component" : { "description" : "Can this part be used to build other parts?" , "type" : "boolean" }, "copy_category_parameters" : { "default" : true , "description" : "Copy parameter templates from selected part category" , "type" : "boolean" , "writeOnly" : true }, "creation_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "creation_user" : { "nullable" : true , "type" : "integer" }, "default_expiry" : { "description" : "Expiry time (in days) for stock items of this part" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : 0 , "type" : "integer" }, "default_location" : { "description" : "Where is this item normally stored?" , "nullable" : true , "type" : "integer" }, "default_location_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/DefaultLocation" } ], "nullable" : true , "readOnly" : true }, "default_supplier" : { "description" : "Default supplier part" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Part description (optional)" , "maxLength" : 250 , "type" : "string" }, "duplicate" : { "allOf" : [ { "$ref" : "#/components/schemas/DuplicatePart" } ], "description" : "Copy initial data from another Part" , "title" : "Duplicate Part" , "writeOnly" : true }, "existing_image" : { "description" : "Filename of an existing part image" , "type" : "string" , "writeOnly" : true }, "external_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "full_name" : { "description" : "Format a 'full name' for this Part based on the format PART_NAME_FORMAT defined in InvenTree settings." , "readOnly" : true , "type" : "string" }, "image" : { "format" : "uri" , "nullable" : true , "type" : "string" }, "in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "initial_stock" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialStock" } ], "description" : "Create Part with initial stock quantity" , "writeOnly" : true }, "initial_supplier" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialSupplier" } ], "description" : "Add initial supplier information for this part" , "title" : "Supplier Information" , "writeOnly" : true }, "is_template" : { "description" : "Is this part a template part?" , "type" : "boolean" }, "keywords" : { "description" : "Part keywords to improve visibility in search results" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "link" : { "description" : "Link to external URL" , "format" : "uri" , "maxLength" : 2000 , "nullable" : true , "type" : "string" }, "locked" : { "description" : "Locked parts cannot be edited" , "type" : "boolean" }, "minimum_stock" : { "default" : 0.0 , "format" : "double" , "type" : "number" }, "name" : { "description" : "Part name" , "maxLength" : 100 , "type" : "string" }, "notes" : { "description" : "Markdown notes (optional)" , "maxLength" : 50000 , "nullable" : true , "type" : "string" }, "ordering" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "On Order" , "type" : "number" }, "parameters" : { "items" : { "$ref" : "#/components/schemas/Parameter" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price_breaks" : { "items" : { "$ref" : "#/components/schemas/PartSalePrice" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pricing_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "purchaseable" : { "description" : "Can this part be purchased from external suppliers?" , "type" : "boolean" }, "remote_image" : { "description" : "URL of remote image file" , "format" : "uri" , "type" : "string" , "writeOnly" : true }, "required_for_build_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "required_for_sales_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "responsible" : { "nullable" : true , "type" : "integer" }, "revision" : { "default" : "" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "revision_count" : { "nullable" : true , "readOnly" : true , "title" : "Revisions" , "type" : "integer" }, "revision_of" : { "description" : "Is this part a revision of another part?" , "nullable" : true , "type" : "integer" }, "salable" : { "description" : "Can this part be sold to customers?" , "type" : "boolean" }, "scheduled_to_build" : { "description" : "Outstanding quantity of this part scheduled to be built" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "starred" : { "description" : "Return \"true\" if the part is starred by the current user." , "readOnly" : true , "type" : "boolean" }, "stock_item_count" : { "nullable" : true , "readOnly" : true , "title" : "Stock Items" , "type" : "integer" }, "tags" : { "items" : { "type" : "string" }, "type" : "array" }, "testable" : { "description" : "Can this part have test results recorded against it?" , "type" : "boolean" }, "thumbnail" : { "readOnly" : true , "type" : "string" }, "total_in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "Total Stock" , "type" : "number" }, "trackable" : { "description" : "Does this part have tracking for unique items?" , "type" : "boolean" }, "unallocated_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "units" : { "description" : "Units of measure for this part" , "maxLength" : 20 , "nullable" : true , "type" : "string" }, "variant_of" : { "description" : "Is this part a variant of another part?" , "nullable" : true , "type" : "integer" }, "variant_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "virtual" : { "description" : "Is this a virtual part, such as a software product or license?" , "type" : "boolean" } }, "required" : [ "barcode_hash" , "category_name" , "full_name" , "name" , "pk" , "starred" , "thumbnail" ], "type" : "object" }`

## GET /api/part/category/
<a id="get-api-part-category"></a>

Doc anchor: `#get-apipartcategory`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| cascade | query | boolean |  | No | Include sub-categories in filtered results |
| depth | query | number |  | No | Filter by category depth |
| exclude_tree | query | integer |  | No |  |
| limit | query | integer |  | No | Number of results to return per page. |
| name | query | string |  | No |  |
| offset | query | integer |  | No | The initial index from which to return the results. |
| ordering | query | string |  | No | Which field to use when ordering the results. |
| parent | query | integer |  | No | Filter by parent category |
| path_detail | query | boolean | False | No |  |
| search | query | string |  | No | A search term. Searched fields: description, name, pathstring. |
| starred | query | boolean |  | No | Filter by starred categories |
| structural | query | boolean |  | No |  |
| top_level | query | boolean |  | No | Filter by top-level categories |

### Request Body

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "default_keywords" : "string" , "default_location" : 0 , "description" : "string" , "icon" : "string" , "level" : 0 , "name" : "string" , "parent" : 0 , "parent_default_location" : 0 , "part_count" : 0 , "path" : [ {} ], "pathstring" : "string" , "pk" : 0 , "starred" : true , "structural" : true , "subcategories" : 0 } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/Category" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

## PATCH /api/part/category/
<a id="patch-api-part-category"></a>

Doc anchor: `#patch-apipartcategory`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "default_keywords" : "string" , "default_location" : 0 , "description" : "string" , "icon" : "string" , "level" : 0 , "name" : "string" , "parent" : 0 , "parent_default_location" : 0 , "part_count" : 0 , "path" : [ {} ], "pathstring" : "string" , "pk" : 0 , "starred" : true , "structural" : true , "subcategories" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for PartCategory." , "properties" : { "default_keywords" : { "description" : "Default keywords for parts in this category" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "default_location" : { "description" : "Default location for parts in this category" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Description (optional)" , "maxLength" : 250 , "type" : "string" }, "icon" : { "description" : "Icon (optional)" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "level" : { "readOnly" : true , "type" : "integer" }, "name" : { "description" : "Name" , "maxLength" : 100 , "type" : "string" }, "parent" : { "description" : "Parent part category" , "nullable" : true , "title" : "Parent Category" , "type" : "integer" }, "parent_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "part_count" : { "nullable" : true , "readOnly" : true , "title" : "Parts" , "type" : "integer" }, "path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pathstring" : { "description" : "Path" , "readOnly" : true , "title" : "Path" , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "starred" : { "description" : "Return True if the category is directly \"starred\" by the current user." , "readOnly" : true , "type" : "boolean" }, "structural" : { "description" : "Parts may not be directly assigned to a structural category, but may be assigned to child categories." , "type" : "boolean" }, "subcategories" : { "nullable" : true , "readOnly" : true , "type" : "integer" } }, "required" : [ "level" , "name" , "pathstring" , "pk" , "starred" ], "type" : "object" }`

## POST /api/part/category/
<a id="post-api-part-category"></a>

Doc anchor: `#post-apipartcategory`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "default_keywords" : "string" , "default_location" : 0 , "description" : "string" , "icon" : "string" , "level" : 0 , "name" : "string" , "parent" : 0 , "parent_default_location" : 0 , "part_count" : 0 , "path" : [ {} ], "pathstring" : "string" , "pk" : 0 , "starred" : true , "structural" : true , "subcategories" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for PartCategory." , "properties" : { "default_keywords" : { "description" : "Default keywords for parts in this category" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "default_location" : { "description" : "Default location for parts in this category" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Description (optional)" , "maxLength" : 250 , "type" : "string" }, "icon" : { "description" : "Icon (optional)" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "level" : { "readOnly" : true , "type" : "integer" }, "name" : { "description" : "Name" , "maxLength" : 100 , "type" : "string" }, "parent" : { "description" : "Parent part category" , "nullable" : true , "title" : "Parent Category" , "type" : "integer" }, "parent_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "part_count" : { "nullable" : true , "readOnly" : true , "title" : "Parts" , "type" : "integer" }, "path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pathstring" : { "description" : "Path" , "readOnly" : true , "title" : "Path" , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "starred" : { "description" : "Return True if the category is directly \"starred\" by the current user." , "readOnly" : true , "type" : "boolean" }, "structural" : { "description" : "Parts may not be directly assigned to a structural category, but may be assigned to child categories." , "type" : "boolean" }, "subcategories" : { "nullable" : true , "readOnly" : true , "type" : "integer" } }, "required" : [ "level" , "name" , "pathstring" , "pk" , "starred" ], "type" : "object" }`

## PUT /api/part/category/
<a id="put-api-part-category"></a>

Doc anchor: `#put-apipartcategory`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "default_keywords" : "string" , "default_location" : 0 , "description" : "string" , "icon" : "string" , "level" : 0 , "name" : "string" , "parent" : 0 , "parent_default_location" : 0 , "part_count" : 0 , "path" : [ {} ], "pathstring" : "string" , "pk" : 0 , "starred" : true , "structural" : true , "subcategories" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for PartCategory." , "properties" : { "default_keywords" : { "description" : "Default keywords for parts in this category" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "default_location" : { "description" : "Default location for parts in this category" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Description (optional)" , "maxLength" : 250 , "type" : "string" }, "icon" : { "description" : "Icon (optional)" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "level" : { "readOnly" : true , "type" : "integer" }, "name" : { "description" : "Name" , "maxLength" : 100 , "type" : "string" }, "parent" : { "description" : "Parent part category" , "nullable" : true , "title" : "Parent Category" , "type" : "integer" }, "parent_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "part_count" : { "nullable" : true , "readOnly" : true , "title" : "Parts" , "type" : "integer" }, "path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pathstring" : { "description" : "Path" , "readOnly" : true , "title" : "Path" , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "starred" : { "description" : "Return True if the category is directly \"starred\" by the current user." , "readOnly" : true , "type" : "boolean" }, "structural" : { "description" : "Parts may not be directly assigned to a structural category, but may be assigned to child categories." , "type" : "boolean" }, "subcategories" : { "nullable" : true , "readOnly" : true , "type" : "integer" } }, "required" : [ "level" , "name" , "pathstring" , "pk" , "starred" ], "type" : "object" }`

## GET /api/part/category/parameters/
<a id="get-api-part-category-parameters"></a>

Doc anchor: `#get-apipartcategoryparameters`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| limit | query | integer |  | No | Number of results to return per page. |
| offset | query | integer |  | No | The initial index from which to return the results. |

### Request Body

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "category" : 0 , "category_detail" : null , "default_value" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/CategoryParameterTemplate" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

## POST /api/part/category/parameters/
<a id="post-api-part-category-parameters"></a>

Doc anchor: `#post-apipartcategoryparameters`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "category" : 0 , "category_detail" : null , "default_value" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartCategoryParameterTemplate model." , "properties" : { "category" : { "description" : "Part Category" , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "default_value" : { "description" : "Default Parameter Value" , "maxLength" : 500 , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "template" : { "type" : "integer" }, "template_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/ParameterTemplate" } ], "readOnly" : true } }, "required" : [ "category" , "pk" , "template" , "template_detail" ], "type" : "object" }`

#### 204 No Content

#### 200 OK

Content type: `application/json { "category" : 0 , "category_detail" : null , "default_value" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartCategoryParameterTemplate model." , "properties" : { "category" : { "description" : "Part Category" , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "default_value" : { "description" : "Default Parameter Value" , "maxLength" : 500 , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "template" : { "type" : "integer" }, "template_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/ParameterTemplate" } ], "readOnly" : true } }, "required" : [ "category" , "pk" , "template" , "template_detail" ], "type" : "object" }`

**Example**

```json
{

    
"category"
:
 
0
,

    
"category_detail"
:
 
null
,

    
"default_value"
:
 
"string"
,

    
"pk"
:
 
0
,

    
"template"
:
 
0
,

    
"template_detail"
:
 
null

}
```

#### 200 OK

Content type: `application/json { "category" : 0 , "category_detail" : null , "default_value" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartCategoryParameterTemplate model." , "properties" : { "category" : { "description" : "Part Category" , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "default_value" : { "description" : "Default Parameter Value" , "maxLength" : 500 , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "template" : { "type" : "integer" }, "template_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/ParameterTemplate" } ], "readOnly" : true } }, "required" : [ "category" , "pk" , "template" , "template_detail" ], "type" : "object" }`

**Example**

```json
{

    
"category"
:
 
0
,

    
"category_detail"
:
 
null
,

    
"default_value"
:
 
"string"
,

    
"pk"
:
 
0
,

    
"template"
:
 
0
,

    
"template_detail"
:
 
null

}
```

#### 200 OK

Content type: `application/json { "category" : 0 , "category_detail" : null , "default_value" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartCategoryParameterTemplate model." , "properties" : { "category" : { "description" : "Part Category" , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "default_value" : { "description" : "Default Parameter Value" , "maxLength" : 500 , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "template" : { "type" : "integer" }, "template_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/ParameterTemplate" } ], "readOnly" : true } }, "required" : [ "category" , "pk" , "template" , "template_detail" ], "type" : "object" }`

## GET /api/part/category/tree/
<a id="get-api-part-category-tree"></a>

Doc anchor: `#get-apipartcategorytree`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| limit | query | integer |  | No | Number of results to return per page. |
| offset | query | integer |  | No | The initial index from which to return the results. |
| ordering | query | string |  | No | Which field to use when ordering the results. |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "icon" : "string" , "name" : "string" , "parent" : 0 , "pk" : 0 , "structural" : true , "subcategories" : 0 } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/CategoryTree" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

#### 204 No Content

#### 200 OK

Content type: `application/json { "default_keywords" : "string" , "default_location" : 0 , "description" : "string" , "icon" : "string" , "level" : 0 , "name" : "string" , "parent" : 0 , "parent_default_location" : 0 , "part_count" : 0 , "path" : [ {} ], "pathstring" : "string" , "pk" : 0 , "starred" : true , "structural" : true , "subcategories" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for PartCategory." , "properties" : { "default_keywords" : { "description" : "Default keywords for parts in this category" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "default_location" : { "description" : "Default location for parts in this category" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Description (optional)" , "maxLength" : 250 , "type" : "string" }, "icon" : { "description" : "Icon (optional)" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "level" : { "readOnly" : true , "type" : "integer" }, "name" : { "description" : "Name" , "maxLength" : 100 , "type" : "string" }, "parent" : { "description" : "Parent part category" , "nullable" : true , "title" : "Parent Category" , "type" : "integer" }, "parent_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "part_count" : { "nullable" : true , "readOnly" : true , "title" : "Parts" , "type" : "integer" }, "path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pathstring" : { "description" : "Path" , "readOnly" : true , "title" : "Path" , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "starred" : { "description" : "Return True if the category is directly \"starred\" by the current user." , "readOnly" : true , "type" : "boolean" }, "structural" : { "description" : "Parts may not be directly assigned to a structural category, but may be assigned to child categories." , "type" : "boolean" }, "subcategories" : { "nullable" : true , "readOnly" : true , "type" : "integer" } }, "required" : [ "level" , "name" , "pathstring" , "pk" , "starred" ], "type" : "object" }`

**Example**

```json
{

    
"default_keywords"
:
 
"string"
,

    
"default_location"
:
 
0
,

    
"description"
:
 
"string"
,

    
"icon"
:
 
"string"
,

    
"level"
:
 
0
,

    
"name"
:
 
"string"
,

    
"parent"
:
 
0
,

    
"parent_default_location"
:
 
0
,

    
"part_count"
:
 
0
,

    
"path"
:
 
[

        
{}

    
],

    
"pathstring"
:
 
"string"
,

    
"pk"
:
 
0
,

    
"starred"
:
 
true
,

    
"structural"
:
 
true
,

    
"subcategories"
:
 
0

}
```

#### 200 OK

Content type: `application/json { "default_keywords" : "string" , "default_location" : 0 , "description" : "string" , "icon" : "string" , "level" : 0 , "name" : "string" , "parent" : 0 , "parent_default_location" : 0 , "part_count" : 0 , "path" : [ {} ], "pathstring" : "string" , "pk" : 0 , "starred" : true , "structural" : true , "subcategories" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for PartCategory." , "properties" : { "default_keywords" : { "description" : "Default keywords for parts in this category" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "default_location" : { "description" : "Default location for parts in this category" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Description (optional)" , "maxLength" : 250 , "type" : "string" }, "icon" : { "description" : "Icon (optional)" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "level" : { "readOnly" : true , "type" : "integer" }, "name" : { "description" : "Name" , "maxLength" : 100 , "type" : "string" }, "parent" : { "description" : "Parent part category" , "nullable" : true , "title" : "Parent Category" , "type" : "integer" }, "parent_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "part_count" : { "nullable" : true , "readOnly" : true , "title" : "Parts" , "type" : "integer" }, "path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pathstring" : { "description" : "Path" , "readOnly" : true , "title" : "Path" , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "starred" : { "description" : "Return True if the category is directly \"starred\" by the current user." , "readOnly" : true , "type" : "boolean" }, "structural" : { "description" : "Parts may not be directly assigned to a structural category, but may be assigned to child categories." , "type" : "boolean" }, "subcategories" : { "nullable" : true , "readOnly" : true , "type" : "integer" } }, "required" : [ "level" , "name" , "pathstring" , "pk" , "starred" ], "type" : "object" }`

**Example**

```json
{

    
"default_keywords"
:
 
"string"
,

    
"default_location"
:
 
0
,

    
"description"
:
 
"string"
,

    
"icon"
:
 
"string"
,

    
"level"
:
 
0
,

    
"name"
:
 
"string"
,

    
"parent"
:
 
0
,

    
"parent_default_location"
:
 
0
,

    
"part_count"
:
 
0
,

    
"path"
:
 
[

        
{}

    
],

    
"pathstring"
:
 
"string"
,

    
"pk"
:
 
0
,

    
"starred"
:
 
true
,

    
"structural"
:
 
true
,

    
"subcategories"
:
 
0

}
```

#### 200 OK

Content type: `application/json { "default_keywords" : "string" , "default_location" : 0 , "description" : "string" , "icon" : "string" , "level" : 0 , "name" : "string" , "parent" : 0 , "parent_default_location" : 0 , "part_count" : 0 , "path" : [ {} ], "pathstring" : "string" , "pk" : 0 , "starred" : true , "structural" : true , "subcategories" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for PartCategory." , "properties" : { "default_keywords" : { "description" : "Default keywords for parts in this category" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "default_location" : { "description" : "Default location for parts in this category" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Description (optional)" , "maxLength" : 250 , "type" : "string" }, "icon" : { "description" : "Icon (optional)" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "level" : { "readOnly" : true , "type" : "integer" }, "name" : { "description" : "Name" , "maxLength" : 100 , "type" : "string" }, "parent" : { "description" : "Parent part category" , "nullable" : true , "title" : "Parent Category" , "type" : "integer" }, "parent_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "part_count" : { "nullable" : true , "readOnly" : true , "title" : "Parts" , "type" : "integer" }, "path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pathstring" : { "description" : "Path" , "readOnly" : true , "title" : "Path" , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "starred" : { "description" : "Return True if the category is directly \"starred\" by the current user." , "readOnly" : true , "type" : "boolean" }, "structural" : { "description" : "Parts may not be directly assigned to a structural category, but may be assigned to child categories." , "type" : "boolean" }, "subcategories" : { "nullable" : true , "readOnly" : true , "type" : "integer" } }, "required" : [ "level" , "name" , "pathstring" , "pk" , "starred" ], "type" : "object" }`

## GET /api/part/internal-price/
<a id="get-api-part-internal-price"></a>

Doc anchor: `#get-apipartinternal-price`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| limit | query | integer |  | No | Number of results to return per page. |
| offset | query | integer |  | No | The initial index from which to return the results. |
| ordering | query | string |  | No | Which field to use when ordering the results. |
| part | query | integer |  | No |  |
| search | query | string |  | No | A search term. |

### Request Body

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/PartInternalPrice" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

## POST /api/part/internal-price/
<a id="post-api-part-internal-price"></a>

Doc anchor: `#post-apipartinternal-price`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for internal prices for Part model." , "properties" : { "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "price_currency" : { "description" : "Purchase currency of this stock item\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "part" , "pk" , "quantity" ], "type" : "object" }`

#### 204 No Content

#### 200 OK

Content type: `application/json { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for internal prices for Part model." , "properties" : { "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "price_currency" : { "description" : "Purchase currency of this stock item\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "part" , "pk" , "quantity" ], "type" : "object" }`

**Example**

```json
{

    
"part"
:
 
0
,

    
"pk"
:
 
0
,

    
"price"
:
 
"string"
,

    
"price_currency"
:
 
"string"
,

    
"quantity"
:
 
10.12

}
```

#### 200 OK

Content type: `application/json { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for internal prices for Part model." , "properties" : { "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "price_currency" : { "description" : "Purchase currency of this stock item\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "part" , "pk" , "quantity" ], "type" : "object" }`

**Example**

```json
{

    
"part"
:
 
0
,

    
"pk"
:
 
0
,

    
"price"
:
 
"string"
,

    
"price_currency"
:
 
"string"
,

    
"quantity"
:
 
10.12

}
```

#### 200 OK

Content type: `application/json { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for internal prices for Part model." , "properties" : { "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "price_currency" : { "description" : "Purchase currency of this stock item\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "part" , "pk" , "quantity" ], "type" : "object" }`

## GET /api/part/related/
<a id="get-api-part-related"></a>

Doc anchor: `#get-apipartrelated`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| limit | query | integer |  | No | Number of results to return per page. |
| offset | query | integer |  | No | The initial index from which to return the results. |
| ordering | query | string |  | No | Which field to use when ordering the results. |
| part | query | integer |  | No | Part |
| part_1 | query | integer |  | No |  |
| part_2 | query | integer |  | No |  |
| search | query | string |  | No | A search term. Searched fields: part_1__name, part_2__name. |

### Request Body

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "note" : "string" , "part_1" : 0 , "part_1_detail" : null , "part_2" : 0 , "part_2_detail" : null , "pk" : 0 } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/PartRelation" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

## POST /api/part/related/
<a id="post-api-part-related"></a>

Doc anchor: `#post-apipartrelated`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "note" : "string" , "part_1" : 0 , "part_1_detail" : null , "part_2" : 0 , "part_2_detail" : null , "pk" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for a PartRelated model." , "properties" : { "note" : { "description" : "Note for this relationship" , "maxLength" : 500 , "type" : "string" }, "part_1" : { "type" : "integer" }, "part_1_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Part" } ], "readOnly" : true }, "part_2" : { "description" : "Select Related Part" , "type" : "integer" }, "part_2_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Part" } ], "readOnly" : true }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" } }, "required" : [ "part_1" , "part_1_detail" , "part_2" , "part_2_detail" , "pk" ], "type" : "object" }`

#### 204 No Content

#### 200 OK

Content type: `application/json { "note" : "string" , "part_1" : 0 , "part_1_detail" : null , "part_2" : 0 , "part_2_detail" : null , "pk" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for a PartRelated model." , "properties" : { "note" : { "description" : "Note for this relationship" , "maxLength" : 500 , "type" : "string" }, "part_1" : { "type" : "integer" }, "part_1_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Part" } ], "readOnly" : true }, "part_2" : { "description" : "Select Related Part" , "type" : "integer" }, "part_2_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Part" } ], "readOnly" : true }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" } }, "required" : [ "part_1" , "part_1_detail" , "part_2" , "part_2_detail" , "pk" ], "type" : "object" }`

**Example**

```json
{

    
"note"
:
 
"string"
,

    
"part_1"
:
 
0
,

    
"part_1_detail"
:
 
null
,

    
"part_2"
:
 
0
,

    
"part_2_detail"
:
 
null
,

    
"pk"
:
 
0

}
```

#### 200 OK

Content type: `application/json { "note" : "string" , "part_1" : 0 , "part_1_detail" : null , "part_2" : 0 , "part_2_detail" : null , "pk" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for a PartRelated model." , "properties" : { "note" : { "description" : "Note for this relationship" , "maxLength" : 500 , "type" : "string" }, "part_1" : { "type" : "integer" }, "part_1_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Part" } ], "readOnly" : true }, "part_2" : { "description" : "Select Related Part" , "type" : "integer" }, "part_2_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Part" } ], "readOnly" : true }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" } }, "required" : [ "part_1" , "part_1_detail" , "part_2" , "part_2_detail" , "pk" ], "type" : "object" }`

**Example**

```json
{

    
"note"
:
 
"string"
,

    
"part_1"
:
 
0
,

    
"part_1_detail"
:
 
null
,

    
"part_2"
:
 
0
,

    
"part_2_detail"
:
 
null
,

    
"pk"
:
 
0

}
```

#### 200 OK

Content type: `application/json { "note" : "string" , "part_1" : 0 , "part_1_detail" : null , "part_2" : 0 , "part_2_detail" : null , "pk" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for a PartRelated model." , "properties" : { "note" : { "description" : "Note for this relationship" , "maxLength" : 500 , "type" : "string" }, "part_1" : { "type" : "integer" }, "part_1_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Part" } ], "readOnly" : true }, "part_2" : { "description" : "Select Related Part" , "type" : "integer" }, "part_2_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Part" } ], "readOnly" : true }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" } }, "required" : [ "part_1" , "part_1_detail" , "part_2" , "part_2_detail" , "pk" ], "type" : "object" }`

## GET /api/part/sale-price/
<a id="get-api-part-sale-price"></a>

Doc anchor: `#get-apipartsale-price`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| limit | query | integer |  | No | Number of results to return per page. |
| offset | query | integer |  | No | The initial index from which to return the results. |
| ordering | query | string |  | No | Which field to use when ordering the results. |
| part | query | integer |  | No |  |
| search | query | string |  | No | A search term. |

### Request Body

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/PartSalePrice" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

## POST /api/part/sale-price/
<a id="post-api-part-sale-price"></a>

Doc anchor: `#post-apipartsale-price`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for sale prices for Part model." , "properties" : { "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "price_currency" : { "description" : "Purchase currency of this stock item\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "part" , "pk" , "quantity" ], "type" : "object" }`

#### 204 No Content

#### 200 OK

Content type: `application/json { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for sale prices for Part model." , "properties" : { "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "price_currency" : { "description" : "Purchase currency of this stock item\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "part" , "pk" , "quantity" ], "type" : "object" }`

**Example**

```json
{

    
"part"
:
 
0
,

    
"pk"
:
 
0
,

    
"price"
:
 
"string"
,

    
"price_currency"
:
 
"string"
,

    
"quantity"
:
 
10.12

}
```

#### 200 OK

Content type: `application/json { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for sale prices for Part model." , "properties" : { "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "price_currency" : { "description" : "Purchase currency of this stock item\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "part" , "pk" , "quantity" ], "type" : "object" }`

**Example**

```json
{

    
"part"
:
 
0
,

    
"pk"
:
 
0
,

    
"price"
:
 
"string"
,

    
"price_currency"
:
 
"string"
,

    
"quantity"
:
 
10.12

}
```

#### 200 OK

Content type: `application/json { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for sale prices for Part model." , "properties" : { "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "price_currency" : { "description" : "Purchase currency of this stock item\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "part" , "pk" , "quantity" ], "type" : "object" }`

## DELETE /api/part/stocktake/
<a id="delete-api-part-stocktake"></a>

Doc anchor: `#delete-apipartstocktake`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 204 No Content

## GET /api/part/stocktake/
<a id="get-api-part-stocktake"></a>

Doc anchor: `#get-apipartstocktake`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| limit | query | integer |  | No | Number of results to return per page. |
| offset | query | integer |  | No | The initial index from which to return the results. |
| ordering | query | string |  | No | Which field to use when ordering the results. |
| part | query | integer |  | No |  |

### Request Body

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "cost_max" : "string" , "cost_max_currency" : "string" , "cost_min" : "string" , "cost_min_currency" : "string" , "date" : "2022-04-13" , "item_count" : 150 , "part" : 0 , "part_description" : "string" , "part_detail" : null , "part_ipn" : "string" , "part_name" : "string" , "pk" : 0 , "quantity" : 10.12 } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/PartStocktake" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

## POST /api/part/stocktake/
<a id="post-api-part-stocktake"></a>

Doc anchor: `#post-apipartstocktake`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "cost_max" : "string" , "cost_max_currency" : "string" , "cost_min" : "string" , "cost_min_currency" : "string" , "date" : "2022-04-13" , "item_count" : 118 , "part" : 0 , "part_description" : "string" , "part_detail" : null , "part_ipn" : "string" , "part_name" : "string" , "pk" : 0 , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartStocktake model." , "properties" : { "cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "cost_max_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "cost_min_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "date" : { "description" : "Date stocktake was performed" , "format" : "date" , "readOnly" : true , "type" : "string" }, "item_count" : { "description" : "Number of individual stock entries at time of stocktake" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : -9223372036854775808 , "type" : "integer" }, "part" : { "description" : "Part for stocktake" , "type" : "integer" }, "part_description" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "part_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/PartBrief" } ], "nullable" : true , "readOnly" : true }, "part_ipn" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "part_name" : { "readOnly" : true , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "date" , "part" , "part_name" , "pk" , "quantity" ], "type" : "object" }`

## POST /api/part/stocktake/generate/
<a id="post-api-part-stocktake-generate"></a>

Doc anchor: `#post-apipartstocktakegenerate`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "category" : 0 , "generate_entry" : true , "generate_report" : true , "location" : 0 , "output" : null , "part" : 0 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for generating PartStocktake entries." , "properties" : { "category" : { "description" : "Select a category to include all parts within that category (and subcategories)" , "nullable" : true , "type" : "integer" }, "generate_entry" : { "default" : false , "description" : "Save stocktake entries for the selected parts" , "title" : "Generate Stocktake Entries" , "type" : "boolean" , "writeOnly" : true }, "generate_report" : { "default" : false , "description" : "Generate a stocktake report for the selected parts" , "type" : "boolean" , "writeOnly" : true }, "location" : { "description" : "Select a location to include all parts with stock in that location (including sub-locations)" , "nullable" : true , "type" : "integer" }, "output" : { "allOf" : [ { "$ref" : "#/components/schemas/DataOutput" } ], "readOnly" : true }, "part" : { "description" : "Select a part to generate stocktake information for that part (and any variant parts)" , "nullable" : true , "type" : "integer" } }, "required" : [ "output" ], "type" : "object" }`

#### 204 No Content

#### 200 OK

Content type: `application/json { "cost_max" : "string" , "cost_max_currency" : "string" , "cost_min" : "string" , "cost_min_currency" : "string" , "date" : "2022-04-13" , "item_count" : 159 , "part" : 0 , "part_description" : "string" , "part_detail" : null , "part_ipn" : "string" , "part_name" : "string" , "pk" : 0 , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartStocktake model." , "properties" : { "cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "cost_max_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "cost_min_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "date" : { "description" : "Date stocktake was performed" , "format" : "date" , "readOnly" : true , "type" : "string" }, "item_count" : { "description" : "Number of individual stock entries at time of stocktake" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : -9223372036854775808 , "type" : "integer" }, "part" : { "description" : "Part for stocktake" , "type" : "integer" }, "part_description" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "part_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/PartBrief" } ], "nullable" : true , "readOnly" : true }, "part_ipn" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "part_name" : { "readOnly" : true , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "date" , "part" , "part_name" , "pk" , "quantity" ], "type" : "object" }`

**Example**

```json
{

    
"cost_max"
:
 
"string"
,

    
"cost_max_currency"
:
 
"string"
,

    
"cost_min"
:
 
"string"
,

    
"cost_min_currency"
:
 
"string"
,

    
"date"
:
 
"2022-04-13"
,

    
"item_count"
:
 
230
,

    
"part"
:
 
0
,

    
"part_description"
:
 
"string"
,

    
"part_detail"
:
 
null
,

    
"part_ipn"
:
 
"string"
,

    
"part_name"
:
 
"string"
,

    
"pk"
:
 
0
,

    
"quantity"
:
 
10.12

}
```

#### 200 OK

Content type: `application/json { "cost_max" : "string" , "cost_max_currency" : "string" , "cost_min" : "string" , "cost_min_currency" : "string" , "date" : "2022-04-13" , "item_count" : 129 , "part" : 0 , "part_description" : "string" , "part_detail" : null , "part_ipn" : "string" , "part_name" : "string" , "pk" : 0 , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartStocktake model." , "properties" : { "cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "cost_max_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "cost_min_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "date" : { "description" : "Date stocktake was performed" , "format" : "date" , "readOnly" : true , "type" : "string" }, "item_count" : { "description" : "Number of individual stock entries at time of stocktake" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : -9223372036854775808 , "type" : "integer" }, "part" : { "description" : "Part for stocktake" , "type" : "integer" }, "part_description" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "part_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/PartBrief" } ], "nullable" : true , "readOnly" : true }, "part_ipn" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "part_name" : { "readOnly" : true , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "date" , "part" , "part_name" , "pk" , "quantity" ], "type" : "object" }`

**Example**

```json
{

    
"cost_max"
:
 
"string"
,

    
"cost_max_currency"
:
 
"string"
,

    
"cost_min"
:
 
"string"
,

    
"cost_min_currency"
:
 
"string"
,

    
"date"
:
 
"2022-04-13"
,

    
"item_count"
:
 
252
,

    
"part"
:
 
0
,

    
"part_description"
:
 
"string"
,

    
"part_detail"
:
 
null
,

    
"part_ipn"
:
 
"string"
,

    
"part_name"
:
 
"string"
,

    
"pk"
:
 
0
,

    
"quantity"
:
 
10.12

}
```

#### 200 OK

Content type: `application/json { "cost_max" : "string" , "cost_max_currency" : "string" , "cost_min" : "string" , "cost_min_currency" : "string" , "date" : "2022-04-13" , "item_count" : 175 , "part" : 0 , "part_description" : "string" , "part_detail" : null , "part_ipn" : "string" , "part_name" : "string" , "pk" : 0 , "quantity" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartStocktake model." , "properties" : { "cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "cost_max_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "type" : "string" }, "cost_min_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Currency" , "type" : "string" }, "date" : { "description" : "Date stocktake was performed" , "format" : "date" , "readOnly" : true , "type" : "string" }, "item_count" : { "description" : "Number of individual stock entries at time of stocktake" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : -9223372036854775808 , "type" : "integer" }, "part" : { "description" : "Part for stocktake" , "type" : "integer" }, "part_description" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "part_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/PartBrief" } ], "nullable" : true , "readOnly" : true }, "part_ipn" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "part_name" : { "readOnly" : true , "type" : "string" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "quantity" : { "format" : "double" , "type" : "number" } }, "required" : [ "date" , "part" , "part_name" , "pk" , "quantity" ], "type" : "object" }`

## GET /api/part/test-template/
<a id="get-api-part-test-template"></a>

Doc anchor: `#get-apiparttest-template`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| enabled | query | boolean |  | No |  |
| has_results | query | boolean |  | No | Has Results |
| key | query | string |  | No |  |
| limit | query | integer |  | No | Number of results to return per page. |
| offset | query | integer |  | No | The initial index from which to return the results. |
| ordering | query | string |  | No | Which field to use when ordering the results. |
| part | query | integer |  | No | Part |
| required | query | boolean |  | No |  |
| requires_attachment | query | boolean |  | No |  |
| requires_value | query | boolean |  | No |  |
| search | query | string |  | No | A search term. Searched fields: description, test_name. |

### Request Body

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "choices" : "string" , "description" : "string" , "enabled" : true , "key" : "string" , "part" : 0 , "pk" : 0 , "required" : true , "requires_attachment" : true , "requires_value" : true , "results" : 0 , "test_name" : "string" } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/PartTestTemplate" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

## POST /api/part/test-template/
<a id="post-api-part-test-template"></a>

Doc anchor: `#post-apiparttest-template`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 201 Created

Content type: `application/json { "choices" : "string" , "description" : "string" , "enabled" : true , "key" : "string" , "part" : 0 , "pk" : 0 , "required" : true , "requires_attachment" : true , "requires_value" : true , "results" : 0 , "test_name" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartTestTemplate class." , "properties" : { "choices" : { "description" : "Valid choices for this test (comma-separated)" , "maxLength" : 5000 , "type" : "string" }, "description" : { "description" : "Enter description for this test" , "maxLength" : 100 , "nullable" : true , "title" : "Test Description" , "type" : "string" }, "enabled" : { "description" : "Is this test enabled?" , "type" : "boolean" }, "key" : { "readOnly" : true , "type" : "string" }, "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "required" : { "description" : "Is this test required to pass?" , "type" : "boolean" }, "requires_attachment" : { "description" : "Does this test require a file attachment when adding a test result?" , "type" : "boolean" }, "requires_value" : { "description" : "Does this test require a value when adding a test result?" , "type" : "boolean" }, "results" : { "description" : "Number of results recorded against this template" , "readOnly" : true , "type" : "integer" }, "test_name" : { "description" : "Enter a name for the test" , "maxLength" : 100 , "type" : "string" } }, "required" : [ "key" , "part" , "pk" , "results" , "test_name" ], "type" : "object" }`

#### 204 No Content

#### 200 OK

Content type: `application/json { "choices" : "string" , "description" : "string" , "enabled" : true , "key" : "string" , "part" : 0 , "pk" : 0 , "required" : true , "requires_attachment" : true , "requires_value" : true , "results" : 0 , "test_name" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartTestTemplate class." , "properties" : { "choices" : { "description" : "Valid choices for this test (comma-separated)" , "maxLength" : 5000 , "type" : "string" }, "description" : { "description" : "Enter description for this test" , "maxLength" : 100 , "nullable" : true , "title" : "Test Description" , "type" : "string" }, "enabled" : { "description" : "Is this test enabled?" , "type" : "boolean" }, "key" : { "readOnly" : true , "type" : "string" }, "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "required" : { "description" : "Is this test required to pass?" , "type" : "boolean" }, "requires_attachment" : { "description" : "Does this test require a file attachment when adding a test result?" , "type" : "boolean" }, "requires_value" : { "description" : "Does this test require a value when adding a test result?" , "type" : "boolean" }, "results" : { "description" : "Number of results recorded against this template" , "readOnly" : true , "type" : "integer" }, "test_name" : { "description" : "Enter a name for the test" , "maxLength" : 100 , "type" : "string" } }, "required" : [ "key" , "part" , "pk" , "results" , "test_name" ], "type" : "object" }`

**Example**

```json
{

    
"choices"
:
 
"string"
,

    
"description"
:
 
"string"
,

    
"enabled"
:
 
true
,

    
"key"
:
 
"string"
,

    
"part"
:
 
0
,

    
"pk"
:
 
0
,

    
"required"
:
 
true
,

    
"requires_attachment"
:
 
true
,

    
"requires_value"
:
 
true
,

    
"results"
:
 
0
,

    
"test_name"
:
 
"string"

}
```

#### 200 OK

Content type: `application/json { "choices" : "string" , "description" : "string" , "enabled" : true , "key" : "string" , "part" : 0 , "pk" : 0 , "required" : true , "requires_attachment" : true , "requires_value" : true , "results" : 0 , "test_name" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartTestTemplate class." , "properties" : { "choices" : { "description" : "Valid choices for this test (comma-separated)" , "maxLength" : 5000 , "type" : "string" }, "description" : { "description" : "Enter description for this test" , "maxLength" : 100 , "nullable" : true , "title" : "Test Description" , "type" : "string" }, "enabled" : { "description" : "Is this test enabled?" , "type" : "boolean" }, "key" : { "readOnly" : true , "type" : "string" }, "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "required" : { "description" : "Is this test required to pass?" , "type" : "boolean" }, "requires_attachment" : { "description" : "Does this test require a file attachment when adding a test result?" , "type" : "boolean" }, "requires_value" : { "description" : "Does this test require a value when adding a test result?" , "type" : "boolean" }, "results" : { "description" : "Number of results recorded against this template" , "readOnly" : true , "type" : "integer" }, "test_name" : { "description" : "Enter a name for the test" , "maxLength" : 100 , "type" : "string" } }, "required" : [ "key" , "part" , "pk" , "results" , "test_name" ], "type" : "object" }`

**Example**

```json
{

    
"choices"
:
 
"string"
,

    
"description"
:
 
"string"
,

    
"enabled"
:
 
true
,

    
"key"
:
 
"string"
,

    
"part"
:
 
0
,

    
"pk"
:
 
0
,

    
"required"
:
 
true
,

    
"requires_attachment"
:
 
true
,

    
"requires_value"
:
 
true
,

    
"results"
:
 
0
,

    
"test_name"
:
 
"string"

}
```

#### 200 OK

Content type: `application/json { "choices" : "string" , "description" : "string" , "enabled" : true , "key" : "string" , "part" : 0 , "pk" : 0 , "required" : true , "requires_attachment" : true , "requires_value" : true , "results" : 0 , "test_name" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for the PartTestTemplate class." , "properties" : { "choices" : { "description" : "Valid choices for this test (comma-separated)" , "maxLength" : 5000 , "type" : "string" }, "description" : { "description" : "Enter description for this test" , "maxLength" : 100 , "nullable" : true , "title" : "Test Description" , "type" : "string" }, "enabled" : { "description" : "Is this test enabled?" , "type" : "boolean" }, "key" : { "readOnly" : true , "type" : "string" }, "part" : { "type" : "integer" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "required" : { "description" : "Is this test required to pass?" , "type" : "boolean" }, "requires_attachment" : { "description" : "Does this test require a file attachment when adding a test result?" , "type" : "boolean" }, "requires_value" : { "description" : "Does this test require a value when adding a test result?" , "type" : "boolean" }, "results" : { "description" : "Number of results recorded against this template" , "readOnly" : true , "type" : "integer" }, "test_name" : { "description" : "Enter a name for the test" , "maxLength" : 100 , "type" : "string" } }, "required" : [ "key" , "part" , "pk" , "results" , "test_name" ], "type" : "object" }`

## GET /api/part/thumbs/
<a id="get-api-part-thumbs"></a>

Doc anchor: `#get-apipartthumbs`

### Input Parameters

| Name | In | Type | Default | Nullable | Description |
|---|---|---|---|---|---|
| oauth2 | header | string | N/A | No |  |
| cookieAuth | cookie | string | N/A | No | API key |
| basicAuth | header | string | N/A | No | Basic authentication |
| tokenAuth | header | string | N/A | No | Token-based authentication with required prefix "Token" |
| limit | query | integer |  | No | Number of results to return per page. |
| offset | query | integer |  | No | The initial index from which to return the results. |
| search | query | string |  | No | A search term. Searched fields: IPN, category__name, description, keywords, name, revision. |

### Request Body

Content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`

No request body documented for this endpoint.

### Responses

#### 200 OK

Content type: `application/json { "count" : 123 , "next" : "http://api.example.org/accounts/?offset=400&limit=100" , "previous" : "http://api.example.org/accounts/?offset=200&limit=100" , "results" : [ { "count" : 0 , "image" : "string" } ] } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "properties" : { "count" : { "example" : 123 , "type" : "integer" }, "next" : { "example" : "http://api.example.org/accounts/?offset=400&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "previous" : { "example" : "http://api.example.org/accounts/?offset=200&limit=100" , "format" : "uri" , "nullable" : true , "type" : "string" }, "results" : { "items" : { "$ref" : "#/components/schemas/PartThumb" }, "type" : "array" } }, "required" : [ "count" , "results" ], "type" : "object" }`

#### 200 OK

Content type: `application/json { "image" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for updating Part thumbnail." , "properties" : { "image" : { "format" : "uri" , "type" : "string" } }, "required" : [ "image" ], "type" : "object" }`

**Example**

```json
{

    
"image"
:
 
"string"

}
```

#### 200 OK

Content type: `application/json { "image" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for updating Part thumbnail." , "properties" : { "image" : { "format" : "uri" , "type" : "string" } }, "required" : [ "image" ], "type" : "object" }`

**Example**

```json
{

    
"image"
:
 
"string"

}
```

#### 200 OK

Content type: `application/json { "image" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for updating Part thumbnail." , "properties" : { "image" : { "format" : "uri" , "type" : "string" } }, "required" : [ "image" ], "type" : "object" }`

#### 204 No Content

#### 200 OK

Content type: `application/json { "IPN" : "string" , "active" : true , "allocated_to_build_orders" : 10.12 , "allocated_to_sales_orders" : 10.12 , "assembly" : true , "barcode_hash" : "string" , "building" : 10.12 , "category" : 0 , "category_default_location" : 0 , "category_detail" : null , "category_name" : "string" , "category_path" : [ {} ], "component" : true , "copy_category_parameters" : true , "creation_date" : "2022-04-13" , "creation_user" : 0 , "default_expiry" : 42 , "default_location" : 0 , "default_location_detail" : null , "default_supplier" : 0 , "description" : "string" , "duplicate" : null , "existing_image" : "string" , "external_stock" : 10.12 , "full_name" : "string" , "image" : "string" , "in_stock" : 10.12 , "initial_stock" : null , "initial_supplier" : null , "is_template" : true , "keywords" : "string" , "link" : "string" , "locked" : true , "minimum_stock" : 10.12 , "name" : "string" , "notes" : "string" , "ordering" : 10.12 , "parameters" : [ { "data" : "string" , "data_numeric" : 10.12 , "model_id" : 134 , "model_type" : null , "note" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null , "updated" : "2022-04-13T15:42:05.901Z" , "updated_by" : 0 , "updated_by_detail" : null } ], "pk" : 0 , "price_breaks" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ], "pricing_max" : "string" , "pricing_min" : "string" , "pricing_updated" : "2022-04-13T15:42:05.901Z" , "purchaseable" : true , "remote_image" : "string" , "required_for_build_orders" : 0 , "required_for_sales_orders" : 0 , "responsible" : 0 , "revision" : "string" , "revision_count" : 0 , "revision_of" : 0 , "salable" : true , "scheduled_to_build" : 10.12 , "starred" : true , "stock_item_count" : 0 , "tags" : [ "string" ], "testable" : true , "thumbnail" : "string" , "total_in_stock" : 10.12 , "trackable" : true , "unallocated_stock" : 10.12 , "units" : "string" , "variant_of" : 0 , "variant_stock" : 10.12 , "virtual" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for complete detail information of a part.\n\nUsed when displaying all details of a single component." , "properties" : { "IPN" : { "default" : "" , "maxLength" : 100 , "type" : "string" }, "active" : { "description" : "Is this part active?" , "type" : "boolean" }, "allocated_to_build_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "allocated_to_sales_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "assembly" : { "description" : "Can this part be built from other parts?" , "type" : "boolean" }, "barcode_hash" : { "description" : "Unique hash of barcode data" , "readOnly" : true , "type" : "string" }, "building" : { "description" : "Quantity of this part currently being in production" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "category" : { "nullable" : true , "type" : "integer" }, "category_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "category_name" : { "readOnly" : true , "type" : "string" }, "category_path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "component" : { "description" : "Can this part be used to build other parts?" , "type" : "boolean" }, "copy_category_parameters" : { "default" : true , "description" : "Copy parameter templates from selected part category" , "type" : "boolean" , "writeOnly" : true }, "creation_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "creation_user" : { "nullable" : true , "type" : "integer" }, "default_expiry" : { "description" : "Expiry time (in days) for stock items of this part" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : 0 , "type" : "integer" }, "default_location" : { "description" : "Where is this item normally stored?" , "nullable" : true , "type" : "integer" }, "default_location_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/DefaultLocation" } ], "nullable" : true , "readOnly" : true }, "default_supplier" : { "description" : "Default supplier part" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Part description (optional)" , "maxLength" : 250 , "type" : "string" }, "duplicate" : { "allOf" : [ { "$ref" : "#/components/schemas/DuplicatePart" } ], "description" : "Copy initial data from another Part" , "title" : "Duplicate Part" , "writeOnly" : true }, "existing_image" : { "description" : "Filename of an existing part image" , "type" : "string" , "writeOnly" : true }, "external_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "full_name" : { "description" : "Format a 'full name' for this Part based on the format PART_NAME_FORMAT defined in InvenTree settings." , "readOnly" : true , "type" : "string" }, "image" : { "format" : "uri" , "nullable" : true , "type" : "string" }, "in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "initial_stock" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialStock" } ], "description" : "Create Part with initial stock quantity" , "writeOnly" : true }, "initial_supplier" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialSupplier" } ], "description" : "Add initial supplier information for this part" , "title" : "Supplier Information" , "writeOnly" : true }, "is_template" : { "description" : "Is this part a template part?" , "type" : "boolean" }, "keywords" : { "description" : "Part keywords to improve visibility in search results" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "link" : { "description" : "Link to external URL" , "format" : "uri" , "maxLength" : 2000 , "nullable" : true , "type" : "string" }, "locked" : { "description" : "Locked parts cannot be edited" , "type" : "boolean" }, "minimum_stock" : { "default" : 0.0 , "format" : "double" , "type" : "number" }, "name" : { "description" : "Part name" , "maxLength" : 100 , "type" : "string" }, "notes" : { "description" : "Markdown notes (optional)" , "maxLength" : 50000 , "nullable" : true , "type" : "string" }, "ordering" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "On Order" , "type" : "number" }, "parameters" : { "items" : { "$ref" : "#/components/schemas/Parameter" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price_breaks" : { "items" : { "$ref" : "#/components/schemas/PartSalePrice" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pricing_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "purchaseable" : { "description" : "Can this part be purchased from external suppliers?" , "type" : "boolean" }, "remote_image" : { "description" : "URL of remote image file" , "format" : "uri" , "type" : "string" , "writeOnly" : true }, "required_for_build_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "required_for_sales_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "responsible" : { "nullable" : true , "type" : "integer" }, "revision" : { "default" : "" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "revision_count" : { "nullable" : true , "readOnly" : true , "title" : "Revisions" , "type" : "integer" }, "revision_of" : { "description" : "Is this part a revision of another part?" , "nullable" : true , "type" : "integer" }, "salable" : { "description" : "Can this part be sold to customers?" , "type" : "boolean" }, "scheduled_to_build" : { "description" : "Outstanding quantity of this part scheduled to be built" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "starred" : { "description" : "Return \"true\" if the part is starred by the current user." , "readOnly" : true , "type" : "boolean" }, "stock_item_count" : { "nullable" : true , "readOnly" : true , "title" : "Stock Items" , "type" : "integer" }, "tags" : { "items" : { "type" : "string" }, "type" : "array" }, "testable" : { "description" : "Can this part have test results recorded against it?" , "type" : "boolean" }, "thumbnail" : { "readOnly" : true , "type" : "string" }, "total_in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "Total Stock" , "type" : "number" }, "trackable" : { "description" : "Does this part have tracking for unique items?" , "type" : "boolean" }, "unallocated_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "units" : { "description" : "Units of measure for this part" , "maxLength" : 20 , "nullable" : true , "type" : "string" }, "variant_of" : { "description" : "Is this part a variant of another part?" , "nullable" : true , "type" : "integer" }, "variant_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "virtual" : { "description" : "Is this a virtual part, such as a software product or license?" , "type" : "boolean" } }, "required" : [ "barcode_hash" , "category_name" , "full_name" , "name" , "pk" , "starred" , "thumbnail" ], "type" : "object" }`

**Example**

```json
{

    
"IPN"
:
 
"string"
,

    
"active"
:
 
true
,

    
"allocated_to_build_orders"
:
 
10.12
,

    
"allocated_to_sales_orders"
:
 
10.12
,

    
"assembly"
:
 
true
,

    
"barcode_hash"
:
 
"string"
,

    
"building"
:
 
10.12
,

    
"category"
:
 
0
,

    
"category_default_location"
:
 
0
,

    
"category_detail"
:
 
null
,

    
"category_name"
:
 
"string"
,

    
"category_path"
:
 
[

        
{}

    
],

    
"component"
:
 
true
,

    
"copy_category_parameters"
:
 
true
,

    
"creation_date"
:
 
"2022-04-13"
,

    
"creation_user"
:
 
0
,

    
"default_expiry"
:
 
279
,

    
"default_location"
:
 
0
,

    
"default_location_detail"
:
 
null
,

    
"default_supplier"
:
 
0
,

    
"description"
:
 
"string"
,

    
"duplicate"
:
 
null
,

    
"existing_image"
:
 
"string"
,

    
"external_stock"
:
 
10.12
,

    
"full_name"
:
 
"string"
,

    
"image"
:
 
"string"
,

    
"in_stock"
:
 
10.12
,

    
"initial_stock"
:
 
null
,

    
"initial_supplier"
:
 
null
,

    
"is_template"
:
 
true
,

    
"keywords"
:
 
"string"
,

    
"link"
:
 
"string"
,

    
"locked"
:
 
true
,

    
"minimum_stock"
:
 
10.12
,

    
"name"
:
 
"string"
,

    
"notes"
:
 
"string"
,

    
"ordering"
:
 
10.12
,

    
"parameters"
:
 
[

        
{

            
"data"
:
 
"string"
,

            
"data_numeric"
:
 
10.12
,

            
"model_id"
:
 
174
,

            
"model_type"
:
 
null
,

            
"note"
:
 
"string"
,

            
"pk"
:
 
0
,

            
"template"
:
 
0
,

            
"template_detail"
:
 
null
,

            
"updated"
:
 
"2022-04-13T15:42:05.901Z"
,

            
"updated_by"
:
 
0
,

            
"updated_by_detail"
:
 
null

        
}

    
],

    
"pk"
:
 
0
,

    
"price_breaks"
:
 
[

        
{

            
"part"
:
 
0
,

            
"pk"
:
 
0
,

            
"price"
:
 
"string"
,

            
"price_currency"
:
 
"string"
,

            
"quantity"
:
 
10.12

        
}

    
],

    
"pricing_max"
:
 
"string"
,

    
"pricing_min"
:
 
"string"
,

    
"pricing_updated"
:
 
"2022-04-13T15:42:05.901Z"
,

    
"purchaseable"
:
 
true
,

    
"remote_image"
:
 
"string"
,

    
"required_for_build_orders"
:
 
0
,

    
"required_for_sales_orders"
:
 
0
,

    
"responsible"
:
 
0
,

    
"revision"
:
 
"string"
,

    
"revision_count"
:
 
0
,

    
"revision_of"
:
 
0
,

    
"salable"
:
 
true
,

    
"scheduled_to_build"
:
 
10.12
,

    
"starred"
:
 
true
,

    
"stock_item_count"
:
 
0
,

    
"tags"
:
 
[

        
"string"

    
],

    
"testable"
:
 
true
,

    
"thumbnail"
:
 
"string"
,

    
"total_in_stock"
:
 
10.12
,

    
"trackable"
:
 
true
,

    
"unallocated_stock"
:
 
10.12
,

    
"units"
:
 
"string"
,

    
"variant_of"
:
 
0
,

    
"variant_stock"
:
 
10.12
,

    
"virtual"
:
 
true

}
```

#### 200 OK

Content type: `application/json { "IPN" : "string" , "active" : true , "allocated_to_build_orders" : 10.12 , "allocated_to_sales_orders" : 10.12 , "assembly" : true , "barcode_hash" : "string" , "building" : 10.12 , "category" : 0 , "category_default_location" : 0 , "category_detail" : null , "category_name" : "string" , "category_path" : [ {} ], "component" : true , "copy_category_parameters" : true , "creation_date" : "2022-04-13" , "creation_user" : 0 , "default_expiry" : 107 , "default_location" : 0 , "default_location_detail" : null , "default_supplier" : 0 , "description" : "string" , "duplicate" : null , "existing_image" : "string" , "external_stock" : 10.12 , "full_name" : "string" , "image" : "string" , "in_stock" : 10.12 , "initial_stock" : null , "initial_supplier" : null , "is_template" : true , "keywords" : "string" , "link" : "string" , "locked" : true , "minimum_stock" : 10.12 , "name" : "string" , "notes" : "string" , "ordering" : 10.12 , "parameters" : [ { "data" : "string" , "data_numeric" : 10.12 , "model_id" : 24 , "model_type" : null , "note" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null , "updated" : "2022-04-13T15:42:05.901Z" , "updated_by" : 0 , "updated_by_detail" : null } ], "pk" : 0 , "price_breaks" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ], "pricing_max" : "string" , "pricing_min" : "string" , "pricing_updated" : "2022-04-13T15:42:05.901Z" , "purchaseable" : true , "remote_image" : "string" , "required_for_build_orders" : 0 , "required_for_sales_orders" : 0 , "responsible" : 0 , "revision" : "string" , "revision_count" : 0 , "revision_of" : 0 , "salable" : true , "scheduled_to_build" : 10.12 , "starred" : true , "stock_item_count" : 0 , "tags" : [ "string" ], "testable" : true , "thumbnail" : "string" , "total_in_stock" : 10.12 , "trackable" : true , "unallocated_stock" : 10.12 , "units" : "string" , "variant_of" : 0 , "variant_stock" : 10.12 , "virtual" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for complete detail information of a part.\n\nUsed when displaying all details of a single component." , "properties" : { "IPN" : { "default" : "" , "maxLength" : 100 , "type" : "string" }, "active" : { "description" : "Is this part active?" , "type" : "boolean" }, "allocated_to_build_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "allocated_to_sales_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "assembly" : { "description" : "Can this part be built from other parts?" , "type" : "boolean" }, "barcode_hash" : { "description" : "Unique hash of barcode data" , "readOnly" : true , "type" : "string" }, "building" : { "description" : "Quantity of this part currently being in production" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "category" : { "nullable" : true , "type" : "integer" }, "category_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "category_name" : { "readOnly" : true , "type" : "string" }, "category_path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "component" : { "description" : "Can this part be used to build other parts?" , "type" : "boolean" }, "copy_category_parameters" : { "default" : true , "description" : "Copy parameter templates from selected part category" , "type" : "boolean" , "writeOnly" : true }, "creation_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "creation_user" : { "nullable" : true , "type" : "integer" }, "default_expiry" : { "description" : "Expiry time (in days) for stock items of this part" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : 0 , "type" : "integer" }, "default_location" : { "description" : "Where is this item normally stored?" , "nullable" : true , "type" : "integer" }, "default_location_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/DefaultLocation" } ], "nullable" : true , "readOnly" : true }, "default_supplier" : { "description" : "Default supplier part" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Part description (optional)" , "maxLength" : 250 , "type" : "string" }, "duplicate" : { "allOf" : [ { "$ref" : "#/components/schemas/DuplicatePart" } ], "description" : "Copy initial data from another Part" , "title" : "Duplicate Part" , "writeOnly" : true }, "existing_image" : { "description" : "Filename of an existing part image" , "type" : "string" , "writeOnly" : true }, "external_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "full_name" : { "description" : "Format a 'full name' for this Part based on the format PART_NAME_FORMAT defined in InvenTree settings." , "readOnly" : true , "type" : "string" }, "image" : { "format" : "uri" , "nullable" : true , "type" : "string" }, "in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "initial_stock" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialStock" } ], "description" : "Create Part with initial stock quantity" , "writeOnly" : true }, "initial_supplier" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialSupplier" } ], "description" : "Add initial supplier information for this part" , "title" : "Supplier Information" , "writeOnly" : true }, "is_template" : { "description" : "Is this part a template part?" , "type" : "boolean" }, "keywords" : { "description" : "Part keywords to improve visibility in search results" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "link" : { "description" : "Link to external URL" , "format" : "uri" , "maxLength" : 2000 , "nullable" : true , "type" : "string" }, "locked" : { "description" : "Locked parts cannot be edited" , "type" : "boolean" }, "minimum_stock" : { "default" : 0.0 , "format" : "double" , "type" : "number" }, "name" : { "description" : "Part name" , "maxLength" : 100 , "type" : "string" }, "notes" : { "description" : "Markdown notes (optional)" , "maxLength" : 50000 , "nullable" : true , "type" : "string" }, "ordering" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "On Order" , "type" : "number" }, "parameters" : { "items" : { "$ref" : "#/components/schemas/Parameter" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price_breaks" : { "items" : { "$ref" : "#/components/schemas/PartSalePrice" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pricing_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "purchaseable" : { "description" : "Can this part be purchased from external suppliers?" , "type" : "boolean" }, "remote_image" : { "description" : "URL of remote image file" , "format" : "uri" , "type" : "string" , "writeOnly" : true }, "required_for_build_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "required_for_sales_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "responsible" : { "nullable" : true , "type" : "integer" }, "revision" : { "default" : "" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "revision_count" : { "nullable" : true , "readOnly" : true , "title" : "Revisions" , "type" : "integer" }, "revision_of" : { "description" : "Is this part a revision of another part?" , "nullable" : true , "type" : "integer" }, "salable" : { "description" : "Can this part be sold to customers?" , "type" : "boolean" }, "scheduled_to_build" : { "description" : "Outstanding quantity of this part scheduled to be built" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "starred" : { "description" : "Return \"true\" if the part is starred by the current user." , "readOnly" : true , "type" : "boolean" }, "stock_item_count" : { "nullable" : true , "readOnly" : true , "title" : "Stock Items" , "type" : "integer" }, "tags" : { "items" : { "type" : "string" }, "type" : "array" }, "testable" : { "description" : "Can this part have test results recorded against it?" , "type" : "boolean" }, "thumbnail" : { "readOnly" : true , "type" : "string" }, "total_in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "Total Stock" , "type" : "number" }, "trackable" : { "description" : "Does this part have tracking for unique items?" , "type" : "boolean" }, "unallocated_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "units" : { "description" : "Units of measure for this part" , "maxLength" : 20 , "nullable" : true , "type" : "string" }, "variant_of" : { "description" : "Is this part a variant of another part?" , "nullable" : true , "type" : "integer" }, "variant_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "virtual" : { "description" : "Is this a virtual part, such as a software product or license?" , "type" : "boolean" } }, "required" : [ "barcode_hash" , "category_name" , "full_name" , "name" , "pk" , "starred" , "thumbnail" ], "type" : "object" }`

**Example**

```json
{

    
"IPN"
:
 
"string"
,

    
"active"
:
 
true
,

    
"allocated_to_build_orders"
:
 
10.12
,

    
"allocated_to_sales_orders"
:
 
10.12
,

    
"assembly"
:
 
true
,

    
"barcode_hash"
:
 
"string"
,

    
"building"
:
 
10.12
,

    
"category"
:
 
0
,

    
"category_default_location"
:
 
0
,

    
"category_detail"
:
 
null
,

    
"category_name"
:
 
"string"
,

    
"category_path"
:
 
[

        
{}

    
],

    
"component"
:
 
true
,

    
"copy_category_parameters"
:
 
true
,

    
"creation_date"
:
 
"2022-04-13"
,

    
"creation_user"
:
 
0
,

    
"default_expiry"
:
 
110
,

    
"default_location"
:
 
0
,

    
"default_location_detail"
:
 
null
,

    
"default_supplier"
:
 
0
,

    
"description"
:
 
"string"
,

    
"duplicate"
:
 
null
,

    
"existing_image"
:
 
"string"
,

    
"external_stock"
:
 
10.12
,

    
"full_name"
:
 
"string"
,

    
"image"
:
 
"string"
,

    
"in_stock"
:
 
10.12
,

    
"initial_stock"
:
 
null
,

    
"initial_supplier"
:
 
null
,

    
"is_template"
:
 
true
,

    
"keywords"
:
 
"string"
,

    
"link"
:
 
"string"
,

    
"locked"
:
 
true
,

    
"minimum_stock"
:
 
10.12
,

    
"name"
:
 
"string"
,

    
"notes"
:
 
"string"
,

    
"ordering"
:
 
10.12
,

    
"parameters"
:
 
[

        
{

            
"data"
:
 
"string"
,

            
"data_numeric"
:
 
10.12
,

            
"model_id"
:
 
170
,

            
"model_type"
:
 
null
,

            
"note"
:
 
"string"
,

            
"pk"
:
 
0
,

            
"template"
:
 
0
,

            
"template_detail"
:
 
null
,

            
"updated"
:
 
"2022-04-13T15:42:05.901Z"
,

            
"updated_by"
:
 
0
,

            
"updated_by_detail"
:
 
null

        
}

    
],

    
"pk"
:
 
0
,

    
"price_breaks"
:
 
[

        
{

            
"part"
:
 
0
,

            
"pk"
:
 
0
,

            
"price"
:
 
"string"
,

            
"price_currency"
:
 
"string"
,

            
"quantity"
:
 
10.12

        
}

    
],

    
"pricing_max"
:
 
"string"
,

    
"pricing_min"
:
 
"string"
,

    
"pricing_updated"
:
 
"2022-04-13T15:42:05.901Z"
,

    
"purchaseable"
:
 
true
,

    
"remote_image"
:
 
"string"
,

    
"required_for_build_orders"
:
 
0
,

    
"required_for_sales_orders"
:
 
0
,

    
"responsible"
:
 
0
,

    
"revision"
:
 
"string"
,

    
"revision_count"
:
 
0
,

    
"revision_of"
:
 
0
,

    
"salable"
:
 
true
,

    
"scheduled_to_build"
:
 
10.12
,

    
"starred"
:
 
true
,

    
"stock_item_count"
:
 
0
,

    
"tags"
:
 
[

        
"string"

    
],

    
"testable"
:
 
true
,

    
"thumbnail"
:
 
"string"
,

    
"total_in_stock"
:
 
10.12
,

    
"trackable"
:
 
true
,

    
"unallocated_stock"
:
 
10.12
,

    
"units"
:
 
"string"
,

    
"variant_of"
:
 
0
,

    
"variant_stock"
:
 
10.12
,

    
"virtual"
:
 
true

}
```

#### 200 OK

Content type: `application/json { "IPN" : "string" , "active" : true , "allocated_to_build_orders" : 10.12 , "allocated_to_sales_orders" : 10.12 , "assembly" : true , "barcode_hash" : "string" , "building" : 10.12 , "category" : 0 , "category_default_location" : 0 , "category_detail" : null , "category_name" : "string" , "category_path" : [ {} ], "component" : true , "copy_category_parameters" : true , "creation_date" : "2022-04-13" , "creation_user" : 0 , "default_expiry" : 293 , "default_location" : 0 , "default_location_detail" : null , "default_supplier" : 0 , "description" : "string" , "duplicate" : null , "existing_image" : "string" , "external_stock" : 10.12 , "full_name" : "string" , "image" : "string" , "in_stock" : 10.12 , "initial_stock" : null , "initial_supplier" : null , "is_template" : true , "keywords" : "string" , "link" : "string" , "locked" : true , "minimum_stock" : 10.12 , "name" : "string" , "notes" : "string" , "ordering" : 10.12 , "parameters" : [ { "data" : "string" , "data_numeric" : 10.12 , "model_id" : 180 , "model_type" : null , "note" : "string" , "pk" : 0 , "template" : 0 , "template_detail" : null , "updated" : "2022-04-13T15:42:05.901Z" , "updated_by" : 0 , "updated_by_detail" : null } ], "pk" : 0 , "price_breaks" : [ { "part" : 0 , "pk" : 0 , "price" : "string" , "price_currency" : "string" , "quantity" : 10.12 } ], "pricing_max" : "string" , "pricing_min" : "string" , "pricing_updated" : "2022-04-13T15:42:05.901Z" , "purchaseable" : true , "remote_image" : "string" , "required_for_build_orders" : 0 , "required_for_sales_orders" : 0 , "responsible" : 0 , "revision" : "string" , "revision_count" : 0 , "revision_of" : 0 , "salable" : true , "scheduled_to_build" : 10.12 , "starred" : true , "stock_item_count" : 0 , "tags" : [ "string" ], "testable" : true , "thumbnail" : "string" , "total_in_stock" : 10.12 , "trackable" : true , "unallocated_stock" : 10.12 , "units" : "string" , "variant_of" : 0 , "variant_stock" : 10.12 , "virtual" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for complete detail information of a part.\n\nUsed when displaying all details of a single component." , "properties" : { "IPN" : { "default" : "" , "maxLength" : 100 , "type" : "string" }, "active" : { "description" : "Is this part active?" , "type" : "boolean" }, "allocated_to_build_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "allocated_to_sales_orders" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "assembly" : { "description" : "Can this part be built from other parts?" , "type" : "boolean" }, "barcode_hash" : { "description" : "Unique hash of barcode data" , "readOnly" : true , "type" : "string" }, "building" : { "description" : "Quantity of this part currently being in production" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "category" : { "nullable" : true , "type" : "integer" }, "category_default_location" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "category_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/Category" } ], "nullable" : true , "readOnly" : true }, "category_name" : { "readOnly" : true , "type" : "string" }, "category_path" : { "items" : { "additionalProperties" : {}, "type" : "object" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "component" : { "description" : "Can this part be used to build other parts?" , "type" : "boolean" }, "copy_category_parameters" : { "default" : true , "description" : "Copy parameter templates from selected part category" , "type" : "boolean" , "writeOnly" : true }, "creation_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "creation_user" : { "nullable" : true , "type" : "integer" }, "default_expiry" : { "description" : "Expiry time (in days) for stock items of this part" , "format" : "int64" , "maximum" : 9223372036854775807 , "minimum" : 0 , "type" : "integer" }, "default_location" : { "description" : "Where is this item normally stored?" , "nullable" : true , "type" : "integer" }, "default_location_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/DefaultLocation" } ], "nullable" : true , "readOnly" : true }, "default_supplier" : { "description" : "Default supplier part" , "nullable" : true , "type" : "integer" }, "description" : { "description" : "Part description (optional)" , "maxLength" : 250 , "type" : "string" }, "duplicate" : { "allOf" : [ { "$ref" : "#/components/schemas/DuplicatePart" } ], "description" : "Copy initial data from another Part" , "title" : "Duplicate Part" , "writeOnly" : true }, "existing_image" : { "description" : "Filename of an existing part image" , "type" : "string" , "writeOnly" : true }, "external_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "full_name" : { "description" : "Format a 'full name' for this Part based on the format PART_NAME_FORMAT defined in InvenTree settings." , "readOnly" : true , "type" : "string" }, "image" : { "format" : "uri" , "nullable" : true , "type" : "string" }, "in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "initial_stock" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialStock" } ], "description" : "Create Part with initial stock quantity" , "writeOnly" : true }, "initial_supplier" : { "allOf" : [ { "$ref" : "#/components/schemas/InitialSupplier" } ], "description" : "Add initial supplier information for this part" , "title" : "Supplier Information" , "writeOnly" : true }, "is_template" : { "description" : "Is this part a template part?" , "type" : "boolean" }, "keywords" : { "description" : "Part keywords to improve visibility in search results" , "maxLength" : 250 , "nullable" : true , "type" : "string" }, "link" : { "description" : "Link to external URL" , "format" : "uri" , "maxLength" : 2000 , "nullable" : true , "type" : "string" }, "locked" : { "description" : "Locked parts cannot be edited" , "type" : "boolean" }, "minimum_stock" : { "default" : 0.0 , "format" : "double" , "type" : "number" }, "name" : { "description" : "Part name" , "maxLength" : 100 , "type" : "string" }, "notes" : { "description" : "Markdown notes (optional)" , "maxLength" : 50000 , "nullable" : true , "type" : "string" }, "ordering" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "On Order" , "type" : "number" }, "parameters" : { "items" : { "$ref" : "#/components/schemas/Parameter" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "price_breaks" : { "items" : { "$ref" : "#/components/schemas/PartSalePrice" }, "nullable" : true , "readOnly" : true , "type" : "array" }, "pricing_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "pricing_updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "purchaseable" : { "description" : "Can this part be purchased from external suppliers?" , "type" : "boolean" }, "remote_image" : { "description" : "URL of remote image file" , "format" : "uri" , "type" : "string" , "writeOnly" : true }, "required_for_build_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "required_for_sales_orders" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "responsible" : { "nullable" : true , "type" : "integer" }, "revision" : { "default" : "" , "maxLength" : 100 , "nullable" : true , "type" : "string" }, "revision_count" : { "nullable" : true , "readOnly" : true , "title" : "Revisions" , "type" : "integer" }, "revision_of" : { "description" : "Is this part a revision of another part?" , "nullable" : true , "type" : "integer" }, "salable" : { "description" : "Can this part be sold to customers?" , "type" : "boolean" }, "scheduled_to_build" : { "description" : "Outstanding quantity of this part scheduled to be built" , "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "starred" : { "description" : "Return \"true\" if the part is starred by the current user." , "readOnly" : true , "type" : "boolean" }, "stock_item_count" : { "nullable" : true , "readOnly" : true , "title" : "Stock Items" , "type" : "integer" }, "tags" : { "items" : { "type" : "string" }, "type" : "array" }, "testable" : { "description" : "Can this part have test results recorded against it?" , "type" : "boolean" }, "thumbnail" : { "readOnly" : true , "type" : "string" }, "total_in_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "title" : "Total Stock" , "type" : "number" }, "trackable" : { "description" : "Does this part have tracking for unique items?" , "type" : "boolean" }, "unallocated_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "units" : { "description" : "Units of measure for this part" , "maxLength" : 20 , "nullable" : true , "type" : "string" }, "variant_of" : { "description" : "Is this part a variant of another part?" , "nullable" : true , "type" : "integer" }, "variant_stock" : { "format" : "double" , "nullable" : true , "readOnly" : true , "type" : "number" }, "virtual" : { "description" : "Is this a virtual part, such as a software product or license?" , "type" : "boolean" } }, "required" : [ "barcode_hash" , "category_name" , "full_name" , "name" , "pk" , "starred" , "thumbnail" ], "type" : "object" }`

**Example**

```json
{

    
"copy_substitutes"
:
 
true
,

    
"include_inherited"
:
 
true
,

    
"part"
:
 
0
,

    
"remove_existing"
:
 
true
,

    
"skip_invalid"
:
 
true

}
```

#### 201 Created

Content type: `application/json { "copy_substitutes" : true , "include_inherited" : true , "part" : 0 , "remove_existing" : true , "skip_invalid" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for copying a BOM from another part." , "properties" : { "copy_substitutes" : { "default" : true , "description" : "Copy substitute parts when duplicate BOM items" , "title" : "Copy Substitute Parts" , "type" : "boolean" }, "include_inherited" : { "default" : false , "description" : "Include BOM items which are inherited from templated parts" , "type" : "boolean" }, "part" : { "description" : "Select part to copy BOM from" , "type" : "integer" }, "remove_existing" : { "default" : true , "description" : "Remove existing BOM items before copying" , "title" : "Remove Existing Data" , "type" : "boolean" }, "skip_invalid" : { "default" : false , "description" : "Enable this option to skip invalid rows" , "title" : "Skip Invalid Rows" , "type" : "boolean" } }, "required" : [ "part" ], "type" : "object" }`

#### 200 OK

Content type: `application/json { "bom_checked_by" : 0 , "bom_checked_by_detail" : null , "bom_checked_date" : "2022-04-13" , "bom_checksum" : "string" , "bom_validated" : true , "pk" : 0 , "valid" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for Part BOM information." , "properties" : { "bom_checked_by" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "bom_checked_by_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/User" } ], "nullable" : true , "readOnly" : true }, "bom_checked_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "bom_checksum" : { "description" : "Stored BOM checksum" , "readOnly" : true , "type" : "string" }, "bom_validated" : { "description" : "Is the BOM for this part valid?" , "readOnly" : true , "type" : "boolean" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "valid" : { "default" : false , "description" : "Validate entire Bill of Materials" , "type" : "boolean" , "writeOnly" : true } }, "required" : [ "bom_checksum" , "bom_validated" , "pk" ], "type" : "object" }`

**Example**

```json
{

    
"bom_checked_by"
:
 
0
,

    
"bom_checked_by_detail"
:
 
null
,

    
"bom_checked_date"
:
 
"2022-04-13"
,

    
"bom_checksum"
:
 
"string"
,

    
"bom_validated"
:
 
true
,

    
"pk"
:
 
0
,

    
"valid"
:
 
true

}
```

#### 200 OK

Content type: `application/json { "bom_checked_by" : 0 , "bom_checked_by_detail" : null , "bom_checked_date" : "2022-04-13" , "bom_checksum" : "string" , "bom_validated" : true , "pk" : 0 , "valid" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for Part BOM information." , "properties" : { "bom_checked_by" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "bom_checked_by_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/User" } ], "nullable" : true , "readOnly" : true }, "bom_checked_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "bom_checksum" : { "description" : "Stored BOM checksum" , "readOnly" : true , "type" : "string" }, "bom_validated" : { "description" : "Is the BOM for this part valid?" , "readOnly" : true , "type" : "boolean" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "valid" : { "default" : false , "description" : "Validate entire Bill of Materials" , "type" : "boolean" , "writeOnly" : true } }, "required" : [ "bom_checksum" , "bom_validated" , "pk" ], "type" : "object" }`

**Example**

```json
{

    
"bom_checked_by"
:
 
0
,

    
"bom_checked_by_detail"
:
 
null
,

    
"bom_checked_date"
:
 
"2022-04-13"
,

    
"bom_checksum"
:
 
"string"
,

    
"bom_validated"
:
 
true
,

    
"pk"
:
 
0
,

    
"valid"
:
 
true

}
```

#### 200 OK

Content type: `application/json { "bom_checked_by" : 0 , "bom_checked_by_detail" : null , "bom_checked_date" : "2022-04-13" , "bom_checksum" : "string" , "bom_validated" : true , "pk" : 0 , "valid" : true } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for Part BOM information." , "properties" : { "bom_checked_by" : { "nullable" : true , "readOnly" : true , "type" : "integer" }, "bom_checked_by_detail" : { "allOf" : [ { "$ref" : "#/components/schemas/User" } ], "nullable" : true , "readOnly" : true }, "bom_checked_date" : { "format" : "date" , "nullable" : true , "readOnly" : true , "type" : "string" }, "bom_checksum" : { "description" : "Stored BOM checksum" , "readOnly" : true , "type" : "string" }, "bom_validated" : { "description" : "Is the BOM for this part valid?" , "readOnly" : true , "type" : "boolean" }, "pk" : { "readOnly" : true , "title" : "ID" , "type" : "integer" }, "valid" : { "default" : false , "description" : "Validate entire Bill of Materials" , "type" : "boolean" , "writeOnly" : true } }, "required" : [ "bom_checksum" , "bom_validated" , "pk" ], "type" : "object" }`

#### 200 OK

Content type: `application/json { "bom_cost_max" : "string" , "bom_cost_min" : "string" , "currency" : "string" , "internal_cost_max" : "string" , "internal_cost_min" : "string" , "overall_max" : "string" , "overall_min" : "string" , "override_max" : "string" , "override_max_currency" : "string" , "override_min" : "string" , "override_min_currency" : "string" , "purchase_cost_max" : "string" , "purchase_cost_min" : "string" , "sale_history_max" : "string" , "sale_history_min" : "string" , "sale_price_max" : "string" , "sale_price_min" : "string" , "scheduled_for_update" : true , "supplier_price_max" : "string" , "supplier_price_min" : "string" , "update" : true , "updated" : "2022-04-13T15:42:05.901Z" , "variant_cost_max" : "string" , "variant_cost_min" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for Part pricing information." , "properties" : { "bom_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "bom_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "currency" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "internal_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "internal_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "overall_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "overall_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "override_max" : { "description" : "Override calculated value for maximum price" , "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "title" : "Maximum Price" , "type" : "string" }, "override_max_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Maximum price currency" , "type" : "string" }, "override_min" : { "description" : "Override calculated value for minimum price" , "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "title" : "Minimum Price" , "type" : "string" }, "override_min_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Minimum price currency" , "type" : "string" }, "purchase_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "purchase_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_history_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_history_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_price_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_price_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "scheduled_for_update" : { "readOnly" : true , "type" : "boolean" }, "supplier_price_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "supplier_price_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "update" : { "default" : false , "description" : "Update pricing for this part" , "nullable" : true , "type" : "boolean" , "writeOnly" : true }, "updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "variant_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "variant_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" } }, "required" : [ "scheduled_for_update" ], "type" : "object" }`

**Example**

```json
{

    
"bom_cost_max"
:
 
"string"
,

    
"bom_cost_min"
:
 
"string"
,

    
"currency"
:
 
"string"
,

    
"internal_cost_max"
:
 
"string"
,

    
"internal_cost_min"
:
 
"string"
,

    
"overall_max"
:
 
"string"
,

    
"overall_min"
:
 
"string"
,

    
"override_max"
:
 
"string"
,

    
"override_max_currency"
:
 
"string"
,

    
"override_min"
:
 
"string"
,

    
"override_min_currency"
:
 
"string"
,

    
"purchase_cost_max"
:
 
"string"
,

    
"purchase_cost_min"
:
 
"string"
,

    
"sale_history_max"
:
 
"string"
,

    
"sale_history_min"
:
 
"string"
,

    
"sale_price_max"
:
 
"string"
,

    
"sale_price_min"
:
 
"string"
,

    
"scheduled_for_update"
:
 
true
,

    
"supplier_price_max"
:
 
"string"
,

    
"supplier_price_min"
:
 
"string"
,

    
"update"
:
 
true
,

    
"updated"
:
 
"2022-04-13T15:42:05.901Z"
,

    
"variant_cost_max"
:
 
"string"
,

    
"variant_cost_min"
:
 
"string"

}
```

#### 200 OK

Content type: `application/json { "bom_cost_max" : "string" , "bom_cost_min" : "string" , "currency" : "string" , "internal_cost_max" : "string" , "internal_cost_min" : "string" , "overall_max" : "string" , "overall_min" : "string" , "override_max" : "string" , "override_max_currency" : "string" , "override_min" : "string" , "override_min_currency" : "string" , "purchase_cost_max" : "string" , "purchase_cost_min" : "string" , "sale_history_max" : "string" , "sale_history_min" : "string" , "sale_price_max" : "string" , "sale_price_min" : "string" , "scheduled_for_update" : true , "supplier_price_max" : "string" , "supplier_price_min" : "string" , "update" : true , "updated" : "2022-04-13T15:42:05.901Z" , "variant_cost_max" : "string" , "variant_cost_min" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for Part pricing information." , "properties" : { "bom_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "bom_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "currency" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "internal_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "internal_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "overall_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "overall_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "override_max" : { "description" : "Override calculated value for maximum price" , "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "title" : "Maximum Price" , "type" : "string" }, "override_max_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Maximum price currency" , "type" : "string" }, "override_min" : { "description" : "Override calculated value for minimum price" , "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "title" : "Minimum Price" , "type" : "string" }, "override_min_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Minimum price currency" , "type" : "string" }, "purchase_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "purchase_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_history_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_history_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_price_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_price_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "scheduled_for_update" : { "readOnly" : true , "type" : "boolean" }, "supplier_price_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "supplier_price_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "update" : { "default" : false , "description" : "Update pricing for this part" , "nullable" : true , "type" : "boolean" , "writeOnly" : true }, "updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "variant_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "variant_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" } }, "required" : [ "scheduled_for_update" ], "type" : "object" }`

**Example**

```json
{

    
"bom_cost_max"
:
 
"string"
,

    
"bom_cost_min"
:
 
"string"
,

    
"currency"
:
 
"string"
,

    
"internal_cost_max"
:
 
"string"
,

    
"internal_cost_min"
:
 
"string"
,

    
"overall_max"
:
 
"string"
,

    
"overall_min"
:
 
"string"
,

    
"override_max"
:
 
"string"
,

    
"override_max_currency"
:
 
"string"
,

    
"override_min"
:
 
"string"
,

    
"override_min_currency"
:
 
"string"
,

    
"purchase_cost_max"
:
 
"string"
,

    
"purchase_cost_min"
:
 
"string"
,

    
"sale_history_max"
:
 
"string"
,

    
"sale_history_min"
:
 
"string"
,

    
"sale_price_max"
:
 
"string"
,

    
"sale_price_min"
:
 
"string"
,

    
"scheduled_for_update"
:
 
true
,

    
"supplier_price_max"
:
 
"string"
,

    
"supplier_price_min"
:
 
"string"
,

    
"update"
:
 
true
,

    
"updated"
:
 
"2022-04-13T15:42:05.901Z"
,

    
"variant_cost_max"
:
 
"string"
,

    
"variant_cost_min"
:
 
"string"

}
```

#### 200 OK

Content type: `application/json { "bom_cost_max" : "string" , "bom_cost_min" : "string" , "currency" : "string" , "internal_cost_max" : "string" , "internal_cost_min" : "string" , "overall_max" : "string" , "overall_min" : "string" , "override_max" : "string" , "override_max_currency" : "string" , "override_min" : "string" , "override_min_currency" : "string" , "purchase_cost_max" : "string" , "purchase_cost_min" : "string" , "sale_history_max" : "string" , "sale_history_min" : "string" , "sale_price_max" : "string" , "sale_price_min" : "string" , "scheduled_for_update" : true , "supplier_price_max" : "string" , "supplier_price_min" : "string" , "update" : true , "updated" : "2022-04-13T15:42:05.901Z" , "variant_cost_max" : "string" , "variant_cost_min" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for Part pricing information." , "properties" : { "bom_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "bom_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "currency" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "internal_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "internal_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "overall_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "overall_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "override_max" : { "description" : "Override calculated value for maximum price" , "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "title" : "Maximum Price" , "type" : "string" }, "override_max_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Maximum price currency" , "type" : "string" }, "override_min" : { "description" : "Override calculated value for minimum price" , "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "title" : "Minimum Price" , "type" : "string" }, "override_min_currency" : { "description" : "Select currency from available options\n\n* `AUD` - AUD - Australian Dollar\n* `CAD` - CAD - Canadian Dollar\n* `CNY` - CNY - Chinese Yuan\n* `EUR` - EUR - Euro\n* `GBP` - GBP - British Pound\n* `JPY` - JPY - Japanese Yen\n* `NZD` - NZD - New Zealand Dollar\n* `USD` - USD - US Dollar\n\nOther valid currencies may be found in the 'CURRENCY_CODES' global setting." , "title" : "Minimum price currency" , "type" : "string" }, "purchase_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "purchase_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_history_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_history_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_price_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "sale_price_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "scheduled_for_update" : { "readOnly" : true , "type" : "boolean" }, "supplier_price_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "supplier_price_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "update" : { "default" : false , "description" : "Update pricing for this part" , "nullable" : true , "type" : "boolean" , "writeOnly" : true }, "updated" : { "format" : "date-time" , "nullable" : true , "readOnly" : true , "type" : "string" }, "variant_cost_max" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" }, "variant_cost_min" : { "format" : "decimal" , "nullable" : true , "pattern" : "^-?\\d{0,13}(?:\\.\\d{0,6})?$" , "readOnly" : true , "type" : "string" } }, "required" : [ "scheduled_for_update" ], "type" : "object" }`

#### 200 OK

Content type: `application/json { "allocated_to_build_orders" : 10.12 , "allocated_to_sales_orders" : 10.12 , "building" : 10.12 , "can_build" : 10.12 , "ordering" : 10.12 , "required_for_build_orders" : 10.12 , "required_for_sales_orders" : 10.12 , "scheduled_to_build" : 0 , "total_stock" : 10.12 , "unallocated_stock" : 10.12 } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for Part requirements." , "properties" : { "allocated_to_build_orders" : { "format" : "double" , "readOnly" : true , "type" : "number" }, "allocated_to_sales_orders" : { "description" : "Return the allocated sales order quantity." , "format" : "double" , "readOnly" : true , "type" : "number" }, "building" : { "format" : "double" , "readOnly" : true , "title" : "In Production" , "type" : "number" }, "can_build" : { "format" : "double" , "readOnly" : true , "type" : "number" }, "ordering" : { "format" : "double" , "readOnly" : true , "title" : "On Order" , "type" : "number" }, "required_for_build_orders" : { "format" : "double" , "readOnly" : true , "type" : "number" }, "required_for_sales_orders" : { "format" : "double" , "readOnly" : true , "type" : "number" }, "scheduled_to_build" : { "readOnly" : true , "type" : "integer" }, "total_stock" : { "format" : "double" , "readOnly" : true , "type" : "number" }, "unallocated_stock" : { "format" : "double" , "readOnly" : true , "title" : "Available Stock" , "type" : "number" } }, "required" : [ "allocated_to_build_orders" , "allocated_to_sales_orders" , "building" , "can_build" , "ordering" , "required_for_build_orders" , "required_for_sales_orders" , "scheduled_to_build" , "total_stock" , "unallocated_stock" ], "type" : "object" }`

#### 200 OK

Content type: `application/json { "latest" : "string" , "next" : "string" } Warning: This example has been generated automatically from the schema and it is not accurate. Refer to the schema for more information. Schema of the response body { "description" : "Serializer for Part serial number information." , "properties" : { "latest" : { "nullable" : true , "readOnly" : true , "type" : "string" }, "next" : { "readOnly" : true , "type" : "string" } }, "required" : [ "next" ], "type" : "object" }`
