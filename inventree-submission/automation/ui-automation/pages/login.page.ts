/**
 * login.page.ts
 * Page Object for the InvenTree login page.
 *
 * Evidence: login_page.png
 * - URL: /web/login
 * - "Username" label + text input (value shown: "allaccess")
 * - "Password" label + password input (value shown: "nolimits")
 * - "Log In" blue button (primary CTA)
 * - "Send me an email" link (below password)
 * - Footer: "InvenTree demo instance - Click here for login details"
 * - Version badge: "1.3.0 dev | 469"
 */

import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Selectors derived from login_page.png visible labels and button text
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly sendEmailLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Codegen: aria-label="login-username" on the input element (Mantine input pattern)
    this.usernameInput = page.getByRole('textbox', { name: 'login-username' });
    // Codegen: aria-label="login-password" on the input element
    this.passwordInput = page.getByRole('textbox', { name: 'login-password' });
    // Codegen confirmed: button text is "Log In" (exact match)
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    // Evidence: "Send me an email" link visible below password field
    this.sendEmailLink = page.getByText('Send me an email');
  }

  /** Navigate directly to the login page */
  async goto(): Promise<void> {
    await this.page.goto('/web/login');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill credentials and click Log In.
   * After login, InvenTree redirects to /web/home (confirmed: home_page.png URL bar)
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Returns the error message element shown after a failed login.
   * Error state was not captured in screenshots — uses a best-effort locator.
   * InvenTree Django forms typically render errors in a list or alert.
   */
  getErrorMessage(): Locator {
    // InvenTree renders auth errors as "Login failed (400)" text
    return this.page.getByText('Login failed (400)');
  }

  /** Assert the login page is currently displayed */
  async assertOnLoginPage(): Promise<void> {
    await this.page.waitForURL(/\/web\/login/);
  }
}
