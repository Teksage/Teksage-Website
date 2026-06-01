"use client";

import { HomePanchangTimingStrip } from "@/components/home/HomePanchangTimingStrip";
import type { HomePanchangTimingTickerProps } from "@/types/ui/home-panchang-timing";
import { cn } from "@/lib/utils";

/** Mobile home — timings strip below greeting (`lg:hidden`). */
export function HomePanchangTimingTicker({ className }: HomePanchangTimingTickerProps) {
  return (
    <div className={cn("shrink-0 lg:hidden", className)}>
      <HomePanchangTimingStrip variant="light" />
    </div>
  );
}
