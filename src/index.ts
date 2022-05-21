import GoogleTranslator from './GoogleTranslator';
import PapagoTranslator from './PapagoTranslator';
import * as puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';

(async () => {
  const sourceText: string = process.argv[2];
  if (sourceText === undefined) {
    throw new Error('sourceText must not be undefined');
  }

  const browser: Browser = await puppeteer.launch();

  const googleTranslator: GoogleTranslator = new GoogleTranslator(browser);
  const papagoTranslator: PapagoTranslator = new PapagoTranslator(browser);

  Promise.all([googleTranslator.translate(sourceText), papagoTranslator.translate(sourceText)]).then(
    ([googleResult, papagoResult]: string[]) => {
      console.log(`google: ${googleResult}`);
      console.log(`papago: ${papagoResult}`);
      browser.close();
    }
  );
})();
