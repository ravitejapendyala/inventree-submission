import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env from the api-automation directory
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,           // API tests share DB state — run serially
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 3,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.INVENTREE_BASE_URL ?? 'http://localhost:8000',
    extraHTTPHeaders: {
      Authorization: `${process.env.INVENTREE_AUTH_SCHEME ?? 'Basic'} ${process.env.INVENTREE_API_TOKEN ?? ''}`,

      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ignoreHTTPSErrors: true,
  },
});
