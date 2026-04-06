/**
 * part-filters.spec.ts
 * Tests: AT-008, AT-009, AT-010, AT-011, AT-012, AT-013, AT-014
 * Cover: Part list filtering by category, cascade, search, pagination,
 *        active flag, has_stock, and IPN exact match
 */

import { test, expect, type APIRequestContext } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import { createApiRequestContext } from '../utils/auth';
import { deleteCategory, deletePart } from '../utils/dataFactory';
import { expectPaginatedList } from '../utils/schemaHelpers';

let client: ApiClient;
let requestContext: APIRequestContext;

test.beforeAll(async () => {
  requestContext = await createApiRequestContext();
  client = new ApiClient(requestContext);
});

test.afterAll(async () => {
  if (!requestContext || !client) {
    return;
  }

  await requestContext.dispose();
});

// ─── AT-008 ──────────────────────────────────────────────────────────────────

test('AT-008 — GET /api/part/?category=<id> returns parts in that category', async () => {
  const categoryResponse = await client.post('/api/part/category/', {
    name: `FILTER-CATEGORY-${Date.now()}`,
  });
  expect(categoryResponse.status()).toBe(201);
  const categoryBody = (await categoryResponse.json()) as Record<string, unknown>;
  const categoryPk = categoryBody['pk'] as number;

  const partResponse = await client.post('/api/part/', {
    name: `FILTER-PART-${Date.now()}`,
    category: categoryPk,
  });
  expect(partResponse.status()).toBe(201);
  const partBody = (await partResponse.json()) as Record<string, unknown>;
  const partPk = partBody['pk'] as number;

  try {
    const response = await client.get('/api/part/', { category: categoryPk });
    const body = await expectPaginatedList(response);
    const resultIds = (body.results as Array<Record<string, unknown>>).map(
      (part) => part['pk'] as number,
    );

    expect(resultIds).toContain(partPk);

    for (const part of body.results as Array<Record<string, unknown>>) {
      expect(part['category']).toBe(categoryPk);
    }
  } finally {
    await deletePart(client, partPk);
    await deleteCategory(client, categoryPk);
  }
});

// ─── AT-009 ──────────────────────────────────────────────────────────────────

test('AT-009 — cascade=true includes sub-category parts; cascade=false excludes them', async () => {
  const parentRes = await client.post('/api/part/category/', {
    name: `__PARENT-CAT-${Date.now()}`,
  });
  expect(parentRes.status()).toBe(201);
  const parent = (await parentRes.json()) as { pk: number };

  const childRes = await client.post('/api/part/category/', {
    name: `__CHILD-CAT-${Date.now()}`,
    parent: parent.pk,
  });
  expect(childRes.status()).toBe(201);
  const child = (await childRes.json()) as { pk: number };

  const childPartRes = await client.post('/api/part/', {
    name: `__CHILD-PART-${Date.now()}`,
    category: child.pk,
  });
  expect(childPartRes.status()).toBe(201);
  const childPart = (await childPartRes.json()) as { pk: number };

  try {
    const cascadeOn = await client.get('/api/part/', {
      category: parent.pk,
      cascade: true,
    });
    const cascadeOff = await client.get('/api/part/', {
      category: parent.pk,
      cascade: false,
    });

    const onBody = await expectPaginatedList(cascadeOn);
    const offBody = await expectPaginatedList(cascadeOff);

    // Cascade=true should return at least as many results as cascade=false
    expect(onBody.count).toBeGreaterThanOrEqual(offBody.count);

    // The child part should appear in cascade=true results
    const childInCascade = (onBody.results as Array<{ pk: number }>).some(
      (p) => p.pk === childPart.pk,
    );
    expect(childInCascade).toBe(true);

    const childInDirectOnly = (offBody.results as Array<{ pk: number }>).some(
      (p) => p.pk === childPart.pk,
    );
    expect(childInDirectOnly).toBe(false);
  } finally {
    await deletePart(client, childPart.pk);
    await deleteCategory(client, child.pk);
    await deleteCategory(client, parent.pk);
  }
});

// ─── AT-010 ──────────────────────────────────────────────────────────────────

test('AT-010 — GET /api/part/?search=<term> returns matching results', async () => {
  const searchName = `SEARCHABLE-PART-${Date.now()}`;
  const createRes = await client.post('/api/part/', { name: searchName });
  expect(createRes.status()).toBe(201);
  const created = (await createRes.json()) as { pk: number };

  try {
    const response = await client.get('/api/part/', { search: searchName });
    const body = await expectPaginatedList(response);
    const resultIds = (body.results as Array<Record<string, unknown>>).map(
      (part) => part['pk'] as number,
    );

    expect(resultIds).toContain(created.pk);
  } finally {
    await deletePart(client, created.pk);
  }
});

// ─── AT-011 ──────────────────────────────────────────────────────────────────

test('AT-011 — GET /api/part/?limit=2&offset=0 returns at most 2 results', async () => {
  const response = await client.get('/api/part/', { limit: 2, offset: 0 });
  const body = await expectPaginatedList(response);

  expect(body.results.length).toBeLessThanOrEqual(2);
  // count reflects total, not page size
  expect(typeof body.count).toBe('number');
});

test('AT-011b — Paginating with offset=1 shifts results', async () => {
  const page1 = await client.get('/api/part/', { limit: 2, offset: 0 });
  const page2 = await client.get('/api/part/', { limit: 2, offset: 1 });

  const body1 = (await expectPaginatedList(page1)).results as Array<{ pk: number }>;
  const body2 = (await expectPaginatedList(page2)).results as Array<{ pk: number }>;

  if (body1.length >= 2 && body2.length >= 1) {
    // The second item of page1 should be the first item of page2
    expect(body2[0].pk).toBe(body1[1].pk);
  }
});

// ─── AT-012 ──────────────────────────────────────────────────────────────────

test('AT-012 — GET /api/part/?active=false returns only inactive parts', async () => {
  const response = await client.get('/api/part/', { active: false });
  const body = await expectPaginatedList(response);

  for (const part of body.results as Array<Record<string, unknown>>) {
    expect(part['active']).toBe(false);
  }
});

// ─── AT-013 ──────────────────────────────────────────────────────────────────

test('AT-013 — GET /api/part/?has_stock=true returns parts where in_stock > 0', async () => {
  const response = await client.get('/api/part/', { has_stock: true });
  const body = await expectPaginatedList(response);

  for (const part of body.results as Array<Record<string, unknown>>) {
    const inStock = Number(part['in_stock'] ?? 0);
    expect(inStock).toBeGreaterThan(0);
  }
});

// ─── AT-014 ──────────────────────────────────────────────────────────────────

test('AT-014 — GET /api/part/?IPN=<exact> returns only parts with that exact IPN', async () => {
  // First, create a part with a known IPN
  const testIPN = `IPN-FILTER-TEST-${Date.now()}`;
  const createRes = await client.post('/api/part/', {
    name: `IPN-FILTER-PART-${Date.now()}`,
    IPN: testIPN,
  });
  expect(createRes.status()).toBe(201);
  const created = (await createRes.json()) as { pk: number };

  try {
    const response = await client.get('/api/part/', { IPN: testIPN });
    const body = await expectPaginatedList(response);

    expect(body.count).toBeGreaterThanOrEqual(1);
    for (const part of body.results as Array<Record<string, unknown>>) {
      expect(part['IPN']).toBe(testIPN);
    }
  } finally {
    await deletePart(client, created.pk);
  }
});
