/**
 * partDetails.page.ts
 * Page Object for an individual Part detail page.
 *
 * Evidence: Playwright codegen output
 * - URL pattern: /web/part/{id}/details  (codegen confirmed: /web/part/1114/details)
 * - Page region: getByLabel('Part Details') — labeled panel containing part attributes
 * - Stock: page.locator('#root') contains "In Stock: {qty}"
 * - User display: #mantine-*-target contains username ("allaccess")
 */

import { type Page, type Locator } from '@playwright/test';

export class PartDetailsPage {
  readonly page: Page;

  /** Labeled panel containing part name, category, units etc.
   *  Codegen: expect(page.getByLabel('Part Details')).toContainText('Test Electronics') */
  readonly partDetailsPanel: Locator;

  /** Root element — codegen uses this to assert stock text: "In Stock: 150" */
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    // Codegen: page.getByLabel('Part Details') — aria-label on the panel/section
    this.partDetailsPanel = page.getByLabel('Part Details');
    // Codegen: page.locator('#root') used for broad page-level text assertions
    this.root = page.locator('#root');
  }

  /** Assert the part detail page has loaded.
   *  Codegen confirmed URL pattern is /web/part/{id}/details */
  async assertLoaded(): Promise<void> {
    await this.page.waitForURL(/\/web\/part\/\d+\/details/);
    await this.partDetailsPanel.waitFor({ state: 'visible' });
  }

  /** Assert the part detail panel contains the expected part name.
   *  Codegen: expect(page.getByLabel('Part Details')).toContainText('Test Electronics') */
  async assertPartName(name: string): Promise<void> {
    await this.partDetailsPanel.waitFor({ state: 'visible' });
    const text = await this.partDetailsPanel.textContent();
    if (!(text ?? '').includes(name)) {
      throw new Error(`Part Details panel does not contain "${name}". Got: ${text}`);
    }
  }

  /** Assert in-stock quantity is shown.
   *  Codegen: expect(page.locator('#root')).toContainText('In Stock: 150') */
  async assertInStock(qty: number): Promise<void> {
    await this.root.waitFor({ state: 'visible' });
    const text = await this.root.textContent();
    if (!(text ?? '').includes(`In Stock: ${qty}`)) {
      throw new Error(`Expected "In Stock: ${qty}" in page. Got: ${text?.substring(0, 200)}`);
    }
  }
}
