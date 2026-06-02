import { API_ENDPOINTS } from "@/lib/constants/api";
import { getPublicApiBaseUrl } from "@/lib/env";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function resolveHttpOriginForWebSocket(): string {
  const wsOverride = process.env.NEXT_PUBLIC_WS_BASE_URL?.trim();
  if (wsOverride) return stripTrailingSlash(wsOverride);

  const apiBase = getPublicApiBaseUrl();
  if (apiBase) return stripTrailingSlash(apiBase);

  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.warn(
      "[chat] NEXT_PUBLIC_WS_BASE_URL is unset. Defaulting to http://127.0.0.1:8000 — set it in .env.local when using NEXT_PUBLIC_API_BASE_URL=same-origin."
    );
  }

  return "http://127.0.0.1:8000";
}

/** Browser WebSocket URL — token query param (backend `get_current_user_socket`). */
export function buildChatWebSocketUrl(accessToken: string): string {
  const httpOrigin = resolveHttpOriginForWebSocket();
  const wsOrigin = httpOrigin.replace(/^http/i, (m) => (m.toLowerCase() === "https" ? "wss" : "ws"));
  const url = new URL(API_ENDPOINTS.chatWebSocket, `${wsOrigin}/`);
  url.searchParams.set("token", accessToken);
  return url.toString();
}
