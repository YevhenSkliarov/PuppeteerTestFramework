import MailPage from '../Pages/MailPage';
import puppeteer from 'puppeteer';

let browser, page, wrapper, sel;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    // disables the default viewport
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    // Slows down Puppeteer operations by the specified amount of milliseconds.
    slowMo: 200
  });
  page = await browser.newPage();
  wrapper = new MailPage(page, browser);
});
afterEach(async () => {
  browser.close();
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
