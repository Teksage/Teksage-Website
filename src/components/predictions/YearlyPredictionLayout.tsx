"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { YearlyCategorizedRow } from "@/components/predictions/YearlyCategorizedRow";
import { YearlyDashedDivider } from "@/components/predictions/YearlyDashedDivider";
import { YearlyPlanetTransitsRow } from "@/components/predictions/YearlyPlanetTransitsRow";
import { YearlyRemediesRow } from "@/components/predictions/YearlyRemediesRow";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { ROUTES } from "@/lib/constants/routes";
import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { YEARLY_CARD_UI } from "@/lib/constants/yearly-prediction-card-ui";
import { YEARLY_DETAIL_LAYOUT } from "@/lib/constants/yearly-prediction-detail-layout";
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
  const YD = useI18nConstants(YEARLY_DETAIL_SCREEN);
  const L = YEARLY_DETAIL_LAYOUT;

  return (
    <div className={L.pageRoot}>
      <div className={L.headerBar}>
        <button type="button" onClick={onBackClick} className="p-2" aria-label="Go back">
          <img src={YEARLY_PREDICTION_ASSETS.appBarBack} alt="" className="h-5 w-5" />
        </button>
        <div className="pointer-events-none flex justify-center">
          <img src={YEARLY_PREDICTION_ASSETS.decoLogo} alt="" className="size-14 lg:size-16" />
        </div>
        <span className="size-9" aria-hidden />
      </div>

      <div className={L.content}>
        <div className={YEARLY_CARD_UI.introBlock}>
          <h1 className={YEARLY_CARD_UI.introTitle}>{YD.title}</h1>
          {data.general.trim() ? (
            <div className={YEARLY_CARD_UI.generalPanel}>
              <p className={YEARLY_CARD_UI.generalText}>{data.general}</p>
            </div>
          ) : null}
          <div className="mt-6">
            <YearlyDashedDivider />
          </div>
        </div>

        <section className="mt-8 space-y-6">
          <YearlySectionTitle>{YD.planetaryTransits}</YearlySectionTitle>
          <YearlyPlanetTransitsRow transits={data.planetTransits} />
        </section>

        <section className="mt-10 space-y-6">
          <YearlyDashedDivider />
          <YearlySectionTitle>{YD.categorizedPredictions}</YearlySectionTitle>
          <YearlyCategorizedRow prediction={data.prediction} />
        </section>

        <section className="mt-10 space-y-6">
          <YearlyDashedDivider />
          <YearlySectionTitle>{YD.remedies}</YearlySectionTitle>
          <YearlyRemediesRow remedies={data.remedies} />
        </section>

        <div className={L.ctaColumn}>
          <button
            type="button"
            disabled={regenerating}
            onClick={onRegenerate}
            className={cn(
              PREDICTION_DESKTOP_LAYOUT.detailCtaButton,
              "text-[var(--color-yearly-prediction-button-text)] disabled:opacity-70"
            )}
          >
            {regenerating ? YD.regenerating : YD.regenerateCta}
          </button>
          <Link
            href={ROUTES.consultation}
            className={cn(
              PREDICTION_DESKTOP_LAYOUT.detailCtaButton,
              "text-[var(--color-yearly-prediction-button-text)]"
            )}
          >
            {YD.consultCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
