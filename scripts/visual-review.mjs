import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base = process.env.REVIEW_URL || 'http://127.0.0.1:3101';
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `artifacts/home-${width}.png` });
    for (const slug of ['ringi', 'phantom', 'kizuki']) {
      const chapter = page.locator(`#${slug}`);
      for (let step = 0; step < 3; step++) {
        await chapter.locator('.step-buttons button').nth(step).click();
        await chapter.locator('.chapter-figure').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);
        await chapter
          .locator('.chapter-sticky')
          .screenshot({ path: `artifacts/${slug}-${width}-${step}.png` });
      }
    }
    await page
      .getByRole('heading', { name: 'A score for listening' })
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `artifacts/experiments-${width}.png` });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const path of ['about', 'work', 'work/phantom']) {
    await page.goto(`${base}/${path}`, { waitUntil: 'networkidle' });
    await page.screenshot({
      path: `artifacts/${path.replaceAll('/', '-')}.png`,
      fullPage: true,
    });
  }
} finally {
  await browser.close();
}
console.log('Visual review screenshots saved in artifacts/.');
