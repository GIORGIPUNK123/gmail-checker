#!/usr/bin/env node
import { program } from 'commander';
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--lang=en-US',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ],
  });
  const page = await browser.newPage();
  program.version('1.0.0').description('Gmail account checker');
  program
    .requiredOption('-l, --list <list>', 'list')
    .parse(process.argv)
    .description('Check Gmail Accounts')
    .action(async () => {
      const options = program.opts();
      console.log('options: ', options);
      // await page.waitForNetworkIdle();
      // await mainFunc(page, browser, pirn, answer);
      // await browser.close();
    });
  await program.parseAsync(process.argv);
})();
