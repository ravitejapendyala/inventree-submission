/**
 * dashboard.page.ts
 * Page Object for the InvenTree dashboard (home page).
 *
 * Evidence: home_page.png
 * - URL: /web/home
 * - Top nav links (underlined active): Dashboard | Parts | Stock | Manufacturing | Purchasing | Sales
 * - Right side: search icon, grid/layout icons, bell icon, "Ally Access" user dropdown (with chevron)
 * - Main content: heading "InvenTree Demo Server - Ally Access"
 * - Blue info box: "No Widgets Selected — Use the menu to add widgets to the dashboard"
 * - Getting Started section with cards: Getting Started, API, Developer Manual (each with "Read More" button)
 * - Right card: "Requires Superuser" in red — "This widget requires superuser permissions"
 */

import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  // Top nav links — confirmed text from home_page.png
  readonly dashboardNavLink: Locator;
  readonly partsNavLink: Locator;
  readonly stockNavLink: Locator;
  readonly manufacturingNavLink: Locator;
  readonly purchasingNavLink: Locator;
  readonly salesNavLink: Locator;

  // User menu — confirmed text "Ally Access" in top right
  readonly userMenuButton: Locator;

  // Page heading — confirmed "InvenTree Demo Server - Ally Access"
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Top nav is a horizontal list of links — use exact text from screenshot
    this.dashboardNavLink = page.getByRole('link', { name: 'Dashboard' });
    this.partsNavLink = page.getByRole('link', { name: 'Parts' }).first();
    this.stockNavLink = page.getByRole('link', { name: 'Stock' });
    this.manufacturingNavLink = page.getByRole('link', { name: 'Manufacturing' });
    this.purchasingNavLink = page.getByRole('link', { name: 'Purchasing' });
    this.salesNavLink = page.getByRole('link', { name: 'Sales' });

    // "Ally Access" button in top right (has a dropdown chevron)
    this.userMenuButton = page.getByRole('button', { name: 'Ally Access' })

    // Codegen: expect(page.locator('#root')).toContainText('InvenTree Demo Server - Ally Access')
    // Use exact text confirmed from codegen assertion
    this.pageHeading = page.getByText('InvenTree Demo Server - Ally Access');
  }

  /** Navigate directly to the dashboard */
  async goto(): Promise<void> {
    await this.page.goto('/web/home');
    await this.page.waitForLoadState('networkidle');
  }

  /** Assert that the dashboard is displayed */
  async assertLoaded(): Promise<void> {
    await this.page.waitForURL(/\/web\/home/);
    await this.pageHeading.waitFor({ state: 'visible' });
  }

  /** Click the "Parts" top nav link */
  async navigateToParts(): Promise<void> {
    await this.partsNavLink.click();
    await this.page.waitForURL(/\/web\/part/);
  }

  /** Assert all top nav links are visible (UI-03) */
  async assertTopNavLinks(): Promise<void> {
    for (const link of [
      this.dashboardNavLink,
      this.partsNavLink,
      this.stockNavLink,
      this.manufacturingNavLink,
      this.purchasingNavLink,
      this.salesNavLink,
    ]) {
      await link.waitFor({ state: 'visible' });
    }
  }
}
