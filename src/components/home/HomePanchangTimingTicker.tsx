"use client";

import { HomePanchangTimingMobileCard } from "@/components/home/HomePanchangTimingMobileCard";
import type { HomePanchangTimingTickerProps } from "@/types/ui/home-panchang-timing";
import { cn } from "@/lib/utils";

/** @deprecated Prefer placing `HomePanchangTimingMobileCard` in home main scroll. */
export function HomePanchangTimingTicker({ className }: HomePanchangTimingTickerProps) {
  return <HomePanchangTimingMobileCard className={cn("lg:hidden", className)} />;
}
