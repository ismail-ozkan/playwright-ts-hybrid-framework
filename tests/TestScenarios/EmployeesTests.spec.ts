import {test, expect, Locator, request, APIResponse} from '@playwright/test';
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {BrowserUtility} from "../../utility.spec";
import {EmployeesPage} from "../pages/EmployeesPage";

let homePage: HomePage;
let loginPage: LoginPage;
let employeesPage: EmployeesPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    employeesPage = new EmployeesPage(page);
});

test('Agency Çalışan Ekleme', async ({page}) => {
    await page.goto(`${loginPage.pageUrl}`);
    await loginPage.login(
        await BrowserUtility.getEnvVariable("Agency2YoneticisiEmail"),
        await BrowserUtility.getEnvVariable("Agency2YoneticisiPassword"));

    // Anasayfa Çalışanlar butonu tıklar
    await homePage.employeesLink.click();
    // Çalışanlar sayfası Yeni çalışan ekleme butonu tıklar
    await employeesPage.addNewEmployeeButton.click();

    // wait until the page ulr changed and fully loaded
    await page.waitForURL(`${employeesPage.pageUrl}/add`, {timeout: 10000});

    await employeesPage.nameInputBox.fill("İsmail Özkan");

    await employeesPage.titleDropdown.click();
    // Access the dropdown options
    const openedDropdownOptions = employeesPage.openedDropdownOptions;

    console.log(await openedDropdownOptions.count())
    // Log the text of all options
    for (let i = 0; i < await openedDropdownOptions.count(); i++) {
        const optionContext = openedDropdownOptions.nth(i).textContent();
        console.log(await optionContext);
    }
    await openedDropdownOptions.nth(0).click();
    // Assertion example
    expect(await openedDropdownOptions.count()).toBeGreaterThan(BigInt(0));

    await employeesPage.authorityDropdown.click();
    await employeesPage.openedDropdownOptions.nth(3).click();
    // simulate press esc key
    await page.keyboard.press('Escape');

    // await page.locator('[aria-hidden="true"]').first().click();

    await employeesPage.emailInputBox.fill("ozkan.ismail@test.com");

    await employeesPage.countryCodeDropdown.click();
    await employeesPage.countryCodeSearchBox.fill("Türkiye");
    await employeesPage.openedDropdownOptions.nth(0).click();
    // await page.keyboard.press('Enter');

    await expect(employeesPage.addButton).toBeDisabled();
    await employeesPage.phoneInputBox.fill("7985456643");

    await expect(employeesPage.addButton).toBeEnabled();

    await employeesPage.addButton.click();

    await page.waitForURL(`${employeesPage.pageUrl}`, {timeout: 10000});

    // Verify that the page url is correct
    expect(page.url()).toBe(employeesPage.pageUrl);


    /*

        // We can directly relocate this api request to api utility file and call it from there.
        // Because parameter service is only open to Admin users.
        /!*const apiRequest = await request.newContext();

        const response = await apiRequest.get(
            `${employeesPage.apiBaseURL}/Parameter/UserTitles?isActive=true`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${await BrowserUtility.getUserToken('Admin')}` // Replace with the full token
                }
            });


        // put all userTitles in a collection
        const jsonResponse = await response.json();
        const userTitles = await jsonResponse.result.userTitles;
        const userTitleCollection: string[] = [];
        for (const userTitle of userTitles) {
            userTitleCollection.push(userTitle.titleStr);
        }*!/

    */
    // Compare userTitleCollection and openedDropdownOptions
    // expect(userTitleCollection).toEqual(await openedDropdownOptions.allTextContents());


    await page.waitForTimeout(4000)
});


test('Pure api integration tests', async ({page}) => {

    const apiRequest = await request.newContext();

    const response = await apiRequest.get(
        `${await BrowserUtility.getEnvVariable("apiBaseURL")}/Parameter/UserTitles?isActive=true`,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${await BrowserUtility.getUserToken('Admin')}` // Replace with the full token
            }
        });

    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        console.log(jsonResponse.result.userTitles[0].titleStr);
    }

    // put all userTitles in a collection
    const jsonResponse = await response.json();
    const userTitles = await jsonResponse.result.userTitles;
    const userTitleCollection: string[] = [];
    for (const userTitle of userTitles) {
        userTitleCollection.push(userTitle.titleStr);
    }
    console.log(userTitleCollection);


})