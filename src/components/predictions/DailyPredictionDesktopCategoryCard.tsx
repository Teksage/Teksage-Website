"use client";

import { DAILY_PREDICTION_ASSETS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HEADER_BG: Record<
  "career" | "relationship" | "wealth" | "health",
  string
> = {
  career: "bg-[var(--color-daily-desktop-career-header)]",
  relationship: "bg-[var(--color-daily-desktop-relationship-header)]",
  wealth: "bg-[var(--color-daily-desktop-wealth-header)]",
  health: "bg-[var(--color-daily-desktop-health-header)]",
};

const ICON_SRC: Record<keyof typeof HEADER_BG, string> = {
  career: DAILY_PREDICTION_ASSETS.career,
  relationship: DAILY_PREDICTION_ASSETS.relationship,
  wealth: DAILY_PREDICTION_ASSETS.wealth,
  health: DAILY_PREDICTION_ASSETS.health,
};

export function DailyPredictionDesktopCategoryCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: keyof typeof HEADER_BG;
}) {
  if (!items.length) return null;
  return (
    <section className="overflow-hidden rounded-[1.25rem] border border-black/[0.05] bg-white shadow-sm">
      <div
        className={cn(
          "relative border-b border-black/[0.05] px-5 py-3 sm:px-5 sm:py-3.5",
          HEADER_BG[variant],
          "rounded-t-[1.25rem] border-l border-r border-t border-black/[0.05]"
        )}
      >
        <h2 className="pr-14 text-base font-semibold text-[var(--color-brand-black)] sm:text-lg sm:leading-6">
          {title}
        </h2>
        <img
          src={ICON_SRC[variant]}
          alt=""
          width={40}
          height={40}
          className="pointer-events-none absolute right-4 top-1/2 h-9 w-9 -translate-y-1/2 object-contain sm:h-10 sm:w-10"
        />
      </div>
      <div className="px-5 py-4">
        <ul className="space-y-2">
          {items.map((line) => (
            <li key={line.slice(0, 80)} className="flex gap-1 text-sm text-black/70 sm:text-base">
              <span className="shrink-0 font-medium" aria-hidden>
                •
              </span>
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
