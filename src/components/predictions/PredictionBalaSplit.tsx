"use client";

import { useI18nConstants } from "@/hooks/useT";
import { DAILY_PREDICTION_ASSETS } from "@/lib/constants";
import { HOME_DASHBOARD } from "@/lib/constants/home-dashboard";
import { PREDICTION_DETAIL_SCREEN } from "@/lib/constants/prediction-detail-screen";
import { cn } from "@/lib/utils";

export function PredictionBalaSplit({
  tharaBala,
  chandraBala,
  className,
}: {
  tharaBala?: string;
  chandraBala?: string;
  className?: string;
}) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const PD = useI18nConstants(PREDICTION_DETAIL_SCREEN);
  const isChandra8 = chandraBala === "8";
  return (
    <div className={cn("flex items-stretch justify-center px-4 py-4", className)}>
      <div className="flex flex-1 flex-col items-center gap-1 text-center">
        <p className="text-lg font-semibold text-[var(--color-brand-black)]">{tharaBala ?? "—"}</p>
        <p className="text-xs font-semibold text-[var(--color-brand-primary)]">
          {HD.tharaBala}
        </p>
      </div>
      <div className="flex shrink-0 items-center px-2">
        <img src={DAILY_PREDICTION_ASSETS.balaDivider} alt="" className="h-12 w-[2px]" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 text-center">
        {isChandra8 ? (
          <span className="rounded bg-[var(--color-daily-chandrashtama-bg)] px-2 py-0.5 text-micro font-semibold text-[var(--color-daily-chandrashtama)]">
            {PD.chandrashtamaLabel}
          </span>
        ) : null}
        <p
          className={cn(
            "text-lg font-semibold",
            isChandra8 ? "text-[var(--color-daily-chandrashtama)]" : "text-[var(--color-brand-black)]"
          )}
        >
          {chandraBala ?? "—"}
        </p>
        <p className="text-xs font-semibold text-[var(--color-brand-primary)]">
          {HD.chandraBala}
        </p>
      </div>
    </div>
  );
}
