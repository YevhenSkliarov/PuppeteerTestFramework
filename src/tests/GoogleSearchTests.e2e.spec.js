import puppeteer from 'puppeteer';
import GooglePage from '../Pages/GooglePage';
import setup from '../utils/browser';

let wrapper, sel;

beforeEach(async () => {
  let { browser, page } = await setup({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    slowMo: 200
  });
  wrapper = new GooglePage(page, browser);
  sel = wrapper.selectors;
});
afterEach(async () => {
  wrapper.browser.close();
});

describe('Google Search', () => {
  it('Search for Puppeteer', async () => {
    await wrapper.openPage('https://google.com');
    await wrapper.forText('Google');
    await wrapper.setInput(sel.searchInput, 'puppeteer');
    await wrapper.pressKey({ key: 'Enter' });
    expect(
      await wrapper.forText('puppeteer/puppeteer: Headless Chrome Node.js API - GitHub')
    ).toEqual(true);
  });
});
