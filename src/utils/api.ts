import type { CreditCard, SiteConfig } from '../types';

export const API_BASE_URL = 
  (typeof window !== 'undefined' && (window as any).__PERKWISE_API_URL__) ||
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || 
  'http://localhost:3001/api';

export const SYNC_CHANNEL_NAME = 'perkwise_sync_channel';

// BroadcastChannel for instant cross-tab / cross-window sync
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
  } catch {
    // fallback
  }
}

export function broadcastUpdate(type: 'config' | 'cards' | 'bundle', payload?: any) {
  try {
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type, payload, timestamp: Date.now() });
    }
    // Also postMessage to window.opener or parent if embedded/popout
    if (typeof window !== 'undefined') {
      if (window.opener && window.opener !== window) {
        window.opener.postMessage({ perkwiseSync: true, type, payload }, '*');
      }
      window.dispatchEvent(new CustomEvent('perkwise_live_sync', { detail: { type, payload } }));
    }
  } catch (err) {
    console.warn('[Sync Broadcast] Warning:', err);
  }
}

export async function checkBackendHealth(apiUrl: string = API_BASE_URL): Promise<{ ok: boolean; data?: any; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${apiUrl}/health`, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      return { ok: true, data };
    }
    return { ok: false, error: `HTTP ${res.status}` };
  } catch (e: any) {
    return { ok: false, error: e.message || 'Connection failed' };
  }
}

export async function fetchRemoteConfig(apiUrl: string = API_BASE_URL): Promise<SiteConfig | null> {
  try {
    const res = await fetch(`${apiUrl}/config`);
    if (res.ok) {
      const data = await res.json();
      return data.config || null;
    }
  } catch {
    // ignore
  }
  return null;
}

export async function saveRemoteConfig(config: SiteConfig, apiUrl: string = API_BASE_URL): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    if (res.ok) {
      broadcastUpdate('config', config);
      return true;
    }
  } catch (e) {
    console.warn('[Remote Config] Failed to save to remote API:', e);
  }
  return false;
}

export async function fetchRemoteCards(apiUrl: string = API_BASE_URL): Promise<{ customCards: CreditCard[]; deactivatedCards: string[] } | null> {
  try {
    const res = await fetch(`${apiUrl}/cards`);
    if (res.ok) {
      const data = await res.json();
      return {
        customCards: data.customCards || [],
        deactivatedCards: data.deactivatedCards || []
      };
    }
  } catch {
    // ignore
  }
  return null;
}

export async function publishRemoteCard(card: CreditCard, apiUrl: string = API_BASE_URL): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    });
    if (res.ok) {
      broadcastUpdate('cards', card);
      return true;
    }
  } catch (e) {
    console.warn('[Remote Card] Failed to publish to remote API:', e);
  }
  return false;
}

export async function deleteRemoteCard(cardId: string, apiUrl: string = API_BASE_URL): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl}/cards/${encodeURIComponent(cardId)}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      broadcastUpdate('cards', { deletedId: cardId });
      return true;
    }
  } catch (e) {
    console.warn('[Remote Card] Failed to delete from remote API:', e);
  }
  return false;
}

export async function toggleRemoteCardStatus(cardId: string, shouldBeActive: boolean, apiUrl: string = API_BASE_URL): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl}/cards/${encodeURIComponent(cardId)}/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: shouldBeActive })
    });
    if (res.ok) {
      broadcastUpdate('cards', { toggledId: cardId, active: shouldBeActive });
      return true;
    }
  } catch (e) {
    console.warn('[Remote Card] Failed to toggle status on remote API:', e);
  }
  return false;
}

export async function fetchRemoteBundle(apiUrl: string = API_BASE_URL): Promise<any | null> {
  try {
    const res = await fetch(`${apiUrl}/bundle`);
    if (res.ok) {
      const data = await res.json();
      return data.bundle || null;
    }
  } catch {
    // ignore
  }
  return null;
}

export async function importRemoteBundle(bundle: any, apiUrl: string = API_BASE_URL): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl}/bundle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bundle)
    });
    if (res.ok) {
      broadcastUpdate('bundle', bundle);
      return true;
    }
  } catch (e) {
    console.warn('[Remote Bundle] Failed to import to remote API:', e);
  }
  return false;
}

/**
 * Initializes real-time listener on the frontend:
 * 1. Listens to BroadcastChannel ('perkwise_sync_channel')
 * 2. Listens to cross-window message events
 * 3. Connects to SSE stream if backend server is online
 */
export function initLiveSyncListener(onUpdate: (type: string, data?: any) => void): () => void {
  const handleBroadcast = (e: MessageEvent) => {
    if (e.data && e.data.type) {
      onUpdate(e.data.type, e.data.payload);
    }
  };

  const handleWindowMessage = (e: MessageEvent) => {
    if (e.data && e.data.perkwiseSync) {
      onUpdate(e.data.type, e.data.payload);
    }
  };

  const handleCustomEvent = (e: any) => {
    if (e.detail) {
      onUpdate(e.detail.type, e.detail.payload);
    }
  };

  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcast);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('message', handleWindowMessage);
    window.addEventListener('perkwise_live_sync', handleCustomEvent);
  }

  // Attempt SSE connection if available
  let eventSource: EventSource | null = null;
  if (typeof window !== 'undefined' && 'EventSource' in window) {
    try {
      eventSource = new EventSource(`${API_BASE_URL}/events`);
      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type === 'update') {
            onUpdate('remote_sse', parsed.payload);
          }
        } catch {
          // ignore
        }
      };
    } catch {
      // SSE not available or offline
    }
  }

  return () => {
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcast);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', handleWindowMessage);
      window.removeEventListener('perkwise_live_sync', handleCustomEvent);
    }
    if (eventSource) {
      eventSource.close();
    }
  };
}
