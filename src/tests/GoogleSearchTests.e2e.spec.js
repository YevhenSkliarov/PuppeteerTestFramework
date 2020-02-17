import puppeteer from 'puppeteer';
import GooglePage from '../Pages/GooglePage';

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
  wrapper = new GooglePage(page, browser);
  sel = wrapper.selectors;
});
afterEach(async () => {
  browser.close();
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
