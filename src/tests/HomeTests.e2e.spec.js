import puppeteer from 'puppeteer';
import setup from "../utils/browser";
import App from "../utils/App"

let  wrapper;

beforeEach(async () => {
  let { browser, page } = await setup({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    slowMo: 200
  });
  wrapper = new App(page,browser);
});
afterEach(async () => {
  wrapper.home.browser.close();
});

describe('Mail tests', () => {
  it('Invalid login/password to i.ua', async () => {
    await wrapper.home.openPage();
    await wrapper.home.forText('I.UA');
    await wrapper.home.login('puppeteer', 'puppeteer');
    await wrapper.home.forTextToBeGone('Войти');
    expect(await wrapper.home.forText('Неверный логин или пароль')).toEqual(true);
  });
});
