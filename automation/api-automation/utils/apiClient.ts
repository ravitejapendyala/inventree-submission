/**
 * apiClient.ts
 * Thin wrapper around Playwright's APIRequestContext for InvenTree.
 * Provides typed helpers for GET, POST, PATCH, DELETE with JSON handling.
 */

import type { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL?: string) {
    this.request = request;
    this.baseURL = baseURL ?? process.env.INVENTREE_BASE_URL ?? 'http://localhost:8000';
  }

  /** Resolve a path to a full URL */
  private url(path: string): string {
    return `${this.baseURL}${path}`;
  }

  /** GET with optional query parameters */
  async get(
    path: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<APIResponse> {
    const searchParams = params
      ? '?' + new URLSearchParams(
          Object.entries(params).map(([k, v]) => [k, String(v)]),
        ).toString()
      : '';
    return this.request.get(this.url(path + searchParams));
  }

  /** POST with a JSON body */
  async post(path: string, body?: unknown): Promise<APIResponse> {
    return this.request.post(this.url(path), { data: body ?? {} });
  }

  /** PATCH with a partial JSON body */
  async patch(path: string, body: unknown): Promise<APIResponse> {
    return this.request.patch(this.url(path), { data: body });
  }

  /** PUT with a full JSON body */
  async put(path: string, body: unknown): Promise<APIResponse> {
    return this.request.put(this.url(path), { data: body });
  }

  /** DELETE */
  async delete(path: string): Promise<APIResponse> {
    return this.request.delete(this.url(path));
  }

  /**
   * Return a new ApiClient that sends requests WITHOUT the Authorization header.
   * Used for auth failure test cases (AT-015, AT-016).
   */
  noAuth(): UnauthenticatedClient {
    return new UnauthenticatedClient(this.request, this.baseURL);
  }
}

/** Wrapper that strips the Authorization header for unauthenticated test calls */
class UnauthenticatedClient {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  private url(path: string): string {
    return `${this.baseURL}${path}`;
  }

  async get(path: string): Promise<APIResponse> {
    return this.request.get(this.url(path), {
      headers: { Authorization: '' },
    });
  }

  async post(path: string, body?: unknown): Promise<APIResponse> {
    return this.request.post(this.url(path), {
      data: body ?? {},
      headers: { Authorization: '' },
    });
  }
}
