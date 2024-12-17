import {test, expect, Page, Locator} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import {BrowserUtility} from "../../../utility.spec";


//---------------- This part for not importing dontenv 
let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.setup();
});

test('Test5 getting environment variable without importing .env file', async ({page}) => {

    await page.goto(`${loginPage.baseUrl}/login`);
    console.log(`${loginPage.baseUrl}/login`);
    BrowserUtility.sleep(2000);
    console.log(process.env[`${'AdminEmail'}`]);

    //const baseUrl = await BrowserUtility.getEnvVariable2("baseURL");
    //await page.goto(`${baseUrl}/login`); 
    //console.log(await BrowserUtility.getEnvVariable2('AdminEmail'));
});