/**
 * Google Meet Add-on SDK Adapter.
 * Integrates with meet.addons when running inside Google Meet iframe,
 * and provides full standalone simulation when running in standard browser.
 */

export interface MeetSessionContext {
  isMeetAddon: boolean;
  meetingId: string;
  userRole: 'host' | 'participant';
  mode: 'sidePanel' | 'mainStage' | 'standalone';
}

export async function initializeMeetSdk(): Promise<MeetSessionContext> {
  const urlParams = new URLSearchParams(window.location.search);
  const modeParam = urlParams.get('mode') as 'sidePanel' | 'mainStage' | null;

  // Check if Google Meet Add-on SDK global exists
  const hasMeetGlobal = typeof (window as any).meet !== 'undefined';

  if (hasMeetGlobal) {
    try {
      const meetSession = await (window as any).meet.addons.createAddonSession();
      console.log('[MeetSDK] Successfully initialized Google Meet Add-on session', meetSession);
      return {
        isMeetAddon: true,
        meetingId: 'google-meet-live',
        userRole: 'participant',
        mode: modeParam || 'sidePanel'
      };
    } catch (e) {
      console.warn('[MeetSDK] Failed to create Google Meet Add-on session; falling back to browser mode.', e);
    }
  }

  // Standalone browser mode fallback
  return {
    isMeetAddon: false,
    meetingId: 'standalone-browser-session',
    userRole: 'host',
    mode: modeParam || 'standalone'
  };
}
