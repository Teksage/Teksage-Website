"use client";

import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useI18nConstants } from "@/hooks/useT";
import { DailyPredictionBalaPanel } from "@/components/predictions/DailyPredictionBalaPanel";
import { DailyPredictionConsultStrip } from "@/components/predictions/DailyPredictionConsultStrip";
// import { DailyPredictionPdfRow } from "@/components/predictions/DailyPredictionConsultStrip";
import { DailyPredictionDesktopCategoryCard } from "@/components/predictions/DailyPredictionDesktopCategoryCard";
import { DAILY_PREDICTION_ASSETS } from "@/lib/constants";
import { PREDICTION_DETAIL_SCREEN } from "@/lib/constants/prediction-detail-screen";
import { formatHomeDashboardDate, cn } from "@/lib/utils";
import type { DailyPredictionDetail } from "@/types/prediction-detail";

export function DailyPredictionDesktopLayout({
  data,
  pageTitle,
  onBackClick,
}: {
  data: DailyPredictionDetail;
  pageTitle: string;
  onBackClick: () => void;
}) {
  const PD = useI18nConstants(PREDICTION_DETAIL_SCREEN);
  const { locale } = useAppLanguage();
  const dateLine = formatHomeDashboardDate(new Date(), locale);
  const showBala = data.tharaBala || data.chandraBala || data.cautious;
  const summary = data.quote?.trim();

  return (
    <div className="pb-10">
      <header
        className="relative min-h-[210px] overflow-hidden pb-20 sm:min-h-[250px] sm:pb-32"
        aria-label={pageTitle}
      >
        <img
          src={DAILY_PREDICTION_ASSETS.topBg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-3 sm:px-8 sm:pt-4">
          <div className="flex min-h-[44px] items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onBackClick}
              className="flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              aria-label="Go back"
            >
              <img
                src={DAILY_PREDICTION_ASSETS.appBarBack}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </button>
            <h1 className="min-w-0 flex-1 truncate text-center text-lg font-bold text-white sm:text-xl">
              {pageTitle}
            </h1>
            <span className="size-10 shrink-0 sm:w-[38px]" aria-hidden />
          </div>
          <p className="mt-4 text-center text-base font-semibold text-white sm:mt-5 sm:text-lg">
            {dateLine}
          </p>
        </div>
      </header>

      <div
        className={cn(
          "relative z-20 mx-auto max-w-6xl px-4 sm:px-8",
          showBala ? "-mt-14 sm:-mt-24" : "-mt-10 sm:-mt-12"
        )}
      >
        {showBala ? (
          <DailyPredictionBalaPanel
            tharaBala={data.tharaBala}
            chandraBala={data.chandraBala}
            cautious={data.cautious}
          />
        ) : null}

        {summary ? (
          <p className="mx-auto mt-6 max-w-3xl px-1 text-center text-sm font-medium text-neutral-700 sm:mt-10 sm:text-base">
            {summary}
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
          <DailyPredictionDesktopCategoryCard
            variant="career"
            title={PD.sectionCareer}
            items={data.career}
          />
          <DailyPredictionDesktopCategoryCard
            variant="relationship"
            title={PD.sectionRelationship}
            items={data.relationship}
          />
          <DailyPredictionDesktopCategoryCard
            variant="wealth"
            title={PD.sectionWealth}
            items={data.wealth}
          />
          <DailyPredictionDesktopCategoryCard
            variant="health"
            title={PD.sectionHealth}
            items={data.health}
          />
        </div>

        {/* Download PDF — disabled for now; re-enable via DailyPredictionPdfRow when ready. */}
        <DailyPredictionConsultStrip />
      </div>
    </div>
  );
}
