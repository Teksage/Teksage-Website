"use client";

import { useI18nConstants } from "@/hooks/useT";
import { PanchangBalaPair } from "@/components/panchang/PanchangBalaPair";
import { PanchangDateRibbon } from "@/components/panchang/PanchangDateRibbon";
import { PanchangDottedRow } from "@/components/panchang/PanchangDottedRow";
import { PanchangExtendedTimingCard } from "@/components/panchang/PanchangExtendedTimingCard";
import { PanchangSunTimeGrid } from "@/components/panchang/PanchangSunTimeGrid";
import { PANCHANG_SCREEN, PANCHANG_SECTIONS } from "@/lib/constants";
import {
  formatPanchangKarnaValue,
  formatPanchangSegmentValue,
} from "@/lib/panchang-detail-format";
import type { PanchangPersonalizedSectionsProps } from "@/types";

export function PanchangPersonalizedSections({
  panchang,
}: PanchangPersonalizedSectionsProps) {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const L = P.mainCardLabels;
  const S = PANCHANG_SECTIONS;
  const weekVal = panchang.weekday ?? panchang.eng_weekday;
  const mainRows = [
    { label: L.weekDay, value: weekVal },
    { label: L.nakshatram, value: formatPanchangSegmentValue(panchang.nakshathra, P) },
    { label: L.thithi, value: formatPanchangSegmentValue(panchang.thithi, P) },
    { label: L.karna, value: formatPanchangKarnaValue(panchang.karna, P) },
    { label: L.yoga, value: formatPanchangSegmentValue(panchang.yoga, P) },
  ].filter((r) => r.value?.trim());
  const visibleMain = mainRows.length;

  return (
    <div className={S.stack}>
      <PanchangDateRibbon panchang={panchang} />

      <div className={S.upperGrid}>
        <div className={S.columnStack}>
          <div className={S.card}>
            {mainRows.map((row, i) => (
              <PanchangDottedRow
                key={row.label}
                label={row.label}
                value={row.value}
                isLast={i === visibleMain - 1}
              />
            ))}
          </div>
        </div>

        <div className={S.rightColumn}>
          <PanchangBalaPair panchang={panchang} />
          <PanchangSunTimeGrid sunrise={panchang.sunrise} sunset={panchang.sunset} />
          <PanchangExtendedTimingCard
            panchang={panchang}
            variant="primary"
            className={S.rightTimingCard}
          />
        </div>
      </div>

      <PanchangExtendedTimingCard panchang={panchang} className={S.mobileTimingCard} />
      <PanchangExtendedTimingCard
        panchang={panchang}
        variant="secondary"
        className={S.desktopSecondaryTimingCard}
      />
    </div>
  );
}
