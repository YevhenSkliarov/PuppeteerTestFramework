import BasePage from "./BasePage";
import selectors from "../selectors";

export default class MailPage extends BasePage{
    constructor(page, browser) {
        super(page, browser);
        this.sel = selectors.iua
    }

    async setTextInputValue(selector, value) {
        const example = await this.page.$x(selector);
        await example[0].click();
        await this.page.keyboard.press('Backspace');
        await example[0].type(value);
    }

    async login(login,password){
        await this.setTextInputValue(this.sel.loginField,login);
        await this.setTextInputValue(this.sel.passwordField,password);
        await this.pressKey({key:'Enter'});
    }
}