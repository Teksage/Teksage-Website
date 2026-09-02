"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import type { DasaEntry, DasaPayload, FullHoroscopeSection } from "@/types";

interface Props {
  section: FullHoroscopeSection<DasaPayload>;
  className?: string;
}

const CELL = "px-3 py-2 text-sm";
const ROW_BASE = "cursor-pointer border-b border-[color-mix(in_srgb,var(--color-brand-primary)_20%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_6%,white)]";
const RUNNING = "font-semibold text-[var(--color-brand-primary)]";
const HEADER = "sticky top-0 bg-[var(--color-brand-panchang)] px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-white";
const TABLE = "w-full border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm";

function DasaRow({ entry, depth = 0 }: { entry: DasaEntry; depth?: number }) {
  const [open, setOpen] = useState(entry.isRunning);
  const hasChildren = entry.subDasa.length > 0;
  const indent = depth * 16;

  return (
    <>
      <tr
        className={cn(ROW_BASE, entry.isRunning && "bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)]")}
        onClick={() => hasChildren && setOpen((o) => !o)}
        aria-expanded={hasChildren ? open : undefined}
      >
        <td className={cn(CELL, entry.isRunning && RUNNING)} style={{ paddingLeft: `${indent + 12}px` }}>
          {hasChildren && (
            <span className="mr-1.5 text-[var(--color-brand-primary)]">{open ? "▾" : "▸"}</span>
          )}
          {entry.name}
        </td>
        <td className={cn(CELL, entry.isRunning && RUNNING)}>{entry.startDate}</td>
        <td className={cn(CELL, entry.isRunning && RUNNING)}>{entry.endDate}</td>
        <td className={cn(CELL, "text-center")}>
          {entry.isRunning && (
            <span className="rounded-full bg-[var(--color-brand-primary)] px-2 py-0.5 text-xs font-semibold text-white">
              Active
            </span>
          )}
        </td>
      </tr>
      {open && hasChildren &&
        entry.subDasa.map((child) => (
          <DasaRow key={`${child.name}-${child.startDate}`} entry={child} depth={depth + 1} />
        ))}
    </>
  );
}

/** Interactive Dasa → Bukti → Antra expandable table. Mirrors dasaTable.js logic. */
export function DasaTableSection({ section, className }: Props) {
  if (section.isLoading) {
    return <p className="py-10 text-center text-sm text-black/50">{HOROSCOPE_SCREEN.loadingLabel}</p>;
  }
  if (section.error || !section.data?.dasaInfo?.length) {
    return <p className="py-10 text-center text-sm text-red-500">{section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}</p>;
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className={TABLE}>
        <thead>
          <tr>
            <th className={HEADER}>Dasa / Period</th>
            <th className={HEADER}>Start</th>
            <th className={HEADER}>End</th>
            <th className={cn(HEADER, "text-center")}>Status</th>
          </tr>
        </thead>
        <tbody>
          {section.data.dasaInfo.map((entry) => (
            <DasaRow key={`${entry.name}-${entry.startDate}`} entry={entry} depth={0} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
