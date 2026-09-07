"use client";

import Link from "next/link";
import { useI18nConstants } from "@/hooks/useT";
import { ChartsIcon } from "@/components/horoscope/full/FullHoroscopeIcons";
import { HOROSCOPE_FULL_UI, HOROSCOPE_SCREEN, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { HoroscopeFullEntryCardProps } from "@/types";

/** Soft entry strip to Full Horoscope — not a duplicate outline pill. */
export function HoroscopeFullEntryCard({ className }: HoroscopeFullEntryCardProps) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const U = HOROSCOPE_FULL_UI;

  return (
    <Link href={ROUTES.horoscopeFull} className={cn(U.fullEntryLink, className)}>
      <div className={U.fullEntryShell}>
        <span className={U.fullEntryIconWrap} aria-hidden>
          <ChartsIcon className={U.fullEntryIcon} />
        </span>
        <span className={U.fullEntryCopy}>
          <span className={U.fullEntryTitle}>{H.viewFullHoroscope}</span>
          <span className={U.fullEntryHint}>{H.viewFullHoroscopeHint}</span>
        </span>
        <span className={U.fullEntryCta}>
          <span className={U.fullEntryCtaLabel}>{H.viewFullHoroscopeCta}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={U.fullEntryCtaArrow}
            aria-hidden
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
