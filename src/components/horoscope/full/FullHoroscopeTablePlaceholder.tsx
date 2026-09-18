"use client";

import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { FH_TABLE } from "@/lib/constants/horoscope-full-table-ui";
import { useI18nConstants } from "@/hooks/useT";

export function FullHoroscopeTablePlaceholder({
  section,
}: {
  section: { isLoading: boolean; error: string | null };
}) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  if (section.isLoading) {
    return null;
  }
  return <p className={FH_TABLE.placeholder}>{H.errorLoadLabel}</p>;
}
