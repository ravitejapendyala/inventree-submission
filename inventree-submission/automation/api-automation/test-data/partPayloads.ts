/**
 * partPayloads.ts
 * Pre-built request payloads for InvenTree Parts API tests.
 * Import and use directly in test specs or data factory.
 */

/** Minimum valid Part payload — only `name` is required */
export const minimalPart = {
  name: 'API-TEST-PART-MINIMAL',
};

/** Full Part payload — all documented writable fields populated */
export const fullPart = (categoryPk: number) => ({
  name: 'API-FULL-PART-001',
  IPN: 'TEST-IPN-001',
  description: 'Full test part created by API automation',
  category: categoryPk,
  assembly: false,
  component: true,
  active: true,
  purchaseable: true,
  salable: true,
  trackable: false,
  testable: false,
  virtual: false,
  locked: false,
  keywords: 'api test automation',
  link: 'https://example.com/datasheet',
  units: 'pcs',
  notes: 'Created by Playwright API automation',
  minimum_stock: 10.0,
  default_expiry: 365,
});

/** Part with testable=true — required for test-template tests */
export const testablePart = {
  name: 'API-TESTABLE-PART',
  testable: true,
  trackable: true,
};

/** Part with testable=false — used in negative test-template test */
export const nonTestablePart = {
  name: 'API-NON-TESTABLE-PART',
  testable: false,
};

/** name that exceeds maxLength (100) */
export const longName = 'A'.repeat(101);

/** Minimum valid category payload */
export const minimalCategory = {
  name: 'API-TEST-CATEGORY',
  description: 'Top-level category for API tests',
};

/** Child category payload — requires parentPk to be set */
export const childCategory = (parentPk: number) => ({
  name: 'API-SUB-CATEGORY',
  description: 'Child category for cascade filter tests',
  parent: parentPk,
});

/** Internal price break — valid */
export const validInternalPrice = (partPk: number) => ({
  part: partPk,
  quantity: 100.0,
  price: '1.500000',
  price_currency: 'USD',
});

/** Internal price break — invalid currency */
export const invalidCurrencyPrice = (partPk: number) => ({
  part: partPk,
  quantity: 1.0,
  price: '5.00',
  price_currency: 'INVALID',
});

/** Internal price break — price with too many decimal places */
export const invalidDecimalPrice = (partPk: number) => ({
  part: partPk,
  quantity: 1.0,
  price: '1.12345678901', // 11 decimal places — exceeds pattern ^-?\d{0,13}(?:\.\d{0,6})?$
  price_currency: 'USD',
});

/** Sale price break — valid */
export const validSalePrice = (partPk: number) => ({
  part: partPk,
  quantity: 10.0,
  price: '9.990000',
  price_currency: 'USD',
});

/** Related parts link */
export const relatedParts = (partAPk: number, partBPk: number) => ({
  part_1: partAPk,
  part_2: partBPk,
  note: 'These parts are alternatives — created by API test',
});

/** Self-relation (part_1 == part_2) — expected 400 */
export const selfRelation = (partPk: number) => ({
  part_1: partPk,
  part_2: partPk,
});

/** Stocktake entry payload */
export const stocktakeEntry = (partPk: number) => ({
  part: partPk,
  quantity: 50.0,
  item_count: 3,
  cost_min: '1.50',
  cost_min_currency: 'USD',
  cost_max: '2.50',
  cost_max_currency: 'USD',
});

/** Stocktake generate payload */
export const stocktakeGenerate = (partPk: number) => ({
  part: partPk,
  generate_entry: true,
  generate_report: false,
});

/** Test template — valid */
export const validTestTemplate = (partPk: number) => ({
  part: partPk,
  test_name: 'Visual Inspection',
  description: 'Check for physical damage',
  enabled: true,
  required: true,
  requires_value: false,
  requires_attachment: false,
});
