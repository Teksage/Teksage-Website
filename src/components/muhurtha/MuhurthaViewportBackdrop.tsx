"use client";

import { MAIN_TAB_VIEWPORT_BACKDROP, MUHURTHA_LAYOUT } from "@/lib/constants";

/** Solid mint backdrop — same on mobile and desktop for Event Planner. */
export function MuhurthaViewportBackdrop() {
  const L = MUHURTHA_LAYOUT;

  return (
    <div aria-hidden className={MAIN_TAB_VIEWPORT_BACKDROP.overflowHidden}>
      <div className={L.featureBackdrop} />
    </div>
  );
}
