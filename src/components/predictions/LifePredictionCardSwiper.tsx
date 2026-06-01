"use client";

import { useState } from "react";
import { LIFE_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { LIFE_SECTION_TITLES } from "@/lib/constants/prediction-screen-copy";
import { cn } from "@/lib/utils";

function iconForSection(title: string): string {
  const key = title.trim();
  if (key.startsWith("General")) return LIFE_PREDICTION_ASSETS.general;
  if (key.startsWith("Career")) return LIFE_PREDICTION_ASSETS.career;
  if (key.startsWith("Relationship")) return LIFE_PREDICTION_ASSETS.relationship;
  if (key.startsWith("Wealth")) return LIFE_PREDICTION_ASSETS.wealth;
  if (key.startsWith("Health")) return LIFE_PREDICTION_ASSETS.health;
  return LIFE_PREDICTION_ASSETS.current;
}

function displayTitle(title: string): string {
  return LIFE_SECTION_TITLES[title] ?? title;
}

function formatContent(text: string): string {
  return text.replace(/\. /g, ".\n\n");
}

export function LifePredictionCardSwiper({
  sections,
}: {
  sections: { title: string; content: string }[];
}) {
  const [index, setIndex] = useState(0);
  const total = sections.length;
  const current = sections[index];
  if (!current) return null;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <div className="w-full min-w-0">
      <div
        className="relative rounded-[1.125rem] border-[3px] border-white/30 bg-[var(--color-life-container)] p-5 shadow-lg"
        onTouchStart={(e) => {
          const x = e.touches[0]?.clientX ?? 0;
          (e.currentTarget as HTMLElement).dataset.touchX = String(x);
        }}
        onTouchEnd={(e) => {
          const start = Number((e.currentTarget as HTMLElement).dataset.touchX ?? 0);
          const end = e.changedTouches[0]?.clientX ?? 0;
          if (end - start > 50) prev();
          if (start - end > 50) next();
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <img src={iconForSection(current.title)} alt="" className="size-10 shrink-0" />
            <h2 className="whitespace-pre-line text-xl font-bold leading-tight text-[var(--color-life-title-text)]">
              {displayTitle(current.title)}
            </h2>
          </div>
          <span className="shrink-0 rounded-lg bg-[var(--color-life-title-text)] px-2.5 py-1 text-sm font-medium text-white">
            {index + 1}/{total}
          </span>
        </div>
        <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-black/80">
          {formatContent(current.content)}
        </p>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {sections.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Section ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index
                ? "w-4 bg-[var(--color-life-prediction-button-text)]"
                : "w-2 bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
