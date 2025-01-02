import {Page, Locator, expect, request} from "@playwright/test";
import * as dotenv from 'dotenv';

import {BasePage} from "./tests/pages/BasePage";

dotenv.config({path: "./.env"});

export class BrowserUtility {

    /**
     * Pauses the execution for the specified number of seconds.
     * @param seconds The duration to wait, in seconds.
     */
    static async sleep(seconds: number) {
        await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }

    /**
     * Verifies if the actual and expected messages are equal.
     * @param actual The actual message.
     * @param expected The expected message.
     * @returns A promise that resolves to a boolean indicating whether the messages are equal.
     */
    static async verifyMessages(actual: string, expected: string) {
        return new Promise((resolve) => {
            resolve(expected.toString() === actual.toString());
        });
    }

    /**
     * Logs a message to the console with a timestamp for better traceability.
     * @param message The message to log.
     */
    static logWithTimestamp(message: string) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }

    /**
     * Waits for a specified selector to be visible on the page.
     * @param page The Playwright Page object.
     * @param selector The CSS selector to wait for.
     * @param timeout The timeout in milliseconds (default is 5000).
     */
    static async waitForSelector(page: any, selector: string, timeout: number = 5000): Promise<void> {
        await page.waitForSelector(selector, {timeout});
    }

    /**
     * Waits for a specified locator to be visible on the page.
     * @param locator The Playwright Locator object to wait for.
     * @param timeout The timeout in milliseconds (default is 5000).
     */
    static async waitForElementToBeVisible(locator: Locator, timeout: number = 5000): Promise<void> {
        await locator.waitFor({state: 'visible', timeout});
    }

    /**
     * Retrieves the value of an environment variable.
     * @param key - The key of the environment variable to retrieve.
     * @returns A Promise resolving to the value of the environment variable.
     */
    static async getEnvVariable(key: string): Promise<string> {
        // Implementation to get environment variable from .env file
        // Replace this with your actual implementation
        /* const variable = `${process.env[path]}`

        return Promise.resolve(variable); */
        const variable = process.env[key];
        if (!variable) {
            throw new Error(`Environment variable "${key}" is not defined in the .env file.`);
        }
        return variable;
    }

    // TODO create a api utilities and move it there
    static async getUserToken(userRole: string) {

        console.log(this.getEnvVariable(`${userRole}Email`))
        console.log(this.getEnvVariable(`${userRole}Password`))
        console.log(this.getEnvVariable('apiBaseURL'))

        const apiRequest = await request.newContext();
        const response = await apiRequest.post(
            `${await this.getEnvVariable('apiBaseURL')}/Identity/Authentication/SignIn`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    email: `${await this.getEnvVariable(`${userRole}Email`)}`,
                    password: `${await this.getEnvVariable(`${userRole}Password`)}`,
                }
            }
        );
        console.log("response.status : " + response.status);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(await jsonResponse.result.accessToken)
            return await jsonResponse.result.accessToken; // Return the token
        }
        throw new Error(`Failed to get token: HTTP error code: ${response.status}`);
    }

    // New Methods TODO these methods should be used to verify that they're working properly.
    /**
     * Switches to a new window and verifies the URL and title.
     * @param page The Playwright Page object.
     * @param expectedInUrl The expected substring in the URL.
     * @param expectedInTitle The expected substring in the title.
     */
    static async switchWindowAndVerify(page: Page, expectedInUrl: string, expectedInTitle: string) {
        const allPages = await page.context().pages();
        for (const newPage of allPages) {
            if (newPage !== page) {
                await newPage.bringToFront();
                const currentUrl = newPage.url();
                console.log("Current URL: " + currentUrl);
                if (currentUrl.includes(expectedInUrl)) {
                    const actualTitle = await newPage.title();
                    expect(actualTitle).toContain(expectedInTitle);
                    return;
                }
            }
        }
        throw new Error(`No window found with URL containing "${expectedInUrl}"`);
    }

    /**
     * Verifies if the actual title matches the expected title.
     * @param page The Playwright Page object.
     * @param expectedTitle The expected title.
     */
    static async verifyTitle(page: Page, expectedTitle: string) {
        const actualTitle = await page.title();
        expect(actualTitle).toBe(expectedTitle);
    }

    /**
     * Verifies if the current URL contains the expected substring.
     * @param page The Playwright Page object.
     * @param expectedInURL The expected substring in the URL.
     */
    static async verifyURLContains(page: Page, expectedInURL: string) {
        const currentUrl = page.url();
        expect(currentUrl).toContain(expectedInURL);
    }

    /**
     * Retrieves dropdown options as strings from a locator.
     * @param locator The Playwright Locator for the dropdown element.
     * @returns A promise resolving to an array of option texts.
     */
    static async dropdownOptionsAsString(locator: Locator): Promise<string[]> {
        const options = await locator.locator('option').allTextContents();
        return options;
    }

    /**
     * Clicks a radio button based on its value attribute.
     * @param locators The array of Locator objects for radio buttons.
     * @param attributeValue The value of the radio button to click.
     */
    static async clickRadioButton(locators: Locator[], attributeValue: string) {
        for (const locator of locators) {
            const value = await locator.getAttribute('value');
            if (value?.toLowerCase() === attributeValue.toLowerCase()) {
                await locator.click();
                return;
            }
        }
        throw new Error(`Radio button with value "${attributeValue}" not found`);
    }

    /**
     * Waits for an element to be visible on the page.
     * @param locator The Playwright Locator object to wait for.
     * @param timeout The timeout in milliseconds (default is 5000).
     */
    static async waitForVisibility(locator: Locator, timeout: number = 5000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }

    /**
     * Verifies whether an element is displayed on the page.
     * @param locator The Playwright Locator object to check visibility.
     */
    static async verifyElementDisplayed(locator: Locator) {
        const isVisible = await locator.isVisible();
        expect(isVisible).toBe(true);
    }

    /**
     * Verifies whether an element is not displayed on the page.
     * @param locator The Playwright Locator object to check visibility.
     */
    static async verifyElementNotDisplayed(locator: Locator) {
        const isVisible = await locator.isVisible();
        expect(isVisible).toBe(false);
    }


    /**
     * Scrolls down to an element using JavaScript.
     * @param page The Playwright Page object.
     * @param selector The CSS selector of the element to scroll to.
     */
    static async scrollToElement(page: Page, selector: string) {
        await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView(true);
            }
        }, selector);
    }

    /**
     * Generates a random number between 1 and 10 billion (10 digits).
     */
    static randomNumber(): number {
        return Math.floor(1000000000 + Math.random() * 9000000000);
    }

}