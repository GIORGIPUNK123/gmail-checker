import { Page } from 'puppeteer';

export const passFunc = async (
  page: Page,
  email: string,
  pass: string
): Promise<{ err: null | string }> => {
  const passwordInput = await page.$(`input[type="password"]`);
  let errorMessage: null | string = null;
  if (passwordInput !== null) {
    await passwordInput.type(pass);
    await page.waitFor(1000);
    await page.keyboard.press('Enter');
    await page.waitFor(1000);

    const [error] = await page.$x(
      '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div[1]/div/form/span/section[2]/div/div/div[1]/div[2]/div[2]/span'
    );
    if (error !== undefined) {
      errorMessage = 'wrong password';
    }
  } else {
    errorMessage = 'captcha is requiered';
  }
  return { err: errorMessage };
};
