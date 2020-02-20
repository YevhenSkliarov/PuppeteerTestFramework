import setup from '../utils/browser';
import App from '../utils/App';

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
  wrapper = new App(page, browser);
  sel = wrapper.selectors;
});
afterEach(async () => {
  wrapper.translate.browser.close();
});

describe('Translate', () => {
  it('Translate Word', async () => {
    await wrapper.home.openPage();
    await wrapper.home.forText('I.UA');
    await wrapper.home.setTextInputValue(sel.iua.transale, 'Привет');
    await wrapper.home.click(sel.iua.submitTranslate);
    await wrapper.home.wait(200);
    await wrapper.translate.forText('Переводчик онлайн');
    expect(await wrapper.translate.getTextFromField(sel.translator.transalateField)).toEqual(
      'Привіт'
    );
  });
});
