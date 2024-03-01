import { readFile, writeFile } from 'fs';
import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import { checker } from './checker';

export const main = async (
  browser: Browser,
  combo: string[]
  // threads: number
) => {
  await Promise.all(
    combo.map(async (x, _) => {
      const page = await browser.newPage();
      const email = x.split(':')[0];
      const password = x.split(':')[1];
      console.log('account: ', _, ' ', `${email}:${password}`);
      return await checker(page, email, password);
    })
  );
  await browser.close();
};
