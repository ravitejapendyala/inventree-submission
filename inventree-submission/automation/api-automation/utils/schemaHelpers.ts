/**
 * schemaHelpers.ts
 * Reusable assertion helpers for InvenTree API response shapes.
 * Call these inside Playwright `expect` blocks for consistent schema checks.
 */

import { expect, type APIResponse } from '@playwright/test';

// ─── Pagination wrapper ───────────────────────────────────────────────────────

/** Assert that a response body has the DRF paginated list shape */
export async function expectPaginatedList(
  response: APIResponse,
): Promise<{
  count: number;
  results: unknown[];
  next: string | null;
  previous: string | null;
}> {
  expect(response.status()).toBe(200);
  const body = (await response.json()) as
    | {
        count: number;
        results: unknown[];
        next: string | null;
        previous: string | null;
      }
    | unknown[];

  if (Array.isArray(body)) {
    return {
      count: body.length,
      results: body,
      next: null,
      previous: null,
    };
  }

  const paginatedBody = body as {
    count: number;
    results: unknown[];
    next: string | null;
    previous: string | null;
  };
  expect(typeof paginatedBody.count).toBe('number');
  expect(Array.isArray(paginatedBody.results)).toBe(true);
  expect('next' in paginatedBody).toBe(true);
  expect('previous' in paginatedBody).toBe(true);
  return paginatedBody;
}

// ─── Part shape ──────────────────────────────────────────────────────────────

/** Fields present in every Part list item */
const PART_LIST_FIELDS = [
  'pk',
  'name',
  'full_name',
  'barcode_hash',
  'category_name',
  'thumbnail',
  'starred',
] as const;

/** Assert a Part object has the minimum expected read fields */
export function expectPartShape(part: Record<string, unknown>): void {
  for (const field of PART_LIST_FIELDS) {
    expect(
      field in part,
      `Expected Part to have field "${field}"`,
    ).toBe(true);
  }
  expect(typeof part['pk']).toBe('number');
  expect(typeof part['name']).toBe('string');
}

// ─── Category shape ───────────────────────────────────────────────────────────

/** Assert a PartCategory object has the minimum expected read fields */
export function expectCategoryShape(cat: Record<string, unknown>): void {
  for (const field of ['pk', 'name', 'level', 'pathstring', 'starred']) {
    expect(field in cat, `Expected Category to have field "${field}"`).toBe(true);
  }
  expect(typeof cat['pk']).toBe('number');
  expect(typeof cat['name']).toBe('string');
}

// ─── CategoryTree shape ───────────────────────────────────────────────────────

export function expectCategoryTreeShape(node: Record<string, unknown>): void {
  for (const field of ['pk', 'name', 'parent', 'structural', 'subcategories']) {
    expect(field in node, `Expected CategoryTree node to have field "${field}"`).toBe(true);
  }
}

// ─── PriceBreak shape ─────────────────────────────────────────────────────────

export function expectPriceBreakShape(pb: Record<string, unknown>): void {
  for (const field of ['pk', 'part', 'quantity', 'price', 'price_currency']) {
    expect(field in pb, `Expected price break to have field "${field}"`).toBe(true);
  }
}

// ─── PartRelation shape ───────────────────────────────────────────────────────

export function expectRelationShape(rel: Record<string, unknown>): void {
  for (const field of ['pk', 'part_1', 'part_2', 'part_1_detail', 'part_2_detail']) {
    expect(field in rel, `Expected PartRelation to have field "${field}"`).toBe(true);
  }
}

// ─── Stocktake shape ─────────────────────────────────────────────────────────

export function expectStocktakeShape(entry: Record<string, unknown>): void {
  for (const field of ['pk', 'part', 'quantity', 'date', 'part_name']) {
    expect(field in entry, `Expected Stocktake to have field "${field}"`).toBe(true);
  }
}

// ─── TestTemplate shape ───────────────────────────────────────────────────────

export function expectTestTemplateShape(tmpl: Record<string, unknown>): void {
  for (const field of [
    'pk',
    'part',
    'test_name',
    'key',
    'enabled',
    'required',
    'requires_value',
    'requires_attachment',
  ]) {
    expect(field in tmpl, `Expected TestTemplate to have field "${field}"`).toBe(true);
  }

  // Some InvenTree deployments omit `results` on create responses.
  if ('results' in tmpl) {
    expect(Array.isArray(tmpl['results']) || tmpl['results'] == null).toBe(true);
  }
}

// ─── PartThumb shape ──────────────────────────────────────────────────────────

export function expectThumbShape(thumb: Record<string, unknown>): void {
  for (const field of ['image', 'count']) {
    expect(field in thumb, `Expected PartThumb to have field "${field}"`).toBe(true);
  }
  expect(typeof thumb['image']).toBe('string');
  expect(typeof thumb['count']).toBe('number');
}

// ─── Error response helpers ───────────────────────────────────────────────────

/** Assert a 400 Bad Request and (optionally) check the field name in the error */
export async function expectValidationError(
  response: APIResponse,
  fieldName?: string,
): Promise<void> {
  expect(response.status()).toBe(400);
  if (fieldName) {
    const body = (await response.json()) as Record<string, unknown>;
    expect(
      fieldName in body,
      `Expected validation error body to contain field "${fieldName}", got: ${JSON.stringify(body)}`,
    ).toBe(true);
  }
}

/** Assert a 401 or 403 response */
export function expectAuthError(response: APIResponse): void {
  expect([401, 403]).toContain(response.status());
}
