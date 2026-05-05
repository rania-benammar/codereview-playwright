import { test, expect } from '@playwright/test';

const URL = 'https://app-uat.codereview.allence.cloud/auth/login';
const VALID_EMAIL = 'raniabenammar491@gmail.com';
const VALID_PASS = '123456';

test.describe('Login scenarios slow', () => {

  // SCÉNARIO 1 : Email vide + mot de passe valide
  test('Scénario 1 : Email vide, mot de passe valide', async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.fill('input[type="email"]', '');
    await page.waitForTimeout(300);
    await page.fill('input[type="password"]', VALID_PASS);
    await page.waitForTimeout(300);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
  });

  // SCÉNARIO 2 : Email valide + mot de passe vide
  test('Scénario 2 : Email valide, mot de passe vide', async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.fill('input[type="email"]', VALID_EMAIL);
    await page.waitForTimeout(300);
    await page.fill('input[type="password"]', '');
    await page.waitForTimeout(300);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
  });

  // SCÉNARIO 3 : Email incorrect + mot de passe valide
  test('Scénario 3 : Email incorrect, mot de passe valide', async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.fill('input[type="email"]', 'wrongemail@test.com');
    await page.waitForTimeout(300);
    await page.fill('input[type="password"]', VALID_PASS);
    await page.waitForTimeout(300);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
  });

  // SCÉNARIO 4 : Email valide + mot de passe incorrect
  test('Scénario 4 : Email valide, mot de passe incorrect', async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.fill('input[type="email"]', VALID_EMAIL);
    await page.waitForTimeout(300);
    await page.fill('input[type="password"]', 'wrongpass');
    await page.waitForTimeout(300);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
  });

  // SCÉNARIO 5 : Email vide + mot de passe vide
  test('Scénario 5 : Email vide et mot de passe vide', async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.fill('input[type="email"]', '');
    await page.waitForTimeout(300);
    await page.fill('input[type="password"]', '');
    await page.waitForTimeout(300);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
  });

  // SCÉNARIO 6 : Email et mot de passe valides
  test('Scénario 6 : Email et mot de passe valides', async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.fill('input[type="email"]', VALID_EMAIL);
    await page.waitForTimeout(300);
    await page.fill('input[type="password"]', VALID_PASS);
    await page.waitForTimeout(300);
    await page.click('button[type="submit"]');

    // Vérifie un élément du dashboard
    await page.locator('text=Bienvenue').waitFor({ timeout: 15000 });
    console.log('✅ Scénario 6: login réussi et dashboard visible');
  });

});