"use client";

import { CHAT_LANDING_LAYOUT } from "@/lib/constants/chat-landing-ui";
import type { ChatLandingQuestionCardProps } from "@/types/ui/chat-landing";

export function ChatLandingQuestionCard({
  question,
  onSelect,
}: ChatLandingQuestionCardProps) {
  return (
    <button
      type="button"
      className={CHAT_LANDING_LAYOUT.questionCard}
      onClick={() => onSelect(question)}
    >
      {question}
    </button>
  );
}
