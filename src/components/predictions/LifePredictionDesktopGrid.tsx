"use client";

import { LIFE_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { PREDICTION_DESKTOP_LAYOUT } from "@/lib/constants/prediction-desktop-layout";
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

export function LifePredictionDesktopGrid({
  sections,
}: {
  sections: { title: string; content: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {sections.map((section) => (
        <article
          key={section.title}
          className="rounded-[1.125rem] border-[3px] border-white/30 bg-[var(--color-life-container)] p-5 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <img src={iconForSection(section.title)} alt="" className="size-10 shrink-0" />
            <h2 className="whitespace-pre-line text-xl font-bold leading-tight text-[var(--color-life-title-text)]">
              {displayTitle(section.title)}
            </h2>
          </div>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-black/80">
            {formatContent(section.content)}
          </p>
        </article>
      ))}
    </div>
  );
}
