import puppeteer from 'puppeteer';
import selectors from '../selectors';

export default class Utils {
  constructor(page, browser) {
    this.appUrlBase = 'https://google.com';
    this.page = page;
    this.browser = browser;
    this.selectors = selectors;
  }

  async pressKey({ key, times = 1 }) {
    Array.from({ length: times }).forEach(() => {
      this.page.keyboard.press(key);
    });
  }

  async type(text) {
    await this.page.keyboard.type(text);
  }

  async forText(text, time = 20000) {
    try {
      await this.page.waitForFunction(
        `document.querySelector("body").innerText.includes("${text}")`,
        {
          timeout: time
        }
      );
      return true;
    } catch (error) {
      throw new Error(`Can't find "${text}" text on the page\n${error.stack}`);
    }
  }

  getUrl() {
    return this.page.url();
  }

  async navigateTo(url) {
    await this.page.goto(url, {
      waitUntil: 'load',
      timeout: 0
    });
  }

  async wait(timeout = 10) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  async getMenuValues(selector) {
    return (await this.page.$$eval(selector, sel =>
      sel.map(element => element.textContent)
    )).filter(element => element !== '');
  }

  async getFieldsForm() {
    return await this.page.$eval(this.page, e1 => e1.map(e1 => e1.innerText));
  }

  // use only if there is no CSS option to locate element
  async clickByXpath(selector) {
    try {
      const element = await this.page.$x(selector);
      element[0].click();
    } catch (err) {
      throw new Error(`Can't find ${selector}\n${err.stack}`);
    }
  }

  makeInputSelector(data) {
    if (typeof data === 'string') {
      data = { id: data };
    }

    let { id, inputType = 'input' } = data;
    switch (inputType) {
      case 'input':
        return `div[data-id=${id}] input`;
      case 'textarea':
        return `div[data-id=${id}] textarea`;
      default:
        console.log('Provided inputType is not supported');
    }
  }

  makeBtnGroupSelector(data) {
    return `div[data-id=${data.id}] button[value=${data.value}]`;
  }

  async getElementCount(selector) {
    try {
      return (await this.page.$x(selector)).length;
    } catch (err) {
      throw new Error(`Can't find ${selector}\n${err.stack}`);
    }
  }

  async forTextToBeGone(text) {
    try {
      await this.page.waitForFunction(
        `!document.querySelector("body").innerText.includes("${text}")`
      );
    } catch (err) {
      throw new Error(`"${text}" text has not been removed from the page`);
    }
  }

  async checkCheckboxState(text) {
    let checked = false;
    if (
      (await this.page.$x(
        `//label[contains(text(),'${text}')]/parent::div[contains(@class,'ui checked checkbox')]`
      )).length > 0
    ) {
      checked = true;
      return checked;
    } else {
      return checked;
    }
  }

  async removeInputValue(text) {
    await this.page.keyboard.down('Shift');
    for (let i = 0; i < text.length; i++) {
      await this.page.keyboard.press('ArrowLeft');
    }
    await this.page.keyboard.up('Shift');
    await this.page.keyboard.press('Backspace');
  }

  async doCtrl(key) {
    await this.page.keyboard.down('Control');
    await this.page.keyboard.press(key);
    await this.page.keyboard.up('Control');
  }

  async doAlt(key) {
    await this.page.keyboard.down('Alt');
    await this.page.keyboard.press(key);
    await this.page.keyboard.up('Alt');
  }

  async waitForInvisible(selector) {
    await this.page.waitForSelector(selector, {
      visible: false
    });
  }

  //Please note if you use this method, you need add page.removeAllListeners('request') to afterEach to remove all listeners
  async getRequests() {
    const urls = [];
    await this.page.setRequestInterception(true);
    this.page.on('request', request => {
      request.url().endsWith('.png') ||
      request.url().endsWith('.jpg') ||
      request.url().startsWith('data:') ||
      request.url().startsWith('lovs?') ||
      request.url().startsWith('roboto')
        ? request.abort()
        : urls.push(request.url());
      request.continue();
    });
    return urls;
  }

  async getElementProperty({ selector, property }) {
    const element = await this.page.$(selector);
    const elementProperty = await element.getProperty(property);
    return await elementProperty.jsonValue();
  }

  async selectOptionFromDropDown({ id, text }) {
    await this.page.click(`div[data-id="${id}"`);
    await this.page.waitFor(500);
    await this.page.click(`div[aria-label="${text}"]`);
  }

  async getText(selector) {
    return await this.page.$eval(selector, e => e.innerText);
  }

  async enterInput(data) {
    await this.page.click(data.sel);
    await this.type(data.value);
  }

  async openPage(url) {
    await this.page.goto(url, { waitUntil: 'load', timeout: 0 });
  }

  async setUsername(name) {
    await this.page.waitForSelector(this.sel.username, { timeout: 60000 });
    await this.page.type(this.sel.username, name);
  }

  async setInput(selector, text) {
    await this.page.type(selector, text);
  }
}
