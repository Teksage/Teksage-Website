"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  YEARLY_2027_PROMO,
  YEARLY_2027_SCORE_ORDER,
} from "@/lib/constants/yearly-2027-promo";
import { YEARLY_2027_SHEET_UI as UI } from "@/lib/constants/yearly-2027-sheet-ui";
import { cn } from "@/lib/utils";
import type { Yearly2027Scores } from "@/types/yearly-2027-promo";

const LABEL_KEY = {
  career: "career",
  relationship: "relationship",
  finance: "finance",
  health: "health",
} as const;

function SheetStars({ score }: { score: number }) {
  const clamped = Math.min(5, Math.max(0, Math.round(score)));
  return (
    <span className={UI.scoreStars} aria-label={`${clamped} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className={cn(UI.scoreStar, i < clamped ? UI.scoreStarOn : UI.scoreStarOff)}
          aria-hidden
          fill="currentColor"
        >
          <path d="M6 1.05l1.25 2.95 3.2.28-2.45 2.15.75 3.1L6 7.95 3.25 9.53l.75-3.1L1.55 4.28l3.2-.28L6 1.05z" />
        </svg>
      ))}
    </span>
  );
}

/** Vertical one-by-one score rows for the compact promo sheet. */
export function Yearly2027SheetScoreGrid({
  scores,
}: {
  scores: Yearly2027Scores;
}) {
  const copy = useI18nConstants(YEARLY_2027_PROMO);

  return (
    <ul className={UI.scoreList}>
      {YEARLY_2027_SCORE_ORDER.map((key, index) => (
        <li
          key={key}
          className={cn(
            UI.scoreItem,
            index < YEARLY_2027_SCORE_ORDER.length - 1 && UI.scoreItemDivider,
          )}
        >
          <span className={UI.scoreLabel}>{copy[LABEL_KEY[key]]}</span>
          <SheetStars score={scores[key]} />
        </li>
      ))}
    </ul>
  );
}
