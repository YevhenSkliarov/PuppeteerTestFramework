import setup from '../utils/App';

let wrapper;

beforeEach(async () => {
  wrapper = await setup({
    headless: false,
    args: ['--start-maximized']
  });
  await wrapper.home.openPage();
  await wrapper.home.forText('I.UA');
});
afterEach(async () => {
  wrapper.translate.browser.close();
});

describe('Translate', () => {
  it('Translate Word', async () => {
    await wrapper.home.setTextInputValue(wrapper.home.translate, 'Привет');
    await wrapper.home.click(wrapper.home.submitTranslate);
    await wrapper.translate.waitForSelector(wrapper.translate.transalateField,{timeout:5000});
    expect(await wrapper.translate.getTextFromField(wrapper.translate.transalateField)).toEqual(
      'Привіт'
    );
  });
});
