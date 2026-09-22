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

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OPEN_SIDE_PANEL" && sender.tab) {
    chrome.sidePanel.open({ tabId: sender.tab.id }).catch((err) => {
      console.warn("Could not open side panel:", err);
    });
    sendResponse({ status: "ok" });
    return true;
  }

  if (message.action === "INGEST_SPEECH" && message.payload) {
    fetch("http://127.0.0.1:8000/slate/ingest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message.payload)
    })
      .then((r) => r.json())
      .then((data) => sendResponse({ success: true, data }))
      .catch((err) => {
        console.warn("[Background] Ingest fetch error:", err);
        sendResponse({ success: false, error: err.message });
      });
    return true; // Keep channel open for async response
  }

  if (message.meeting_id) {
    chrome.storage.session.set({ activeMeetingId: message.meeting_id }).catch(() => {});
  }

  return true;
});

console.log("[BetterGoogleMeets] Background service worker running.");
