import BasePage from './BasePage';

export default class TranslatePage extends BasePage {
  constructor(page, browser) {
    super(page, browser);
  }

  async getTextFromField(selector) {
    const element = await this.page.$(selector);
    return await this.page.evaluate(element => element.textContent, element);
  }
}
