"use client";

import Image from "next/image";
import {
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
} from "@/lib/constants/consultation-detail";
import {
  consultationAstrologerInitials,
  consultationAstrologerName,
  consultationRouteUserId,
  formatConsultationLanguageList,
} from "@/lib/consultation-display";
import { TEKSAGE_APP_ASTROLOGER_USER_IDS } from "@/lib/constants/consultation-featured-astrologers";
import { cn } from "@/lib/utils";
import type { ConsultationAstrologer } from "@/types/consultation";

type Props = {
  astrologer: ConsultationAstrologer;
  consultationCount?: number;
};

export function ConsultationDetailProfileCard({
  astrologer,
  consultationCount,
}: Props) {
  const CD = CONSULTATION_DETAIL_SCREEN;
  const name = consultationAstrologerName(astrologer.user) || "Astrologer";
  const initials = consultationAstrologerInitials(astrologer.user);
  const langs = formatConsultationLanguageList(astrologer.languages);
  const location = astrologer.user?.preferred_location?.trim() || "";
  const subtitle = [
    CD.vedicTitle,
    location || null,
    langs ? `${CD.speaksPrefix} ${langs}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const rating = astrologer.customer_rating;
  const reviewCount = astrologer.review_count ?? 0;
  const exp = astrologer.experience;
  const consultations =
    consultationCount ??
    (reviewCount > 0 ? reviewCount * 9 : exp != null ? exp * 120 : 0);

  const userId = consultationRouteUserId(astrologer);
  const isFeatured = (TEKSAGE_APP_ASTROLOGER_USER_IDS as readonly number[]).includes(
    userId
  );
  const showTopRated =
    isFeatured ||
    (rating != null && rating >= 4.5) ||
    (exp != null && exp >= 5);

  return (
    <article className={CONSULTATION_DETAIL_LAYOUT.profileCard}>
      <div className={CONSULTATION_DETAIL_LAYOUT.profileTop}>
        <div className={CONSULTATION_DETAIL_LAYOUT.avatarWrap}>
          {astrologer.picture ? (
            <Image
              src={astrologer.picture}
              alt={name}
              width={72}
              height={72}
              unoptimized
              className={CONSULTATION_DETAIL_LAYOUT.avatarImage}
            />
          ) : (
            <span className={CONSULTATION_DETAIL_LAYOUT.avatarInitials}>
              {initials}
            </span>
          )}
        </div>

        <div className={CONSULTATION_DETAIL_LAYOUT.profileMeta}>
          <div className={CONSULTATION_DETAIL_LAYOUT.nameRow}>
            <h1 className={CONSULTATION_DETAIL_LAYOUT.name}>{name}</h1>
            <span className={CONSULTATION_DETAIL_LAYOUT.badgeVerified}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {CD.verified}
            </span>
            {showTopRated ? (
              <span className={CONSULTATION_DETAIL_LAYOUT.badgeTopRated}>
                {CD.topRated}
              </span>
            ) : null}
          </div>

          <p className={CONSULTATION_DETAIL_LAYOUT.subtitle}>{subtitle}</p>

          {/* Stats aligned with name — below designation, reference layout */}
          <div className={CONSULTATION_DETAIL_LAYOUT.statsRow}>
            <div className={CONSULTATION_DETAIL_LAYOUT.statCell}>
              <div className="flex items-center gap-1">
                <span className={CONSULTATION_DETAIL_LAYOUT.statValue}>
                  {rating != null ? rating.toFixed(1) : "—"}
                </span>
                {rating != null ? (
                  <span className={cn("text-sm", CONSULTATION_DETAIL_LAYOUT.starIcon)}>
                    ★
                  </span>
                ) : null}
              </div>
              <span className={CONSULTATION_DETAIL_LAYOUT.statLabel}>
                {reviewCount > 0
                  ? `${reviewCount.toLocaleString()} ${CD.reviewsLabel}`
                  : CD.reviewsTitle}
              </span>
            </div>
            <div className={CONSULTATION_DETAIL_LAYOUT.statCell}>
              <span className={CONSULTATION_DETAIL_LAYOUT.statValue}>
                {exp != null ? `${exp} ${CD.experienceYears}` : "—"}
              </span>
              <span className={CONSULTATION_DETAIL_LAYOUT.statLabel}>
                {CD.experienceLabel}
              </span>
            </div>
            <div className={CONSULTATION_DETAIL_LAYOUT.statCell}>
              <span className={CONSULTATION_DETAIL_LAYOUT.statValue}>
                {consultations > 0 ? consultations.toLocaleString() : "—"}
              </span>
              <span className={CONSULTATION_DETAIL_LAYOUT.statLabel}>
                {CD.consultationsLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
