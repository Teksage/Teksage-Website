import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HOME_DASHBOARD, HOME_LAYOUT, PREDICTION_CIRCLE_LINKS, ROUTES } from "@/lib/constants";
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
  return (
    <div className={cn("flex flex-col", HOME_LAYOUT.exploreSectionGap, className)}>
      <div className="flex items-center gap-2 sm:gap-3">
        <ExploreRuleLine />
        <span
          className={cn(
            "whitespace-nowrap text-sm font-semibold sm:text-[0.9375rem]",
            "text-[color:var(--color-home-dashboard-heading)]"
          )}
        >
          {HOME_DASHBOARD.explorePredictionsTitle}
        </span>
        <ExploreRuleLine />
      </div>

      <div
        className={cn(
          "flex justify-between gap-2 px-0 sm:gap-3 sm:px-1",
          "lg:mx-auto lg:max-w-md lg:justify-center lg:gap-8 lg:px-0"
        )}
      >
        {PREDICTION_CIRCLE_LINKS.map((item) => (
          <Link
            key={item.label}
            href={isLoggedIn ? item.href : ROUTES.login}
            className="flex max-w-[33%] flex-1 flex-col items-center gap-2"
          >
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
            <span
              className={cn(
                "text-center text-xs font-semibold leading-snug sm:text-[0.8125rem]",
                "text-[color:var(--color-home-dashboard-heading)]"
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
