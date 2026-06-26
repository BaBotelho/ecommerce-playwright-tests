import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { createCheckoutUser } from '../utils/helpers';
import { users } from '../fixtures/users';

const productId = 'sauce-labs-backpack';

test('complete checkout flow should display success message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutUser = createCheckoutUser();

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addProduct(productId);
    await inventoryPage.openCart();

    await expect(cartPage.getItemCount()).resolves.toBe(1);
    await cartPage.checkout();

    await checkoutPage.fillCustomerData(
        checkoutUser.firstName,
        checkoutUser.lastName,
        checkoutUser.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
