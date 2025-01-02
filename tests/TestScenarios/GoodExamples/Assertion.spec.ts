import {test, expect} from '@playwright/test';


test.describe.skip("Assertions Examples Test", () => {
// 1. **`toHaveURL` - Sayfa URL'sini Doğrulama**
    test('URL doğrulama', async ({page}) => {
        await page.goto('https://example.com');
        await expect(page).toHaveURL('https://example.com');
    });

// 2. **`toHaveTitle` - Sayfa Başlığını Doğrulama**
    test('Sayfa başlığı doğrulama', async ({page}) => {
        await page.goto('https://example.com');
        await expect(page).toHaveTitle('Example Domain');
    });

// 3. **`toBeVisible` - Element Görünürlük Kontrolü**
    test('Element görünürlük kontrolü', async ({page}) => {
        await page.goto('https://example.com');
        const element = page.locator('h1');
        await expect(element).toBeVisible();
    });

// 4. **`toBeEnabled` ve `toBeDisabled` - Element Durum Kontrolü**
    test('Element aktif ve pasif kontrolü', async ({page}) => {
        await page.goto('https://example.com/form');

        const enabledButton = page.locator('#enabledButton');
        await expect(enabledButton).toBeEnabled();

        const disabledButton = page.locator('#disabledButton');
        await expect(disabledButton).toBeDisabled();
    });

// 5. **`toBeChecked` - Checkbox/Radio Seçili Olma Kontrolü**
    test('Checkbox seçili olma kontrolü', async ({page}) => {
        await page.goto('https://example.com/form');

        const checkbox = page.locator('#newsletterCheckbox');
        await checkbox.check(); // Checkbox'ı işaretle
        await expect(checkbox).toBeChecked();
    });

// 6. **`toHaveAttribute` - Element Özelliğini Kontrol Etme**
    test('Element attribute kontrolü', async ({page}) => {
        await page.goto('https://example.com');

        const button = page.locator('#submitButton');
        await expect(button).toHaveAttribute('type', 'submit');
    });
// 7. **`toHaveText` ve `toContainText` - Metin Doğrulama**
    test('Metin doğrulama', async ({page}) => {
        await page.goto('https://example.com');

        const heading = page.locator('h1');
        await expect(heading).toHaveText('Example Domain'); // Tam eşleşme
        await expect(heading).toContainText('Example');    // Kısmi eşleşme
    });

// 8. **`toHaveValue` - Input Değerini Doğrulama**
    test('Input değer doğrulama', async ({page}) => {
        await page.goto('https://example.com/form');

        const input = page.locator('#emailInput');
        await input.fill('test@example.com');
        await expect(input).toHaveValue('test@example.com');
    });

// 9. **`toHaveCount` - Element Sayısını Kontrol Etme**
    test('Dropdown öğe sayısı kontrolü', async ({page}) => {
        await page.goto('https://example.com/form');

        const dropdownOptions = page.locator('select#month option');
        await expect(dropdownOptions).toHaveCount(12); // Örneğin 12 ay var
    });

// 10
    test('Negatif assertion örneği', async ({page}) => {
        await page.goto('https://example.com');

        const element = page.locator('h1');
        await expect(element).not.toHaveText('Wrong Text');
        await expect(element).not.toBeHidden();
    });

    /*
        Bu örneklerde:
    1. **Sayfa URL'si, başlık, görünürlük ve durum kontrolü** gösterildi.
    2. Checkbox, dropdown öğeleri ve input kutularına değer atama ve doğrulama yapıldı.
    3. Negatif `not` kullanımıyla beklenmeyen durumlar test edildi.

    **Not**: Proje TypeScript kullanıyor, dolayısıyla `@playwright/test` paketini projenize dahil etmeyi unutmayın!
    Komut:
        bash
    npm install --save-dev @playwright/test typescript -node

    Testlerinizi **`npx playwright test`** komutuyla çalıştırabilirsiniz.*/
});