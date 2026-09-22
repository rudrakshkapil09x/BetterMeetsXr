/**
 * Chrome Extension Integration Test
 * Simulates Google Meet caption DOM mutation (including speaker extraction & in-place streaming turn updates)
 * and verifies resilient content.js capture + backend ingestion + agenda grounding.
 */

const { chromium } = require('./frontend/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/chait/.gemini/antigravity/brain/e69f3f4e-846e-4df3-8302-44d95caa82c9';

async function testExtensionIntegration() {
  console.log('=== STARTING CHROME EXTENSION GOOGLE MEET INTEGRATION TEST ===');

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const meetingId = 'test-room-' + Date.now();

    // 1. Navigate to localhost origin so origin is valid
    await page.goto('http://127.0.0.1:5173');
    await page.evaluate((roomId) => {
      window.history.pushState({}, '', `/${roomId}`);
      document.body.innerHTML = `
        <div style="background: #202124; color: white; padding: 20px; font-family: sans-serif; height: 100vh;">
          <h1>Google Meet Mock Room: ${roomId}</h1>
          <div id="captions-container" style="position: fixed; bottom: 80px; width: 100%; text-align: center;"></div>
        </div>
      `;
    }, meetingId);

    // 2. Set Meeting Agenda on backend
    console.log('[Ext Test 1] Setting meeting agenda on backend...');
    const agendaResp = await page.evaluate(async (roomId) => {
      const r = await fetch('http://localhost:8000/tree/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agenda: 'Better Meets Feature Planning: Speaker Attribution & High-Signal Note Extraction',
          meeting_id: roomId,
          author: 'Chair'
        })
      });
      return r.json();
    }, meetingId);
    console.log(`[Ext Test 1] Agenda set: "${agendaResp.agenda}" on root node ${agendaResp.root_id}`);

    // 3. Inject updated content.js
    const contentJsPath = path.join(__dirname, 'chrome-extension', 'content.js');
    const contentJs = fs.readFileSync(contentJsPath, 'utf8');
    await page.evaluate(contentJs);

    console.log('[Ext Test 2] Injected content.js. Verifying floating badge...');
    await page.waitForSelector('#better-meets-pill', { timeout: 5000 });
    const pillText = await page.innerText('#better-meets-pill');
    console.log(`[Ext Test 2] Floating badge detected: "${pillText}"`);

    // 4. Simulate spurious UI mutation outside caption container (should be ignored!)
    console.log('[Ext Test 3] Simulating spurious UI mutation outside caption container...');
    await page.evaluate(() => {
      const btn = document.createElement('button');
      btn.innerHTML = '<span>Leave call</span>';
      document.body.appendChild(btn);
    });
    await page.waitForTimeout(300);

    // 5. Simulate exact Google Meet DOM from the user's screenshot!
    // Speaker: RUDRAKSHKAPIL Himanshu
    // Utterance evolving in real-time as words are spoken
    console.log('[Ext Test 4] Simulating real Google Meet caption block with speaker RUDRAKSHKAPIL Himanshu...');
    await page.evaluate(() => {
      const container = document.getElementById('captions-container');
      const row = document.createElement('div');
      row.className = 'nMxRkf';
      row.setAttribute('jsname', 'tgaKEf');

      const speakerWrapper = document.createElement('div');
      speakerWrapper.className = 'jxFHg';
      const speakerSpan = document.createElement('div');
      speakerSpan.className = 'zsT0Vo';
      speakerSpan.textContent = 'RUDRAKSHKAPIL Himanshu';
      speakerWrapper.appendChild(speakerSpan);

      const textWrapper = document.createElement('div');
      textWrapper.className = 'a4bIc';
      const textSpan = document.createElement('span');
      textSpan.className = 'iTTPOb';
      textSpan.textContent = 'It is better. Very better. Notes by name.';
      textWrapper.appendChild(textSpan);

      row.appendChild(speakerWrapper);
      row.appendChild(textWrapper);
      container.appendChild(row);

      // Simulate speaker continuing the sentence via characterData streaming mutation!
      setTimeout(() => {
        textSpan.textContent = "It is better. Very better. Notes by name. Like, it's, it's not supposed to make. Just random notes is. Text to extract.";
      }, 400);
    });

    // Wait for debounce and network trip to backend
    console.log('[Ext Test 5] Waiting for debounce and LLM noise filtration...');
    await page.waitForTimeout(3500);

    // Verify noisy muttering was filtered out by the LLM layer
    const noiseCheck = await page.evaluate(async (roomId) => {
      const r = await fetch(`http://localhost:8000/slate?meeting_id=${roomId}`);
      return r.json();
    }, meetingId);
    console.log(`[Ext Test 5] Cards after noise: ${noiseCheck.cards.length} (Expected: 0 - filtered by LLM layer)`);
    if (noiseCheck.cards.length !== 0) {
      throw new Error(`LLM filtration failed to filter disfluent muttering! Found ${noiseCheck.cards.length} cards.`);
    }
    console.log('[Ext Test 5] SUCCESS: LLM filtration layer successfully rejected disfluent muttering.');

    // Now simulate substantive proposal from RUDRAKSHKAPIL Himanshu
    console.log('[Ext Test 5b] Simulating substantive technical proposal from RUDRAKSHKAPIL Himanshu...');
    await page.evaluate(() => {
      const container = document.getElementById('captions-container');
      container.innerHTML = ''; // Google Meet clears previous turn
      const row = document.createElement('div');
      row.className = 'nMxRkf';
      row.setAttribute('jsname', 'tgaKEf');

      const speakerWrapper = document.createElement('div');
      speakerWrapper.className = 'jxFHg';
      const speakerSpan = document.createElement('div');
      speakerSpan.className = 'zsT0Vo';
      speakerSpan.textContent = 'RUDRAKSHKAPIL Himanshu';
      speakerWrapper.appendChild(speakerSpan);

      const textWrapper = document.createElement('div');
      textWrapper.className = 'a4bIc';
      const textSpan = document.createElement('span');
      textSpan.className = 'iTTPOb';
      textSpan.textContent = 'We should adopt PostgreSQL with pgvector for efficient semantic search caching.';
      textWrapper.appendChild(textSpan);

      row.appendChild(speakerWrapper);
      row.appendChild(textWrapper);
      container.appendChild(row);
    });

    await page.waitForTimeout(5000);

    // 6. Query stored cards in speech slates to verify speaker attribution & deduplication
    const slatesData = await page.evaluate(async (roomId) => {
      const r = await fetch(`http://localhost:8000/slate?meeting_id=${roomId}`);
      return r.json();
    }, meetingId);

    console.log(`[Ext Test 6] Slates returned ${slatesData.cards.length} cards.`);
    if (slatesData.cards.length === 0) throw new Error("No cards were created in speech slates!");

    const card = slatesData.cards[0];
    console.log(`[Ext Test 6] Card 0 Speaker: "${card.speaker}" (Expected: "RUDRAKSHKAPIL Himanshu")`);
    console.log(`[Ext Test 6] Card 0 Text: "${card.distilledText}"`);

    if (card.speaker !== "RUDRAKSHKAPIL Himanshu") {
      throw new Error(`Speaker attribution failed! Expected 'RUDRAKSHKAPIL Himanshu', got '${card.speaker}'`);
    }

    // Verify deduplication: streaming extensions of the same turn should NOT spawn 3 separate cards
    if (slatesData.cards.length > 2) {
      throw new Error(`Expected at most 1-2 cards due to in-place turn updates, but found ${slatesData.cards.length} duplicate cards!`);
    }
    console.log('[Ext Test 6] SUCCESS: Speaker accurately identified as RUDRAKSHKAPIL Himanshu, and in-place turn update prevented duplicate card spam.');

    // 7. Test Batch Idea Extraction
    console.log('[Ext Test 7] Testing batch idea extraction on transcripts...');
    const extractResp = await page.evaluate(async (roomId) => {
      const r = await fetch(`http://localhost:8000/session/extract-ideas?meeting_id=${roomId}`, { method: 'POST' });
      return r.json();
    }, meetingId);

    console.log(`[Ext Test 7] Extracted ideas count: ${extractResp.extracted_count}`);
    if (extractResp.extracted_count === 0) throw new Error("Batch idea extraction returned 0 ideas!");
    console.log(`[Ext Test 7] Extracted idea: "${extractResp.ideas[0].distilledText}" by ${extractResp.ideas[0].speaker}`);

    if (extractResp.ideas[0].speaker !== "RUDRAKSHKAPIL Himanshu" && !extractResp.ideas[0].speaker.toLowerCase().includes("rudraksh")) {
      throw new Error(`Batch extracted idea speaker attribution failed! Got '${extractResp.ideas[0].speaker}'`);
    }


    // Take screenshot of mock Meet page with badge and active captions
    const extScreenshot = path.join(ARTIFACT_DIR, 'chrome_extension_meet_mock.png');
    await page.screenshot({ path: extScreenshot });
    console.log(`Saved screenshot: ${extScreenshot}`);

    console.log('=== CHROME EXTENSION GOOGLE MEET INTEGRATION TEST PASSED ===');
  } finally {
    await browser.close();
  }
}

testExtensionIntegration().catch((err) => {
  console.error('Extension test failed:', err);
  process.exit(1);
});
