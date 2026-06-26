import type { Page } from '@playwright/test';
import { selectors } from '../utils/constants';

export class InventoryPage {
    constructor(private page: Page) { }

    async addProduct(productId: string) {
        await this.page.click(selectors.inventory.addToCartButton(productId));
    }

    async removeProduct(productId: string) {
        await this.page.click(selectors.inventory.removeButton(productId));
    }

    async getCartCount() {
        return this.page.locator(selectors.inventory.cartBadge).innerText();
    }

    async openCart() {
        await this.page.click(selectors.inventory.cartLink);
    }

    async logout() {
        await this.page.click('[id="react-burger-menu-btn"]');
        await this.page.click('[id="logout_sidebar_link"]');
    }

    async isVisible() {
        return this.page.isVisible(selectors.inventory.productLabel);
    }
}
