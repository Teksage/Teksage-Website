"use client";

import { useI18nConstants } from "@/hooks/useT";
import { Loader } from "@/components/common/Loader";
import { PredictionGenerateLandingDesktop } from "@/components/predictions/PredictionGenerateLandingDesktop";
import { PredictionLandingHero } from "@/components/predictions/PredictionLandingHero";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { YEARLY_LANDING_SCREEN } from "@/lib/constants/prediction-screen-copy";
import { cn } from "@/lib/utils";

export function YearlyPredictionLandingLayout({
  onBackClick,
  onGenerate,
  generating,
}: {
  onBackClick: () => void;
  onGenerate: () => void;
  generating: boolean;
}) {
  const YL = useI18nConstants(YEARLY_LANDING_SCREEN);
  return (
    <div className={PREDICTION_DESKTOP_LAYOUT.landingRoot}>
      <div className={PREDICTION_DESKTOP_LAYOUT.landingMobile}>
        <button
          type="button"
          onClick={onBackClick}
          className="absolute top-[var(--yearly-landing-back-top)] left-[var(--yearly-landing-inset-x)] z-20 p-2"
          aria-label="Go back"
        >
          <img
            src={YEARLY_PREDICTION_ASSETS.appBarBack}
            alt=""
            className="h-5 w-5 brightness-0"
          />
        </button>

        <div className="absolute top-[var(--yearly-landing-hero-top)] left-1/2 z-10 -translate-x-1/2">
          <PredictionLandingHero
            decoSrc={YEARLY_PREDICTION_ASSETS.landingDeco}
            logoSrc={YEARLY_PREDICTION_ASSETS.decoLogo}
            variant="mobile"
          />
        </div>

        <h1 className="prediction-slide-up absolute inset-x-0 top-[var(--yearly-landing-title-top)] z-10 px-5 text-center text-[1.8125rem] font-bold leading-none text-white">
          {YL.title}
        </h1>

        <p className="prediction-slide-up-delay absolute inset-x-0 top-[var(--yearly-landing-description-top)] z-10 px-5 text-center text-lg font-medium leading-6 text-white">
          {YL.description}
        </p>

        <button
          type="button"
          disabled={generating}
          onClick={onGenerate}
          className={cn(
            "prediction-slide-up-btn absolute inset-x-5 top-[var(--yearly-landing-button-top)] z-10",
            "rounded-[1.25rem] bg-white py-2.5 text-lg font-semibold",
            "text-[var(--color-yearly-prediction-button-text)] disabled:opacity-70"
          )}
        >
          {generating ? (
            <span className="flex justify-center py-0.5">
              <Loader variant="dots" size="sm" />
            </span>
          ) : (
            YL.generateCta
          )}
        </button>
      </div>

      <PredictionGenerateLandingDesktop
        backSrc={YEARLY_PREDICTION_ASSETS.appBarBack}
        decoSrc={YEARLY_PREDICTION_ASSETS.landingDeco}
        logoSrc={YEARLY_PREDICTION_ASSETS.decoLogo}
        title={YL.title}
        description={YL.description}
        generateCta={YL.generateCta}
        generating={generating}
        buttonTextClass="text-[var(--color-yearly-prediction-button-text)]"
        onBackClick={onBackClick}
        onGenerate={onGenerate}
      />
    </div>
  );
}
