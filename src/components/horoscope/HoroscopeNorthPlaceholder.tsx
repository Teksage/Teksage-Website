"use client";

import { HOROSCOPE_SCREEN } from "@/lib/constants";

/** Mirrors Flutter `ComingSoonContainer` (`comingSoon.dart`) — no marquee on web. */
export function HoroscopeNorthPlaceholder() {
  const lines = HOROSCOPE_SCREEN.northChartLines;

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      {lines.map((line) => (
        <span
          key={line}
          className="text-[clamp(2.25rem,12vw,4.5rem)] font-extrabold leading-[0.75] text-[color-mix(in_srgb,var(--color-horoscope-north-watermark)_50%,transparent)]"
        >
          {line}
        </span>
      ))}
    </div>
  );
}
