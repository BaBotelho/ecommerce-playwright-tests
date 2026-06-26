import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../fixtures/users';

const productId = 'sauce-labs-backpack';

test.describe('Cart flow', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('cart shows one item after adding product', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addProduct(productId);
        await inventoryPage.openCart();

        await expect(page.locator('.cart_item')).toHaveCount(1);
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        const itemCount = await cartPage.getItemCount();
        expect(itemCount).toBe(1);
    });

    test('remove product from cart leaves cart empty', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addProduct(productId);
        await inventoryPage.openCart();

        await cartPage.removeProduct(productId);
        await expect(page.locator('.cart_item')).toHaveCount(0);
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });
});
