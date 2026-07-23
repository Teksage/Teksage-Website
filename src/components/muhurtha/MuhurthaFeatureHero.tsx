"use client";

import { MUHURTHA_LAYOUT } from "@/lib/constants";
import type { MuhurthaFeatureHeroProps } from "@/types";

/** Centered mint header — title + optional subtitle, no back/notification row. */
export function MuhurthaFeatureHero({
  title,
  subtitle,
}: MuhurthaFeatureHeroProps) {
  const L = MUHURTHA_LAYOUT;

  return (
    <header className={L.heroHeader}>
      <div className={L.heroCopy}>
        <h1 className={L.heroTitle}>{title}</h1>
        {subtitle ? <p className={L.heroSubtitle}>{subtitle}</p> : null}
      </div>
    </header>
  );
}
