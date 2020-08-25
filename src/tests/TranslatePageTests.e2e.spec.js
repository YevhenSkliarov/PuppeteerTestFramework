import setup from '../utils/browser';
import App from '../utils/App';

let wrapper, sel;

beforeEach(async () => {
  let { browser, page } = await setup({
    headless: false,
    slowMo: 100,
    args:['--start-maximized']
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
    await wrapper.home.setTextInputValue(wrapper.home.transale, 'Привет');
    await wrapper.home.click(wrapper.home.submitTranslate);
    await wrapper.home.wait(200);
    await wrapper.translate.forText('Переводчик онлайн');
    expect(await wrapper.translate.getTextFromField(wrapper.translate.transalateField)).toEqual(
      'Привіт'
    );
  });
});
