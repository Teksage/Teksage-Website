"use client";

import { HOROSCOPE_LAYOUT } from "@/lib/constants";

const MARQUEE_REPEAT = 8;

/** Mirrors Flutter `CustomMarquee` on `ComingSoonContainer` (full-width green strip + edge fade). */
export function HoroscopeComingSoonMarquee({ label }: { label: string }) {
  const L = HOROSCOPE_LAYOUT;
  const items = Array.from({ length: MARQUEE_REPEAT }, (_, i) => (
    <span key={i} className={L.comingSoonMarqueeItem}>
      {label}
      <span aria-hidden>★</span>
    </span>
  ));

  return (
    <div className={L.comingSoonMarqueeBar} aria-live="polite">
      <div className={L.comingSoonMarqueeTrack}>{items}</div>
    </div>
  );
}
