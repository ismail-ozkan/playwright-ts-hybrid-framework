import {Page, Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class HomePage extends BasePage {

    public pageUrl: string;
    public logoutButton: Locator;
    public employeesLink: Locator;
    public dashboardLink: Locator;
    public projectsButton: Locator;
    public campaignsButton: Locator;
    public salesPanelLink: Locator;
    public walletLink: Locator;

    constructor(page: Page) {
        super(page);
        this.setup().then(baseUrl => {
            this.pageUrl = baseUrl + '/';
        });
        //header elements
        this.profileDropdown = page.locator('[class="mx-1"]');
        this.dashboardLink = page.locator('a[href^="/tr/dashboard"], a[href^="/en/dashboard"]');
        this.projectsButton = page.locator('button:text("Projects")');
        this.campaignsButton = page.locator('button:text("Campaigns")');
        this.employeesLink = page.locator('a[href^="/tr/dashboard/employees"], a[href^="/en/dashboard/employees"]');
        this.salesPanelLink = page.locator('a[href^="/tr/dashboard/sales-panel"], a[href^="/en/dashboard/sales-panel"]');
        this.walletLink = page.locator('a[href^="/tr/dashboard/wallet"], a[href^="/en/dashboard/wallet"]');

        // Profile dropdown
        this.logoutButton = page.locator('span:text="Çıkış Yap", span:text="Logout"');
    }


    async logout() {
        await this.profileDropdown.click();
        await this.logoutButton.click()
    }
}