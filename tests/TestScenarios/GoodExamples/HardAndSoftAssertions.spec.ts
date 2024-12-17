import {test, expect} from '@playwright/test';

test('Hard Assertion Example', async ({page}) => {
    // Open a URL
    await page.goto('https://www.demoblaze.com');

    // Hard Assertions: Fail will stop execution
    await expect(page).toHaveTitle('Wrong Title'); // This will fail
    await expect(page).toHaveURL('https://www.demoblaze.com'); // It won't execute after all
    const logo = page.locator('nav.navbar-brand');
    await expect(logo).toBeVisible();
});
test('Soft Assertion Example', async ({page}) => {
    await page.goto('https://www.demoblaze.com');

    // Soft Assertions: Fail will not stop execution
    await expect.soft(page).toHaveTitle('Wrong Title'); // This will fail
    await expect.soft(page).toHaveURL('https://www.demoblaze.com'); // Will still execute
    const logo = page.locator('nav.navbar-brand');
    await expect.soft(logo).toBeVisible(); // Will still execute
});