import puppeteer from 'puppeteer';
import setup from "../utils/browser";
import App from "../utils/App"

let  wrapper;
let sel;

beforeEach(async () => {
  let { browser, page } = await setup({
    headless: false,
    args:['--start-maximized']
  });
  wrapper = new App(page,browser);
  sel = wrapper.selectors;
});
afterEach(async () => {
  wrapper.home.browser.close();
});

describe('Mail tests', () => {
  it('Invalid login/password to i.ua', async () => {
    await wrapper.home.openPage();
    await wrapper.home.forText('I.UA');
    await wrapper.home.login('puppeteer', 'puppeteer');
    await wrapper.home.waitForSelector(sel.errorArea,{timeout:'5000'});
    expect(await wrapper.home.getText(sel.errorArea)).toEqual("Неверный логин или пароль")
  });
});
