"use client";

import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { FH_TABLE } from "@/lib/constants/horoscope-full-table-ui";

export function FullHoroscopeTablePlaceholder({
  section,
}: {
  section: { isLoading: boolean; error: string | null };
}) {
  if (section.isLoading) {
    return <p className={FH_TABLE.placeholder}>{HOROSCOPE_SCREEN.loadingLabel}</p>;
  }
  if (section.error) {
    return <p className={FH_TABLE.placeholder}>{section.error}</p>;
  }
  return <p className={FH_TABLE.placeholder}>{HOROSCOPE_SCREEN.errorLoadLabel}</p>;
}
