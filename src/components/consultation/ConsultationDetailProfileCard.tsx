"use client";

import Image from "next/image";
import {
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
} from "@/lib/constants/consultation-detail";
import { useI18nConstants, useT } from "@/hooks/useT";
import {
  consultationAstrologerInitials,
  consultationAstrologerName,
  formatConsultationLanguageList,
} from "@/lib/consultation-display";
import type { ConsultationAstrologer } from "@/types/consultation";

type Props = {
  astrologer: ConsultationAstrologer;
  consultationCount?: number;
};

export function ConsultationDetailProfileCard({
  astrologer,
  consultationCount,
}: Props) {
  const CD = useI18nConstants(CONSULTATION_DETAIL_SCREEN);
  const { t } = useT();
  const name = consultationAstrologerName(astrologer.user, t);
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

  const reviewCount = astrologer.review_count ?? 0;
  const exp = astrologer.experience;
  const consultations =
    consultationCount ??
    (reviewCount > 0 ? reviewCount * 9 : exp != null ? exp * 120 : 0);

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
          </div>

          <p className={CONSULTATION_DETAIL_LAYOUT.subtitle}>{subtitle}</p>

          {/* Stats aligned with name — below designation, reference layout */}
          <div className={CONSULTATION_DETAIL_LAYOUT.statsRow}>
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
