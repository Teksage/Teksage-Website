"use client";

import { useI18nConstants } from "@/hooks/useT";
import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { YEARLY_CARD_UI } from "@/lib/constants/yearly-prediction-card-ui";
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
  const C = YEARLY_CARD_UI;
  const year = details.year || new Date().getFullYear().toString();
  const icon = YEARLY_PREDICTION_ASSETS.planets[planetKey];

  return (
    <article
      className={cn(
        C.surface,
        C.surfaceMint,
        PREDICTION_DESKTOP_LAYOUT.horizontalCardWidth
      )}
    >
      <img src={YEARLY_PREDICTION_ASSETS.cardDeco} alt="" className={C.deco} />
      <div className={C.body}>
        <div className={C.headerRow}>
          <h3 className={C.title}>{label}</h3>
          <img src={icon} alt="" className={C.icon} />
        </div>
        <p className={C.bodyText}>
          {YD.firstHalfPrefix} {year}:
          <br />
          {details.beforeDetails}
        </p>
        {details.afterDetails ? (
          <p className={C.bodyTextSpaced}>
            {YD.secondHalfPrefix} {year}:
            <br />
            {details.afterDetails}
          </p>
        ) : null}
      </div>
    </article>
  );
}
