/**
 * BetterGoogleMeets: Background Service Worker (Manifest V3)
 * Manages Chrome Side Panel lifecycle and relays meeting events.
 */

// Configure side panel to open on action icon click
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("SidePanel setPanelBehavior error:", error));

// Listen for tab URL changes on meet.google.com to bind meeting_id to side panel
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("meet.google.com/")) {
    try {
      const url = new URL(tab.url);
      const meetingId = url.pathname.replace(/^\/+/, "").split(/[?#]/)[0] || "meet-session-01";
      await chrome.sidePanel.setOptions({
        tabId: tabId,
        path: `dist/index.html?meeting_id=${encodeURIComponent(meetingId)}`,
        enabled: true
      });
      await chrome.storage.session.set({ activeMeetingId: meetingId });
      console.log(`[BetterGoogleMeets] Side panel configured for tab ${tabId} with meeting: ${meetingId}`);
    } catch (err) {
      console.warn("Error setting side panel options:", err);
    }
  }
});

// Backend location is configurable via the side panel's Settings modal (Backend Server
// field), so the same extension build works against a shared LAN host during beta testing.
const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000";

async function getBackendUrl() {
  const items = await chrome.storage.sync.get({ backendUrl: DEFAULT_BACKEND_URL });
  return items.backendUrl || DEFAULT_BACKEND_URL;
}

async function bindSidePanelToMeeting(tabId, meetingId) {
  try {
    await chrome.sidePanel.setOptions({
      tabId,
      path: `dist/index.html?meeting_id=${encodeURIComponent(meetingId)}`,
      enabled: true
    });
    await chrome.storage.session.set({ activeMeetingId: meetingId });
  } catch (err) {
    console.warn("[Background] Failed to bind side panel to meeting:", err);
  }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // The service worker goes dormant after ~30s idle and only wakes on an event. If the
  // tab is already sitting on an ongoing Meet call when it wakes (the common case: join,
  // talk a while, then click the toolbar icon), chrome.tabs.onUpdated never fires again
  // for this session, so the side panel would open with no meeting_id and silently default
  // to a different room than the one content.js is actually posting captions into --
  // everything looks like it's working (200 OK, WebSocket broadcasts firing) but nothing
  // ever appears on screen. content.js sends this the moment it loads so the panel is
  // bound correctly regardless of whether onUpdated ever fires.
  if (message.action === "SYNC_MEETING_ID" && sender.tab && message.meeting_id) {
    bindSidePanelToMeeting(sender.tab.id, message.meeting_id).then(() => {
      sendResponse({ status: "synced" });
    });
    return true;
  }

  if (message.action === "OPEN_SIDE_PANEL" && sender.tab) {
    if (message.meeting_id) {
      bindSidePanelToMeeting(sender.tab.id, message.meeting_id);
    }
    chrome.sidePanel.open({ tabId: sender.tab.id }).catch((err) => {
      console.warn("Could not open side panel:", err);
    });
    sendResponse({ status: "ok" });
    return true;
  }

  if (message.action === "INGEST_SPEECH" && message.payload) {
    getBackendUrl()
      .then((backendUrl) =>
        fetch(`${backendUrl}/slate/ingest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message.payload)
        })
      )
      .then((r) => r.json())
      .then((data) => sendResponse({ success: true, data }))
      .catch((err) => {
        console.warn("[Background] Ingest fetch error:", err);
        sendResponse({ success: false, error: err.message });
      });
    return true; // Keep channel open for async response
  }

  return true;
});

console.log("[BetterGoogleMeets] Background service worker running.");
