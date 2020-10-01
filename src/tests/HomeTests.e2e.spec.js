import puppeteer from 'puppeteer';
import setup from "../utils/App";

let  wrapper;

beforeEach(async () => {
  wrapper = await setup({
    headless: false,
    args:['--start-maximized']
  });
  await wrapper.home.openPage();
  await wrapper.home.forText('I.UA');
});
afterEach(async () => {
  wrapper.home.browser.close();
});

describe('Mail tests', () => {
  it('Invalid login/password to i.ua', async () => {
    await wrapper.home.login('puppeteer', 'puppeteer');
    await wrapper.home.waitForSelector(wrapper.home.errorArea,{timeout:'5000'});
    expect(await wrapper.home.getText(wrapper.home.errorArea)).toEqual("Неверный логин или пароль")
  });
});
