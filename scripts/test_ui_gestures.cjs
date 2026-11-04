const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../better-google-meets/frontend/node_modules/playwright'));

(async () => {
  console.log('Launching installed Chrome with Playwright...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

  console.log('Navigating to http://localhost:5173/?mode=vr ...');
  await page.goto('http://localhost:5173/?mode=vr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Verify HUD and Elements
  const headerText = await page.textContent('header');
  console.log('Header text found:', headerText.replace(/\s+/g, ' ').trim());

  // 2. Click Populate Scenario if needed, or verify existing cards
  const populateBtn = await page.$('text=Populate Scenario');
  if (populateBtn) {
    console.log('Clicking Populate Scenario button...');
    await populateBtn.click();
    await page.waitForTimeout(2500);
  }

  // 3. Verify Slate cards
  const cards = await page.$$('.custom-scrollbar > div');
  console.log(`Rendered Slate Cards count: ${cards.length}`);

  // 4. Test Ingestion
  console.log('Testing text ingestion...');
  const input = await page.$('input[placeholder*="Speak or type"]');
  if (input) {
    await input.fill('Establish emergency drone relay in sector 7');
    const ingestBtn = await page.$('button:has-text("Ingest")');
    if (ingestBtn) {
      await ingestBtn.click();
      console.log('Clicked Ingest. Waiting 2.5s for local model processing...');
      await page.waitForTimeout(3000);
    }
  }

  const updatedCards = await page.$$('.custom-scrollbar > div');
  console.log(`Updated Slate Cards count after ingestion: ${updatedCards.length}`);

  // 5. Test Mouse Drag Gesture on first card
  if (updatedCards.length > 0) {
    const firstCard = updatedCards[0];
    const box = await firstCard.boundingBox();
    if (box) {
      console.log('Performing Mouse Drag RIGHT (Stretch Gesture) on first card...');
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      // Drag right by 80px to trigger stretch
      await page.mouse.move(startX + 80, startY, { steps: 10 });
      await page.waitForTimeout(600);

      // Take snapshot while dragged to capture deformation badge
      const stretchScreenshotPath = path.resolve(__dirname, '..', 'screenshot_stretch_gesture.png');
      await page.screenshot({ path: stretchScreenshotPath });
      console.log('Saved stretch gesture snapshot to:', stretchScreenshotPath);

      // Release mouse
      await page.mouse.up();
      console.log('Mouse released. Local LLM transforming card (Stretch)...');
      await page.waitForTimeout(4000);
    }
  }

  // Final Scene Snapshot
  const finalScreenshotPath = path.resolve(__dirname, '..', 'screenshot_vr_final.png');
  await page.screenshot({ path: finalScreenshotPath });
  console.log('Saved final VR scene screenshot to:', finalScreenshotPath);

  await browser.close();
  console.log('Interactive verification complete!');
})();
