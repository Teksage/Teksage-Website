"use client";

import { useI18nConstants } from "@/hooks/useT";
import { MuhurthaEventPlanAccordion } from "@/components/ask-astrologer/MuhurthaEventPlanAccordion";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import {
  ASK_ASTROLOGER_SCREEN,
} from "@/lib/constants/chat-ask-astrologer";
import { askRequestInitials } from "@/lib/ask-request-display";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export function AskRequestQuestionSection({ req }: { req: AskAstrologerRequest }) {
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--color-chat-bot-border)] bg-white p-5 shadow-[0_1px_6px_rgb(0_0_0_/_0.06)] sm:p-6 lg:p-7">
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <div>
            <p className="text-nav font-bold uppercase tracking-[0.08em] text-[var(--color-brand-panchang)]">
              {AA.checkoutQuestionSection}
            </p>
            <p className="mt-0.5 text-xs text-black/50">
              {AA.astrologerAiReferenceSubtitle}
            </p>
          </div>
        </div>

        {/* Chat Thread: User Question Bubble (Right-aligned, green bubble) */}
        <div className="flex w-full justify-end items-start gap-2.5 pt-1">
          <div className="max-w-[min(90%,34rem)] rounded-2xl bg-[var(--color-chat-user-bubble)] px-4 py-3 shadow-[0_2px_10px_rgb(16_177_0_/_0.16)]">
            <p className="whitespace-pre-wrap break-words text-body-sm font-bold leading-relaxed text-white">
              {req.user_question}
            </p>
          </div>
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[var(--color-chat-user-avatar-bg)] text-xs font-bold text-[var(--color-chat-user-avatar-text)]"
            aria-hidden
          >
            {askRequestInitials(req.customer_name)}
          </span>
        </div>

        {/* Chat Thread: AI Response Bubble (Left-aligned, crisp white card with bot logo) */}
        <div className="flex w-full justify-start items-start gap-2.5 pt-1">
          <img
            src={CHAT_ASSETS.botLogo}
            alt=""
            className="mr-0.5 mt-0.5 size-9 shrink-0 self-start"
          />
          <div className="flex max-w-[min(90%,34rem)] flex-col gap-2.5">
            <div className="rounded-2xl border border-[var(--color-chat-bot-border)] bg-white px-4 py-3.5 shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]">
              {req.muhurtha_result ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-panchang)]">
                    {AA.astrologerEventPlanReference}
                  </p>
                  <MuhurthaEventPlanAccordion result={req.muhurtha_result} />
                </div>
              ) : (
                <p className="whitespace-pre-wrap break-words text-body-sm font-medium leading-relaxed text-[var(--color-brand-black)]">
                  {req.ai_response}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
