import { CHAT_LANDING_IDLE_MS } from "@/lib/constants/chat-landing-ui";
import type { ChatHistoryRecord } from "@/types/chat";

export function getLastChatActivityAt(history: ChatHistoryRecord[]): number | null {
  const stamps = history
    .map((row) => row.queryDate)
    .filter((value): value is string => Boolean(value?.trim()))
    .map((value) => new Date(value).getTime())
    .filter((value) => !Number.isNaN(value));
  if (!stamps.length) return null;
  return Math.max(...stamps);
}

export function shouldShowChatLanding(history: ChatHistoryRecord[]): boolean {
  const last = getLastChatActivityAt(history);
  if (last == null) return true;
  return Date.now() - last > CHAT_LANDING_IDLE_MS;
}

export function hasChatHistory(history: ChatHistoryRecord[]): boolean {
  return history.length > 0;
}
