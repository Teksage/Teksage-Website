import { API_ENDPOINTS } from "@/lib/constants/api";
import {
  getPublicWebSocketBaseUrl,
  isChatWebSocketEnvMisconfigured,
} from "@/lib/env";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** Upgrade http→https when the page is served over HTTPS (mixed-content safe WSS). */
function secureHttpOriginForPage(httpOrigin: string): string {
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    httpOrigin.startsWith("http://")
  ) {
    return httpOrigin.replace(/^http:\/\//i, "https://");
  }
  return httpOrigin;
}

export function describeChatWebSocketEndpoint(): string {
  try {
    return buildChatWebSocketUrl("…").replace(/token=[^&]+/, "token=…");
  } catch {
    return `${API_ENDPOINTS.chatWebSocket} (invalid base URL)`;
  }
}

export function logChatWebSocketMisconfiguration(): void {
  if (!isChatWebSocketEnvMisconfigured()) return;
  console.error(
    "[chat] WebSocket is misconfigured for production. Set NEXT_PUBLIC_WS_BASE_URL on Vercel to your FastAPI origin (same host as BACKEND_PROXY_TARGET). Next.js /api rewrites do not proxy WebSockets.",
    { endpoint: describeChatWebSocketEndpoint() }
  );
}

/** Browser WebSocket URL — token query param (backend `get_current_user_socket`). */
export function buildChatWebSocketUrl(accessToken: string): string {
  const httpOrigin = secureHttpOriginForPage(
    stripTrailingSlash(getPublicWebSocketBaseUrl())
  );
  const wsOrigin = httpOrigin.replace(/^http/i, (m) =>
    m.toLowerCase() === "https" ? "wss" : "ws"
  );
  const url = new URL(API_ENDPOINTS.chatWebSocket, `${wsOrigin}/`);
  url.searchParams.set("token", accessToken);
  return url.toString();
}
