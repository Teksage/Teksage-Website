"use client";

import Image from "next/image";
import {
  CONSULTATION_LISTING_ASSETS,
  CONSULTATION_LISTING_LAYOUT,
} from "@/lib/constants/consultation-listing";
import {
  formatConsultationCategoryLabel,
  formatConsultationLanguageList,
} from "@/lib/consultation-display";
import type { ConsultationFilterChipsProps } from "@/types/ui/consultation";

export function ConsultationFilterChips({
  categories,
  languages,
  onRemoveCategory,
  onRemoveLanguage,
}: ConsultationFilterChipsProps) {
  return (
    <div className={CONSULTATION_LISTING_LAYOUT.chipRow}>
      {categories.map((category) => (
        <span key={`c-${category}`} className={CONSULTATION_LISTING_LAYOUT.chip}>
          {formatConsultationCategoryLabel(category)}
          <button
            type="button"
            aria-label="Remove category"
            onClick={() => onRemoveCategory(category)}
            className="p-0.5"
          >
            <Image
              src={CONSULTATION_LISTING_ASSETS.chipClose}
              alt=""
              width={14}
              height={14}
              unoptimized
            />
          </button>
        </span>
      ))}
      {languages.map((language) => (
        <span key={`l-${language}`} className={CONSULTATION_LISTING_LAYOUT.chip}>
          {formatConsultationLanguageList([language])}
          <button
            type="button"
            aria-label="Remove language"
            onClick={() => onRemoveLanguage(language)}
            className="p-0.5"
          >
            <Image
              src={CONSULTATION_LISTING_ASSETS.chipClose}
              alt=""
              width={14}
              height={14}
              unoptimized
            />
          </button>
        </span>
      ))}
    </div>
  );
}
