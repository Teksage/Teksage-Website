"use client";

import { useState } from "react";
import { AskRequestPreviousQaThread } from "@/components/astrologer/AskRequestPreviousQaThread";
import { useI18nConstants, useT } from "@/hooks/useT";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import {
  ASK_PREVIOUS_QA_COPY,
  ASK_PREVIOUS_QA_UI,
} from "@/lib/constants/ask-astrologer-previous-qa";
import { cn } from "@/lib/utils";
import type { AskRequestPreviousQaSectionProps } from "@/types/ui/ask-request-previous-qa";

export function AskRequestPreviousQaSection({
  items,
  count,
  currentAstrologerName,
  customerName,
}: AskRequestPreviousQaSectionProps) {
  const copy = useI18nConstants(ASK_PREVIOUS_QA_COPY);
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const { locale } = useT();
  const [open, setOpen] = useState(false);
  if (count <= 0) return null;

  const badge = copy.previousConsultationsBadge.replace("{count}", String(count));
  const viewerName = (currentAstrologerName ?? "").trim().toLowerCase();

  return (
    <section className={ASK_PREVIOUS_QA_UI.previousSection}>
      <button
        type="button"
        className={ASK_PREVIOUS_QA_UI.previousToggle}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div className={ASK_PREVIOUS_QA_UI.previousHeaderBlock}>
          <div className={ASK_PREVIOUS_QA_UI.previousHeaderTitleRow}>
            <h3 className={ASK_PREVIOUS_QA_UI.sectionTitle}>
              {copy.previousConsultationsTitle}
            </h3>
            <span className={ASK_PREVIOUS_QA_UI.previousBadge}>{badge}</span>
          </div>
          <p className={ASK_PREVIOUS_QA_UI.previousSubtitle}>
            {copy.previousConsultationsSubtitle}
          </p>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "size-5 shrink-0 text-[var(--color-brand-panchang)] transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div className={ASK_PREVIOUS_QA_UI.previousList}>
          {items.map((item) => {
            const name = (item.astrologer_name ?? "").trim();
            const isYou =
              Boolean(viewerName) &&
              Boolean(name) &&
              name.toLowerCase() === viewerName;
            const answeredBy = isYou
              ? copy.previousAnsweredByYou
              : copy.previousAnsweredBy.replace(
                  "{name}",
                  name || AA.astrologerClientFallback
                );
            return (
              <AskRequestPreviousQaThread
                key={item.id}
                item={item}
                answeredByLabel={answeredBy}
                copy={copy}
                locale={locale}
                customerName={customerName}
              />
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
