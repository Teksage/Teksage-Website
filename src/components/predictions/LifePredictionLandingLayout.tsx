"use client";

import { useI18nConstants } from "@/hooks/useT";
import { Loader } from "@/components/common/Loader";
import { PredictionGenerateLandingDesktop } from "@/components/predictions/PredictionGenerateLandingDesktop";
import { PredictionLandingHero } from "@/components/predictions/PredictionLandingHero";
import { LIFE_SHELL_GRADIENT_CLASS } from "@/lib/constants";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { LIFE_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { LIFE_LANDING_SCREEN } from "@/lib/constants/prediction-screen-copy";
import { cn } from "@/lib/utils";

export function LifePredictionLandingLayout({
  onBackClick,
  onGenerate,
  generating,
}: {
  onBackClick: () => void;
  onGenerate: () => void;
  generating: boolean;
}) {
  const LL = useI18nConstants(LIFE_LANDING_SCREEN);
  return (
    <div
      className={cn(
        PREDICTION_DESKTOP_LAYOUT.landingRoot,
        LIFE_SHELL_GRADIENT_CLASS,
        "bg-gradient-to-b from-[#9754f6] to-[#abaedb]"
      )}
    >
      <div className={PREDICTION_DESKTOP_LAYOUT.landingMobile}>
        <button
          type="button"
          onClick={onBackClick}
          className="absolute top-[var(--yearly-landing-back-top)] left-[var(--yearly-landing-inset-x)] z-20 p-2"
          aria-label="Go back"
        >
          <img
            src={LIFE_PREDICTION_ASSETS.appBarBack}
            alt=""
            className="h-5 w-5 brightness-0 invert"
          />
        </button>

        <div className="absolute top-[var(--yearly-landing-hero-top)] left-1/2 z-10 -translate-x-1/2">
          <PredictionLandingHero
            decoSrc={LIFE_PREDICTION_ASSETS.landingDeco}
            logoSrc={LIFE_PREDICTION_ASSETS.decoLogo}
            variant="mobile"
          />
        </div>

        <h1 className="prediction-slide-up absolute inset-x-0 top-[var(--yearly-landing-title-top)] z-10 px-5 text-center text-display-sm font-bold leading-none text-white">
          {LL.title}
        </h1>

        <p className="prediction-slide-up-delay absolute inset-x-0 top-[var(--yearly-landing-description-top)] z-10 px-5 text-center text-lg font-medium leading-6 text-white">
          {LL.description}
        </p>

        <button
          type="button"
          disabled={generating}
          onClick={onGenerate}
          className={cn(
            "prediction-slide-up-btn absolute inset-x-5 top-[var(--yearly-landing-button-top)] z-10",
            "rounded-[1.25rem] bg-white py-2.5 text-lg font-semibold",
            "text-[var(--color-life-prediction-button-text)] disabled:opacity-70"
          )}
        >
          {generating ? (
            <span className="flex justify-center py-0.5">
              <Loader variant="dots" size="sm" />
            </span>
          ) : (
            LL.generateCta
          )}
        </button>
      </div>

      <PredictionGenerateLandingDesktop
        backSrc={LIFE_PREDICTION_ASSETS.appBarBack}
        backInvert
        decoSrc={LIFE_PREDICTION_ASSETS.landingDeco}
        logoSrc={LIFE_PREDICTION_ASSETS.decoLogo}
        title={LL.title}
        description={LL.description}
        generateCta={LL.generateCta}
        generating={generating}
        buttonTextClass="text-[var(--color-life-prediction-button-text)]"
        onBackClick={onBackClick}
        onGenerate={onGenerate}
      />
    </div>
  );
}
