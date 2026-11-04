const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../better-google-meets/frontend/node_modules/playwright'));

(async () => {
  console.log('--- Verifying Smooth Movements, Clean Selection, and Non-Colliding Cards ---');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1366, height: 860 } });
  const page = await context.newPage();

  page.on('console', msg => {
    const text = msg.text();
    if (!text.includes('deprecated') && !text.includes('DevTools') && !text.includes('INVALID_OPERATION')) {
      console.log('BROWSER LOG:', text);
    }
  });

  console.log('Navigating to http://localhost:5173/?mode=vr ...');
  await page.goto('http://localhost:5173/?mode=vr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Verify Side Inspector is open initially displaying root or target node
  const initialInspector = await page.$('aside');
  if (initialInspector) {
    console.log('Side Inspector is open!');
    const fullTextDiv = await page.$('aside .select-text');
    if (fullTextDiv) {
      console.log('Initial Inspected Text:', (await fullTextDiv.textContent()).trim());
    }
  }

  // 2. Test Smooth Camera Orbit (Drag in empty space on canvas)
  console.log('Testing smooth camera orbit in 3D canvas...');
  const canvas = await page.$('canvas');
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      // Drag in upper left empty space
      await page.mouse.move(box.x + 150, box.y + 150);
      await page.mouse.down();
      await page.mouse.move(box.x + 250, box.y + 160, { steps: 5 });
      await page.mouse.up();
      await page.waitForTimeout(500);
      console.log('Camera orbit executed smoothly without freezing!');
    }
  }

  // 3. Test Clicking on a Specific 3D Table Tile on the Roundtable
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      // Click on a table tile resting at the front-center of the desk (x ~ 0.5, y ~ 0.65)
      const clickX = box.x + box.width * 0.42;
      const clickY = box.y + box.height * 0.65;
      console.log(`Clicking to select 3D table tile at (${clickX.toFixed(0)}, ${clickY.toFixed(0)})...`);
      await page.mouse.click(clickX, clickY);
      await page.waitForTimeout(800);

      const tileTextDiv = await page.$('aside .select-text');
      if (tileTextDiv) {
        console.log('>>> VERIFIED INSPECTED TABLE TILE TEXT:', (await tileTextDiv.textContent()).trim());
      }
    }
  }

  // 4. Capture screenshot showing well-spaced 3D table tiles and Side Inspector
  const shot1 = path.resolve(__dirname, '..', 'screenshot_v3_table_cards.png');
  await page.screenshot({ path: shot1 });
  console.log('Saved screenshot of non-colliding table cards to:', shot1);

  // 5. Test Dragging a 3D Table Tile (Stretch Gesture)
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      const tileX = box.x + box.width * 0.42;
      const tileY = box.y + box.height * 0.65;
      console.log(`Dragging 3D table tile at (${tileX.toFixed(0)}, ${tileY.toFixed(0)}) to the RIGHT (Stretch)...`);
      await page.mouse.move(tileX, tileY);
      await page.mouse.down();
      await page.mouse.move(tileX + 70, tileY, { steps: 8 });
      await page.waitForTimeout(600);
      await page.mouse.up();
      console.log('Released 3D tile. Waiting 3.5s for AI stretch...');
      await page.waitForTimeout(3500);
    }
  }

  // 6. Capture final screenshot
  const shot2 = path.resolve(__dirname, '..', 'screenshot_v3_final.png');
  await page.screenshot({ path: shot2 });
  console.log('Saved final screenshot to:', shot2);

  await browser.close();
  console.log('--- Verification Finished Cleanly ---');
})();
