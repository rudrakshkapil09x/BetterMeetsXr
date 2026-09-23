import { useState, useEffect, useRef, useCallback } from 'react';
import { getBackendHost } from '../services/api';

export interface WebSocketEvent {
  event: string;
  data?: any;
  action?: string;
  node?: any;
  state_hash?: string;
  revision?: number;
  timestamp?: number;
}

export function useWebSocket(onEvent?: (event: WebSocketEvent) => void) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastStateHash, setLastStateHash] = useState<string>('');
  const [lastRevision, setLastRevision] = useState<number>(0);
  const wsRef = useRef<WebSocket | null>(null);
  const retryTimeoutRef = useRef<any>(null);

  const connect = useCallback(async () => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const isExtension = window.location.protocol === 'chrome-extension:';
    const protocol = isExtension ? 'ws:' : (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
    const host = await getBackendHost();
    const params = new URLSearchParams(window.location.search);
    const meetingId = params.get('meeting_id') || 'meet-session-01';
    const wsUrl = `${protocol}//${host}/ws?meeting_id=${encodeURIComponent(meetingId)}`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[WebSocket] Connected to BetterGoogleMeets backend');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const parsed: WebSocketEvent = JSON.parse(event.data);
          if (parsed.state_hash) setLastStateHash(parsed.state_hash);
          if (parsed.revision) setLastRevision(parsed.revision);
          if (onEvent) onEvent(parsed);
        } catch (e) {
          console.error('[WebSocket] Error parsing message', e);
        }
      };

      ws.onclose = () => {
        console.warn('[WebSocket] Disconnected. Retrying in 2.5s...');
        setIsConnected(false);
        wsRef.current = null;
        retryTimeoutRef.current = setTimeout(connect, 2500);
      };

      ws.onerror = (err) => {
        console.error('[WebSocket] Connection error:', err);
        ws.close();
      };
    } catch (err) {
      console.error('[WebSocket] Instantiation error:', err);
      retryTimeoutRef.current = setTimeout(connect, 3000);
    }
  }, [onEvent]);

  useEffect(() => {
    connect();
    return () => {
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connect]);

  const sendPing = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action: 'PING' }));
    }
  }, []);

  return { isConnected, lastStateHash, lastRevision, sendPing };
}
