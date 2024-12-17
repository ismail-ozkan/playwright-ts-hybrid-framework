import { Page, Locator } from "@playwright/test";
import { BrowserUtility } from "../../utility.spec";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });


export class BasePage {
  public page: Page;
  public baseUrl: string;
  public apiBaseURL: string;
  public profileDropdown: Locator;
  public searchBar: Locator;
  public checklist: Locator;
  
  async setup() {
    this.baseUrl = await BrowserUtility.getEnvVariable("baseURL");
    this.apiBaseURL = await BrowserUtility.getEnvVariable("apiBaseURL");
    return this.baseUrl;
  }


  constructor(page: Page) {
    this.page = page;
    this.setup().then();
    this.profileDropdown = page.locator('[class="mx-1"]');
    this.searchBar=page.locator("#companies");
    this.checklist=page.locator("#checklist-button");
  }

 
}