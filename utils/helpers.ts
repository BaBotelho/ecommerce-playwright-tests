import { faker } from '@faker-js/faker';

export const createCheckoutUser = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode()
    };
};
