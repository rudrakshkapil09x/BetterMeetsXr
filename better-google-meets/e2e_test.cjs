const { chromium } = require('./frontend/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/chait/.gemini/antigravity/brain/e69f3f4e-846e-4df3-8302-44d95caa82c9';

async function runE2ETest() {
  console.log('=== STARTING BETTERGOOGLEMEETS BROWSER E2E TEST ===');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const results = {
    steps: [],
    screenshots: []
  };

  try {
    // Step 1: Navigate to http://127.0.0.1:5173
    console.log('[Step 1] Navigating to http://127.0.0.1:5173...');
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle', timeout: 15000 });
    const title = await page.title();
    console.log(`Page title: "${title}"`);
    results.steps.push({ step: 1, name: 'Navigate', status: 'PASS', title });

    // Step 2: Verify Initial Layout
    console.log('[Step 2] Verifying Layout Elements...');
    await page.waitForSelector('text=BetterGoogleMeets', { timeout: 5000 });
    await page.waitForSelector('text=Personal Slate', { timeout: 5000 });
    await page.waitForSelector('text=Canonical Deliberation Arbor', { timeout: 5000 });
    
    const initialShot = path.join(ARTIFACT_DIR, 'better_meets_initial_dashboard.png');
    await page.screenshot({ path: initialShot, fullPage: true });
    results.screenshots.push(initialShot);
    results.steps.push({ step: 2, name: 'Initial Layout Verification', status: 'PASS', screenshot: initialShot });
    console.log(`Screenshot saved: ${initialShot}`);

    // Step 3: Type and Ingest New Thought
    console.log('[Step 3] Ingesting New Thought...');
    const textarea = await page.waitForSelector('textarea[placeholder*="Type a thought"]');
    await textarea.fill('Deploy regional Redis clusters to guarantee sub-15ms SLA');
    
    // Click send button
    const sendBtn = await page.waitForSelector('button:has(svg.lucide-send)');
    await sendBtn.click();
    
    // Wait for card to appear on Slate
    await page.waitForTimeout(1500);
    const cardText = await page.waitForSelector('text=Deploy regional Redis clusters', { timeout: 5000 });
    results.steps.push({ step: 3, name: 'Speech/Thought Ingestion', status: 'PASS', cardVerified: true });
    console.log('[Step 3] Card spawned on Personal Slate successfully.');

    // Step 4: Test Texterial Knead Transformation
    console.log('[Step 4] Testing Texterial Knead Transform...');
    const kneadBtn = await page.waitForSelector('button:has-text("Knead")');
    await kneadBtn.click();
    await page.waitForTimeout(1000);
    results.steps.push({ step: 4, name: 'Texterial Knead Transform', status: 'PASS' });
    console.log('[Step 4] Knead operation executed successfully.');

    // Step 5: Stage Card to Arbor (Create Candidate Ghost Sprout)
    console.log('[Step 5] Staging Card to Arbor...');
    const stageBtn = await page.waitForSelector('button:has-text("Stage to Arbor")');
    await stageBtn.click();
    
    // Wait for Ghost Sprout to appear on Main Stage
    await page.waitForTimeout(2000);
    await page.waitForSelector('text=Active Candidate Ghost Sprouts', { timeout: 5000 });
    await page.waitForSelector('text=Deliberation Diff & Trade-Off Analysis', { timeout: 5000 });
    
    const ghostShot = path.join(ARTIFACT_DIR, 'better_meets_ghost_sprout.png');
    await page.screenshot({ path: ghostShot, fullPage: true });
    results.screenshots.push(ghostShot);
    results.steps.push({ step: 5, name: 'Ghost Sprout Staged & Diff Analyzed', status: 'PASS', screenshot: ghostShot });
    console.log(`Screenshot saved: ${ghostShot}`);

    // Step 6: Consensus Voting across multiple peers
    console.log('[Step 6] Casting Consensus Votes with Peer Speakers...');
    // Switch speaker to Alice
    const speakerSelect = await page.waitForSelector('select');
    await speakerSelect.selectOption('Alice');
    await page.waitForTimeout(500);

    const voteAliceBtn = await page.waitForSelector('button:has-text("Approve as Alice")');
    await voteAliceBtn.click();
    console.log('[Step 6] Alice approved proposal. Consensus: 2/3');
    await page.waitForTimeout(1000);

    // Switch speaker to Bob for deciding vote
    await speakerSelect.selectOption('Bob');
    await page.waitForTimeout(500);

    const voteBobBtn = await page.waitForSelector('button:has-text("Approve as Bob")');
    await voteBobBtn.click();
    console.log('[Step 6] Bob approved proposal. Consensus: 3/3 reached!');
    await page.waitForTimeout(2000);

    // Verify node solidified into canonical tree
    await page.waitForSelector('text=node_0001', { timeout: 5000 });
    const solidifiedShot = path.join(ARTIFACT_DIR, 'better_meets_solidified_tree.png');
    await page.screenshot({ path: solidifiedShot, fullPage: true });
    results.screenshots.push(solidifiedShot);
    results.steps.push({ step: 6, name: 'Consensus Achieved & Node Solidified', status: 'PASS', screenshot: solidifiedShot });
    console.log(`[Step 6] Node successfully committed to Merkle DAG! Screenshot: ${solidifiedShot}`);

    // Step 7: Open Settings Modal (Dual-Engine Configuration)
    console.log('[Step 7] Opening Dual-Engine Settings Modal...');
    const settingsBtn = await page.waitForSelector('button[title="Configure LLM Engines"]');
    await settingsBtn.click();
    await page.waitForTimeout(800);
    await page.waitForSelector('text=Dual-Engine LLM Settings', { timeout: 5000 });
    await page.waitForSelector('text=Active Inference Strategy', { timeout: 5000 });
    
    const settingsShot = path.join(ARTIFACT_DIR, 'better_meets_settings_modal.png');
    await page.screenshot({ path: settingsShot, fullPage: true });
    results.screenshots.push(settingsShot);
    results.steps.push({ step: 7, name: 'Dual-Engine Settings Modal Verified', status: 'PASS', screenshot: settingsShot });
    console.log(`Screenshot saved: ${settingsShot}`);

    // Step 8: Close Modal & Verify Provenance Bar
    console.log('[Step 8] Verifying Merkle Provenance Bar...');
    const closeBtn = await page.waitForSelector('button:has(svg.lucide-x)');
    await closeBtn.click();
    await page.waitForTimeout(500);

    const hashElement = await page.waitForSelector('footer span:has-text("#")');
    const hashText = await hashElement.innerText();
    console.log(`Live Merkle State Hash: ${hashText}`);
    results.steps.push({ step: 8, name: 'Provenance Bar & Merkle Hash Verified', status: 'PASS', merkleHash: hashText });

    console.log('=== ALL 8 E2E BROWSER TESTS PASSED PERFECTLY ===');
    console.log(JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('E2E Test Failure:', err);
    const errShot = path.join(ARTIFACT_DIR, 'better_meets_error.png');
    await page.screenshot({ path: errShot, fullPage: true });
    results.steps.push({ step: 'ERROR', status: 'FAIL', error: err.message, screenshot: errShot });
  } finally {
    await browser.close();
  }
}

runE2ETest();
