"use client";

import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import { writeAskAstrologerFlow } from "@/lib/ask-astrologer-session";
import { consultationHubPath } from "@/lib/constants/consultation-routes";
import { ROUTES } from "@/lib/constants/routes";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import type { ChatMessageActionsProps } from "@/types/ui/chat";

/**
 * Action bar rendered beneath each assistant message bubble.
 * Wires "Ask Astrologer" and "Book Consultation" CTAs.
 */
export function ChatMessageActions({
  userQuestion,
  aiResponse,
  className,
}: ChatMessageActionsProps) {
  const router = useRouter();
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);

  function handleAskAstrologer() {
    writeAskAstrologerFlow({ user_question: userQuestion, ai_response: aiResponse });
    router.push(ROUTES.askAstrologerLanguages);
  }

  function handleBookConsultation() {
    router.push(consultationHubPath());
  }

  return (
    <div className={cn("mt-1 flex flex-wrap items-center gap-2", className)}>
      <button
        type="button"
        onClick={handleAskAstrologer}
        className={CHAT_LAYOUT.askActionBtn}
      >
        {AA.askAstrologerLabel}
      </button>
      <button
        type="button"
        onClick={handleBookConsultation}
        className={CHAT_LAYOUT.consultActionBtn}
      >
        {AA.bookConsultationLabel}
      </button>
    </div>
  );
}
