"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_ANSWERS_READY,
  CONSULTATION_ANSWERS_READY_UI as UI,
} from "@/lib/constants/consultation-answers-ready";
import { cn } from "@/lib/utils";

type ConsultationAnswersReadyCalloutProps = {
  flushTop?: boolean;
};

export function ConsultationAnswersReadyCallout({
  flushTop = false,
}: ConsultationAnswersReadyCalloutProps) {
  const copy = useI18nConstants(CONSULTATION_ANSWERS_READY);

  return (
    <div className={cn(flushTop ? UI.rootFlush : UI.root)} role="status">
      <span className={UI.iconWrap} aria-hidden>
        <span className={UI.icon}>✓</span>
      </span>
      <div className={UI.copy}>
        <p className={UI.title}>{copy.title}</p>
        <p className={UI.body}>{copy.body}</p>
      </div>
    </div>
  );
}
