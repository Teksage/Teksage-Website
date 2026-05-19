"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  CONSULTATION_ASTRO_CARD,
  CONSULTATION_LISTING_ASSETS,
  CONSULTATION_LISTING_SCREEN,
} from "@/lib/constants/consultation-listing";
import { consultationFeeForAstrologer } from "@/lib/consultation-currency";
import {
  consultationAstrologerName,
  formatConsultationLanguageList,
} from "@/lib/consultation-display";
import { cn } from "@/lib/utils";
import type { ConsultationAstroCardProps } from "@/types/ui/consultation";

export function ConsultationAstroCard({
  astrologer,
  currency,
  href,
  variant,
}: ConsultationAstroCardProps) {
  const fee = consultationFeeForAstrologer(astrologer, currency);
  const unit = currency === "INR" ? "₹" : "$";
  const amount = Math.round(fee).toString();
  const match = astrologer.match_percentage ?? 0;
  const showMatch = variant === "top" && match > 0;
  const matchStyle = { "--consult-match-pct": match } as CSSProperties;

  return (
    <article
      className={cn(
        variant === "top" ? CONSULTATION_ASTRO_CARD.top : CONSULTATION_ASTRO_CARD.grid
      )}
    >
      {showMatch ? (
        <div className={CONSULTATION_ASTRO_CARD.matchRow}>
          <div className={CONSULTATION_ASTRO_CARD.matchBar}>
            <div
              className={cn("consult-match-fill h-full rounded-full bg-[var(--color-brand-primary)]")}
              style={matchStyle}
            />
          </div>
          <span className={CONSULTATION_ASTRO_CARD.matchText}>
            {match}% {CONSULTATION_LISTING_SCREEN.matchSuffix}
          </span>
        </div>
      ) : (
        <div className="h-4" />
      )}
      <div className={CONSULTATION_ASTRO_CARD.avatarWrap}>
        {astrologer.picture ? (
          <Image
            src={astrologer.picture}
            alt=""
            width={60}
            height={60}
            unoptimized
            className="size-full object-cover"
          />
        ) : (
          <Image
            src={CONSULTATION_LISTING_ASSETS.dummyAvatar}
            alt=""
            width={40}
            height={40}
            unoptimized
          />
        )}
      </div>
      <p className={cn(CONSULTATION_ASTRO_CARD.name, "mt-2")}>
        {consultationAstrologerName(astrologer.user)}
      </p>
      <p className={CONSULTATION_ASTRO_CARD.langs}>
        {formatConsultationLanguageList(astrologer.languages)}
      </p>
      <div className={cn(CONSULTATION_ASTRO_CARD.priceRow, "mt-1")}>
        <span className={CONSULTATION_ASTRO_CARD.priceUnit}>{unit}</span>
        <span className={CONSULTATION_ASTRO_CARD.priceMain}>{amount}</span>
        <span className={CONSULTATION_ASTRO_CARD.priceSuffix}>
          {CONSULTATION_LISTING_SCREEN.perSession}
        </span>
      </div>
      <Link href={href} className={cn(CONSULTATION_ASTRO_CARD.bookBtn, "mt-2 block")}>
        {CONSULTATION_LISTING_SCREEN.bookNow}
      </Link>
    </article>
  );
}
