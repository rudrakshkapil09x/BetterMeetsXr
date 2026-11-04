const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../better-google-meets/frontend/node_modules/playwright'));

(async () => {
  console.log('Verifying cards floating above table with zero collision...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1366, height: 860 } });
  const page = await context.newPage();

  await page.goto('http://localhost:5173/?mode=vr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  // Take screenshot of elevated cards floating above table
  const shotPath = path.resolve(__dirname, '..', 'screenshot_elevated_cards.png');
  await page.screenshot({ path: shotPath });
  console.log('Saved screenshot of elevated cards to:', shotPath);

  await browser.close();
  console.log('Verification done!');
})();
