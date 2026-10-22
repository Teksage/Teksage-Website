"use client";

import { MarathonCheckoutNext } from "@/components/marathon/MarathonCheckoutNext";
import { useI18nConstants, useT } from "@/hooks/useT";
import { consultationLanguageLabel } from "@/lib/constants/consultation-languages";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { MARATHON_FLOW_COPY } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";

export function MarathonCheckoutReview({
  readingFor,
  born,
  language,
  email,
  question,
  onEdit,
}: {
  readingFor: string;
  born: string;
  language: string;
  email: string;
  question: string;
  onEdit: () => void;
}) {
  const copy = useI18nConstants(MARATHON_COPY);
  const flow = useI18nConstants(MARATHON_FLOW_COPY);
  const { t } = useT();
  const ui = MARATHON_FLOW_UI;

  return (
    <>
      <section className={ui.card}>
        <div className={ui.reviewHead}>
          <h2 className={ui.reviewTitle}>{flow.review}</h2>
          <button type="button" className={ui.edit} onClick={onEdit}>
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
              <path d="M4 20h4l10-10-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M13 7l4 4" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {t("Edit")}
          </button>
        </div>
        <div className={ui.reviewPanel}>
          <div className={ui.reviewGrid}>
            <div>
              <p className={ui.reviewLabel}>{flow.readingForLabel}</p>
              <p className={ui.reviewValue}>{readingFor}</p>
            </div>
            <div>
              <p className={ui.reviewLabel}>{flow.born}</p>
              <p className={ui.reviewValue}>{born}</p>
            </div>
            <div>
              <p className={ui.reviewLabel}>{t("Language")}</p>
              <p className={ui.reviewValue}>{language ? consultationLanguageLabel(language) : ""}</p>
            </div>
            <div>
              <p className={ui.reviewLabel}>{flow.meetingTo}</p>
              <p className={ui.reviewValue}>{email}</p>
            </div>
          </div>
        </div>
        <div className={ui.reviewQuestion}>
          <p className={ui.reviewLabel}>{copy.queryTitle}</p>
          <p className={ui.reviewValue}>{question}</p>
        </div>
      </section>
      <MarathonCheckoutNext />
    </>
  );
}
