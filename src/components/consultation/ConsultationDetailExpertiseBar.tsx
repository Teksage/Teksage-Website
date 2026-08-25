"use client";

import {
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
  CONSULTATION_EXPERTISE_DESCRIPTIONS,
  CONSULTATION_EXPERTISE_TITLES,
} from "@/lib/constants/consultation-detail";
import { formatConsultationCategoryLabel } from "@/lib/consultation-display";

type Props = {
  expertise: string[];
};

function expertiseTitle(key: string): string {
  const lower = key.toLowerCase();
  for (const [k, v] of Object.entries(CONSULTATION_EXPERTISE_TITLES)) {
    if (lower.includes(k)) return v;
  }
  return formatConsultationCategoryLabel(key);
}

function expertiseDesc(key: string): string {
  const lower = key.toLowerCase().trim();
  if (CONSULTATION_EXPERTISE_DESCRIPTIONS[lower]) {
    return CONSULTATION_EXPERTISE_DESCRIPTIONS[lower]!;
  }
  for (const [k, v] of Object.entries(CONSULTATION_EXPERTISE_DESCRIPTIONS)) {
    if (lower.includes(k) || k.includes(lower)) return v;
  }
  return CONSULTATION_DETAIL_SCREEN.defaultExpertiseDesc;
}

export function ConsultationDetailExpertiseBar({ expertise }: Props) {
  const items = expertise.filter((item) => item.trim()).slice(0, 4);
  if (!items.length) return null;

  return (
    <section className={CONSULTATION_DETAIL_LAYOUT.section}>
      <h2 className={CONSULTATION_DETAIL_LAYOUT.sectionTitle}>
        {CONSULTATION_DETAIL_SCREEN.consultsOnTitle}
      </h2>
      <div className={CONSULTATION_DETAIL_LAYOUT.expertiseGrid}>
        {items.map((item) => (
          <div key={item} className={CONSULTATION_DETAIL_LAYOUT.expertiseCard}>
            <div className={CONSULTATION_DETAIL_LAYOUT.expertiseCardInner}>
              <span
                className={CONSULTATION_DETAIL_LAYOUT.expertiseDiamond}
                aria-hidden
              />
              <div className="min-w-0">
                <p className={CONSULTATION_DETAIL_LAYOUT.expertiseCardTitle}>
                  {expertiseTitle(item.trim())}
                </p>
                <p className={CONSULTATION_DETAIL_LAYOUT.expertiseCardSub}>
                  {expertiseDesc(item)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
