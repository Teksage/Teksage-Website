"use client";

import Link from "next/link";
import { LifePredictionCardSwiper } from "@/components/predictions/LifePredictionCardSwiper";
import { LIFE_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { LIFE_DETAIL_SCREEN } from "@/lib/constants/prediction-screen-copy";
import { ROUTES } from "@/lib/constants/routes";
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
      <div className="relative px-3 pt-8">
        <button type="button" onClick={onBackClick} className="p-2" aria-label="Go back">
          <img src={LIFE_PREDICTION_ASSETS.appBarBack} alt="" className="h-5 w-5 brightness-0 invert" />
        </button>
        <div className="flex justify-center">
          <img src={LIFE_PREDICTION_ASSETS.decoLogo} alt="" className="size-14" />
        </div>
      </div>
      <div className="px-5 text-center text-white">
        <h1 className="flex items-center justify-center gap-2 text-xl font-bold">
          Life Predictions
          <button
            type="button"
            title={LIFE_DETAIL_SCREEN.infoTooltip}
            aria-label={LIFE_DETAIL_SCREEN.infoTooltip}
          >
            <img src={LIFE_PREDICTION_ASSETS.toolTip} alt="" className="size-5 brightness-0 invert" />
          </button>
        </h1>
        <p className="mt-3 text-base leading-relaxed">{LIFE_DETAIL_SCREEN.intro}</p>
      </div>
      <div className="mt-6">
        <LifePredictionCardSwiper sections={data.sections} />
      </div>
      <Link
        href={ROUTES.consultation}
        className="mx-5 mt-8 block rounded-[1.25rem] bg-white/30 py-3 text-center text-lg font-semibold text-[var(--color-life-prediction-button-text)]"
      >
        {LIFE_DETAIL_SCREEN.consultCta}
      </Link>
    </div>
  );
}
