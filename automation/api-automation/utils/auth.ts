import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { request as playwrightRequest, type APIRequestContext } from '@playwright/test';

/**
 * auth.ts
 * Authentication helpers for InvenTree API tests.
 */

const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'api-automation', '.env'),
  path.resolve(__dirname, '..', '.env'),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

/**
 * Validate that the INVENTREE_API_TOKEN env var is set.
 * Call this in a beforeAll block to fail fast with a clear message.
 */
export function requireApiToken(): string {
  const token = process.env.INVENTREE_API_TOKEN;
  if (!token || token === 'your-api-token-here' || token.trim() === '') {
    throw new Error(
      'INVENTREE_API_TOKEN is not set.\n' +
        'Copy .env.example to .env and set a valid token before running tests.\n' +
        'Obtain a token via: POST /api/user/token/ (Basic Auth) or Django admin.',
    );
  }
  return token;
}

/**
 * Build the Authorization header value for token auth.
 * Usage: headers: { Authorization: tokenHeader() }
 */
export function tokenHeader(token?: string): string {
  const t = token ?? process.env.INVENTREE_API_TOKEN ?? '';
  const scheme = process.env.INVENTREE_AUTH_SCHEME ?? 'Basic';
  return `${scheme} ${t}`;
}

/**
 * Create a dedicated API request context for suite-level setup and teardown.
 * This avoids reusing Playwright's per-test request fixture across hooks/tests.
 */
export async function createApiRequestContext(): Promise<APIRequestContext> {
  requireApiToken();

  return playwrightRequest.newContext({
    extraHTTPHeaders: {
      Authorization: tokenHeader(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ignoreHTTPSErrors: true,
  });
}
