"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_HOME_SCREEN,
  CONSULTATION_HUB_ASTRO_CARD as CARD,
  CONSULTATION_TOP_RATED_MIN,
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
  const name = consultationAstrologerName(astrologer.user);
  const fee = consultationFeeForAstrologer(astrologer, currency);
  const unit = currency === "INR" ? "₹" : "$";
  const amount = Math.round(fee).toLocaleString("en-IN");
  const rating = astrologer.customer_rating;
  const hasRating = rating != null && Number.isFinite(rating) && rating > 0;
  const isTopRated = hasRating && rating >= CONSULTATION_TOP_RATED_MIN;
  const experience = astrologer.experience;
  const reviewCount = astrologer.review_count;
  const publicProfileUrl = consultationAstrologerPublicProfileUrl(astrologer);
  /** Same destination as ask-answer “View profile” when a public page exists. */
  const reviewsHref = publicProfileUrl ?? href;
  const reviewsOpenExternal = Boolean(publicProfileUrl);
  const reviewsLabel =
    reviewCount != null && reviewCount > 0
      ? `${reviewCount.toLocaleString("en-IN")} ${CH.reviewsLabel}`
      : CH.reviewsLabel;

  return (
    <article className={CARD.root}>
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
        {isTopRated ? (
          <span className={CARD.topRated}>
            <span aria-hidden>★</span>
            {CH.topRatedBadge}
          </span>
        ) : null}
      </div>

      <div className={CARD.statsRow}>
        <div className={CARD.statCell}>
          <div className={CARD.ratingValueRow}>
            <span className={CARD.star} aria-hidden>
              ★
            </span>
            <span className={CARD.ratingValue}>
              {hasRating ? rating.toFixed(1) : CH.ratingFallback}
            </span>
          </div>
          {reviewsOpenExternal ? (
            <a
              href={reviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={CARD.reviewsMeta}
            >
              {reviewsLabel}
            </a>
          ) : (
            <Link href={reviewsHref} className={CARD.reviewsMeta}>
              {reviewsLabel}
            </Link>
          )}
          {reviewsOpenExternal ? (
            <a
              href={reviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={CARD.viewReviews}
            >
              {CH.viewAllReviews}
            </a>
          ) : (
            <Link href={reviewsHref} className={CARD.viewReviews}>
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
        <Link href={href} className={CARD.bookBtn}>
          {CH.bookCta} {CH.bookCtaArrow}
        </Link>
      </div>
    </article>
  );
}
