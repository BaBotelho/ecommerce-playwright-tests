import type { Page } from '@playwright/test';
import { selectors } from '../utils/constants';

export class CartPage {
    constructor(private page: Page) { }

    async getItemCount() {
        return this.page.locator(selectors.cart.cartItems).count();
    }

    async removeProduct(productId: string) {
        await this.page.click(`button[id*="remove-${productId}"]`);
    }

    async checkout() {
        await this.page.click(selectors.cart.checkoutButton);
    }

    async continueShopping() {
        await this.page.click(selectors.cart.continueShopping);
    }
}
