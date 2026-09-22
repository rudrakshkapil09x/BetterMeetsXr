/**
 * BetterGoogleMeets: Content Script for Google Meet (Manifest V3)
 * Captures live speech transcripts via resilient DOM MutationObserver on Google Meet captions,
 * extracts meeting_id from URL, accurately attributes speaker names, debounces speaker turns,
 * and relays to backend.
 */

(() => {
  console.log("[BetterGoogleMeets] Content script initialized on Google Meet.");

  const BACKEND_URL = "http://localhost:8000";
  let currentMeetingId = getMeetingId();
  let activeTurnSpeaker = "Participant";
  let activeTurnText = "";
  let currentSpeaker = "Participant";
  let debounceTimer = null;
  const DEBOUNCE_DELAY_MS = 1800;

  function getMeetingId() {
    const path = window.location.pathname.replace(/^\/+/, "").split(/[?#]/)[0];
    return path || "meet-session-01";
  }

  // Update meeting ID if URL changes (SPA navigation)
  window.addEventListener("popstate", () => {
    currentMeetingId = getMeetingId();
    updateBadge();
  });

  // 1. Create floating status pill in Google Meet UI
  function injectStatusBadge() {
    if (document.getElementById("better-meets-pill")) return;

    const pill = document.createElement("div");
    pill.id = "better-meets-pill";
    pill.style.position = "fixed";
    pill.style.top = "16px";
    pill.style.right = "100px";
    pill.style.zIndex = "99999";
    pill.style.display = "flex";
    pill.style.alignItems = "center";
    pill.style.gap = "8px";
    pill.style.padding = "6px 14px";
    pill.style.background = "rgba(15, 23, 42, 0.94)";
    pill.style.color = "#f8fafc";
    pill.style.borderRadius = "20px";
    pill.style.fontSize = "12px";
    pill.style.fontWeight = "600";
    pill.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    pill.style.border = "1px solid rgba(6, 182, 212, 0.5)";
    pill.style.boxShadow = "0 4px 14px rgba(0,0,0,0.4)";
    pill.style.backdropFilter = "blur(10px)";
    pill.style.cursor = "pointer";
    pill.title = "BetterMeets Deliberation Panel (Click to open)";

    pill.innerHTML = `
      <span id="bm-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block; transition: all 0.2s ease;"></span>
      <span>BM</span>
      <span id="bm-room" style="color: #38bdf8; font-family: monospace; font-size: 11px;">${currentMeetingId}</span>
      <span id="bm-status" style="color: #94a3b8; font-size: 11px; font-weight: normal; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></span>
    `;

    pill.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "OPEN_SIDE_PANEL", meeting_id: currentMeetingId });
    });

    document.body.appendChild(pill);
    checkCcStatus();
  }

  function updateBadge() {
    const roomSpan = document.getElementById("bm-room");
    if (roomSpan) roomSpan.textContent = currentMeetingId;
  }

  function flashBadge(speaker, textPreview) {
    const dot = document.getElementById("bm-dot");
    const status = document.getElementById("bm-status");
    if (!dot) return;
    dot.style.background = "#06b6d4";
    dot.style.transform = "scale(1.4)";
    if (status && textPreview) {
      const shortSpeaker = (speaker || "Speaking").split(" ")[0];
      status.textContent = `${shortSpeaker}: ${textPreview.substring(0, 20)}...`;
      status.style.color = "#38bdf8";
    }
    setTimeout(() => {
      dot.style.background = "#10b981";
      dot.style.transform = "scale(1)";
    }, 1200);
  }

  // Periodic check if Google Meet captions (CC) are enabled
  function checkCcStatus() {
    setInterval(() => {
      const status = document.getElementById("bm-status");
      const dot = document.getElementById("bm-dot");
      if (!status || !dot) return;

      const hasCaptionContainers = document.querySelector(
        '[jsname="tgaKEf"], [jscontroller="D1tHje"], [jscontroller="kAPstc"], [jscontroller="e4qS1d"], .a4bIc, .nMxRkf, .VbkSUe, .iTTPOb, .ygicle, [aria-live="polite"]'
      );

      const ccOffBtn = document.querySelector('button[aria-label*="turn on captions" i], button[aria-label*="activate captions" i]');

      if (ccOffBtn && !hasCaptionContainers) {
        status.textContent = "CC: Off (Turn on CC)";
        status.style.color = "#fbbf24";
        dot.style.background = "#f59e0b";
      } else if (hasCaptionContainers && status.textContent === "CC: Off (Turn on CC)") {
        status.textContent = "";
        dot.style.background = "#10b981";
      }
    }, 3000);
  }

  // Disallow-list of Google Meet UI strings and icon glyphs
  const UI_BLACKLIST = [
    "leave call", "turn off microphone", "turn on microphone", "turn off camera",
    "turn on camera", "raise hand", "lower hand", "more options", "meeting details",
    "people", "chat with everyone", "activities", "show captions", "turn on captions",
    "turn off captions", "share screen", "stop sharing", "you're presenting",
    "you are presenting", "audio settings", "video settings", "device settings",
    "meeting code", "pin", "unpin", "send a message to everyone", "jump to latest",
    "in-call messages", "host controls", "reactions", "full screen", "info_outline",
    "mic_off", "videocam_off", "more_vert", "call_end", "hand_raise"
  ];

  function isUINoise(text) {
    if (!text) return true;
    const clean = text.toLowerCase().trim();
    if (clean.length < 4) return true;

    for (const phrase of UI_BLACKLIST) {
      if (clean === phrase || clean.startsWith(phrase) || clean.endsWith(phrase)) {
        return true;
      }
    }

    const words = clean.split(/\s+/).filter(w => w.length > 0);
    if (words.length < 2) return true;

    return false;
  }

  const recentTranscripts = new Set();
  const conversationHistory = []; // Rolling dialogue turns: { speaker, text }

  // 2. Dispatch speech turn to BetterMeets backend
  async function dispatchSpeechTurn(speaker, transcript) {
    if (!transcript) return;
    const trimmed = transcript.trim();
    if (isUINoise(trimmed)) return;

    // Deduplication check
    const hash = `${speaker}:${trimmed}`;
    if (recentTranscripts.has(hash)) return;
    recentTranscripts.add(hash);
    if (recentTranscripts.size > 50) {
      const first = recentTranscripts.values().next().value;
      recentTranscripts.delete(first);
    }

    flashBadge(speaker, trimmed);

    // Padding context: recent surrounding dialogue turns to prevent idea cutoff
    const paddingTurns = conversationHistory.slice(-4);

    const payload = {
      speaker: speaker || "Participant",
      transcript: trimmed,
      meeting_id: currentMeetingId,
      padding_history: paddingTurns
    };

    conversationHistory.push({ speaker: speaker || "Participant", text: trimmed });
    if (conversationHistory.length > 25) conversationHistory.shift();

    console.log("[BetterGoogleMeets] Dispatching speech turn with dialogue padding:", payload);


    try {
      if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage(
          { action: "INGEST_SPEECH", payload },
          (response) => {
            if (chrome.runtime.lastError) {
              console.warn("[BetterGoogleMeets] Background relay error, trying direct fetch:", chrome.runtime.lastError.message);
              fetchDirect(payload);
            } else if (response && response.success) {
              console.log("[BetterGoogleMeets] Ingest via background successful:", response.data);
            }
          }
        );
      } else {
        fetchDirect(payload);
      }
    } catch (err) {
      console.warn("[BetterGoogleMeets] Dispatch error:", err.message);
      fetchDirect(payload);
    }
  }

  async function fetchDirect(payload) {
    try {
      const resp = await fetch(`${BACKEND_URL}/slate/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log("[BetterGoogleMeets] Direct ingest response:", data);
      }
    } catch (e) {
      console.warn("[BetterGoogleMeets] Direct fetch error:", e.message);
    }
  }

  // 3. Resilient Caption & Speaker Extraction
  function getActiveCaptionTurns() {
    // Target actual caption text spans first
    const textSpans = Array.from(document.querySelectorAll('.iTTPOb, .ygicle, [jsname="YSxPC"]'));
    if (textSpans.length === 0) return [];

    const turns = [];
    const processedRows = new Set();

    for (const span of textSpans) {
      // Walk up ancestors from text span until finding the container that holds the speaker
      let row = null;
      let p = span.parentElement;
      while (p && p !== document.body) {
        if (p.querySelector('.zsT0Vo, [data-sender-name], .jxFHg, [class*="zsT0Vo"], img[alt]')) {
          row = p;
          break;
        }
        p = p.parentElement;
      }

      if (!row) {
        row = span.closest('.nMxRkf, [jsname="tgaKEf"], [jscontroller="D1tHje"]') || span.parentElement?.parentElement;
      }

      if (!row || processedRows.has(row)) continue;
      processedRows.add(row);

      // Extract all text inside this speaker row
      const rowSpans = row.querySelectorAll('.iTTPOb, .ygicle, [jsname="YSxPC"]');
      let text = "";
      if (rowSpans.length > 0) {
        text = Array.from(rowSpans).map(s => (s.textContent || "").trim()).filter(Boolean).join(" ").trim();
      } else {
        text = span.textContent ? span.textContent.trim() : "";
      }

      if (!text) continue;

      // Extract speaker name
      let speaker = null;

      // Priority A: Google Meet specific speaker element (.zsT0Vo is standard)
      const speakerEl = row.querySelector('.zsT0Vo, [data-sender-name], .jxFHg, [class*="zsT0Vo"], .Kc2x2e, .poVWob, .HO57db');
      if (speakerEl && speakerEl.textContent) {
        const val = speakerEl.textContent.trim();
        if (val && val.length < 50 && !text.includes(val)) {
          speaker = val;
        }
      }

      // Priority B: Speaker avatar image alt attribute
      if (!speaker) {
        const img = row.querySelector('img[alt]');
        if (img && img.getAttribute('alt')) {
          speaker = img.getAttribute('alt').replace(/^Avatar of\s+/i, '').trim();
        }
      }

      // Priority C: Structural diff - subtract caption text from row full text
      if (!speaker) {
        const rowText = (row.textContent || "").trim();
        if (rowText && text && rowText !== text) {
          let candidate = rowText.replace(text, '').trim();
          candidate = candidate.replace(/^[A-Z]\s+/, '').trim(); // Remove single avatar letter
          if (candidate && candidate.length > 1 && candidate.length < 50 && !isUINoise(candidate)) {
            speaker = candidate;
          }
        }
      }

      // Priority D: Fallback to current user's self name if speaking
      if (!speaker || speaker === "Participant") {
        const selfNameEl = document.querySelector('[data-self-name], [aria-label*="Your name" i]');
        if (selfNameEl) {
          const selfName = (selfNameEl.getAttribute('data-self-name') || selfNameEl.textContent || "").trim();
          if (selfName) speaker = selfName;
        }
      }

      turns.push({
        speaker: speaker || currentSpeaker || "Participant",
        text
      });
    }

    return turns;
  }

  function handleCaptionChange() {
    const turns = getActiveCaptionTurns();
    if (turns.length === 0) return;

    for (const turn of turns) {
      const { speaker, text } = turn;
      if (!text || text.length < 4) continue;

      // If speaker changed and we have an un-dispatched turn for previous speaker
      if (speaker !== activeTurnSpeaker && activeTurnText) {
        if (!isUINoise(activeTurnText)) {
          dispatchSpeechTurn(activeTurnSpeaker, activeTurnText);
        }
        activeTurnSpeaker = speaker;
        activeTurnText = "";
      }

      activeTurnSpeaker = speaker;
      currentSpeaker = speaker;

      // If turn text evolved or expanded
      if (text !== activeTurnText) {
        activeTurnText = text;
        flashBadge(speaker, activeTurnText);

        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (activeTurnText && !isUINoise(activeTurnText)) {
            dispatchSpeechTurn(activeTurnSpeaker, activeTurnText);
          }
        }, DEBOUNCE_DELAY_MS);
      }
    }
  }

  function setupCaptionObserver() {
    const observer = new MutationObserver(() => {
      handleCaptionChange();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    console.log("[BetterGoogleMeets] Resilient speaker & caption observer active.");
  }

  // Initialize once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      injectStatusBadge();
      setupCaptionObserver();
    });
  } else {
    injectStatusBadge();
    setupCaptionObserver();
  }
})();
