import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import {
  YEARLY_DETAIL_SCREEN,
  YEARLY_LAYOUT,
  type YearlyPlanetKey,
} from "@/lib/constants/yearly-prediction-screen";
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
  const year = details.year || new Date().getFullYear().toString();
  const icon = YEARLY_PREDICTION_ASSETS.planets[planetKey];

  return (
    <article
      className="relative shrink-0 overflow-hidden rounded-[1.125rem] bg-[var(--color-yearly-card-bg)]"
      style={{ width: YEARLY_LAYOUT.horizontalCardWidth }}
    >
      <img
        src={YEARLY_PREDICTION_ASSETS.cardDeco}
        alt=""
        className="pointer-events-none absolute right-0 top-0 w-[50%] object-contain"
      />
      <div className="relative px-5 py-8">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.375rem] font-bold leading-tight text-[var(--color-brand-black)]">
            {label}
          </h3>
          <img src={icon} alt="" className="size-10 shrink-0" />
        </div>
        <p className="mt-3 text-base leading-snug text-black/80">
          {YEARLY_DETAIL_SCREEN.firstHalfPrefix} {year}:
          <br />
          {details.beforeDetails}
        </p>
        {details.afterDetails ? (
          <p className="mt-6 text-base leading-snug text-black/80">
            {YEARLY_DETAIL_SCREEN.secondHalfPrefix} {year}:
            <br />
            {details.afterDetails}
          </p>
        ) : null}
      </div>
    </article>
  );
}
