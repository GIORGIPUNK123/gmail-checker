#!/usr/bin/env node
import { program } from 'commander';
import puppeteer from 'puppeteer';
import select, { Separator } from '@inquirer/select';
import { input } from '@inquirer/prompts';
import { main } from './main';
import { promises, readFile } from 'fs';
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--lang=en-US',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-blink-features=AutomationControlled',
    ],
  });
  program.version('1.0.0').description('Gmail account checker');
  program.description('Check Gmail Accounts').action(async () => {
    const comboFilePath = await input({
      message: 'Enter email:password txt file path',
    });
    // const threads = parseInt(
    //   await input({
    //     message: 'Enter thread amount max is 20',
    //   })
    // );
    const clearOldOutput: 'yes' | 'no' = await select({
      message: 'Do you want to clear old output?',
      choices: [
        {
          name: 'Yes',
          value: 'yes',
        },
        {
          name: 'No',
          value: 'no',
        },
      ],
    });

    try {
      const data = await promises.readFile(comboFilePath, 'utf8');
      const combo = data.split('\r\n').filter((x) => x !== '');
      if (clearOldOutput === 'yes') {
        await promises.writeFile('./out/valid_gmails.txt', '');
        await promises.writeFile('./out/invalid_gmails.txt', '');
      }
      await main(browser, combo);
    } catch (err) {
      console.log('invalid file path, please try again ', err);
    }

    //   message: 'Select',
    //   choices: [
    //     {
    //       name: 'basic',
    //       value: 'basic',
    //       description: 'Get basic info about your gpa and grades',
    //     },
    //     ...(await (async () => {
    //       const subjects = [''];
    //       return subjects.map((x) => ({
    //         name: x,
    //         value: x,
    //         description: 'Find more about this subject',
    //       }));
    //     })()),
    //   ],
    // });
    // await page.waitForNetworkIdle();
    // await mainFunc(page, browser, pirn, answer);
    // await browser.close();
  });
  await program.parseAsync(process.argv);
})();
