import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://www.xe.com/currencyconverter/');
});

async function fetchConversionRate(page: any, fromCurrency: string, toCurrency: string): Promise<number> {
    const apiUrl = `https://www.xe.com/api/protected/midmarket-converter/`;

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
    return resultRate;
}


test.describe('Currency Converter Tests', () => {

    test.only('should convert currencies correctly', async ({page}) => {

        const amountToConvert = 0.5;

        var fromCurrency = "SEK";
        var toCurrency = "HKD";

        // Fetch expected conversion rate dynamically
        const expectedRate = await fetchConversionRate(page, fromCurrency, toCurrency);
        console.log("expected rate: " + expectedRate);

        await page.goto('https://www.xe.com/currencyconverter/');
        //Accept cookies pop up
        await page.click("//button[normalize-space()='Accept']");

        // Input amount
        const amountInput = await page.locator('#amount');
        await amountInput.fill('');
        await amountInput.fill(amountToConvert.toString());

        // Select source currency (USD)
        await page.click("input[aria-describedby='midmarketFromCurrency-current-selection']")
        await page.click(`//div[@class='flex' and contains(normalize-space(), '${fromCurrency}')]`);

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
        console.log(`Expected Conversion: ${expectedConversion}`); // amountInput * expectedRate
        console.log(`Parsed Result: ${parsedResult}`);  // actual result to parse it

        // Custom close comparison function
        const isCloseTo = (actual, expected) => Math.round(actual * Math.pow(10, 8)) / Math.pow(10, 8) === Math.round(expected * Math.pow(10, 8)) / Math.pow(10, 8);

        console.log(Math.round(parsedResult * Math.pow(10, 8)) / Math.pow(10, 8));
        console.log(Math.round(expectedConversion * Math.pow(10, 8)) / Math.pow(10, 8));

        expect(isCloseTo(parsedResult, expectedConversion)).toBe(true);


        // when user clicks swap currency
        await page.click("button[aria-label='Swap currencies']");
        const swappedFromCurrency = toCurrency;
        const swappedtoCurrency = fromCurrency;

        // Fetch expected conversion rate dynamically
        const swappedExpectedRate = await fetchConversionRate(page, swappedFromCurrency, swappedtoCurrency);
        console.log("swapped expected rate: " + swappedExpectedRate);


        // Check if the swapped conversion rate is the same as the initial rate
        const expectedSwappedConversionResult = amountToConvert * swappedExpectedRate;
        console.log('expectedSwappedConversionResult :' + expectedSwappedConversionResult);
        // Parse the resultText to a number
        const swappedResultText = await page.locator(resultSelector).innerText();
        const swappedParsedResult = parseFloat(swappedResultText.replace(/,/g, '')); // Remove commas and convert to float
        console.log(`swappedParsedResult Result: ${swappedParsedResult}`);  // actual result to parse it

        console.log(Math.round(swappedParsedResult * Math.pow(10, 8)) / Math.pow(10, 8));
        console.log(Math.round(expectedSwappedConversionResult * Math.pow(10, 8)) / Math.pow(10, 8));

        expect(isCloseTo(swappedParsedResult, expectedSwappedConversionResult)).toBe(true);


    });


});