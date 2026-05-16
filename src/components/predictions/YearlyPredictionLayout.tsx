"use client";

import Link from "next/link";
import { YearlyCategorizedRow } from "@/components/predictions/YearlyCategorizedRow";
import { YearlyDashedDivider } from "@/components/predictions/YearlyDashedDivider";
import { YearlyPlanetTransitsRow } from "@/components/predictions/YearlyPlanetTransitsRow";
import { YearlyRemediesRow } from "@/components/predictions/YearlyRemediesRow";
import { ROUTES } from "@/lib/constants/routes";
import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { YEARLY_DETAIL_SCREEN } from "@/lib/constants/yearly-prediction-screen";
import { cn } from "@/lib/utils";
import type { YearlyPredictionDetail } from "@/types/prediction-yearly";

function YearlySectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-center text-2xl font-bold text-white">{children}</h2>
  );
}

export function YearlyPredictionLayout({
  data,
  onBackClick,
  onRegenerate,
  regenerating,
}: {
  data: YearlyPredictionDetail;
  onBackClick: () => void;
  onRegenerate: () => void;
  regenerating: boolean;
}) {
  const showInfo = Boolean(data.general.trim());

  return (
    <div className="min-h-dvh w-full min-w-0 pb-[var(--main-bottom-nav-clearance)] lg:pb-14">
      <div
        className={cn(
          PREDICTION_DESKTOP_LAYOUT.contentColumn,
          PREDICTION_DESKTOP_LAYOUT.contentGutter,
          "pb-14"
        )}
      >
        <div className="relative pt-6 lg:pt-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center px-1">
            <button type="button" onClick={onBackClick} className="p-2" aria-label="Go back">
              <img src={YEARLY_PREDICTION_ASSETS.appBarBack} alt="" className="h-5 w-5" />
            </button>
            <div className="pointer-events-none flex justify-center">
              <img src={YEARLY_PREDICTION_ASSETS.decoLogo} alt="" className="size-14 lg:size-16" />
            </div>
            <span className="size-9" aria-hidden />
          </div>
        </div>

        <div className="px-5 pt-2 text-center text-white">
          <h1 className="flex items-center justify-center gap-2 text-xl font-bold">
            {YEARLY_DETAIL_SCREEN.title}
            {showInfo ? (
              <button
                type="button"
                title={YEARLY_DETAIL_SCREEN.infoTooltip}
                aria-label={YEARLY_DETAIL_SCREEN.infoTooltip}
              >
                <img
                  src={YEARLY_PREDICTION_ASSETS.toolTip}
                  alt=""
                  className="size-5 brightness-0 invert"
                />
              </button>
            ) : null}
          </h1>
          <p className="mt-3 text-base font-medium leading-relaxed">{data.general}</p>
          <div className="mt-6">
            <YearlyDashedDivider />
          </div>
        </div>

        <section className="mt-8 space-y-6">
          <YearlySectionTitle>{YEARLY_DETAIL_SCREEN.planetaryTransits}</YearlySectionTitle>
          <YearlyPlanetTransitsRow transits={data.planetTransits} />
        </section>

        <section className="mt-10 space-y-6 px-5">
          <YearlyDashedDivider />
          <YearlySectionTitle>{YEARLY_DETAIL_SCREEN.categorizedPredictions}</YearlySectionTitle>
          <YearlyCategorizedRow prediction={data.prediction} />
        </section>

        <section className="mt-10 space-y-6 px-5">
          <YearlyDashedDivider />
          <YearlySectionTitle>{YEARLY_DETAIL_SCREEN.remedies}</YearlySectionTitle>
          <YearlyRemediesRow remedies={data.remedies} />
        </section>

        <div className={cn("mt-10", PREDICTION_DESKTOP_LAYOUT.stackedCtaColumn)}>
          <button
            type="button"
            disabled={regenerating}
            onClick={onRegenerate}
            className={cn(
              PREDICTION_DESKTOP_LAYOUT.detailCtaButton,
              "text-[var(--color-yearly-prediction-button-text)] disabled:opacity-70"
            )}
          >
            {regenerating ? YEARLY_DETAIL_SCREEN.regenerating : YEARLY_DETAIL_SCREEN.regenerateCta}
          </button>
          <Link
            href={ROUTES.consultation}
            className={cn(
              PREDICTION_DESKTOP_LAYOUT.detailCtaButton,
              "text-[var(--color-yearly-prediction-button-text)]"
            )}
          >
            {YEARLY_DETAIL_SCREEN.consultCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
