"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DASHBOARD_ASSETS, HOME_DASHBOARD, HOME_LAYOUT } from "@/lib/constants";
import { Loader } from "@/components/common/Loader";

interface DailyPredictionData {
  tharaBala?: string;
  chandraBala?: string;
}

interface DailyPredictionCardProps {
  data?: DailyPredictionData;
  isLoading?: boolean;
  isLoggedIn: boolean;
  /** Set when `/api/prediction/daily` or `/api/notifications` failed (home dashboard). */
  fetchError?: string | null;
  currentDate: string;
  className?: string;
}

export function DailyPredictionCard({
  data,
  isLoading,
  isLoggedIn,
  fetchError,
  currentDate,
  className,
}: DailyPredictionCardProps) {
  const href = isLoggedIn ? "/predictions/daily" : "/login";

  return (
    <Link href={href} className={cn("group block flex-1", className)}>
      <div
        className={cn(
          "relative overflow-hidden",
          HOME_LAYOUT.featureCardHeight,
          HOME_LAYOUT.homeCardRadius,
          "border border-black/[0.06]",
          "bg-[linear-gradient(180deg,var(--color-daily-green-from)_0%,var(--color-daily-green-to)_100%)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-1/4 top-0 h-full w-[150%] opacity-[0.12]">
            <svg viewBox="0 0 200 180" className="h-full w-full" preserveAspectRatio="none">
              <ellipse cx="100" cy="-24" rx="130" ry="88" fill="white" />
            </svg>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-1 px-3 pb-2 pt-5">
          <p className="text-center text-lg font-bold text-white">
            {HOME_DASHBOARD.dailyPrediction}
          </p>
          <p className="text-sm font-semibold text-white/75">{currentDate}</p>

          <div className="mt-2 w-full rounded-[1.05rem] bg-white px-2 py-2.5 shadow-sm">
            {isLoading ? (
              <div className="flex flex-col items-center gap-1 py-0.5">
                <Loader
                  variant="dots"
                  size="sm"
                  label="Loading daily prediction"
                />
                <p className="text-center text-xs text-neutral-400">
                  {HOME_DASHBOARD.loadingEllipsis}
                </p>
              </div>
            ) : !isLoggedIn ? (
              <p className="py-1 text-center text-xs font-semibold text-[var(--color-brand-primary)]">
                {HOME_DASHBOARD.clickToView}
              </p>
            ) : fetchError ? (
              <p className="py-1 text-center text-xs font-semibold text-neutral-600">
                {HOME_DASHBOARD.dailyPredictionUnavailable}
              </p>
            ) : data ? (
              <div className="flex items-stretch justify-around">
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <p className="text-[10px] font-semibold text-neutral-900">
                    {data.tharaBala ?? "N/A"}
                  </p>
                  <p className="text-[8px] font-semibold leading-tight text-[var(--color-brand-primary)]">
                    {HOME_DASHBOARD.tharaBala}
                  </p>
                </div>
                <div className="w-px self-stretch bg-neutral-200" />
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <p className="text-[10px] font-semibold text-neutral-900">
                    {data.chandraBala ?? "N/A"}
                  </p>
                  <p className="text-[8px] font-semibold leading-tight text-[var(--color-brand-primary)]">
                    {HOME_DASHBOARD.chandraBala}
                  </p>
                </div>
              </div>
            ) : (
              <p className="py-1 text-center text-xs font-semibold text-[var(--color-brand-primary)]">
                {HOME_DASHBOARD.clickToView}
              </p>
            )}
          </div>

          <div
            className={cn(
              "mt-1 transition-transform duration-500 ease-in-out",
              "group-hover:translate-y-1"
            )}
          >
            <Image
              src={DASHBOARD_ASSETS.downArrow}
              alt=""
              width={17}
              height={16}
              unoptimized
              className="mx-auto block"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
