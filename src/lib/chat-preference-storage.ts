import {
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

export function getStoredChatStyle(): ChatStyleFormat | null {
  const raw = read(CHAT_PREFERENCE_KEYS.style);
  if (raw === "long" || raw === "short") return raw;
  return null;
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
