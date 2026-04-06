/**
 * part-categories.spec.ts
 * Tests: AT-017, AT-018, AT-019, AT-020, AT-021, AT-022, AT-023
 * Cover: Category list, create (top-level + child), missing name, filter by parent,
 *        top_level filter, category tree
 */

import { test, expect, type APIRequestContext } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import { createApiRequestContext } from '../utils/auth';
import { deleteCategory } from '../utils/dataFactory';
import {
  expectPaginatedList,
  expectCategoryShape,
  expectCategoryTreeShape,
  expectValidationError,
} from '../utils/schemaHelpers';
import { minimalCategory, childCategory } from '../test-data/partPayloads';

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

// ─── AT-017 ──────────────────────────────────────────────────────────────────

test('AT-017 — GET /api/part/category/ returns paginated list', async () => {
  const response = await client.get('/api/part/category/');
  const body = await expectPaginatedList(response);

  if (body.results.length > 0) {
    expectCategoryShape(body.results[0] as Record<string, unknown>);
  }
});

// ─── AT-018 ──────────────────────────────────────────────────────────────────

test('AT-018 — POST /api/part/category/ creates a top-level category', async () => {
  const payload = {
    ...minimalCategory,
    name: `${minimalCategory.name}-${Date.now()}`,
  };

  const response = await client.post('/api/part/category/', payload);
  expect(response.status()).toBe(201);

  const body = (await response.json()) as Record<string, unknown>;
  const categoryPk = body['pk'] as number;

  try {
    expect(typeof categoryPk).toBe('number');
    expect(body['name']).toBe(payload.name);
    expect(body['level']).toBe(0);
    expect(body['parent']).toBeNull();
    expect(body['structural']).toBe(false);
  } finally {
    await deleteCategory(client, categoryPk);
  }
});

// ─── AT-019 ──────────────────────────────────────────────────────────────────

test('AT-019 — POST /api/part/category/ creates a child category', async () => {
  const parentResponse = await client.post('/api/part/category/', {
    ...minimalCategory,
    name: `API-PARENT-CATEGORY-${Date.now()}`,
  });
  expect(parentResponse.status()).toBe(201);
  const parentBody = (await parentResponse.json()) as Record<string, unknown>;
  const parentPk = parentBody['pk'] as number;

  try {
    const payload = {
      ...childCategory(parentPk),
      name: `API-SUB-CATEGORY-${Date.now()}`,
    };

    const response = await client.post('/api/part/category/', payload);
    expect(response.status()).toBe(201);

    const body = (await response.json()) as Record<string, unknown>;
    const childPk = body['pk'] as number;

    try {
      expect(typeof childPk).toBe('number');
      expect(body['parent']).toBe(parentPk);
      expect(body['level']).toBe(1);
      expect(typeof body['pathstring']).toBe('string');
    } finally {
      await deleteCategory(client, childPk);
    }
  } finally {
    await deleteCategory(client, parentPk);
  }
});

// ─── AT-020 ──────────────────────────────────────────────────────────────────

test('AT-020 — POST /api/part/category/ without name returns 400', async () => {
  const response = await client.post('/api/part/category/', {
    description: 'Category with no name field',
  });

  await expectValidationError(response, 'name');
});

// ─── AT-021 ──────────────────────────────────────────────────────────────────

test('AT-021 — GET /api/part/category/?parent=<id> returns only direct children', async () => {
  const parentResponse = await client.post('/api/part/category/', {
    ...minimalCategory,
    name: `API-FILTER-PARENT-${Date.now()}`,
  });
  expect(parentResponse.status()).toBe(201);
  const parentBody = (await parentResponse.json()) as Record<string, unknown>;
  const parentPk = parentBody['pk'] as number;

  const childResponse = await client.post('/api/part/category/', {
    ...childCategory(parentPk),
    name: `API-FILTER-CHILD-${Date.now()}`,
  });
  expect(childResponse.status()).toBe(201);
  const childBody = (await childResponse.json()) as Record<string, unknown>;
  const childPk = childBody['pk'] as number;

  try {
    const response = await client.get('/api/part/category/', {
      parent: parentPk,
    });

    const body = await expectPaginatedList(response);
    const childIds = (body.results as Array<Record<string, unknown>>).map(
      (result) => result['pk'] as number,
    );

    expect(childIds).toContain(childPk);

    for (const result of body.results as Array<Record<string, unknown>>) {
      expect(result['parent']).toBe(parentPk);
    }
  } finally {
    await deleteCategory(client, childPk);
    await deleteCategory(client, parentPk);
  }
});

// ─── AT-022 ──────────────────────────────────────────────────────────────────

test('AT-022 — GET /api/part/category/?top_level=true returns root categories only', async () => {
  const response = await client.get('/api/part/category/', {
    top_level: true,
  });

  const body = await expectPaginatedList(response);
  for (const result of body.results as Array<Record<string, unknown>>) {
    // Root categories have level 0 and null parent (InvenTree uses null for top-level)
    expect(result['level']).toBe(0);
  }
});

// ─── AT-023 ──────────────────────────────────────────────────────────────────

test('AT-023 — GET /api/part/category/tree/ returns slim category tree', async () => {
  const response = await client.get('/api/part/category/tree/');
  expect(response.status()).toBe(200);

  const body = (await response.json()) as unknown[];
  expect(Array.isArray(body)).toBe(true);

  if (body.length > 0) {
    expectCategoryTreeShape(body[0] as Record<string, unknown>);
  }
});
