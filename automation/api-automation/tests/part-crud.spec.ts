/**
 * part-crud.spec.ts
 * Tests: AT-001, AT-002, AT-003, AT-003b, AT-015, AT-016
 * Cover: Part list, create (minimal), create (full fields), put update flow, auth rejection
 */

import { test, expect, type APIRequestContext } from '@playwright/test';
import { ApiClient } from '../utils/apiClient';
import { createApiRequestContext } from '../utils/auth';
import { deleteCategory, deletePart } from '../utils/dataFactory';
import {
  expectPaginatedList,
  expectPartShape,
  expectAuthError,
} from '../utils/schemaHelpers';
import { minimalPart, fullPart } from '../test-data/partPayloads';

let client: ApiClient;
let requestContext: APIRequestContext;
const createdPks: number[] = [];
const createdCategoryPks: number[] = [];

test.beforeAll(async () => {
  requestContext = await createApiRequestContext();
  client = new ApiClient(requestContext);
});

test.afterAll(async () => {
  if (!requestContext || !client) {
    return;
  }

  // Clean up individually created parts
  for (const pk of createdPks) {
    await deletePart(client, pk);
  }

  for (const pk of createdCategoryPks) {
    await deleteCategory(client, pk);
  }

  await requestContext.dispose();
});

// ─── AT-001 ──────────────────────────────────────────────────────────────────

test('AT-001 — GET /api/part/ returns paginated list of parts', async () => {
  const response = await client.get('/api/part/');
  const body = await expectPaginatedList(response);

  expect(body.count).toBeGreaterThanOrEqual(0);

  if (body.results.length > 0) {
    expectPartShape(body.results[0] as Record<string, unknown>);
  }
});

// ─── AT-002 ──────────────────────────────────────────────────────────────────

test('AT-002 — POST /api/part/ creates a part with only name supplied', async () => {
  const payload = { ...minimalPart, name: `${minimalPart.name}-${Date.now()}` };
  const response = await client.post('/api/part/', payload);

  expect(response.status()).toBe(201);
  const body = (await response.json()) as Record<string, unknown>;

  expect(typeof body['pk']).toBe('number');
  expect(body['name']).toBe(payload.name);
  expect(body['active']).toBe(true);        // default
  expect(body['assembly']).toBe(false);     // default
  expect(body['component']).toBe(true);     // default
  expect('barcode_hash' in body).toBe(true);
  expect('full_name' in body).toBe(true);
  expect('thumbnail' in body).toBe(true);

  createdPks.push(body['pk'] as number);
});

// ─── AT-003 ──────────────────────────────────────────────────────────────────

test('AT-003 — POST /api/part/ creates part with all core fields', async () => {
  const categoryResponse = await client.post('/api/part/category/', {
    name: `API-FULL-CATEGORY-${Date.now()}`,
    description: 'Temporary category for AT-003',
  });

  expect(categoryResponse.status()).toBe(201);
  const categoryBody = (await categoryResponse.json()) as Record<string, unknown>;
  const categoryPk = categoryBody['pk'] as number;
  createdCategoryPks.push(categoryPk);

  const payload = {
    ...fullPart(categoryPk),
    name: `API-FULL-PART-${Date.now()}`,
    IPN: `TEST-IPN-${Date.now()}`,
  };

  const response = await client.post('/api/part/', payload);

  expect(response.status()).toBe(201);
  const body = (await response.json()) as Record<string, unknown>;

  expect(typeof body['pk']).toBe('number');
  expect(body['name']).toBe(payload.name);
  expect(body['IPN']).toBe(payload.IPN);
  expect(body['description']).toBe(payload.description);
  expect(body['category']).toBe(categoryPk);
  expect(body['keywords']).toBe(payload.keywords);
  expect(body['units']).toBe(payload.units);
  expect(body['default_expiry']).toBe(365);

  createdPks.push(body['pk'] as number);
});

// ─── AT-003b ─────────────────────────────────────────────────────────────────

test('AT-003b — POST then PUT then GET validates updated part payload', async () => {
  const categoryResponse = await client.post('/api/part/category/', {
    name: `API-PUT-CATEGORY-${Date.now()}`,
    description: 'Temporary category for AT-003b',
  });

  expect(categoryResponse.status()).toBe(201);
  const categoryBody = (await categoryResponse.json()) as Record<string, unknown>;
  const categoryPk = categoryBody['pk'] as number;
  createdCategoryPks.push(categoryPk);

  const createPayload = {
    ...fullPart(categoryPk),
    name: `API-PUT-ORIGINAL-${Date.now()}`,
    IPN: `PUT-ORIG-${Date.now()}`,
  };

  const createResponse = await client.post('/api/part/', createPayload);
  expect(createResponse.status()).toBe(201);

  const createdBody = (await createResponse.json()) as Record<string, unknown>;
  const partPk = createdBody['pk'] as number;
  createdPks.push(partPk);

  const updatePayload = {
    ...fullPart(categoryPk),
    name: `API-PUT-UPDATED-${Date.now()}`,
    description: 'Updated description via PUT',
    IPN: `PUT-UPD-${Date.now()}`,
    keywords: 'updated,put,flow',
    units: 'pcs',
    default_expiry: 730,
    active: false,
    component: true,
    assembly: false,
    purchaseable: true,
    salable: false,
    testable: false,
    trackable: false,
    virtual: false,
  };

  const putResponse = await client.put(`/api/part/${partPk}/`, updatePayload);
  expect(putResponse.status()).toBe(200);

  const putBody = (await putResponse.json()) as Record<string, unknown>;
  expect(putBody['pk']).toBe(partPk);
  expect(putBody['name']).toBe(updatePayload.name);
  expect(putBody['description']).toBe(updatePayload.description);
  expect(putBody['IPN']).toBe(updatePayload.IPN);
  expect(putBody['default_expiry']).toBe(updatePayload.default_expiry);
  expect(putBody['active']).toBe(updatePayload.active);

  const getResponse = await client.get(`/api/part/${partPk}/`);
  expect(getResponse.status()).toBe(200);

  const getBody = (await getResponse.json()) as Record<string, unknown>;
  expect(getBody['pk']).toBe(partPk);
  expect(getBody['name']).toBe(updatePayload.name);
  expect(getBody['description']).toBe(updatePayload.description);
  expect(getBody['IPN']).toBe(updatePayload.IPN);
  expect(getBody['category']).toBe(categoryPk);
  expect(getBody['keywords']).toBe(updatePayload.keywords);
  expect(getBody['units']).toBe(updatePayload.units);
  expect(getBody['default_expiry']).toBe(updatePayload.default_expiry);
  expect(getBody['active']).toBe(updatePayload.active);
});

// ─── AT-015 ──────────────────────────────────────────────────────────────────

test('AT-015 — GET /api/part/ without auth is rejected', async () => {
  const response = await client.noAuth().get('/api/part/');
  expectAuthError(response);
});

// ─── AT-016 ──────────────────────────────────────────────────────────────────

test('AT-016 — POST /api/part/ without auth is rejected', async () => {
  const response = await client.noAuth().post('/api/part/', { name: 'UnauthorizedPart' });
  expectAuthError(response);
});
