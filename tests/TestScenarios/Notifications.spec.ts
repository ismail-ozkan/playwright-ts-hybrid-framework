import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {EmployeesPage} from "../pages/EmployeesPage";
import {test} from "@playwright/test";

let homePage: HomePage;
let loginPage: LoginPage;
let employeesPage: EmployeesPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    employeesPage = new EmployeesPage(page);
});