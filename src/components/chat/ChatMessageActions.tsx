"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { writeAskAstrologerFlow } from "@/lib/ask-astrologer-session";
import { ROUTES } from "@/lib/constants/routes";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
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

  function handleAskAstrologer() {
    writeAskAstrologerFlow({ user_question: userQuestion, ai_response: aiResponse });
    router.push(ROUTES.askAstrologerLanguages);
  }

  function handleBookConsultation() {
    router.push(ROUTES.consultation);
  }

  return (
    <div className={cn("mt-2 flex flex-wrap gap-2", className)}>
      <button
        type="button"
        onClick={handleAskAstrologer}
        className="rounded-full border border-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-brand-primary)]/10 active:bg-[var(--color-brand-primary)]/20"
      >
        {ASK_ASTROLOGER_SCREEN.askAstrologerLabel}
      </button>
      <button
        type="button"
        onClick={handleBookConsultation}
        className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-medium text-black/70 transition-colors hover:border-black/40 hover:text-black active:bg-black/5"
      >
        {ASK_ASTROLOGER_SCREEN.bookConsultationLabel}
      </button>
    </div>
  );
}
