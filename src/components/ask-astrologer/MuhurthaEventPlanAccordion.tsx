"use client";

import { useState } from "react";
import { useI18nConstants, useT } from "@/hooks/useT";
import { MuhurthaDayRow } from "@/components/muhurtha/MuhurthaDayRow";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { formatMuhurthaDateRange } from "@/lib/muhurtha-format";
import type { MuhurthaResult } from "@/types/muhurtha";

export function MuhurthaEventPlanAccordion({ result }: { result: MuhurthaResult }) {
  const [open, setOpen] = useState(false);
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const { t, locale } = useT();
  const L = MUHURTHA_LAYOUT;
  const rows = result.days?.length ? result.days : result.dates ?? [];

  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-neutral-50/80">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
            {M.eventPlanAccordionLabel}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-[var(--color-brand-black)]">
            {t(result.event)}
            {result.start_date && result.end_date ? (
              <span className="ml-2 font-normal text-black/50">
                {formatMuhurthaDateRange(
                  result.start_date,
                  result.end_date,
                  bcp47FromAppLocale(locale)
                )}
              </span>
            ) : null}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 text-xs font-semibold text-[var(--color-brand-primary)] transition-opacity hover:opacity-80"
          )}
        >
          {open ? M.eventPlanAccordionCollapse : M.eventPlanAccordionExpand}
        </span>
      </button>

      {open ? (
        <div className="border-t border-black/10">
          <div className={cn(L.tableHead, "px-3 py-2 text-xs")}>
            <span className={L.tableHeadCell}>{M.dateColumn}</span>
            <span className={L.tableHeadCell}>{M.statusColumn}</span>
            <span className={L.tableHeadDetails}>{M.detailsColumn}</span>
          </div>
          {rows.map((day) => (
            <MuhurthaDayRow key={day.iso_date} day={day} />
          ))}
          {result.location ? (
            <p className="border-t border-black/5 px-4 py-2 text-xs text-black/40">
              {result.location}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
