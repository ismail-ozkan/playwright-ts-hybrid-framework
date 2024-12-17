const {test, expect} = require('@playwright/test');

test('handle input box', async ({page}) => {
    await page.goto('https://example.com'); // Uygulamanın URL'si
    const inputLocator = page.locator('#name'); // Input kutusunun locator'ı (ID ile)

    // Input kutusunun görünür olduğunu kontrol et
    await expect(inputLocator).toBeVisible();

    // Input kutusunun boş olduğunu kontrol et
    await expect(inputLocator).toBeEmpty();

    // Input kutusuna metin gir
    await inputLocator.fill('John Doe');

    // Girilen metni kontrol et
    await expect(inputLocator).toHaveValue('John Doe');
});

test('handle radio buttons', async ({page}) => {
    await page.goto('https://example.com'); // Uygulamanın URL'si
    const maleRadioButton = page.locator('input[type="radio"][value="male"]');

    // Radyo butonunu seç
    await maleRadioButton.check();

    // Radyo butonunun seçili olduğunu kontrol et
    await expect(maleRadioButton).toBeChecked();

    const femaleRadioButton = page.locator('input[type="radio"][value="female"]');

    // Kadın radyo butonunun seçili olmadığını kontrol et
    await expect(femaleRadioButton).not.toBeChecked();
});
