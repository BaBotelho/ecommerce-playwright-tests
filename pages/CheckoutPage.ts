import type { Page } from '@playwright/test';
import { selectors } from '../utils/constants';

export class CheckoutPage {
    constructor(private page: Page) { }

    async fillCustomerData(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(selectors.checkout.firstName, firstName);
        await this.page.fill(selectors.checkout.lastName, lastName);
        await this.page.fill(selectors.checkout.postalCode, postalCode);
    }

    async continue() {
        await this.page.click(selectors.checkout.continueButton);
    }

    async finish() {
        await this.page.click(selectors.checkout.finishButton);
    }

    async getSuccessMessage() {
        return this.page.textContent(selectors.checkout.successMessage);
    }
}
