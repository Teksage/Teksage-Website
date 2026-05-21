"use client";

import { useI18nConstants } from "@/hooks/useT";
import { DAILY_PREDICTION_ASSETS, HOME_DASHBOARD } from "@/lib/constants";
import { PREDICTION_DETAIL_SCREEN } from "@/lib/constants/prediction-detail-screen";
import { cn } from "@/lib/utils";

export function DailyPredictionBalaPanel({
  tharaBala,
  chandraBala,
}: {
  tharaBala?: string;
  chandraBala?: string;
}) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const PD = useI18nConstants(PREDICTION_DETAIL_SCREEN);
  const isChandra8 = chandraBala === "8";
  return (
    <div className="rounded-[1.25rem] border border-black/[0.06] bg-white px-4 py-6 shadow-lg sm:px-8 sm:py-10">
      <div className="flex items-stretch justify-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="text-3xl font-bold leading-none text-[var(--color-brand-black)] sm:text-4xl">
            {tharaBala ?? "—"}
          </p>
          <p className="text-xs font-semibold text-[var(--color-brand-primary)] sm:text-sm">
            {HD.tharaBala}
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-center px-1 sm:px-3">
          <img
            src={DAILY_PREDICTION_ASSETS.balaDivider}
            alt=""
            width={2}
            height={48}
            className="h-12 w-[2px] object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          {isChandra8 ? (
            <span className="rounded bg-[var(--color-daily-chandrashtama-bg)] px-2 py-1 text-micro font-semibold leading-none text-[var(--color-daily-chandrashtama)] sm:text-xs">
              {PD.chandrashtamaLabel}
            </span>
          ) : null}
          <p
            className={cn(
              "text-3xl font-bold leading-none sm:text-4xl",
              isChandra8
                ? "text-[var(--color-daily-chandrashtama)]"
                : "text-[var(--color-brand-black)]"
            )}
          >
            {chandraBala ?? "—"}
          </p>
          <p className="text-xs font-semibold text-[var(--color-brand-primary)] sm:text-sm">
            {HD.chandraBala}
          </p>
        </div>
      </div>
    </div>
  );
}
