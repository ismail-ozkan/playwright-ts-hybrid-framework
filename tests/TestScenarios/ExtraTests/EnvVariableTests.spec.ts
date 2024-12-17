import {test, expect, Page, Locator} from "@playwright/test";
import {LoginPage} from "../../pages/LoginPage";
import * as dotenv from "dotenv";
import {BrowserUtility} from "../../../utility.spec";

dotenv.config({path: "./.env"});

test("Test1 for accessing to Login page with environment variable BaseUrl", async ({
                                                                                       page,
                                                                                   }) => {
    const baseUrl = process.env.baseURL;
    if (!baseUrl) {
        throw new Error("BaseUrl is not defined in the environment variables");
    }
    await page.goto(`${baseUrl}/login`);
});

test("Test2 for accessing to Login page with environment variable BaseUrl", async ({
                                                                                       page,
                                                                                   }) => {
    /* const baseUrl = process.env.BaseUrl;
      if (!baseUrl) {
          throw new Error("BaseUrl is not defined in the environment variables");
      }*/

    await page.goto(`${process.env.baseURL}/login`);
});

test("Test3 BrowserUtility method usage", async ({page}) => {
    await page.goto(`${process.env.baseURL}/login`);
    BrowserUtility.sleep(2000);
});

test("Test4 Creating a BrowserUtility method for getting environment variable", async ({
                                                                                           page,
                                                                                       }) => {
    await page.goto(`${process.env.baseURL}/login`);
    console.log(await BrowserUtility.getEnvVariable("AdminEmail"));
    console.log(`${process.env.Supplier1YoneticisiEmail}`);
    BrowserUtility.sleep(2000);
});

//---------------- This part for not importing dontenv
let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.setup();
});

test("Test5 getting environment variable without importing .env file", async ({
                                                                                  page,
                                                                              }) => {
    await page.goto(`${loginPage.baseUrl}/login`);
    console.log(`${loginPage.baseUrl}/login`);
    BrowserUtility.sleep(2000);
    console.log(process.env[`${"AdminEmail"}`]);
    //const baseUrl = await BrowserUtility.getEnvVariable2("baseURL");
    //await page.goto(`${baseUrl}/login`);
    //console.log(await BrowserUtility.getEnvVariable2('AdminEmail'));
});
