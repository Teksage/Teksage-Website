"use client";

import { useT } from "@/hooks/useT";
import { CHAT_LANDING_LAYOUT } from "@/lib/constants/chat-landing-ui";
import type { ChatLandingQuestionCardProps } from "@/types/ui/chat-landing";

export function ChatLandingQuestionCard({
  question,
  onSelect,
}: ChatLandingQuestionCardProps) {
  const { t } = useT();
  const localizedQuestion = t(question);

  return (
    <button
      type="button"
      className={CHAT_LANDING_LAYOUT.questionCard}
      onClick={() => onSelect(localizedQuestion)}
    >
      {localizedQuestion}
    </button>
  );
}
