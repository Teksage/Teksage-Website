"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AskSummaryQaCard } from "@/components/ask-astrologer/AskSummaryQaCard";
import { ConsultationSummaryDetailsCard } from "@/components/consultation/ConsultationSummaryDetailsCard";
import { ConsultationSummaryReviewCard } from "@/components/consultation/ConsultationSummaryReviewCard";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { useI18nConstants, useT } from "@/hooks/useT";
import {
  ASK_SUMMARY_LAYOUT as L,
  ASK_SUMMARY_QUERY_ID,
  ASK_SUMMARY_SCREEN,
} from "@/lib/constants/ask-astrologer-summary";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { ROUTES } from "@/lib/constants/routes";
import { formatDateTimeDMY } from "@/lib/format-datetime";
import {
  acknowledgeAnswerReady,
  deleteAskAstrologerReview,
  fetchAskAstrologerRequest,
  submitAskAstrologerReview,
} from "@/lib/services/ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";
import type { ConsultationReviewStatus } from "@/types/consultation";

function formatFee(amount: number | null, currency: string | null): string {
  if (amount == null) return "—";
  const cur = (currency || "INR").toUpperCase();
  return `${cur === "USD" ? "$" : "₹"}${amount}`;
}

export function AskSummaryView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useT();
  const S = useI18nConstants(ASK_SUMMARY_SCREEN);
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const requestId = Number(searchParams.get(ASK_SUMMARY_QUERY_ID) ?? "");

  const [item, setItem] = useState<AskAstrologerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!Number.isFinite(requestId) || requestId < 1) {
      setError(S.missingId);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAskAstrologerRequest(requestId);
      setItem(data);
      if (data.status === "answered") void acknowledgeAnswerReady(requestId);
    } catch {
      setError(S.loadError);
      setItem(null);
    } finally {
      setLoading(false);
    }
  }, [requestId, S.loadError, S.missingId]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading && !item) {
    return (
      <div className={L.page}>
        <LoadingOverlay open />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className={L.page}>
        <div className={L.stack}>
          <p className={L.empty}>{error ?? S.loadError}</p>
        </div>
      </div>
    );
  }

  const isAnswered = item.status === "answered";
  const languages = (item.preferred_languages ?? []).join(", ") || "—";

  return (
    <div className={L.page}>
      <header className={L.pageHeader}>
        <div className={L.pageHeaderInner}>
          <button
            type="button"
            onClick={() =>
              router.push(`${ROUTES.notifications}?tab=single-query`)
            }
            className={L.backBtn}
            aria-label={t("Go back")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={L.headerMain}>
            <h1 className={L.headerTitle}>{S.title}</h1>
            <p className={L.headerSub}>
              {isAnswered ? S.subtitleAnswered : S.subtitle}
            </p>
          </div>
        </div>
      </header>

      <div className={L.scroll}>
        <div className={L.stack}>
          <section className={L.card}>
            <div className={L.sessionInner}>
              <div className={L.astroMeta}>
                <p className={L.astroName}>
                  {item.answered_by_astrologer_name?.trim() || AA.askCardLabel}
                </p>
                <span
                  className={cn(
                    L.statusPill,
                    isAnswered ? L.statusAnswered : L.statusPending
                  )}
                >
                  {isAnswered ? S.statusAnswered : S.statusPending}
                </span>
              </div>
            </div>
          </section>

          <ConsultationSummaryDetailsCard
            title={S.detailsSection}
            items={[
              { label: S.turnaroundLabel, value: S.turnaroundValue },
              { label: S.languageLabel, value: languages },
              {
                label: S.feeLabel,
                value: formatFee(item.base_price, item.currency),
              },
              ...(item.answered_at
                ? [
                    {
                      label: S.answeredAtLabel,
                      value:
                        formatDateTimeDMY(item.answered_at) || item.answered_at,
                    },
                  ]
                : []),
            ]}
          />

          <AskSummaryQaCard item={item} />

          {isAnswered ? (
            <ConsultationSummaryReviewCard
              eventId={item.id}
              rating={item.rating}
              feedback={item.feedback}
              reviewStatus={
                (item.review_status as ConsultationReviewStatus | null) ?? null
              }
              onSubmit={async (body) => {
                setItem(await submitAskAstrologerReview(item.id, body));
              }}
              onDelete={async () => {
                setItem(await deleteAskAstrologerReview(item.id));
              }}
              onSubmitted={(next) => {
                setItem((prev) =>
                  prev
                    ? {
                        ...prev,
                        rating: next.rating,
                        feedback: next.feedback || null,
                        review_status: next.reviewStatus,
                      }
                    : prev
                );
              }}
            />
          ) : null}
        </div>
      </div>
      <LoadingOverlay open={loading} />
    </div>
  );
}
