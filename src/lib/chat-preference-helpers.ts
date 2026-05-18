import {
  CHAT_AVATAR_OPTIONS,
  CHAT_PREFERENCES,
  CHAT_PREFERENCE_ASSETS,
  CHAT_STYLE_OPTIONS,
  type ChatStyleFormat,
} from "@/lib/constants/chat-preferences";

/** Flutter `chat.dart` — strip “the” before WebSocket `avator`. */
export function avatarStorageToWsName(storageTitle: string): string {
  return storageTitle.replace(/\bthe\b/gi, "").trim();
}

export function styleFormatToLabel(format: ChatStyleFormat): string {
  return format === "long"
    ? CHAT_PREFERENCES.styleLongLabel
    : CHAT_PREFERENCES.styleShortLabel;
}

export function styleFormatToIcon(format: ChatStyleFormat): string {
  const row = CHAT_STYLE_OPTIONS.find((o) => o.format === format);
  return row?.icon ?? CHAT_PREFERENCE_ASSETS.styleExplain;
}

export function findAvatarIndexByStorage(storage: string | null): number {
  if (!storage) return 0;
  const idx = CHAT_AVATAR_OPTIONS.findIndex(
    (a) => a.storageTitle === storage.toLowerCase()
  );
  return idx >= 0 ? idx : 0;
}

export function avatarIndexToStorage(index: number): string {
  return CHAT_AVATAR_OPTIONS[index]?.storageTitle ?? CHAT_AVATAR_OPTIONS[0].storageTitle;
}

export function avatarIndexToTitle(index: number): string {
  return CHAT_AVATAR_OPTIONS[index]?.title ?? CHAT_AVATAR_OPTIONS[0].title;
}
