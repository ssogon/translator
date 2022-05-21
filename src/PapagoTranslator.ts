import Translatable from './Translatable';
import { Browser, ElementHandle, Page } from 'puppeteer';

export default class PapagoTranslator implements Translatable {
  constructor(private browser: Browser) {}

  async translate(sourceText: string): Promise<string> {
    const page: Page = await this.browser.newPage();
    await page.goto(`https://papago.naver.com?sk=auto&st=${encodeURIComponent(sourceText)}`);

    const submitButton: ElementHandle = await page.waitForSelector('#btnTranslate');
    await submitButton.click();

    const targetArea: ElementHandle = await page.waitForSelector('#txtTarget > span');
    const targetText: string = await targetArea.evaluate((node) => node.textContent);

    await page.close();

    return targetText;
  }
}
