import puppeteer from 'puppeteer';

export default async function({
  headless = true,
  defaultViewport = null,
  slowMo = 0,
  devtools = false,
  args = []
} = {}) {
  const browser = await puppeteer.launch({
    headless: headless,
    // disables the default viewport
    defaultViewport: defaultViewport,
    // Slows down Puppeteer operations by the specified amount of milliseconds.
    slowMo: slowMo,
    // Whether to auto-open a DevTools panel for each tab
    devtools: devtools,
    args
  });
  const page = await browser.newPage();
  return { browser, page };
}
