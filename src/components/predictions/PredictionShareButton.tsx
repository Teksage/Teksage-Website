"use client";

import { useI18nConstants } from "@/hooks/useT";
import { PREDICTION_SHARE_ASSETS } from "@/lib/constants/assets";
import { PREDICTION_SHARE_SCREEN } from "@/lib/constants/prediction-share";
import { cn } from "@/lib/utils";
import type { PredictionShareButtonProps } from "@/types/ui/prediction-share";

export function PredictionShareButton({ disabled, onClick, className }: PredictionShareButtonProps) {
  const PS = useI18nConstants(PREDICTION_SHARE_SCREEN);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={PS.shareAriaLabel}
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-40",
        className
      )}
    >
      <img src={PREDICTION_SHARE_ASSETS.share} alt="" width={20} height={20} className="h-5 w-5" />
    </button>
  );
}
