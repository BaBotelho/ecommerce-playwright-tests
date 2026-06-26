import type { Page } from '@playwright/test';
import { selectors } from '../utils/constants';

export class LoginPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.page.fill(selectors.login.username, username);
        await this.page.fill(selectors.login.password, password);
        await this.page.click(selectors.login.submit);
    }

    async getErrorMessage() {
        return this.page.textContent(selectors.login.errorMessage);
    }
}
