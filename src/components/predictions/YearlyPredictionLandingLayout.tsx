"use client";

import { Loader } from "@/components/common/Loader";
import { RotatingImage } from "@/components/predictions/RotatingImage";
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
  return (
    <div className="relative h-dvh w-full min-w-0 overflow-hidden">
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
        <RotatingImage
          src={YEARLY_PREDICTION_ASSETS.landingDeco}
          durationClass="prediction-rotate-landing"
          className="h-auto w-[var(--yearly-landing-deco-w)] max-w-[var(--yearly-landing-deco-max)] object-contain"
        />
        <img
          src={YEARLY_PREDICTION_ASSETS.decoLogo}
          alt=""
          className="absolute left-1/2 top-1/2 size-[var(--yearly-landing-logo)] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <h1 className="prediction-slide-up absolute inset-x-0 top-[var(--yearly-landing-title-top)] z-10 px-5 text-center text-[1.8125rem] font-bold leading-none text-white">
        {YEARLY_LANDING_SCREEN.title}
      </h1>

      <p className="prediction-slide-up-delay absolute inset-x-0 top-[var(--yearly-landing-description-top)] z-10 px-5 text-center text-lg font-medium leading-6 text-white">
        {YEARLY_LANDING_SCREEN.description}
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
          YEARLY_LANDING_SCREEN.generateCta
        )}
      </button>
    </div>
  );
}
