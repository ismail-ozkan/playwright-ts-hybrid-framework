import {Page, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class LoginPage extends BasePage {

    public emailInputBox: Locator;
    public passwordInputBox: Locator;
    public loginButton: Locator;
    public pageUrl: string;


    constructor(page: Page) {
        super(page);
        this.setup().then(baseUrl => {
            this.pageUrl = baseUrl + '/login';
        });
        this.emailInputBox = page.locator('[name="email"]');
        this.passwordInputBox = page.locator('#password');
        this.loginButton = page.locator(' [type="submit"]');
    }

    async login(email: string, password: string) {
        await this.emailInputBox.fill(email);
        await this.passwordInputBox.fill(password);
        await this.loginButton.click();
    }


}