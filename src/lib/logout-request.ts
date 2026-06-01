import { getStoredChatAvatar, getStoredChatStyle } from "@/lib/chat-preference-storage";
import { STORAGE_KEYS } from "@/lib/constants";
import {
  CHAT_AVATAR_OPTIONS,
  CHAT_PREFERENCE_KEYS,
} from "@/lib/constants/chat-preferences";
import { CHAT_DEFAULTS } from "@/lib/constants/chat-screen";

/** Body for `POST /api/auth/logout` — mirrors Flutter `AuthService.logout`. */
export type LogoutRequestBody = {
  refresh_token: string;
  format: string;
  avatar: string;
  chat_languages: string;
};

export function buildLogoutRequestBody(): LogoutRequestBody | null {
  if (typeof window === "undefined") return null;

  const refresh_token = localStorage.getItem(STORAGE_KEYS.refreshToken)?.trim();
  if (!refresh_token) return null;

  const format = getStoredChatStyle() ?? CHAT_DEFAULTS.format;
  const avatar = getStoredChatAvatar() ?? CHAT_AVATAR_OPTIONS[0].storageTitle;
  const chat_languages = readChatLanguagesForLogout();

  return { refresh_token, format, avatar, chat_languages };
}

function readChatLanguagesForLogout(): string {
  const fromFlutter = localStorage
    .getItem(CHAT_PREFERENCE_KEYS.language)
    ?.trim();
  if (fromFlutter) return fromFlutter.toLowerCase();

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.authStore);
    if (!raw) return CHAT_DEFAULTS.language;
    const parsed = JSON.parse(raw) as {
      state?: { user?: { chatLanguages?: string } };
    };
    const lang = parsed.state?.user?.chatLanguages?.trim();
    if (lang) return lang.toLowerCase();
  } catch {
    /* ignore malformed persist */
  }

  return CHAT_DEFAULTS.language;
}
