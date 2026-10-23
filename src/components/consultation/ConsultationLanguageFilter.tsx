"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_HOME_LAYOUT,
  CONSULTATION_HOME_SCREEN,
} from "@/lib/constants/consultation-home";
import type { ConsultationLanguageFilterProps } from "@/types/ui/consultation-home";

export function ConsultationLanguageFilter({
  value,
  onChange,
  options,
}: ConsultationLanguageFilterProps) {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);

  return (
    <div className={CONSULTATION_HOME_LAYOUT.languageFilterRow}>
      <label
        htmlFor="consultation-language-filter"
        className={CONSULTATION_HOME_LAYOUT.languageFilterLabel}
      >
        {CH.languageFilterLabel}
      </label>
      <div className={CONSULTATION_HOME_LAYOUT.languageFilterSelectWrap}>
        <select
          id="consultation-language-filter"
          aria-label={CH.languageFilterAria}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={CONSULTATION_HOME_LAYOUT.languageFilterSelect}
        >
          <option value="">{CH.languageFilterAll}</option>
          {options.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className={CONSULTATION_HOME_LAYOUT.languageFilterChevron}
        >
          <path
            d="M5.5 7.5 10 12l4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
