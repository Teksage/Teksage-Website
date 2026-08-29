"use client";

import {
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
  CONSULTATION_REVIEW_AVATAR_BG,
} from "@/lib/constants/consultation-detail";
import { formatConsultationCategoryLabel } from "@/lib/consultation-display";
import { cn } from "@/lib/utils";
import type { ConsultationDetailReviewsProps } from "@/types/ui/consultation";
import type { ConsultationReviewEvent } from "@/types/consultation";

function StarFill({ rating, className }: { rating: number; className?: string }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className={className} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

function ratingPercent(events: ConsultationReviewEvent[], star: number): number {
  if (!events.length) return 0;
  const count = events.filter((e) => Math.round(e.rating ?? 0) === star).length;
  return Math.round((count / events.length) * 100);
}

function ratingCount(events: ConsultationReviewEvent[], star: number): number {
  return events.filter((e) => Math.round(e.rating ?? 0) === star).length;
}

function reviewerInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  }
  return (name.slice(0, 2) || "U").toUpperCase();
}

export function ConsultationDetailReviews({
  events,
  totalReviewCount,
  averageRating,
  seeAllUrl,
  fallbackCategories = [],
}: ConsultationDetailReviewsProps) {
  const CD = CONSULTATION_DETAIL_SCREEN;
  const previewCount = events.length;
  const displayCount = totalReviewCount > 0 ? totalReviewCount : previewCount;
  const avgFromEvents =
    previewCount > 0
      ? events.reduce((sum, e) => sum + (e.rating ?? 0), 0) / previewCount
      : null;
  const avg = averageRating ?? avgFromEvents;
  const showSummary = displayCount > 0 || avg != null;

  return (
    <section className={CONSULTATION_DETAIL_LAYOUT.section}>
      <div className={CONSULTATION_DETAIL_LAYOUT.reviewsHeader}>
        <h2 className={CONSULTATION_DETAIL_LAYOUT.reviewsTitle}>
          {CD.reviewsTitle}
          {displayCount > 0 ? (
            <span className={CONSULTATION_DETAIL_LAYOUT.reviewsCount}>
              {" "}
              · {displayCount.toLocaleString()}
            </span>
          ) : null}
        </h2>
        {seeAllUrl ? (
          <a
            href={seeAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={CONSULTATION_DETAIL_LAYOUT.reviewsSeeAll}
          >
            {CD.seeAll}
          </a>
        ) : null}
      </div>

      {!showSummary && previewCount === 0 ? (
        <p className={CONSULTATION_DETAIL_LAYOUT.reviewsEmpty}>{CD.noReviews}</p>
      ) : (
        <>
          {showSummary ? (
            <div className={CONSULTATION_DETAIL_LAYOUT.ratingSummary}>
              <div className={CONSULTATION_DETAIL_LAYOUT.ratingBigWrap}>
                <p className={CONSULTATION_DETAIL_LAYOUT.ratingBig}>
                  {avg != null ? avg.toFixed(1) : "—"}
                </p>
                <StarFill
                  rating={avg ?? 0}
                  className={CONSULTATION_DETAIL_LAYOUT.ratingStars}
                />
              </div>
              <div className={CONSULTATION_DETAIL_LAYOUT.ratingBarGrid}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className={CONSULTATION_DETAIL_LAYOUT.ratingBarRow}>
                    <span className={CONSULTATION_DETAIL_LAYOUT.ratingBarLabel}>
                      {star}
                    </span>
                    <div className={CONSULTATION_DETAIL_LAYOUT.ratingBar}>
                      <div
                        className={CONSULTATION_DETAIL_LAYOUT.ratingBarFill}
                        style={{ width: `${ratingPercent(events, star)}%` }}
                      />
                    </div>
                    <span className={CONSULTATION_DETAIL_LAYOUT.ratingBarCount}>
                      {ratingCount(events, star)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {previewCount > 0 ? (
            <div className={CONSULTATION_DETAIL_LAYOUT.reviewList}>
              {events.slice(0, 2).map((ev, i) => {
                const name =
                  [ev.first_name, ev.last_name].filter(Boolean).join(" ") || "User";
                const initials = reviewerInitials(name);
                const avatarBg =
                  CONSULTATION_REVIEW_AVATAR_BG[
                    i % CONSULTATION_REVIEW_AVATAR_BG.length
                  ];
                const topic =
                  fallbackCategories[i % Math.max(fallbackCategories.length, 1)] ??
                  "Career";
                return (
                  <article
                    key={`${name}-${i}`}
                    className={CONSULTATION_DETAIL_LAYOUT.reviewCard}
                  >
                    <div className={CONSULTATION_DETAIL_LAYOUT.reviewCardTop}>
                      <div className={CONSULTATION_DETAIL_LAYOUT.reviewerRow}>
                        <div
                          className={cn(
                            CONSULTATION_DETAIL_LAYOUT.reviewerInitial,
                            avatarBg
                          )}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className={CONSULTATION_DETAIL_LAYOUT.reviewerName}>
                            {name}
                          </p>
                          <StarFill
                            rating={ev.rating ?? 0}
                            className={CONSULTATION_DETAIL_LAYOUT.reviewerStars}
                          />
                        </div>
                      </div>
                      <span className={CONSULTATION_DETAIL_LAYOUT.reviewAgo}>
                        {CD.defaultReviewAgo}
                      </span>
                    </div>
                    <p className={CONSULTATION_DETAIL_LAYOUT.reviewText}>
                      {CD.defaultReviewText}
                    </p>
                    <p className={CONSULTATION_DETAIL_LAYOUT.reviewTopic}>
                      {CD.consultedOn} {formatConsultationCategoryLabel(topic)}
                    </p>
                  </article>
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
