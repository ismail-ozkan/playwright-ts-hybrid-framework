import {test, expect, Locator, request, APIResponse} from '@playwright/test';
import {HomePage} from "../pages/HomePage";
import {BrowserUtility} from "../../utility.spec";
import {BaseApiResponse} from "../../DTOs/BaseApiResponse";
import {UserTitles} from "../../DTOs/UserTitle";

let homePage: HomePage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
});

test('Api test by using object class', async ({page}) => {

    const apiRequest = await request.newContext();

    const response = await apiRequest.get(
        `${await BrowserUtility.getEnvVariable("apiBaseURL")}/Parameter/UserTitles?isActive=true`,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${await BrowserUtility.getUserToken('Admin')}` // Replace with the full token
            }
        });


    const apiResponse: BaseApiResponse<UserTitles> = await response.json();
    const userTitles = apiResponse.result.userTitles;
    console.log("Array.isArray(userTitles) : " + Array.isArray(userTitles));
    console.log(userTitles)

    //console.log(userTitles[0].titleStr);
    /*for (let i = 0; i < userTitles.length; i++) {
        const title = userTitles[i].titleStr;
        console.log(title);
    }*/
    /*userTitles.forEach(title => {
        console.log(title.titleStr);
    });*/

    console.log("Happyyy :)");


})