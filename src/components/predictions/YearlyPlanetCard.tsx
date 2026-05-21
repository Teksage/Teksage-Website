"use client";

import { useI18nConstants } from "@/hooks/useT";
import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import {
  YEARLY_DETAIL_SCREEN,
  type YearlyPlanetKey,
} from "@/lib/constants/yearly-prediction-screen";
import { cn } from "@/lib/utils";
import type { YearlyPlanetDetails } from "@/types/prediction-yearly";

export function YearlyPlanetCard({
  planetKey,
  label,
  details,
}: {
  planetKey: YearlyPlanetKey;
  label: string;
  details: YearlyPlanetDetails;
}) {
  const YD = useI18nConstants(YEARLY_DETAIL_SCREEN);
  const year = details.year || new Date().getFullYear().toString();
  const icon = YEARLY_PREDICTION_ASSETS.planets[planetKey];

  return (
    <article
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[1.125rem] bg-[var(--color-yearly-card-bg)]",
        PREDICTION_DESKTOP_LAYOUT.horizontalCardWidth
      )}
    >
      <img
        src={YEARLY_PREDICTION_ASSETS.cardDeco}
        alt=""
        className="pointer-events-none absolute right-0 top-0 w-[50%] object-contain"
      />
      <div className="relative px-5 py-8">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-card-title font-bold leading-tight text-[var(--color-brand-black)]">
            {label}
          </h3>
          <img src={icon} alt="" className="size-10 shrink-0" />
        </div>
        <p className="mt-3 text-base leading-snug text-black/80">
          {YD.firstHalfPrefix} {year}:
          <br />
          {details.beforeDetails}
        </p>
        {details.afterDetails ? (
          <p className="mt-6 text-base leading-snug text-black/80">
            {YD.secondHalfPrefix} {year}:
            <br />
            {details.afterDetails}
          </p>
        ) : null}
      </div>
    </article>
  );
}
