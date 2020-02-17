import MailPage from '../Pages/MailPage';
import puppeteer from 'puppeteer';
import setup from "../utils/browser";

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
  wrapper = new MailPage(page, browser);
});
afterEach(async () => {
  wrapper.browser.close();
});

describe('Mail tests', () => {
  it('Invalid login/password to i.ua', async () => {
    await wrapper.openPage('https://www.i.ua/');
    await wrapper.forText('I.UA');
    await wrapper.login('puppeteer', 'puppeteer');
    await wrapper.forTextToBeGone('Войти');
    expect(await wrapper.forText('Неверный логин или пароль')).toEqual(true);
  });
});
