import {Page, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";
import {HomePage} from "./HomePage";

export class EmployeesPage extends HomePage {

    public pageUrl: string;
    public addNewEmployeeButton: Locator;
    public titleDropdown: Locator;
    public openedDropdownOptions: Locator;
    public authorityDropdown: Locator;
    public nameInputBox: Locator;
    public emailInputBox: Locator;
    public countryCodeDropdown: Locator;
    public countryCodeSearchBox: Locator;
    public phoneInputBox: Locator;
    public addButton: Locator;
    public alertMessage: Locator;


    constructor(page: Page) {
        super(page);
        this.setup().then(baseUrl => {
            this.pageUrl = baseUrl + '/dashboard/employees';
        });
        this.addNewEmployeeButton = page.locator('//button[contains(text(), "Yeni Çalışan Girişi")] | //button[contains(text(), "New Employee")]');
        this.nameInputBox = page.locator('.MuiInputBase-input').nth(0);
        this.titleDropdown = page.locator('.MuiInputBase-input').nth(1);
        this.authorityDropdown = page.locator('.MuiInputBase-input').nth(2);
        this.emailInputBox = page.locator('.MuiInputBase-input').nth(3);
        this.countryCodeDropdown = page.locator('.selected-flag');
        this.phoneInputBox = page.locator('[type="tel"]');
        this.countryCodeSearchBox = page.locator('[type="search"]');
        // it's for all opened dropdown options
        this.openedDropdownOptions = page.locator('ul > li');
        this.addButton = page.locator('//button[contains(text(), "Add")] | //button[contains(text(), "Ekle")]');
        this.alertMessage = page.locator('//*[@role="alert"]/div[2]').first();
    }

}