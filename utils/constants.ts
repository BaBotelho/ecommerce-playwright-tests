export const selectors = {
    login: {
        username: '#user-name',
        password: '#password',
        submit: '#login-button',
        errorMessage: '[data-test="error"]'
    },
    inventory: {
        productLabel: '.product_label',
        addToCartButton: (name: string) => `button[data-test="add-to-cart-${name}"]`,
        removeButton: (name: string) => `button[data-test="remove-${name}"]`,
        cartBadge: '.shopping_cart_badge',
        cartLink: '.shopping_cart_link'
    },
    cart: {
        cartItems: '.cart_item',
        checkoutButton: '[data-test="checkout"]',
        continueShopping: '[data-test="continue-shopping"]'
    },
    checkout: {
        firstName: '[data-test="firstName"]',
        lastName: '[data-test="lastName"]',
        postalCode: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        finishButton: '[data-test="finish"]',
        successMessage: '.complete-header'
    }
};
