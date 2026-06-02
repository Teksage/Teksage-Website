"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import Link from "next/link";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { cn } from "@/lib/utils";
import {
  HOME_DASHBOARD,
  HOME_DASHBOARD_UI,
  HOME_LAYOUT,
  PREDICTION_CIRCLE_LINKS,
} from "@/lib/constants";
import type { PredictionCirclesProps } from "@/types";

function ExploreRuleLine() {
  return (
    <div
      className={cn(
        "h-px min-h-px min-w-[2rem] flex-1 shrink-0 self-center",
        "bg-[var(--color-home-dashboard-rule)]"
      )}
      aria-hidden
    />
  );
}

export function PredictionCircles({ isLoggedIn, className }: PredictionCirclesProps) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const predictionLinks = useI18nConstants(PREDICTION_CIRCLE_LINKS);
  const { guardNavigation } = useAuthNavigation();
  return (
    <div className={cn("flex flex-col", HOME_LAYOUT.exploreSectionGap, className)}>
      <div className="flex items-center gap-2 sm:gap-3">
        <ExploreRuleLine />
        <span className={cn("whitespace-nowrap", HOME_DASHBOARD_UI.exploreSectionTitle)}>
          {HD.explorePredictionsTitle}
        </span>
        <ExploreRuleLine />
      </div>

      <div
        className={cn(
          "flex justify-between gap-2 px-0 sm:gap-3 sm:px-1",
          "lg:mx-auto lg:max-w-md lg:justify-center lg:gap-8 lg:px-0"
        )}
      >
        {predictionLinks.map((item) => {
          const content = (
            <>
              <div
                className={cn(
                  "flex w-full max-w-[5.75rem] justify-center drop-shadow-[0_6px_20px_rgba(0,0,0,0.12)]",
                  "transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={95}
                  height={94}
                  unoptimized
                  className="h-[5.5rem] w-auto max-w-full object-contain"
                />
              </div>
              <span className={HOME_DASHBOARD_UI.exploreCircleLabel}>
                {item.label}
              </span>
            </>
          );

          if (isLoggedIn) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex max-w-[33%] flex-1 flex-col items-center gap-2"
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => guardNavigation(item.href, { redirectHomeOnClose: true })}
              className="flex max-w-[33%] flex-1 flex-col items-center gap-2"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
