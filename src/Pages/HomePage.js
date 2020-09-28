import BasePage from "./BasePage";

export default class HomePage extends BasePage{
    constructor(page, browser) {
        super(page, browser);
    }

    loginField = "//p[contains(text(),'Логин')]/following-sibling::p/input";
    passwordField = "//p[contains(text(),'Пароль')]/following-sibling::input";
    translate = "//textarea";
    submitTranslate = "input[type='submit']";

    async login(login,password){
        await this.setTextInputValue(this.loginField,login);
        await this.setTextInputValue(this.passwordField,password);
        await this.pressKey({key:'Enter'});
    }
}