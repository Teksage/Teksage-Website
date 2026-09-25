"use client";

import { VoiceAnswerPlayer } from "@/components/common/VoiceAnswerPlayer";
import { MuhurthaEventPlanAccordion } from "@/components/ask-astrologer/MuhurthaEventPlanAccordion";
import {
  ASK_SUMMARY_LAYOUT as L,
  ASK_SUMMARY_SCREEN,
} from "@/lib/constants/ask-astrologer-summary";
import { useI18nConstants } from "@/hooks/useT";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export function AskSummaryQaCard({ item }: { item: AskAstrologerRequest }) {
  const S = useI18nConstants(ASK_SUMMARY_SCREEN);
  const hasAnswer = Boolean(item.answer_text?.trim() || item.answer_voice_url);
  const plan = item.muhurtha_result ?? null;

  return (
    <section className={L.card}>
      <h2 className={L.sectionTitle}>{S.questionSection}</h2>
      <div className={L.body}>
        <p className={L.question}>{item.user_question}</p>
        {plan ? (
          <div className="mt-3">
            <MuhurthaEventPlanAccordion result={plan} />
          </div>
        ) : null}
      </div>
      <h2 className={L.sectionTitle}>{S.answerSection}</h2>
      <div className={L.body}>
        {!hasAnswer ? (
          <p className={L.empty}>{S.statusPending}</p>
        ) : (
          <>
            {item.answer_text?.trim() ? (
              <p className={L.answer}>{item.answer_text.trim()}</p>
            ) : null}
            {item.answer_voice_url ? (
              <div className={item.answer_text?.trim() ? "mt-3" : undefined}>
                <VoiceAnswerPlayer
                  src={item.answer_voice_url}
                  durationSec={item.answer_voice_duration_sec}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
