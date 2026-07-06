import { test, expect, chromium } from '@playwright/test';

const URL = 'https://app-uat.codereview.allence.cloud/auth/login';
const VALID_EMAIL = 'raniabenammar491@gmail.com';
const VALID_PASS = '1234566';

async function launchBrowser() {
  const browser = await chromium.launch({
  headless: !!process.env.CI,
  slowMo: process.env.CI ? 0 : 1000,
});

  const page = await browser.newPage();
  return { browser, page };
}

test.describe('Login scenarios visible slow', () => {

  test('Scénario 1 : Email vide, mot de passe valide', async () => {
    const { browser, page } = await launchBrowser();

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', '');
    await page.fill('input[type="password"]', VALID_PASS);
    await page.click('button[type="submit"]');

await page.screenshot({
  path: 'screenshots/scenario1.png',
  fullPage: true,
});
    await page.waitForTimeout(2000);

    await browser.close();
  });

  test('Scénario 2 : Email valide, mot de passe vide', async () => {
    const { browser, page } = await launchBrowser();

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', VALID_EMAIL);
    await page.fill('input[type="password"]', '');
    await page.click('button[type="submit"]');

    await page.screenshot({
  path: 'screenshots/scenario2.png',
  fullPage: true,
});

    await page.waitForTimeout(2000);

    await browser.close();
  });

  test('Scénario 3 : Email incorrect, mot de passe valide', async () => {
    const { browser, page } = await launchBrowser();

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', 'raniabenammar@gmail.com');
    await page.fill('input[type="password"]', VALID_PASS);
    await page.click('button[type="submit"]');
    await page.screenshot({
  path: 'screenshots/scenario3.png',
  fullPage: true,
});

    await page.waitForTimeout(5000);

    await browser.close();
  });

  test('Scénario 4 : Email valide, mot de passe incorrect', async () => {
    const { browser, page } = await launchBrowser();

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', VALID_EMAIL);
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    await page.screenshot({
  path: 'screenshots/scenario4.png',
  fullPage: true,
});

    await page.waitForTimeout(5000);
    await browser.close();
  });

  test('Scénario 5 : Email vide et mot de passe vide', async () => {
    const { browser, page } = await launchBrowser();

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', '');
    await page.fill('input[type="password"]', '');
    await page.click('button[type="submit"]');

    await page.screenshot({
  path: 'screenshots/scenario5.png',
  fullPage: true,
});

    await page.waitForTimeout(2000);

    await browser.close();
  });

  test('Scénario 6 : login valide', async () => {

    const { browser, page } = await launchBrowser();

    await page.goto(URL, { waitUntil: 'networkidle' });

  await page.fill('input[type="email"]', VALID_EMAIL);
  await page.fill('input[type="password"]', VALID_PASS);

  await page.click('button[type="submit"]');

  await page.screenshot({
  path: 'screenshots/scenario6.png',
  fullPage: true,
});

  await page.waitForLoadState('networkidle');

  await page.waitForTimeout(20000); // juste pour voir le dashboard
});

});