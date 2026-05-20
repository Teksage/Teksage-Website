"use client";

import { useI18nConstants } from "@/hooks/useT";
import { PANCHANG_SCREEN, PANCHANG_SECTIONS } from "@/lib/constants";
import { formatPanchangSegmentValue } from "@/lib/panchang-detail-format";
import type { PanchangExtendedTimingCardProps } from "@/types";

export function PanchangExtendedTimingCard({ panchang }: PanchangExtendedTimingCardProps) {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const R = P.rowLabels;
  const auspicious = panchang.auspiciousTime?.filter((t) => t?.trim()) ?? [];
  const auspiciousBody = auspicious.length ? auspicious.join("\n") : undefined;
  const amirthathi = formatPanchangSegmentValue(panchang.amirthathiYoga, P);

  const rows = [
    { label: R.rahuKala, value: panchang.rahuKala },
    { label: R.yamaKanda, value: panchang.yamaKanda },
    { label: R.auspiciousTime, value: auspiciousBody },
    { label: R.paksha, value: panchang.paksha },
    { label: R.amirthathiYoga, value: amirthathi },
  ].filter((r) => r.value?.trim());
  const n = rows.length;
  if (!n) return null;

  return (
    <div className={PANCHANG_SECTIONS.card}>
      {rows.map((row, i) => (
        <div key={row.label}>
          <div className="flex items-start justify-between gap-3 py-2.5 text-sm">
            <span className="w-1/3 shrink-0 font-semibold text-[var(--color-brand-panchang)]">
              {row.label}
            </span>
            <span className="min-w-0 flex-1 whitespace-pre-line text-right font-medium leading-snug text-[var(--color-brand-black)]">
              {row.value}
            </span>
          </div>
          {i < n - 1 ? (
            <div
              className="border-b border-dashed border-[var(--color-panchang-row-divider)]"
              aria-hidden
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
