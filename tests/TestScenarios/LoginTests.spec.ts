import {expect, test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {AdminPanelPage} from "../pages/AdminPanelPage";
import {HomePage} from "../pages/HomePage";


let loginPage: LoginPage;
let adminPanelPage: AdminPanelPage;
let homePage: HomePage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    adminPanelPage = new AdminPanelPage(page);
    homePage = new HomePage(page);
});

test.describe("LoginPage test scenarios", () => {

    test('Admin Login Tests', async ({page}) => {
        await page.goto(`${loginPage.pageUrl}`);
        await loginPage.login(process.env['AdminEmail'] ?? '', process.env['AdminPassword'] ?? '');
        await expect(adminPanelPage.welcomeBanner).toBeVisible();
        await page.waitForTimeout(10);
    });

    test('Other Roles User Login Tests', async ({page}) => {
        await page.goto(`${loginPage.pageUrl}`);
        const users = [
            {
                email: process.env['Supplier1YoneticisiEmail'] ?? '',
                password: process.env['Supplier1YoneticisiPassword'] ?? ''
            },
            {
                email: process.env['Supplier1CalisaniEmail'] ?? '',
                password: process.env['Supplier1CalisaniPassword'] ?? ''
            }/*,
            {email: process.env['Agency1YoneticisiEmail'] ?? '', password: process.env['Agency1YoneticisiPassword'] ?? ''},
            {email: process.env['Agency1CalisaniEmail'] ?? '', password: process.env['Agency1CalisaniPassword'] ?? ''},
            {email: process.env['AgentEmail'] ?? '', password: process.env['AgentPassword'] ?? ''}*/
        ];

        for (const user of users) {
            await loginPage.login(user.email, user.password);
            await page.waitForTimeout(2);
            const profileDropdownText = await homePage.profileDropdown.textContent();
            expect(profileDropdownText).toContain('Profil');
            await page.waitForTimeout(10);
            await homePage.logout();
            await page.goto(`${loginPage.pageUrl}`);
        }

    });

})

