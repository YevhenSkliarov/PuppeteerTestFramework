import setup from '../utils/browser';
import AppFactory from '../utils/AppFactory';

export default async ({
  headless = true,
  defaultViewport = null,
  slowMo = 0,
  devtools = false,
  args = []
} = {}) => {
  let { browser, page } = await setup({
    headless: headless,
    args: args,
    devtools: devtools,
    slowMo: slowMo,
    defaultViewport: defaultViewport
  });
  return new AppFactory(page, browser);
};
