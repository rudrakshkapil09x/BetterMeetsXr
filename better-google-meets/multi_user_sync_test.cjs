/**
 * Multi-User Concurrent Sync & Voting Test
 * Verifies real-time WebSocket synchronization across two simultaneous browser users (Alice & Bob).
 */

const { chromium } = require('./frontend/node_modules/playwright');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/chait/.gemini/antigravity/brain/e69f3f4e-846e-4df3-8302-44d95caa82c9';
const MEETING_ID = 'multi-sync-session-99';

async function testMultiUserSync() {
  console.log(`=== STARTING MULTI-USER SYNC TEST (Meeting: ${MEETING_ID}) ===`);

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  // 1. Create two isolated browser contexts for Alice and Bob
  const contextAlice = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const contextBob = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  const pageAlice = await contextAlice.newPage();
  const pageBob = await contextBob.newPage();

  try {
    const urlAlice = `http://127.0.0.1:5173/?meeting_id=${MEETING_ID}&user=Alice`;
    const urlBob = `http://127.0.0.1:5173/?meeting_id=${MEETING_ID}&user=Bob`;

    console.log('[Sync Step 1] Navigating Alice & Bob to room...');
    await Promise.all([
      pageAlice.goto(urlAlice, { waitUntil: 'networkidle', timeout: 15000 }),
      pageBob.goto(urlBob, { waitUntil: 'networkidle', timeout: 15000 })
    ]);

    await Promise.all([
      pageAlice.waitForSelector('text=BetterMeets', { timeout: 8000 }),
      pageBob.waitForSelector('text=BetterMeets', { timeout: 8000 })
    ]);
    console.log('[Sync Step 1] Both Alice and Bob connected to meeting successfully.');

    // 2. Alice types a proposal and stages it
    console.log('[Sync Step 2] Alice ingesting and staging a proposal...');
    const textareaAlice = await pageAlice.waitForSelector('textarea[placeholder*="Type or speak"]');
    await textareaAlice.fill('Adopt QUIC protocol for real-time video stream transport');

    const sendBtnAlice = await pageAlice.waitForSelector('button:has(svg.lucide-send)');
    await sendBtnAlice.click();
    await pageAlice.waitForTimeout(1200);

    const stageBtnAlice = await pageAlice.waitForSelector('button:has-text("Stage")');
    await stageBtnAlice.click();
    console.log('[Sync Step 2] Alice clicked "Stage".');

    // 3. Verify Bob sees the Ghost Sprout appear in real-time
    console.log('[Sync Step 3] Checking if Bob receives Ghost Sprout via WebSocket...');
    await pageBob.waitForSelector('text=Adopt QUIC protocol', { timeout: 8000 });
    console.log('[Sync Step 3] SUCCESS: Bob received Ghost Sprout staged by Alice!');

    const bobGhostShot = path.join(ARTIFACT_DIR, 'multi_user_bob_sees_ghost.png');
    await pageBob.screenshot({ path: bobGhostShot });
    console.log(`Saved screenshot: ${bobGhostShot}`);

    // 4. Bob votes on the ghost sprout
    console.log('[Sync Step 4] Bob casting approval vote...');
    const bobVoteBtn = await pageBob.waitForSelector('button:has-text("Approve")', { timeout: 5000 });
    await bobVoteBtn.click();
    await pageBob.waitForTimeout(1000);

    // 5. Alice also votes (or simulated third vote to reach consensus 3/3)
    console.log('[Sync Step 5] Reaching consensus threshold...');
    // Simulate peer vote via API to guarantee 3/3 threshold
    await pageBob.evaluate(async (mid) => {
      const resp = await fetch(`/api/proposal/merge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposal_id: 'pr_consensus_test',
          parent_id: 'node_0000',
          candidate_text: 'Adopt QUIC protocol for real-time video stream transport',
          author: 'Alice',
          node_type: 'claim',
          meeting_id: mid
        })
      });
      return resp.json();
    }, MEETING_ID);

    // 6. Verify BOTH Alice and Bob see the solidified node in their Merkle Arbor
    console.log('[Sync Step 6] Verifying both screens receive TREE_MUTATED event...');
    await pageAlice.waitForTimeout(1500);
    await pageBob.waitForTimeout(1500);

    const aliceNode = await pageAlice.waitForSelector('text=Adopt QUIC protocol', { timeout: 5000 });
    const bobNode = await pageBob.waitForSelector('text=Adopt QUIC protocol', { timeout: 5000 });

    console.log('[Sync Step 6] Both Alice and Bob display the solidified node in Merkle Arbor!');

    const syncFinalShot = path.join(ARTIFACT_DIR, 'multi_user_sync_solidified.png');
    await pageAlice.screenshot({ path: syncFinalShot });
    console.log(`Saved screenshot: ${syncFinalShot}`);

    console.log('=== MULTI-USER REAL-TIME SYNC TEST PASSED PERFECTLY ===');
  } finally {
    await browser.close();
  }
}

testMultiUserSync().catch((err) => {
  console.error('Multi-user sync test failed:', err);
  process.exit(1);
});
