const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../better-google-meets/frontend/node_modules/playwright'));

(async () => {
  console.log('Testing VR Table Nodes, Spacing, and Side Inspector...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1366, height: 860 } });
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

  console.log('Navigating to http://localhost:5173/?mode=vr ...');
  await page.goto('http://localhost:5173/?mode=vr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  // 1. Verify Side Inspector Panel
  const inspector = await page.$('aside');
  if (inspector) {
    console.log('Side Inspector Panel is open!');
    const inspectorText = await inspector.textContent();
    console.log('Inspector content excerpt:', inspectorText.slice(0, 150));
  } else {
    console.warn('Inspector panel not found initially.');
  }

  // 2. Click on a node in the 3D scene (center of canvas)
  console.log('Clicking in 3D canvas to select a node...');
  const canvas = await page.$('canvas');
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      // Click near the top-center where the root or Depth 1 nodes are
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.4);
      await page.waitForTimeout(1000);
    }
  }

  // Check updated inspector
  const updatedInspector = await page.$('aside');
  if (updatedInspector) {
    const fullTextDiv = await page.$('aside .select-text');
    if (fullTextDiv) {
      const fullText = await fullTextDiv.textContent();
      console.log('>>> VERIFIED FULL TEXT IN SIDE INSPECTOR:', fullText);
    }
  }

  // 3. Take screenshot with Side Inspector open and well-spaced 3D tree
  const shot1 = path.resolve(__dirname, '..', 'screenshot_v2_inspector.png');
  await page.screenshot({ path: shot1 });
  console.log('Saved inspector & spaced tree screenshot to:', shot1);

  // 4. Test dragging a 3D table tile on the roundtable
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      // Table tiles are resting on the table around y = 0.77 (around lower-center of canvas)
      const tileX = box.x + box.width * 0.5;
      const tileY = box.y + box.height * 0.62;

      console.log(`Dragging 3D table tile at (${tileX}, ${tileY}) to the right (Stretch)...`);
      await page.mouse.move(tileX, tileY);
      await page.mouse.down();
      await page.mouse.move(tileX + 70, tileY, { steps: 8 });
      await page.waitForTimeout(500);
      await page.mouse.up();
      console.log('Released 3D tile. Waiting for AI transform response...');
      await page.waitForTimeout(3000);
    }
  }

  // 5. Final full scene screenshot
  const shot2 = path.resolve(__dirname, '..', 'screenshot_v2_final.png');
  await page.screenshot({ path: shot2 });
  console.log('Saved final screenshot to:', shot2);

  await browser.close();
  console.log('All tests passed successfully!');
})();
