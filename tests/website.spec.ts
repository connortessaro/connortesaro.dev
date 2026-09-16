import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/work',
  '/about',
  '/work/ringi',
  '/work/phantom',
  '/work/kizuki',
];
test('all content routes render, remain within viewport, and have canonical metadata', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => {
    // Navigating away cancels in-flight RSC prefetches, which WebKit reports as
    // a page error. That is the harness outrunning the server, not a site fault.
    if (error.message.includes('_rsc=')) return;
    errors.push(error.message);
  });
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(route);
      // Firefox and WebKit revalidate from cache on repeat visits, so a
      // successful navigation is either a fresh 200 or a cached 304.
      expect([200, 304], `${route} at ${width}`).toContain(response?.status());
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://connortessaro.dev${route === '/' ? '' : route}`,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
test('project steps and disconnect settlement are keyboard operable', async ({
  page,
}) => {
  await page.goto('/work/phantom');
  const stream = page.getByRole('button', { name: '02 Stream', exact: true });
  await stream.focus();
  await page.keyboard.press('Enter');
  await expect(stream).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.project-art')).toHaveAttribute('data-step', '1');
  await page.getByRole('button', { name: 'Simulate disconnect' }).click();
  await expect(page.locator('.project-art')).toHaveAttribute('data-step', '2');
  await expect(page.locator('.terminal-bottom')).toContainText('interrupted');
  await expect(page.locator('.usage-card')).toContainText('Estimate fallback');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('.project-art')).toHaveAttribute('data-step', '0');
  await expect(
    page.getByRole('button', { name: 'Simulate disconnect' }),
  ).toHaveAttribute('aria-pressed', 'false');
  for (const slug of ['ringi', 'kizuki']) {
    await page.goto(`/work/${slug}`);
    const buttons = page.locator('.step-buttons button');
    await buttons.nth(2).click();
    await expect(page.locator('.project-art')).toHaveAttribute(
      'data-step',
      '2',
    );
    await page.getByRole('button', { name: 'Reset demo' }).click();
    await expect(page.locator('.project-art')).toHaveAttribute(
      'data-step',
      '0',
    );
  }
});
test('project rows link out and survive back-navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  // The homepage used to pin each project and step it on scroll. It is now
  // three static rows, so what matters is that each still reaches its case
  // study and that coming back leaves one of each.
  await expect(page.locator('#ringi')).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#ringi')).toBeVisible();
  await page
    .locator('#ringi')
    .getByRole('link', { name: 'Read the case study' })
    .click();
  await expect(page).toHaveURL(/work\/ringi/);
  await page.goBack();
  await expect(page.locator('#ringi')).toHaveCount(1);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});
test('reduced motion retains complete project access', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#ringi')).toBeVisible();
  // The demo moved to the case study, so that is where step access matters.
  await page.goto('/work/ringi');
  await page.locator('.step-buttons button').nth(2).click();
  await expect(page.locator('.project-art')).toHaveAttribute('data-step', '2');
});

/**
 * Entrance animations and scroll reveals briefly render text at partial opacity,
 * which axe reads as a contrast failure. Wait for every finite animation to
 * finish, ignoring the decorative loops that never do.
 */
async function settleMotion(page: Page) {
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every(
        (animation) =>
          animation.playState === 'finished' ||
          animation.effect?.getTiming().iterations === Infinity,
      ),
  );
}
test('accessibility scan across homepage and supporting routes', async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    await settleMotion(page);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
});
test('resume, metadata assets, not found, and navigation destinations work', async ({
  page,
  request,
}) => {
  const pdf = await request.get('/resume.pdf');
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()['content-type']).toContain('pdf');
  expect((await pdf.body()).subarray(0, 4).toString()).toBe('%PDF');
  for (const asset of [
    '/opengraph-image',
    '/work/ringi/opengraph-image',
    '/work/phantom/opengraph-image',
    '/work/kizuki/opengraph-image',
    '/sitemap.xml',
    '/robots.txt',
    '/icon.svg',
    '/images/listening-score.png',
    '/images/projects/ringi-mascot.webp',
    '/images/projects/phantom-mascot.webp',
    '/images/projects/kizuki-mascot.webp',
  ]) {
    const r = await request.get(asset);
    expect(r.status(), asset).toBe(200);
  }
  const missing = await page.goto('/missing-page');
  expect(missing?.status()).toBe(404);
  await page.getByRole('link', { name: 'Back to the work' }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole('link', { name: 'Let’s talk' })).toHaveAttribute(
    'href',
    'mailto:tessaro.c@northeastern.edu',
  );
});
test('core content remains readable with JavaScript disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/');
  await expect(page.locator('h1')).toContainText('CONNOR');
  await expect(page.locator('#ringi h2')).toContainText('Ringi');
  await page
    .locator('#ringi')
    .getByRole('link', { name: 'Read the case study' })
    .click();
  await expect(page.locator('article')).toContainText('What I owned');
  await context.close();
});
