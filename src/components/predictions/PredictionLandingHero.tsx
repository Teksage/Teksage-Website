"use client";

import { RotatingImage } from "@/components/predictions/RotatingImage";
import { cn } from "@/lib/utils";

/** Centered rotating deco + logo — mirrors Flutter `predictionLandingPage.dart` Stack alignment. */
export function PredictionLandingHero({
  decoSrc,
  logoSrc,
  variant = "mobile",
  className,
}: {
  decoSrc: string;
  logoSrc: string;
  variant?: "mobile" | "desktop";
  className?: string;
}) {
  const boxClass =
    variant === "mobile"
      ? "w-[min(72.27vw,18.125rem)]"
      : "w-48 xl:w-56";
  const logoClass =
    variant === "mobile" ? "size-[var(--yearly-landing-logo)]" : "size-20";

  return (
    <div className={cn("relative mx-auto aspect-square", boxClass, className)}>
      <RotatingImage
        src={decoSrc}
        durationClass="prediction-rotate-landing"
        className="h-full w-full object-contain"
      />
      <img
        src={logoSrc}
        alt=""
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain",
          logoClass
        )}
      />
    </div>
  );
}
