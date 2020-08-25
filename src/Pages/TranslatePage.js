import BasePage from './BasePage';

export default class TranslatePage extends BasePage {
  constructor(page, browser) {
    super(page, browser);
  }

  transalateField = "div[class='form_item form_item-translate_result']";

  async getTextFromField(selector) {
    const element = await this.page.$(selector);
    return await this.page.evaluate(element => element.textContent, element);
  }
}
