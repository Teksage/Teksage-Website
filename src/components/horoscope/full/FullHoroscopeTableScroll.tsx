/** Full Horoscope — mobile-friendly horizontal table scroll. */
"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_LAYOUT } from "@/lib/constants";
import type { ReactNode } from "react";

export function FullHoroscopeTableScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(HOROSCOPE_LAYOUT.tableScroll, className)}>{children}</div>
  );
}
