import BasePage from "../Pages/BasePage";
import HomePage from "../Pages/HomePage";
import TranslatePage from "../Pages/TranslatePage";


export default class App {
    constructor(page,browser) {
        this.base = new BasePage(page, browser);
        this.home = new HomePage(page, browser);
        this.translate = new TranslatePage(page, browser);
    }
}