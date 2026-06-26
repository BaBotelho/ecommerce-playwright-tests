import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../fixtures/users';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login flow', () => {
    test('valid login should navigate to inventory', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('invalid login should show error message', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(users.locked.username, users.locked.password);

        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface');
    });

    test('logout should return to login page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory.html/);

        await inventoryPage.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('#login-button')).toBeVisible();
    });
});
