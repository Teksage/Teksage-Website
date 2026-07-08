"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { MuhurthaDayRow } from "@/components/muhurtha/MuhurthaDayRow";
import { Button } from "@/components/ui/button";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN } from "@/lib/constants";
import type { MuhurthaResultsViewProps } from "@/types";

function formatRange(start: string, end: string) {
  const s = new Date(`${start}T12:00:00`);
  const e = new Date(`${end}T12:00:00`);
  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  return `${fmt(s)} – ${fmt(e)}`;
}

export function MuhurthaResultsView({ result, onBack }: MuhurthaResultsViewProps) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const { t } = useT();
  const rows = result.days?.length ? result.days : result.dates;
  const hasSuitable = rows.some((day) => day.is_suitable);

  if (!rows.length) {
    return (
      <div className={L.resultsRoot}>
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-black/[0.05]">
          <h2 className="text-lg font-bold text-[var(--color-brand-black)]">{M.emptyTitle}</h2>
          <p className="mt-2 text-sm text-[var(--color-brand-black)]/70">{M.emptyDescription}</p>
          <Button type="button" className="mt-6 rounded-full" variant="outline" onClick={onBack}>
            {M.backToFormCta}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={L.resultsRoot}>
      <div className={L.resultsHeader}>
        <h2 className={L.resultsTitle}>
          {M.resultsTitle} — {t(result.event)}
        </h2>
        <p className={L.resultsRange}>{formatRange(result.start_date, result.end_date)}</p>
        <p className={L.resultsRange}>{result.location}</p>
        {!hasSuitable ? (
          <p className="text-sm text-[var(--color-brand-black)]/65">{M.emptyDescription}</p>
        ) : null}
        <Button type="button" variant="outline" className="mt-2 w-fit rounded-full" onClick={onBack}>
          {M.backToFormCta}
        </Button>
      </div>

      <div className={L.tableCard}>
        <div className={L.tableHead}>
          <span className={L.tableHeadCell}>{M.dateColumn}</span>
          <span className={L.tableHeadCell}>{M.statusColumn}</span>
          <span className={L.tableHeadCell}>{M.detailsColumn}</span>
        </div>
        {rows.map((day) => (
          <MuhurthaDayRow key={day.iso_date} day={day} />
        ))}
      </div>
    </div>
  );
}
