"use client";

import { useI18nConstants } from "@/hooks/useT";
import { RotatingImage } from "@/components/predictions/RotatingImage";
import {
  LIFE_PREDICTION_ASSETS,
  YEARLY_PREDICTION_ASSETS,
} from "@/lib/constants/prediction-assets";
import {
  LIFE_LANDING_SCREEN,
  YEARLY_LANDING_SCREEN,
} from "@/lib/constants/prediction-screen-copy";
import { cn } from "@/lib/utils";

export function PredictionLandingLayout({
  variant,
  onBackClick,
  onGenerate,
  generating,
}: {
  variant: "yearly" | "life";
  onBackClick: () => void;
  onGenerate: () => void;
  generating: boolean;
}) {
  const isYearly = variant === "yearly";
  const copy = isYearly ? YEARLY_LANDING_SCREEN : LIFE_LANDING_SCREEN;
  const deco = isYearly ? YEARLY_PREDICTION_ASSETS.landingDeco : LIFE_PREDICTION_ASSETS.landingDeco;
  const logo = isYearly ? YEARLY_PREDICTION_ASSETS.decoLogo : LIFE_PREDICTION_ASSETS.decoLogo;
  const back = isYearly ? YEARLY_PREDICTION_ASSETS.appBarBack : LIFE_PREDICTION_ASSETS.appBarBack;

  return (
    <div
      className={cn(
        "relative flex min-h-dvh w-full min-w-0 flex-col items-center px-5 pb-10",
        isYearly
          ? "bg-[linear-gradient(180deg,var(--color-yearly-top)_15.98%,var(--color-yearly-bottom)_76.85%)]"
          : "bg-[linear-gradient(180deg,var(--color-life-top)_15.98%,var(--color-life-bottom)_76.85%)]"
      )}
    >
      <button
        type="button"
        onClick={onBackClick}
        className="absolute left-2 top-6 z-20 p-2"
        aria-label="Go back"
      >
        <img
          src={back}
          alt=""
          className={cn("h-5 w-5", isYearly && "brightness-0")}
        />
      </button>

      <div className="relative mt-24 flex flex-col items-center">
        <RotatingImage
          src={deco}
          durationClass="prediction-rotate-landing"
          className="w-[min(100%,18rem)] max-w-[72vw]"
        />
        <img src={logo} alt="" className="absolute size-16 sm:size-20" />
      </div>

      <h1 className="prediction-slide-up mt-10 text-center text-[1.8rem] font-bold text-white">
        {copy.title}
      </h1>
      <p className="prediction-slide-up-delay mx-auto mt-4 max-w-md text-center text-lg leading-relaxed text-white">
        {copy.description}
      </p>

      <button
        type="button"
        disabled={generating}
        onClick={onGenerate}
        className={cn(
          "prediction-slide-up-btn mt-auto w-full max-w-sm rounded-[1.25rem] bg-white px-5 py-3 text-lg font-semibold disabled:opacity-70",
          isYearly
            ? "text-[var(--color-yearly-prediction-button-text)]"
            : "text-[var(--color-life-prediction-button-text)]"
        )}
      >
        {generating ? copy.generating : copy.generateCta}
      </button>
    </div>
  );
}
