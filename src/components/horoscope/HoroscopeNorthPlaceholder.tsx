"use client";

import { useI18nConstants } from "@/hooks/useT";
import { HoroscopeComingSoonMarquee } from "@/components/horoscope/HoroscopeComingSoonMarquee";
import { HOROSCOPE_LAYOUT, HOROSCOPE_SCREEN } from "@/lib/constants";

/** Mirrors Flutter `ComingSoonContainer` (`comingSoon.dart`). */
export function HoroscopeNorthPlaceholder() {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const L = HOROSCOPE_LAYOUT;

  return (
    <div className={L.northComingSoonStage}>
      <div className={L.northWatermarkBlock} aria-hidden>
        {H.northChartLines.map((line) => (
          <span key={line} className={L.northWatermark}>
            {line}
          </span>
        ))}
      </div>
      <div className={L.comingSoonMarqueeShell}>
        <HoroscopeComingSoonMarquee label={H.comingSoonMarquee} />
      </div>
    </div>
  );
}
