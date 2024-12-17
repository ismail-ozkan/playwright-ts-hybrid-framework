import {Page, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class AdminPanelPage extends BasePage {

    public welcomeBanner: Locator;
    public passwordInputBox: Locator;
    public loginButton: Locator;
    public pageUrl: string;


    constructor(page: Page) {
        super(page);
        this.setup().then(baseUrl => {
            this.pageUrl = baseUrl + '/management';
        });
        this.welcomeBanner = page.locator('//h1');
        this.passwordInputBox = page.locator('#password');
        this.loginButton = page.getByRole('button', {name: 'submit'});
    }


}