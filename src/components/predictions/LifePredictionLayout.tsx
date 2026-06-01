"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { LifePredictionCardSwiper } from "@/components/predictions/LifePredictionCardSwiper";
import { LifePredictionDesktopGrid } from "@/components/predictions/LifePredictionDesktopGrid";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { LIFE_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { LIFE_DETAIL_LAYOUT } from "@/lib/constants/life-prediction-detail-layout";
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
  const LD = useI18nConstants(LIFE_DETAIL_SCREEN);
  const L = LIFE_DETAIL_LAYOUT;

  return (
    <div className={L.pageRoot}>
      <div className={L.headerBar}>
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

      <div className={L.content}>
        <div className={L.introBlock}>
          <h1 className={L.introTitle}>{LD.title}</h1>
          <p className={L.introText}>{LD.intro}</p>
        </div>
        <div className="mt-6 lg:hidden">
          <LifePredictionCardSwiper sections={data.sections} />
        </div>
        <div className="mt-6 hidden lg:block">
          <LifePredictionDesktopGrid sections={data.sections} />
        </div>
        <div className={L.ctaColumn}>
          <Link
            href={ROUTES.consultation}
            className={cn(
              PREDICTION_DESKTOP_LAYOUT.detailCtaButton,
              "bg-white/30 text-[var(--color-life-prediction-button-text)]"
            )}
          >
            {LD.consultCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
