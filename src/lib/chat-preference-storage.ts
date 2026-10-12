import {
  CHAT_AVATAR_OPTIONS,
  CHAT_PREFERENCE_KEYS,
  type ChatStyleFormat,
} from "@/lib/constants/chat-preferences";

function read(key: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

function write(key: string, value: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}

export function normalizeChatStyle(value: unknown): ChatStyleFormat | null {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (raw === "long" || raw === "short") return raw;
  return null;
}

export function normalizeChatAvatar(value: unknown): string | null {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!raw) return null;
  return CHAT_AVATAR_OPTIONS.some((row) => row.storageTitle === raw) ? raw : null;
}

export function getStoredChatStyle(): ChatStyleFormat | null {
  return normalizeChatStyle(read(CHAT_PREFERENCE_KEYS.style));
}

export function getStoredChatAvatar(): string | null {
  const raw = read(CHAT_PREFERENCE_KEYS.avatar);
  return raw && raw.trim() ? raw.trim().toLowerCase() : null;
}

export function saveChatStyle(format: ChatStyleFormat): void {
  write(CHAT_PREFERENCE_KEYS.style, format);
}

export function saveChatAvatar(storageTitle: string): void {
  write(CHAT_PREFERENCE_KEYS.avatar, storageTitle.toLowerCase());
}

/** Copy the account choice into this browser without writing it back. */
export function rememberAccountChatPreferences(
  format: unknown,
  avatar: unknown
): void {
  const style = normalizeChatStyle(format);
  const storedAvatar = normalizeChatAvatar(avatar);
  if (style) write(CHAT_PREFERENCE_KEYS.style, style);
  if (storedAvatar) write(CHAT_PREFERENCE_KEYS.avatar, storedAvatar);
}
