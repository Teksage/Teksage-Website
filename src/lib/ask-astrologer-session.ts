import { ASK_ASTROLOGER_SESSION_KEY } from "@/lib/constants/chat-ask-astrologer";
import type { AskAstrologerFlowState } from "@/types/ask-astrologer";

export function writeAskAstrologerFlow(state: AskAstrologerFlowState): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ASK_ASTROLOGER_SESSION_KEY, JSON.stringify(state));
}

export function readAskAstrologerFlow(): AskAstrologerFlowState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ASK_ASTROLOGER_SESSION_KEY);
    return raw ? (JSON.parse(raw) as AskAstrologerFlowState) : null;
  } catch {
    return null;
  }
}

export function clearAskAstrologerFlow(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ASK_ASTROLOGER_SESSION_KEY);
}
