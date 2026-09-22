/**
 * BetterGoogleMeets: Side Panel Controller
 * Loads the active React Arbor UI into the side panel iframe with meeting_id binding.
 */

const FRONTEND_BASE = "http://localhost:5173";
const iframe = document.getElementById("meets-app-frame");
const fallback = document.getElementById("fallback");
const frameContainer = document.getElementById("frame-container");
const retryBtn = document.getElementById("retry-btn");

async function initSidePanel() {
  let meetingId = "meet-session-01";

  // Check session storage for active meeting ID from content script
  try {
    const sessionData = await chrome.storage.session.get("activeMeetingId");
    if (sessionData && sessionData.activeMeetingId) {
      meetingId = sessionData.activeMeetingId;
    }
  } catch (e) {
    console.log("Could not query session storage:", e);
  }

  const targetUrl = `${FRONTEND_BASE}/?meeting_id=${encodeURIComponent(meetingId)}&mode=panel`;

  // Test if frontend server is reachable
  try {
    const ping = await fetch(`${FRONTEND_BASE}/`, { method: "HEAD", mode: "no-cors" });
    iframe.src = targetUrl;
    frameContainer.style.display = "flex";
    fallback.style.display = "none";
  } catch (err) {
    console.warn("Frontend not reachable at 5173:", err);
    frameContainer.style.display = "none";
    fallback.style.display = "flex";
  }
}

if (retryBtn) {
  retryBtn.addEventListener("click", () => {
    initSidePanel();
  });
}

// Re-check when side panel opens or receives active meeting notification
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SPEECH_INGESTED" && msg.meeting_id) {
    if (iframe.src.includes(encodeURIComponent(msg.meeting_id))) return;
    initSidePanel();
  }
});

initSidePanel();
