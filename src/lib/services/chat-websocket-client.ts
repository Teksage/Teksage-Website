import { buildChatWebSocketUrl } from "@/lib/chat-websocket-url";
import { CHAT_WS_END_MARKER, CHAT_WS_FATAL_PROFILE_CLOSE_CODES } from "@/lib/constants/chat-screen";
import { STORAGE_KEYS } from "@/lib/constants";
import { refreshAccessToken } from "@/lib/services/http";

const RECONNECT_DELAYS_SEC = [1, 2, 4, 6, 8, 10] as const;

export type ChatWebSocketHandlers = {
  onTextChunk: (chunk: string) => void;
  onStreamEnd: () => void;
  onAudioBase64?: (audioBase64: string) => void;
  onOpen?: () => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (error: unknown) => void;
};

export class ChatWebSocketClient {
  private socket: WebSocket | null = null;
  private openPromise: Promise<void> | null = null;
  private reconnecting = false;
  private retryAttempt = 0;
  private pending: string[] = [];
  private handlers: ChatWebSocketHandlers | null = null;
  private intentionalClose = false;

  get connected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  async connect(handlers: ChatWebSocketHandlers): Promise<void> {
    this.handlers = handlers;
    this.intentionalClose = false;
    await this.openSocket();
  }

  async send(jsonPayload: string): Promise<void> {
    if (this.connected && this.socket) {
      this.socket.send(jsonPayload);
      return;
    }
    this.pending.push(jsonPayload);
    await this.openSocket();
    this.flushPending();
  }

  disconnect(): void {
    this.intentionalClose = true;
    this.pending = [];
    this.socket?.close();
    this.socket = null;
  }

  private async getAccessToken(): Promise<string | null> {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.authToken);
  }

  private async openSocket(): Promise<void> {
    if (this.connected) return;
    if (this.openPromise) return this.openPromise;

    this.openPromise = this.connectOnce().finally(() => {
      this.openPromise = null;
    });
    return this.openPromise;
  }

  private closeStaleSocket(): void {
    const stale = this.socket;
    if (!stale || stale.readyState === WebSocket.CLOSED) return;
    stale.onopen = null;
    stale.onmessage = null;
    stale.onerror = null;
    stale.onclose = null;
    stale.close();
    this.socket = null;
  }

  private async connectOnce(): Promise<void> {
    this.closeStaleSocket();

    let token = await this.getAccessToken();
    if (!token) throw new Error("Not authenticated");

    const tryConnect = (accessToken: string) =>
      new Promise<void>((resolve, reject) => {
        const url = buildChatWebSocketUrl(accessToken);
        const ws = new WebSocket(url);
        let settled = false;

        const finish = (fn: () => void) => {
          if (settled) return;
          settled = true;
          fn();
        };

        ws.onopen = () => {
          if (this.socket && this.socket !== ws) {
            ws.close();
            return;
          }
          this.socket = ws;
          this.reconnecting = false;
          this.retryAttempt = 0;
          this.handlers?.onOpen?.();
          finish(resolve);
        };

        ws.onmessage = (event) => this.handleMessage(String(event.data));

        ws.onerror = () => {
          finish(() => reject(new Error("WebSocket error")));
        };

        ws.onclose = async (event) => {
          if (this.socket === ws) this.socket = null;
          this.handlers?.onClose?.(event);
          if (!settled) {
            finish(() =>
              reject(new Error(`WebSocket closed before open (${event.code})`))
            );
          }
          if (this.intentionalClose) return;
          if (
            event.code === 1008 ||
            event.code === 4003 ||
            CHAT_WS_FATAL_PROFILE_CLOSE_CODES.includes(
              event.code as (typeof CHAT_WS_FATAL_PROFILE_CLOSE_CODES)[number]
            )
          ) {
            if (event.code === 1008 || event.code === 4003) {
              try {
                token = await refreshAccessToken();
                await this.openSocket();
              } catch (err) {
                this.handlers?.onError?.(err);
              }
            }
            return;
          }
          this.scheduleReconnect();
        };
      });

    try {
      await tryConnect(token);
    } catch {
      const refreshed = await refreshAccessToken();
      await tryConnect(refreshed);
    }
  }

  private handleMessage(raw: string): void {
    const trimmed = raw.trim();
    if (trimmed === CHAT_WS_END_MARKER) {
      this.handlers?.onStreamEnd();
      return;
    }

    try {
      const parsed = JSON.parse(trimmed) as { audio_base64?: string };
      const audio = parsed.audio_base64?.trim();
      if (audio) {
        this.handlers?.onAudioBase64?.(audio);
        return;
      }
    } catch {
      /* streaming text chunk */
    }

    this.handlers?.onTextChunk(raw);
  }

  private flushPending(): void {
    if (!this.connected || !this.socket) return;
    while (this.pending.length > 0) {
      const msg = this.pending.shift();
      if (msg) this.socket.send(msg);
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnecting || this.intentionalClose) return;
    this.reconnecting = true;
    const delaySec = RECONNECT_DELAYS_SEC[Math.min(this.retryAttempt, RECONNECT_DELAYS_SEC.length - 1)];
    this.retryAttempt += 1;
    window.setTimeout(() => {
      this.reconnecting = false;
      void this.openSocket().then(() => this.flushPending());
    }, delaySec * 1000);
  }
}
