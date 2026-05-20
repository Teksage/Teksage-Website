"use client";

import Image from "next/image";
import {
  CONSULTATION_DETAIL_ASSETS,
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
} from "@/lib/constants/consultation-detail";
import {
  consultationAstrologerName,
  formatConsultationLanguageList,
} from "@/lib/consultation-display";
import { consultationFeeForAstrologer } from "@/lib/consultation-currency";
import type { ConsultationAstrologer } from "@/types/consultation";

type ConsultationDetailProfileCardProps = {
  astrologer: ConsultationAstrologer;
  currency: "INR" | "USD";
};

export function ConsultationDetailProfileCard({
  astrologer,
  currency,
}: ConsultationDetailProfileCardProps) {
  const fee = consultationFeeForAstrologer(astrologer, currency);
  const unit = currency === "INR" ? "₹" : "$";
  const amount =
    currency === "INR" ? fee.toFixed(2) : fee.toFixed(2);
  const name = consultationAstrologerName(astrologer.user);

  return (
    <article className={CONSULTATION_DETAIL_LAYOUT.profileCard}>
      <div className={CONSULTATION_DETAIL_LAYOUT.avatarWrap}>
        {astrologer.picture ? (
          <Image
            src={astrologer.picture}
            alt=""
            width={120}
            height={120}
            unoptimized
            className="size-full object-cover"
          />
        ) : (
          <Image
            src={CONSULTATION_DETAIL_ASSETS.dummyAvatar}
            alt=""
            width={60}
            height={60}
            unoptimized
            className="m-auto"
          />
        )}
      </div>
      <h2 className={CONSULTATION_DETAIL_LAYOUT.name}>{name}</h2>
      <div className={CONSULTATION_DETAIL_LAYOUT.langRow}>
        <Image
          src={CONSULTATION_DETAIL_ASSETS.languageIcon}
          alt=""
          width={18}
          height={18}
          unoptimized
          aria-hidden
        />
        <span className={CONSULTATION_DETAIL_LAYOUT.langText}>
          {formatConsultationLanguageList(astrologer.languages)}
        </span>
      </div>
      <Image
        src={CONSULTATION_DETAIL_ASSETS.dashedLine}
        alt=""
        width={280}
        height={4}
        unoptimized
        className={CONSULTATION_DETAIL_LAYOUT.dashed}
        aria-hidden
      />
      <p>
        <span className={CONSULTATION_DETAIL_LAYOUT.priceMain}>
          {unit}
          {amount}
        </span>
        <span className={CONSULTATION_DETAIL_LAYOUT.priceSuffix}>
          {CONSULTATION_DETAIL_SCREEN.perSession}
        </span>
      </p>
      <Image
        src={CONSULTATION_DETAIL_ASSETS.dashedLine}
        alt=""
        width={280}
        height={4}
        unoptimized
        className={CONSULTATION_DETAIL_LAYOUT.dashed}
        aria-hidden
      />
      {astrologer.experience != null ? (
        <div className={CONSULTATION_DETAIL_LAYOUT.expRow}>
          <Image
            src={CONSULTATION_DETAIL_ASSETS.workIcon}
            alt=""
            width={20}
            height={20}
            unoptimized
            aria-hidden
          />
          <span className={CONSULTATION_DETAIL_LAYOUT.expText}>
            {CONSULTATION_DETAIL_SCREEN.experienceLabel} - {astrologer.experience}{" "}
            {CONSULTATION_DETAIL_SCREEN.experienceYears}
          </span>
        </div>
      ) : null}
    </article>
  );
}
