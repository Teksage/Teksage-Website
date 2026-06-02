"use client";

import { useI18nConstants } from "@/hooks/useT";
import { PanchangTimingRowsCard } from "@/components/panchang/PanchangTimingRowsCard";
import { PANCHANG_SCREEN } from "@/lib/constants";
import { buildPanchangTimingRows } from "@/lib/panchang-timing-rows";
import type { PanchangExtendedTimingCardProps } from "@/types";

/** Full-width timing block — mobile stack; desktop shows secondary-only rows. */
export function PanchangExtendedTimingCard({
  panchang,
  variant = "all",
  className,
}: PanchangExtendedTimingCardProps) {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const groups = buildPanchangTimingRows(panchang, P.rowLabels, P);
  const rows =
    variant === "primary"
      ? groups.primary
      : variant === "secondary"
        ? groups.secondary
        : groups.all;

  return <PanchangTimingRowsCard rows={rows} className={className} />;
}
