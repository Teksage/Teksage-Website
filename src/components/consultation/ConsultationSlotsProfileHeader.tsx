"use client";

import Image from "next/image";
import { CONSULTATION_SLOTS_LAYOUT } from "@/lib/constants/consultation-slots";
import { formatConsultationLanguageList } from "@/lib/consultation-display";
import type { ConsultationSlotsHeaderProps } from "@/types/ui/consultation";

export function ConsultationSlotsProfileHeader({
  name,
  initials,
  picture,
  rating,
  reviewCount,
  languages,
  feeLabel,
}: ConsultationSlotsHeaderProps) {
  const langLine = formatConsultationLanguageList(languages);
  const ratingPart =
    rating != null
      ? `${rating.toFixed(1)}${reviewCount != null && reviewCount > 0 ? ` (${reviewCount.toLocaleString()})` : ""}`
      : "";
  const meta = [ratingPart, langLine || null, feeLabel].filter(Boolean).join(" · ");

  return (
    <div className={CONSULTATION_SLOTS_LAYOUT.headerProfile}>
      <div className={CONSULTATION_SLOTS_LAYOUT.headerAvatarWrap}>
        {picture ? (
          <Image
            src={picture}
            alt=""
            width={48}
            height={48}
            unoptimized
            className={CONSULTATION_SLOTS_LAYOUT.headerAvatarImage}
          />
        ) : (
          <span className={CONSULTATION_SLOTS_LAYOUT.headerAvatarInitials}>
            {initials}
          </span>
        )}
      </div>
      <div className={CONSULTATION_SLOTS_LAYOUT.headerMain}>
        <p className={CONSULTATION_SLOTS_LAYOUT.headerTitle}>{name}</p>
        {meta ? (
          <p className={CONSULTATION_SLOTS_LAYOUT.headerSub}>
            {rating != null ? (
              <span className={CONSULTATION_SLOTS_LAYOUT.headerStar} aria-hidden>
                ★{" "}
              </span>
            ) : null}
            {meta}
          </p>
        ) : null}
      </div>
    </div>
  );
}
