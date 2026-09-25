"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18nConstants, useT } from "@/hooks/useT";
import {
  CONSULTATION_HOME_SCREEN,
  CONSULTATION_HUB_ASTRO_CARD as CARD,
} from "@/lib/constants/consultation-home";
import { CONSULTATION_LISTING_SCREEN } from "@/lib/constants/consultation-listing";
import { consultationFeeForAstrologer } from "@/lib/consultation-currency";
import {
  consultationAstrologerInitials,
  consultationAstrologerName,
  consultationAstrologerPublicProfileUrl,
  formatConsultationLanguageList,
} from "@/lib/consultation-display";
import type { ConsultationHubAstroCardProps } from "@/types/ui/consultation-home";

export function ConsultationHubAstroCard({
  astrologer,
  currency,
  href,
}: ConsultationHubAstroCardProps) {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);
  const CL = useI18nConstants(CONSULTATION_LISTING_SCREEN);
  const { t } = useT();
  const router = useRouter();
  const name = consultationAstrologerName(astrologer.user, t);
  const fee = consultationFeeForAstrologer(astrologer, currency);
  const unit = currency === "INR" ? "₹" : "$";
  const amount = Math.round(fee).toLocaleString("en-IN");
  const experience = astrologer.experience;
  const publicProfileUrl = consultationAstrologerPublicProfileUrl(astrologer);
  /** Same destination as “view all reviews”. */
  const profileHref = publicProfileUrl ?? href;
  const profileOpenExternal = Boolean(publicProfileUrl);
  const openAria = CH.openAstrologerAria.replace("{name}", name);

  function openProfile() {
    if (profileOpenExternal) {
      window.open(profileHref, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(profileHref);
  }

  return (
    <article
      className={CARD.root}
      role="link"
      tabIndex={0}
      aria-label={openAria}
      onClick={openProfile}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProfile();
        }
      }}
    >
      <div className={CARD.content}>
        <div className={CARD.headerRow}>
          <div className={CARD.avatarWrap}>
            <div className={CARD.avatar}>
              {astrologer.picture ? (
                <Image
                  src={astrologer.picture}
                  alt=""
                  width={48}
                  height={48}
                  unoptimized
                  className={CARD.avatarImage}
                />
              ) : (
                <span className={CARD.avatarInitials}>
                  {consultationAstrologerInitials(astrologer.user)}
                </span>
              )}
            </div>
            <span className={CARD.onlineDot} aria-hidden />
          </div>
          <div className={CARD.headerMain}>
            <div className={CARD.nameRow}>
              <p className={CARD.name}>{name}</p>
              <span className={CARD.verifiedIcon} aria-hidden>
                <span className={CARD.verifiedBadge}>
                  <span className={CARD.verifiedGlyph}>✓</span>
                </span>
              </span>
            </div>
            <p className={CARD.langs}>
              {formatConsultationLanguageList(astrologer.languages)}
            </p>
          </div>
        </div>

        <div className={CARD.statsRow}>
          <div className={CARD.statCell}>
            <p className={CARD.reviewsLabel}>{CH.reviewsLabel}</p>
            {profileOpenExternal ? (
              <a
                href={profileHref}
                target="_blank"
                rel="noopener noreferrer"
                className={CARD.viewReviews}
                onClick={(e) => e.stopPropagation()}
              >
                {CH.viewAllReviews}
              </a>
            ) : (
              <Link
                href={profileHref}
                className={CARD.viewReviews}
                onClick={(e) => e.stopPropagation()}
              >
                {CH.viewAllReviews}
              </Link>
            )}
          </div>
          <div className={CARD.statCell}>
            <p className={CARD.experienceValue}>
              {experience != null
                ? `${experience} ${CH.experienceYearsSuffix}`
                : CH.ratingFallback}
            </p>
            <p className={CARD.experienceLabel}>{CH.experienceLabel}</p>
          </div>
        </div>

        <div className={CARD.footerRow}>
          <div className={CARD.priceRow}>
            <span className={CARD.priceMain}>
              {unit}
              {amount}
            </span>
            <span className={CARD.priceSuffix}>{CL.perSession}</span>
          </div>
          <Link
            href={href}
            className={CARD.bookBtn}
            onClick={(e) => e.stopPropagation()}
          >
            {CH.bookCta} {CH.bookCtaArrow}
          </Link>
        </div>
      </div>
    </article>
  );
}
