"use client";

import { useMemo, useState } from "react";
import { DasaIcon } from "@/components/horoscope/full/FullHoroscopeIcons";
import { DasaExpandableTable } from "@/components/horoscope/full/DasaExpandableTable";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { dasaEntryKey, formatDasaDate } from "@/lib/format-dasa-date";
import type { DasaEntry, DasaPayload, FullHoroscopeSection } from "@/types";

interface Props {
  section: FullHoroscopeSection<DasaPayload>;
  className?: string;
}

type DasaFilter = "all" | "running";

interface RunningPath {
  dasa?: DasaEntry;
  bukti?: DasaEntry;
  antra?: DasaEntry;
}

function findRunningPath(entries: DasaEntry[]): RunningPath {
  for (const dasa of entries) {
    if (dasa.isRunning) {
      const bukti = dasa.subDasa.find((s) => s.isRunning);
      const antra = bukti?.subDasa.find((a) => a.isRunning);
      return { dasa, bukti, antra };
    }
    for (const bukti of dasa.subDasa) {
      if (bukti.isRunning) {
        const antra = bukti.subDasa.find((a) => a.isRunning);
        return { dasa, bukti, antra };
      }
      for (const antra of bukti.subDasa) {
        if (antra.isRunning) return { dasa, bukti, antra };
      }
    }
  }
  return {};
}

function inRunningChain(entry: DasaEntry): boolean {
  return entry.isRunning || entry.subDasa.some(inRunningChain);
}

function filterTopLevel(entries: DasaEntry[], filter: DasaFilter): DasaEntry[] {
  if (filter === "all") return entries;
  return entries.filter(inRunningChain);
}

/** Dasa table with inline expandable Bukti / Antra sub-tables below each row. */
export function DasaTableSection({ section, className }: Props) {
  const entries = section.data?.dasaInfo ?? [];
  const runningPath = useMemo(() => findRunningPath(entries), [entries]);

  const [filter, setFilter] = useState<DasaFilter>("all");
  const [expandKey, setExpandKey] = useState(0);

  const visibleDasas = filterTopLevel(entries, filter);
  const initialDasaKey = runningPath.dasa ? dasaEntryKey(runningPath.dasa) : null;
  const initialBuktiKey = runningPath.bukti ? dasaEntryKey(runningPath.bukti) : null;

  function goToCurrent() {
    setExpandKey((k) => k + 1);
  }

  if (section.isLoading) {
    return <p className="py-10 text-center text-sm text-black/50">{HOROSCOPE_SCREEN.loadingLabel}</p>;
  }
  if (section.error || !entries.length) {
    return <p className="py-10 text-center text-sm text-red-500">{section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}</p>;
  }

  const bannerParts = [runningPath.dasa?.name, runningPath.bukti?.name, runningPath.antra?.name].filter(Boolean);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {runningPath.dasa && (
        <div className="flex items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-primary)_6%,white)] px-4 py-3">
          <DasaIcon className="size-5 shrink-0 text-[var(--color-brand-primary)]" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[var(--color-brand-panchang)]">{HOROSCOPE_SCREEN.currentDasaLabel}</p>
            <p className="text-sm font-bold text-[var(--color-brand-primary)]">{bannerParts.join(" › ")}</p>
            <p className="text-xs text-black/50">
              {formatDasaDate(runningPath.dasa.startDate)} — {formatDasaDate(runningPath.dasa.endDate)}
            </p>
          </div>
          <button
            type="button"
            onClick={goToCurrent}
            className="shrink-0 rounded-full border border-[var(--color-brand-primary)] px-3 py-1.5 text-[10px] font-bold text-[var(--color-brand-primary)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)]"
          >
            {HOROSCOPE_SCREEN.dasaViewCurrent}
          </button>
        </div>
      )}

      <p className="text-xs text-black/50">{HOROSCOPE_SCREEN.dasaTableHint}</p>

      <div className="flex gap-2">
        {(["all", "running"] as DasaFilter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
              filter === f
                ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] text-white"
                : "border-[color-mix(in_srgb,var(--color-brand-primary)_40%,transparent)] text-[var(--color-brand-panchang)]"
            )}
          >
            {f === "all" ? HOROSCOPE_SCREEN.dasaFilterAll : HOROSCOPE_SCREEN.dasaFilterRunning}
          </button>
        ))}
      </div>

      <DasaExpandableTable
        key={expandKey}
        entries={visibleDasas}
        initialDasaKey={initialDasaKey}
        initialBuktiKey={initialBuktiKey}
      />
    </div>
  );
}
