"use client";

import { VoiceAnswerPlayer } from "@/components/common/VoiceAnswerPlayer";
import { MuhurthaEventPlanAccordion } from "@/components/ask-astrologer/MuhurthaEventPlanAccordion";
import { askRequestInitials } from "@/lib/ask-request-display";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import {
  ASK_PREVIOUS_QA_COPY,
  ASK_PREVIOUS_QA_UI,
} from "@/lib/constants/ask-astrologer-previous-qa";
import { bcp47FromAppLocale, type AppLocale } from "@/lib/i18n/locale";
import type { AskAstrologerPreviousQa } from "@/types/ask-astrologer";

type PrevCopy = typeof ASK_PREVIOUS_QA_COPY;

function formatAnsweredAt(value: string | null, locale: AppLocale): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(bcp47FromAppLocale(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AskRequestPreviousQaThread({
  item,
  answeredByLabel,
  copy,
  locale,
  customerName,
}: {
  item: AskAstrologerPreviousQa;
  answeredByLabel: string;
  copy: PrevCopy;
  locale: AppLocale;
  customerName?: string | null;
}) {
  const kind =
    item.request_kind === "event_planner"
      ? copy.previousKindEventPlanner
      : copy.previousKindChat;
  const plan = item.muhurtha_result ?? null;
  const hasAnswer = Boolean(item.answer_text?.trim() || item.answer_voice_url);

  return (
    <div className={ASK_PREVIOUS_QA_UI.previousItem}>
      <div className={ASK_PREVIOUS_QA_UI.userRow}>
        <div className={ASK_PREVIOUS_QA_UI.userBubble}>
          <p className={ASK_PREVIOUS_QA_UI.userBubbleText}>
            {item.user_question?.trim() ?? ""}
          </p>
        </div>
        <span className={ASK_PREVIOUS_QA_UI.userAvatar} aria-hidden>
          {askRequestInitials(customerName)}
        </span>
      </div>

      {plan ? (
        <div className={ASK_PREVIOUS_QA_UI.answerRow}>
          <img
            src={CHAT_ASSETS.botLogo}
            alt=""
            className={ASK_PREVIOUS_QA_UI.botLogo}
          />
          <div className={ASK_PREVIOUS_QA_UI.answerCard}>
            <p className={ASK_PREVIOUS_QA_UI.answerLabel}>
              {copy.previousEventPlanLabel}
            </p>
            <MuhurthaEventPlanAccordion result={plan} />
          </div>
        </div>
      ) : null}

      {hasAnswer ? (
        <div className={ASK_PREVIOUS_QA_UI.answerRow}>
          <img
            src={CHAT_ASSETS.botLogo}
            alt=""
            className={ASK_PREVIOUS_QA_UI.botLogo}
          />
          <div className={ASK_PREVIOUS_QA_UI.answerCard}>
            <p className={ASK_PREVIOUS_QA_UI.answerLabel}>
              {copy.previousAnswerLabel}
            </p>
            {item.answer_text?.trim() ? (
              <p className={ASK_PREVIOUS_QA_UI.answerBody}>{item.answer_text}</p>
            ) : null}
            {item.answer_voice_url ? (
              <VoiceAnswerPlayer
                src={item.answer_voice_url}
                durationSec={item.answer_voice_duration_sec}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className={ASK_PREVIOUS_QA_UI.previousMeta}>
        <time
          className={ASK_PREVIOUS_QA_UI.previousDate}
          dateTime={item.answered_at ?? undefined}
        >
          {formatAnsweredAt(item.answered_at, locale)}
        </time>
        <span className={ASK_PREVIOUS_QA_UI.previousKindChip}>{kind}</span>
        <span className={ASK_PREVIOUS_QA_UI.previousAnsweredBy}>
          {answeredByLabel}
        </span>
      </div>
    </div>
  );
}
