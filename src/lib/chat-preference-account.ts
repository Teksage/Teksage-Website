import { isAxiosError } from "axios";
import {
  getStoredChatAvatar,
  getStoredChatStyle,
  rememberAccountChatPreferences,
} from "@/lib/chat-preference-storage";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { http } from "@/lib/services/http";

function readPair(body: unknown): { format: unknown; avatar: unknown } {
  if (body == null || typeof body !== "object") {
    return { format: null, avatar: null };
  }
  const row = body as Record<string, unknown>;
  const nested = row.profile_data;
  const source =
    nested != null && typeof nested === "object"
      ? (nested as Record<string, unknown>)
      : row;
  return { format: source.format, avatar: source.avatar };
}

/** Saved on the user row (`users.format` / `users.avatar`) at login or logout. */
export async function applyAccountChatPreferences(): Promise<void> {
  try {
    const { data } = await http.get(API_ENDPOINTS.profile);
    const pair = readPair(data);
    rememberAccountChatPreferences(pair.format, pair.avatar);
  } catch (error) {
    if (!isAxiosError(error) || error.response?.status !== 400) return;
    const pair = readPair(error.response.data);
    rememberAccountChatPreferences(pair.format, pair.avatar);
  }
}

/** Keep the account in sync so the next login skips reply style and avatar. */
export function syncAccountChatPreferences(): void {
  const format = getStoredChatStyle();
  const avatar = getStoredChatAvatar();
  if (!format && !avatar) return;
  const body: { format?: string; avatar?: string } = {};
  if (format) body.format = format;
  if (avatar) body.avatar = avatar;
  void http.put(API_ENDPOINTS.updateChatFormat, body).catch(() => undefined);
}
