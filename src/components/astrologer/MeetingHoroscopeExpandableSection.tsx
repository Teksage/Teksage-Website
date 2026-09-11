"use client";

import { useState } from "react";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import {
  MEETING_HOROSCOPE_PREVIEW,
  MEETING_HOROSCOPE_UI,
} from "@/lib/constants/meeting-horoscope-ui";
import type { MeetingHoroscopeExpandableSectionProps } from "@/types/ui/astrologer-portal";

function previewText(value: string): string {
  const limit = MEETING_HOROSCOPE_PREVIEW.textChars;
  if (value.length <= limit) return value;
  const slice = value.slice(0, limit);
  const breakAt = slice.lastIndexOf(" ");
  return `${(breakAt > 80 ? slice.slice(0, breakAt) : slice).trimEnd()}…`;
}

/** Narrative / period block with Show more for long customer horoscope fields. */
export function MeetingHoroscopeExpandableSection({
  fieldKey,
  label,
  value,
  periods,
}: MeetingHoroscopeExpandableSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const U = MEETING_HOROSCOPE_UI;
  const copy = ASTRO_PORTAL_UI.detail;
  const previewCount = MEETING_HOROSCOPE_PREVIEW.periodCount;

  const canExpandPeriods = Boolean(periods && periods.length > previewCount);
  const canExpandText = !periods && value.length > MEETING_HOROSCOPE_PREVIEW.textChars;
  const canExpand = canExpandPeriods || canExpandText;

  const visiblePeriods =
    periods && !expanded && canExpandPeriods
      ? periods.slice(0, previewCount)
      : periods;

  return (
    <article className={U.sectionCard}>
      <p className={U.sectionLabel}>{label}</p>
      {visiblePeriods ? (
        <ul className={U.periodList}>
          {visiblePeriods.map((line, index) => (
            <li key={`${fieldKey}-${index}`} className={U.periodItem}>
              {line}
            </li>
          ))}
        </ul>
      ) : (
        <p className={U.sectionBody}>
          {expanded || !canExpandText ? value : previewText(value)}
        </p>
      )}
      {canExpand ? (
        <button
          type="button"
          className={U.expandBtn}
          aria-expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? copy.horoscopeShowLess : copy.horoscopeShowMore}
        </button>
      ) : null}
    </article>
  );
}
