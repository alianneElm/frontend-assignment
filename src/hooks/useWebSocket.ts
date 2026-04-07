import { useEffect, useRef, useCallback } from 'react';

type MessageHandler = (data: unknown) => void;

export function useWebSocket(url: string, onMessage: MessageHandler) {
  const wsRef = useRef<WebSocket | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    if (!isMountedRef.current) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => console.log('WebSocket connected');

    ws.onclose = () => {
      if (!isMountedRef.current) return;
      console.log('WebSocket disconnected, retrying in 3s...');
      retryTimeoutRef.current = setTimeout(connect, 3000);
    };

    ws.onerror = () => {
      // onclose fires right after onerror, reconnect is handled there
      console.warn('WebSocket unavailable, will retry...');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string);
        onMessageRef.current(data);
      } catch {
        console.error('Failed to parse WebSocket message');
      }
    };
  }, [url]);

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      wsRef.current?.close();
    };
  }, [connect]);
}
