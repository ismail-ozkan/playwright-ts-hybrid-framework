import { test, expect } from '@playwright/test';
import { log } from 'console';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.xe.com/currencyconverter/');
  });

  async function fetchConversionRate(page: any, fromCurrency: string, toCurrency: string): Promise<number> {
    const apiUrl = `https://www.xe.com/api/protected/midmarket-converter`;

    // Use page.evaluate to perform fetch in the browser context
    const rate = await page.evaluate(async (url: string) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic bG9kZXN0YXI6cHVnc25heA==' // Use your own credentials
            }
        });

        if (!response.ok) {
            throw new Error(`Failed: HTTP error code: ${response.status}`);
        }

        const jsonResponse = await response.json();
        return jsonResponse.rates; // Return the rates object
    }, apiUrl);
    console.log(rate[fromCurrency]);
    console.log(rate[toCurrency]);
    const resultRate = rate[toCurrency] / rate[fromCurrency];
    console.log(resultRate);
    return resultRate; // Return the conversion rate for the specified currency
}


test.describe('Currency Converter Tests', () => {

  test.only('should convert currencies correctly', async ({ page }) => {
    const amountToConvert = 255;

    const fromCurrency = "USD";
    const toCurrency = "EUR";

    // Fetch expected conversion rate dynamically
    const expectedRate = await fetchConversionRate(page, fromCurrency, toCurrency);
    console.log(expectedRate);

    await page.goto('https://www.xe.com/currencyconverter/');

    // Input amount
    const amountInput = await page.locator('#amount');
    await amountInput.fill('');
    await amountInput.fill(amountToConvert.toString());

    // Select source currency (USD)
    await page.click("input[aria-describedby='midmarketFromCurrency-current-selection']")
    const fromDropdown = await page.locator(`//div[@class='flex' and contains(normalize-space(), '${fromCurrency}')]`);

    await page.click(`//div[@class='flex' and contains(normalize-space(), '${fromCurrency}')]`)//(`//div[@class='flex'][normalize-space()='${fromCurrency}']`);

    // Select target currency (EUR)
    await page.click("input[aria-describedby='midmarketToCurrency-current-selection']");
    await page.click(`//div[@class='flex' and contains(normalize-space(), '${toCurrency}')]`);

    // Click on the convert button
    await page.click('//button[normalize-space()="Convert"]');

    // Wait for the conversion result to be displayed
    const resultSelector = '.sc-63d8b7e3-1.bMdPIi';
    await page.waitForSelector(resultSelector);

    // Retrieve the conversion result
    const resultText = await page.locator(resultSelector).innerText();
    console.log("resultText =", resultText);


    // Parse the resultText to a number
    const parsedResult = parseFloat(resultText.replace(/,/g, '')); // Remove commas and convert to float

    const expectedConversion = amountToConvert * expectedRate; // Calculate expected conversion based on fetched rate
    console.log(`Expected Conversion: ${expectedConversion}`);
    console.log(`Parsed Result: ${parsedResult}`);

    // Custom close comparison function
    const isCloseTo = (actual, expected) => Math.round(actual * Math.pow(10, 8)) / Math.pow(10, 8) === Math.round(expected * Math.pow(10, 8))  / Math.pow(10, 8);
    expect(isCloseTo(parsedResult, expectedConversion)).toBe(true);
   // expect(parsedResult).toBeCloseTo(expectedConversion, 3); // Adjust precision as needed

});

  test.only('Currency Converter Tests', () => {

    const asf = Math.round(10.213123 * Math.pow(10, 8)) / Math.pow(10, 8);
    console.log(asf);


  })
});