"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { Yearly2027StarIcon } from "@/components/home/Yearly2027StarIcon";
import { YEARLY_2027_PROMO } from "@/lib/constants/yearly-2027-promo";
import { YEARLY_2027_PROMO_UI as UI } from "@/lib/constants/yearly-2027-promo-ui";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import type { Yearly2027HeaderChipProps } from "@/types/yearly-2027-promo";

/** Desktop header chip — white pill + gold star + NEW (reference design). */
export function Yearly2027HeaderChip({ className }: Yearly2027HeaderChipProps) {
  const copy = useI18nConstants(YEARLY_2027_PROMO);
  const { guardNavigation } = useAuthNavigation();

  return (
    <div className={cn(UI.headerChipWrap, className)}>
      <span className={UI.headerSparkles} aria-hidden>
        <span className={cn(UI.headerSparkle, "text-[0.55rem]")}>✦</span>
        <span className={cn(UI.headerSparkle, "text-[0.7rem]")}>✧</span>
        <span className={cn(UI.headerSparkle, "text-[0.5rem]")}>✦</span>
      </span>
      <button
        type="button"
        onClick={() =>
          guardNavigation(ROUTES.predictionsYearly, { redirectHomeOnClose: true })
        }
        className={UI.headerChip}
      >
        <Yearly2027StarIcon />
        <span className={UI.headerChipLabel}>{copy.headerChip}</span>
        <span className={UI.newBadge}>{copy.newBadge}</span>
      </button>
    </div>
  );
}
