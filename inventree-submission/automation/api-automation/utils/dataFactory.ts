/**
 * dataFactory.ts
 * Cleanup helpers for records created by the InvenTree Parts API tests.
 */

import { ApiClient } from './apiClient';

/**
 * Delete a single Part by pk.
 * Used in individual test afterEach hooks.
 */
export async function deletePart(client: ApiClient, pk: number): Promise<void> {
  await client.delete(`/api/part/${pk}/`);
}

/**
 * Delete a single Category by pk.
 */
export async function deleteCategory(
  client: ApiClient,
  pk: number,
): Promise<void> {
  await client.delete(`/api/part/category/${pk}/`);
}

/**
 * Delete a PartRelation by pk.
 */
export async function deleteRelation(
  client: ApiClient,
  pk: number,
): Promise<void> {
  await client.delete(`/api/part/related/${pk}/`);
}

/**
 * Delete an internal price break by pk.
 */
export async function deleteInternalPrice(
  client: ApiClient,
  pk: number,
): Promise<void> {
  await client.delete(`/api/part/internal-price/${pk}/`);
}

/**
 * Delete a sale price break by pk.
 */
export async function deleteSalePrice(
  client: ApiClient,
  pk: number,
): Promise<void> {
  await client.delete(`/api/part/sale-price/${pk}/`);
}

/**
 * Delete a test template by pk.
 */
export async function deleteTestTemplate(
  client: ApiClient,
  pk: number,
): Promise<void> {
  await client.delete(`/api/part/test-template/${pk}/`);
}
