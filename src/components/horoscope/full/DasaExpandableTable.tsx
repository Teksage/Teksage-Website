"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { dasaEntryKey } from "@/lib/format-dasa-date";
import { DasaExpandableRows } from "@/components/horoscope/full/DasaExpandableRows";
import type { DasaEntry } from "@/types";

interface Props {
  entries: DasaEntry[];
  initialDasaKey?: string | null;
  initialBuktiKey?: string | null;
  className?: string;
}

const TH =
  "bg-[var(--color-brand-panchang)] px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs";
const TABLE =
  "w-full border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm";

/** Inline expandable Dasa table — sub-tables open below the clicked row. */
export function DasaExpandableTable({ entries, initialDasaKey, initialBuktiKey, className }: Props) {
  const [expandedDasaKey, setExpandedDasaKey] = useState<string | null>(initialDasaKey ?? null);
  const [expandedBuktiKey, setExpandedBuktiKey] = useState<string | null>(initialBuktiKey ?? null);

  function toggleDasa(entry: DasaEntry) {
    const key = dasaEntryKey(entry);
    if (expandedDasaKey === key) {
      setExpandedDasaKey(null);
      setExpandedBuktiKey(null);
      return;
    }
    setExpandedDasaKey(key);
    setExpandedBuktiKey(null);
  }

  function toggleBukti(entry: DasaEntry) {
    const key = dasaEntryKey(entry);
    setExpandedBuktiKey(expandedBuktiKey === key ? null : key);
  }

  if (!entries.length) {
    return <p className="py-10 text-center text-sm text-black/40">{HOROSCOPE_SCREEN.dasaEmptyDasa}</p>;
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className={TABLE}>
        <thead>
          <tr>
            <th className={cn(TH, "w-8 text-center")} aria-hidden />
            <th className={TH}>{HOROSCOPE_SCREEN.dasaColPlanet}</th>
            <th className={TH}>{HOROSCOPE_SCREEN.dasaColStart}</th>
            <th className={TH}>{HOROSCOPE_SCREEN.dasaColEnd}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.dasaColStatus}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((dasa) => (
            <DasaExpandableRows
              key={dasaEntryKey(dasa)}
              dasa={dasa}
              dasaOpen={expandedDasaKey === dasaEntryKey(dasa)}
              expandedBuktiKey={expandedBuktiKey}
              onToggleDasa={() => toggleDasa(dasa)}
              onToggleBukti={toggleBukti}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
