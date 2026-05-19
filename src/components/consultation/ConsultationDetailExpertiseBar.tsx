"use client";

import { CONSULTATION_DETAIL_LAYOUT } from "@/lib/constants/consultation-detail";
import { formatConsultationCategoryLabel } from "@/lib/consultation-display";

type ConsultationDetailExpertiseBarProps = {
  expertise: string[];
};

export function ConsultationDetailExpertiseBar({
  expertise,
}: ConsultationDetailExpertiseBarProps) {
  if (!expertise.length) return null;

  return (
    <p className={CONSULTATION_DETAIL_LAYOUT.expertiseBar}>
      {expertise.map((item, index) => (
        <span key={item}>
          {index > 0 ? <span className={CONSULTATION_DETAIL_LAYOUT.expertiseSep} /> : null}
          {formatConsultationCategoryLabel(item)}
        </span>
      ))}
    </p>
  );
}
