"use client";

import { useI18nConstants } from "@/hooks/useT";
import { MUHURTHA_SCREEN } from "@/lib/constants";
import type { MuhurthaDayResult } from "@/types/muhurtha";

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <div className="flex items-start justify-between gap-3 border-b border-dashed border-[var(--color-panchang-row-divider)] py-2.5 text-sm last:border-b-0">
      <span className="w-2/5 shrink-0 font-semibold text-[var(--color-brand-panchang)]">
        {label}
      </span>
      <span className="min-w-0 flex-1 text-right font-medium text-[var(--color-brand-black)]">
        {value}
      </span>
    </div>
  );
}

export function MuhurthaDayDetailCard({ day }: { day: MuhurthaDayResult }) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = M.detailLabels;
  const thithiValue = day.thithi_ends ? `${day.thithi} (${day.thithi_ends})` : day.thithi;

  return (
    <div>
      <DetailRow label={L.weekday} value={day.weekday ?? ""} />
      <DetailRow label={L.nakshatra} value={day.nakshatra ?? ""} />
      <DetailRow label={L.thithi} value={thithiValue ?? ""} />
      <DetailRow label={L.tharaBala} value={String(day.thara_bala === 0 ? 9 : day.thara_bala ?? "")} />
      <DetailRow label={L.chandraBala} value={String(day.chandra_bala ?? "")} />
      <DetailRow label={L.yoga} value={day.amirthathi_yoga ?? ""} />
    </div>
  );
}
