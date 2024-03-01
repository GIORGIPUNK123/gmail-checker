import { Page } from 'puppeteer';

export const emailFunc = async (
  page: Page,
  email: string,
  pass: string
): Promise<{ err: string | null }> => {
  let errorMessage: string | null = null;
  await page.goto('https://accounts.google.com/');
  const emailInput = await page.waitForSelector('input[type="email"]');
  await emailInput.click();
  await emailInput.type(email);
  await page.keyboard.press('Enter');
  await page.waitFor(2000);
  const [emailErr] = await page.$x(
    '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[2]/div[2]/div'
  );

  if (emailErr !== undefined) {
    errorMessage = 'wrong email';
    return { err: errorMessage };
  } else {
    return { err: errorMessage };
  }
};
