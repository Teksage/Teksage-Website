"use client";

import Link from "next/link";
import { LifePredictionCardSwiper } from "@/components/predictions/LifePredictionCardSwiper";
import { LifePredictionDesktopGrid } from "@/components/predictions/LifePredictionDesktopGrid";
import { LIFE_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { LIFE_DETAIL_SCREEN } from "@/lib/constants/prediction-screen-copy";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import type { StructuredPredictionDetail } from "@/types/prediction-detail";

export function LifePredictionLayout({
  data,
  onBackClick,
}: {
  data: StructuredPredictionDetail;
  onBackClick: () => void;
}) {
  return (
    <div className="min-h-dvh pb-[var(--main-bottom-nav-clearance)] lg:pb-14">
      <div className={cn(PREDICTION_DESKTOP_LAYOUT.contentColumn, PREDICTION_DESKTOP_LAYOUT.contentGutter)}>
        <div className="relative pt-6 lg:pt-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center">
            <button type="button" onClick={onBackClick} className="p-2" aria-label="Go back">
              <img
                src={LIFE_PREDICTION_ASSETS.appBarBack}
                alt=""
                className="h-5 w-5 brightness-0 invert"
              />
            </button>
            <div className="flex justify-center">
              <img src={LIFE_PREDICTION_ASSETS.decoLogo} alt="" className="size-14 lg:size-16" />
            </div>
            <span className="size-9" aria-hidden />
          </div>
        </div>
        <div className="text-center text-white">
          <h1 className="flex items-center justify-center gap-2 text-xl font-bold lg:text-2xl">
            Life Predictions
            <button
              type="button"
              title={LIFE_DETAIL_SCREEN.infoTooltip}
              aria-label={LIFE_DETAIL_SCREEN.infoTooltip}
            >
              <img
                src={LIFE_PREDICTION_ASSETS.toolTip}
                alt=""
                className="size-5 brightness-0 invert"
              />
            </button>
          </h1>
          <p className="mt-3 text-base leading-relaxed lg:mx-auto lg:max-w-2xl lg:text-lg">
            {LIFE_DETAIL_SCREEN.intro}
          </p>
        </div>
        <div className="mt-6 lg:hidden">
          <LifePredictionCardSwiper sections={data.sections} />
        </div>
        <div className="mt-6 hidden lg:block">
          <LifePredictionDesktopGrid sections={data.sections} />
        </div>
        <div className={cn("mt-8 lg:mt-10", PREDICTION_DESKTOP_LAYOUT.stackedCtaColumn)}>
          <Link
            href={ROUTES.consultation}
            className={cn(
              PREDICTION_DESKTOP_LAYOUT.detailCtaButton,
              "bg-white/30 text-[var(--color-life-prediction-button-text)]"
            )}
          >
            {LIFE_DETAIL_SCREEN.consultCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
