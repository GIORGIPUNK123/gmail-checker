// Import puppeteer
import puppeteer, { ElementHandle, Page } from 'puppeteer';

export const main = async (page: Page, email: string, pass: string) => {
  // Go to your site
  await page.goto('https://accounts.google.com/');

  await page.waitForSelector('input[type="email"]');
  await page.click('input[type="email"]');
  await page.type('input[type="email"]', 'test@gmail.com');
  await page.keyboard.press('Enter');
  await page.waitFor(2000);
  const [emailErr] = await page.$x(
    '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[2]/div[2]/div'
  );
  if (emailErr !== undefined) {
    console.log('wrong email');
    page.close();
  }
  await page.waitFor(2000);
  // await page.waitForSelector('input[type="password"]');
  await page.type('input[type="password"]', 'CharaGio11');
  await page.waitFor(1000);
  await page.keyboard.press('Enter');
  await page.waitFor(1000);
  const [error] = await page.$x(
    '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[1]/div/form/span/section[2]/div/div/div[1]/div[2]/div[2]/span'
  );
  if (error !== undefined) {
    console.log('wrong password');
    page.close();
  }
  console.log('valid account');
  console.log(`${email}:${pass}`);
};
