import BasePage from "./BasePage";
import selectors from "../selectors"

export default class HomePage extends BasePage{
    constructor(page, browser) {
        super(page, browser);
        this.sel = selectors.iua;
    }

    async login(login,password){
        await this.setTextInputValue(this.sel.loginField,login);
        await this.setTextInputValue(this.sel.passwordField,password);
        await this.pressKey({key:'Enter'});
    }
}