import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../fixtures/users';

const productId = 'sauce-labs-backpack';

test.describe('Inventory actions', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('add product to cart updates badge count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addProduct(productId);
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('remove product clears cart badge', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addProduct(productId);
        await inventoryPage.removeProduct(productId);
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });
});
