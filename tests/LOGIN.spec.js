import { test, expect, chromium } from '@playwright/test';

test.describe('Scénarios de login', () => {

  test('Scénario 1 : Email vide, mot de passe valide', async ({ page }) => {
    await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
    await page.fill('input[type="email"]', '');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Veuillez remplir tous les champs')).toBeVisible();
  });

  test('Scénario 2 : Email valide, mot de passe vide', async ({ page }) => {
    await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
    await page.fill('input[type="email"]', 'raniabenammar491@gmail.com');
    await page.fill('input[type="password"]', '');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Veuillez remplir tous les champs')).toBeVisible();
  });

  test('Scénario 3 : Email incorrect, mot de passe valide', async ({ page }) => {
    await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
    await page.fill('input[type="email"]', 'wrongemail@test.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Email ou mot de passe incorrect')).toBeVisible();
  });

  test('Scénario 4 : Email valide, mot de passe incorrect', async ({ page }) => {
    await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
    await page.fill('input[type="email"]', 'raniabenammar491@gmail.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Email ou mot de passe incorrect')).toBeVisible();
  });

  test('Scénario 5 : Email vide et mot de passe vide', async ({ page }) => {
    await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
    await page.fill('input[type="email"]', '');
    await page.fill('input[type="password"]', '');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Veuillez remplir tous les champs')).toBeVisible();
  });

  test('Scénario 6 : Email et mot de passe valides', async ({ page }) => {
    await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
    await page.fill('input[type="email"]', 'raniabenammar491@gmail.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/client|teams/);
  });

});