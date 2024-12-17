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


}