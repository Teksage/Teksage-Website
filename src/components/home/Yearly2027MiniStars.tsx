"use client";

import { YEARLY_2027_PROMO_UI as UI } from "@/lib/constants/yearly-2027-promo-ui";
import { cn } from "@/lib/utils";

/** Tiny SVG star row for banner score cards — stays within the reference tile footprint. */
export function Yearly2027MiniStars({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  const clamped = Math.min(5, Math.max(0, Math.round(score)));

  return (
    <span className={cn(UI.miniStars, className)} aria-label={`${clamped} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className={cn(UI.miniStar, i < clamped ? UI.miniStarOn : UI.miniStarOff)}
          aria-hidden
          fill="currentColor"
        >
          <path d="M6 1.05l1.25 2.95 3.2.28-2.45 2.15.75 3.1L6 7.95 3.25 9.53l.75-3.1L1.55 4.28l3.2-.28L6 1.05z" />
        </svg>
      ))}
    </span>
  );
}
