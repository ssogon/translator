import Translatable from './Translatable';
import { Browser, Page } from 'puppeteer';

export default class GoogleTranslator implements Translatable {
  constructor(private browser: Browser) {}

  async translate(sourceText: string): Promise<string> {
    const hasKorean: boolean = /[가-힣]/.test(sourceText);
    const [sourceLanguage, targetLanguage]: string[] = hasKorean ? ['ko', 'en'] : ['en', 'ko'];

    const page: Page = await this.browser.newPage();
    await page.goto(
      `https://translate.google.com/?sl=${sourceLanguage}&tl=${targetLanguage}&text=${encodeURIComponent(sourceText)}`
    );

    const targetSelector: string = 'div[data-language] > div > span[lang] > span > span';
    await page.waitForSelector(targetSelector);
    const targetText: string = await page.$$eval(targetSelector, (nodes: Element[]) => {
      return nodes.map((node: Element) => node.textContent).join(' ');
    });

    await page.close();

    return targetText;
  }
}
