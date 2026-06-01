"use client";

import { Loader } from "@/components/common/Loader";
import { PredictionLandingHero } from "@/components/predictions/PredictionLandingHero";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
import { cn } from "@/lib/utils";

export function PredictionGenerateLandingDesktop({
  backSrc,
  backInvert,
  decoSrc,
  logoSrc,
  title,
  description,
  generateCta,
  generating,
  buttonTextClass,
  onBackClick,
  onGenerate,
}: {
  backSrc: string;
  backInvert?: boolean;
  decoSrc: string;
  logoSrc: string;
  title: string;
  description: string;
  generateCta: string;
  generating: boolean;
  buttonTextClass: string;
  onBackClick: () => void;
  onGenerate: () => void;
}) {
  const L = PREDICTION_DESKTOP_LAYOUT;

  return (
    <div className={L.landingDesktop}>
      <div className={L.landingDesktopBackBar}>
        <button
          type="button"
          onClick={onBackClick}
          className="rounded-full p-2 transition-colors hover:bg-white/10"
          aria-label="Go back"
        >
          <img
            src={backSrc}
            alt=""
            className={cn("h-5 w-5", backInvert && "brightness-0 invert")}
          />
        </button>
      </div>

      <div className={L.landingDesktopContent}>
        <PredictionLandingHero decoSrc={decoSrc} logoSrc={logoSrc} variant="desktop" />
        <h1 className="prediction-slide-up mt-10 text-2xl-display font-bold leading-tight text-white">
          {title}
        </h1>
        <p
          className={cn(
            "prediction-slide-up-delay mt-4 text-lg font-medium leading-relaxed text-white",
            L.landingDesktopCopyMax
          )}
        >
          {description}
        </p>
        <button
          type="button"
          disabled={generating}
          onClick={onGenerate}
          className={cn(
            "prediction-slide-up-btn mt-10 w-full rounded-[1.25rem] bg-white py-3 text-lg font-semibold disabled:opacity-70",
            L.landingDesktopCopyMax,
            buttonTextClass
          )}
        >
          {generating ? (
            <span className="flex justify-center py-0.5">
              <Loader variant="inline" size="sm" />
            </span>
          ) : (
            generateCta
          )}
        </button>
      </div>
    </div>
  );
}
