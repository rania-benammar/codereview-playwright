import { chromium, expect } from '@playwright/test';

(async () => {
  console.log('=== Début des scénarios de login ===');

  const browser = await chromium.launch({
    headless: false,                 // navigateur visible
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // -----------------------------
  // SCÉNARIO 1 : Email vide, mot de passe valide
  // -----------------------------
  console.log('Scénario 1 : Email vide, mot de passe valide');
  await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
  await page.fill('input[type="email"]', '');
  await page.fill('input[type="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  const error1 = await page.locator('text=Veuillez remplir tous les champs');
  console.log((await error1.isVisible()) ? '✅ Message affiché' : '❌ Pas de message');

  // -----------------------------
  // SCÉNARIO 2 : Email valide, mot de passe vide
  // -----------------------------
  console.log('Scénario 2 : Email valide, mot de passe vide');
  await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
  await page.fill('input[type="email"]', 'raniabenammar491@gmail.com');
  await page.fill('input[type="password"]', '');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  const error2 = await page.locator('text=Veuillez remplir tous les champs');
  console.log((await error2.isVisible()) ? '✅ Message affiché' : '❌ Pas de message');

  // -----------------------------
  // SCÉNARIO 3 : Email incorrect, mot de passe valide
  // -----------------------------
  console.log('Scénario 3 : Email incorrect, mot de passe valide');
  await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
  await page.fill('input[type="email"]', 'wrongemail@test.com');
  await page.fill('input[type="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  const error3 = await page.locator('text=Email ou mot de passe incorrect');
  console.log((await error3.isVisible()) ? '✅ Message affiché' : '❌ Pas de message');

  // -----------------------------
  // SCÉNARIO 4 : Email valide, mot de passe incorrect
  // -----------------------------
  console.log('Scénario 4 : Email valide, mot de passe incorrect');
  await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
  await page.fill('input[type="email"]', 'raniabenammar491@gmail.com');
  await page.fill('input[type="password"]', 'wrongpass');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  const error4 = await page.locator('text=Email ou mot de passe incorrect');
  console.log((await error4.isVisible()) ? '✅ Message affiché' : '❌ Pas de message');

  // -----------------------------
  // SCÉNARIO 5 : Email vide et mot de passe vide
  // -----------------------------
  console.log('Scénario 5 : Email vide et mot de passe vide');
  await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
  await page.fill('input[type="email"]', '');
  await page.fill('input[type="password"]', '');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  const error5 = await page.locator('text=Veuillez remplir tous les champs');
  console.log((await error5.isVisible()) ? '✅ Message affiché' : '❌ Pas de message');

  // -----------------------------
  // SCÉNARIO 6 : Email et mot de passe valides (dernier)
  // -----------------------------
  console.log('Scénario 6 : Email et mot de passe valides');
  await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
  await page.fill('input[type="email"]', 'raniabenammar491@gmail.com');
  await page.fill('input[type="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
  try {
    await expect(page).toHaveURL(/client|teams/);
    console.log('✅ Login réussi avec email et mot de passe valides');
  } catch {
    console.log('❌ Login échoué');
  }

  console.log('=== Tous les scénarios exécutés ===');
  console.log('⚠️ Chromium reste ouvert pour inspection !');

  // ❌ NE PAS fermer le navigateur
})();