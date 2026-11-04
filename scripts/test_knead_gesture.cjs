const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../better-google-meets/frontend/node_modules/playwright'));

(async () => {
  console.log('Testing Palmar Knead gesture (Drag Left)...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  const page = await context.newPage();

  await page.goto('http://localhost:5173/?mode=vr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const cards = await page.$$('.custom-scrollbar > div');
  console.log(`Initial Cards: ${cards.length}`);

  if (cards.length > 0) {
    const firstCard = cards[0];
    const initialText = await firstCard.textContent();
    console.log('Initial Card content:', initialText.slice(0, 100));

    const box = await firstCard.boundingBox();
    if (box) {
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;

      console.log('Dragging card LEFT by 80px (Knead gesture)...');
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX - 80, startY, { steps: 10 });
      await page.waitForTimeout(500);

      // Snapshot of Knead strain/compression badge
      const kneadShot = path.resolve(__dirname, '..', 'screenshot_knead_gesture.png');
      await page.screenshot({ path: kneadShot });
      console.log('Saved knead gesture snapshot to:', kneadShot);

      await page.mouse.up();
      console.log('Mouse released. Waiting for local Qwen AI condensation...');
      await page.waitForTimeout(4000);

      const postText = await firstCard.textContent();
      console.log('Post-Knead Card content:', postText.slice(0, 100));
    }
  }

  await browser.close();
  console.log('Knead test completed successfully!');
})();
