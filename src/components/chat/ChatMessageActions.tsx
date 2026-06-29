"use client";

import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
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
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);

  function handleAskAstrologer() {
    writeAskAstrologerFlow({ user_question: userQuestion, ai_response: aiResponse });
    router.push(ROUTES.askAstrologerLanguages);
  }

  function handleBookConsultation() {
    router.push(ROUTES.consultation);
  }

  return (
    <div className={cn("mt-2 flex flex-nowrap items-stretch gap-2", className)}>
      <button
        type="button"
        onClick={handleAskAstrologer}
        className="min-w-0 flex-1 rounded-full border border-[var(--color-brand-primary)] px-2 py-1.5 text-center text-[10px] font-semibold leading-tight text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-brand-primary)]/10 active:bg-[var(--color-brand-primary)]/20 sm:px-3 sm:text-xs"
      >
        {AA.askAstrologerLabel}
      </button>
      <button
        type="button"
        onClick={handleBookConsultation}
        className="min-w-0 flex-1 rounded-full border border-black/20 px-2 py-1.5 text-center text-[10px] font-medium leading-tight text-black/70 transition-colors hover:border-black/40 hover:text-black active:bg-black/5 sm:px-3 sm:text-xs"
      >
        {AA.bookConsultationLabel}
      </button>
    </div>
  );
}
