import type { ChatHistoryRecord, ChatMessage } from "@/types/chat";

export function newChatMessageId(): string {
  return crypto.randomUUID();
}

export function userInitialsFromProfile(first?: string, last?: string, name?: string): string {
  const f = first?.trim()?.[0] ?? "";
  const l = last?.trim()?.[0] ?? "";
  if (f && l) return `${f}${l}`.toUpperCase();
  const parts = (name ?? "AP").trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (parts[0]?.slice(0, 2) ?? "AP").toUpperCase();
}

/** Last user question in the thread — used for related-queries API (Flutter `lastUserMessage`). */
export function lastUserQuestionFromMessages(messages: ChatMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const row = messages[i];
    if (row.role === "user") {
      const text = row.text.trim();
      if (text) return text;
    }
  }
  return "";
}

export function historyToChatMessages(history: ChatHistoryRecord[]): ChatMessage[] {
  const restored: ChatMessage[] = [];
  for (const row of history) {
    restored.push({
      id: newChatMessageId(),
      role: "user",
      text: row.userQuestion,
      status: "answered",
    });
    restored.push({
      id: newChatMessageId(),
      role: "assistant",
      text: row.apiResponse,
      isStreaming: false,
    });
  }
  return restored;
}
