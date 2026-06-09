"use client";

import { useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useI18nConstants } from "@/hooks/useT";
import { usePredictionShare } from "@/hooks/usePredictionShare";
import { DailyPredictionBalaPanel } from "@/components/predictions/DailyPredictionBalaPanel";
import { DailyPredictionConsultStrip } from "@/components/predictions/DailyPredictionConsultStrip";
import { DailyPredictionDesktopCategoryCard } from "@/components/predictions/DailyPredictionDesktopCategoryCard";
import { PredictionShareButton } from "@/components/predictions/PredictionShareButton";
import { PredictionShareSheet } from "@/components/predictions/PredictionShareSheet";
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
  const { sharing, loadingLabel, error, success, shareReady, prepareShare, confirmShare, resetShare } =
    usePredictionShare();
  const [shareOpen, setShareOpen] = useState(false);

  function openShareSheet() {
    resetShare();
    setShareOpen(true);
  }

  function closeShareSheet() {
    setShareOpen(false);
    resetShare();
  }

  function handlePrepareShare() {
    if (data.predictionId == null) return;
    void prepareShare("daily", data.predictionId);
  }
  const dateLine = formatHomeDashboardDate(new Date(), locale);
  const showBala = data.tharaBala || data.chandraBala || data.cautious;
  const summary = data.quote?.trim();
  const canShare = data.predictionId != null;

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
            <PredictionShareButton
              disabled={!canShare}
              onClick={openShareSheet}
              className="brightness-0 invert hover:bg-white/10"
            />
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
            cautiousIsPositiveDay={data.cautiousIsPositiveDay}
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

        <DailyPredictionConsultStrip />
        {error && !shareOpen ? (
          <p className="mt-3 text-center text-sm text-[var(--color-brand-error)]">{error}</p>
        ) : null}
        {success && !shareOpen ? (
          <p className="mt-3 text-center text-sm text-[var(--color-brand-primary)]">{success}</p>
        ) : null}
      </div>

      {canShare && data.predictionId != null ? (
        <PredictionShareSheet
          open={shareOpen}
          sharing={sharing}
          loadingLabel={loadingLabel}
          shareReady={shareReady}
          successMessage={success}
          errorMessage={error}
          onClose={closeShareSheet}
          onPrepareShare={handlePrepareShare}
          onConfirmShare={() => void confirmShare()}
        />
      ) : null}
    </div>
  );
}
