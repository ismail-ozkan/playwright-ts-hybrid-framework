import {Page, Locator} from "@playwright/test";
import {HomePage} from "./HomePage";

export class Notifications extends HomePage {

    public pageUrl: string;
    public informationButton: Locator;



    constructor(page: Page) {
        super(page);
        this.setup().then(baseUrl => {
            this.pageUrl = baseUrl + '/dashboard/notifications';
        });
        this.informationButton = page.locator('//div[contains(text(), "Bilgilendirmeler")] | //div[contains(text(), "Information")]');
    }

}