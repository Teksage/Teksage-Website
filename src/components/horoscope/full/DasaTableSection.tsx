"use client";

import { useMemo, useState } from "react";
import { DasaIcon } from "@/components/horoscope/full/FullHoroscopeIcons";
import { DasaExpandableTable } from "@/components/horoscope/full/DasaExpandableTable";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
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
    return null;
  }
  if (section.error || !entries.length) {
    return <p className="py-10 text-center text-sm text-red-500">{section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}</p>;
  }

  const bannerParts = [runningPath.dasa?.name, runningPath.bukti?.name, runningPath.antra?.name].filter(Boolean);
  const periodEntry =
    runningPath.antra ?? runningPath.bukti ?? runningPath.dasa;
  const L = HOROSCOPE_LAYOUT;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {runningPath.dasa && periodEntry && (
        <div className={L.dasaBanner}>
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className={L.dasaBannerIconWrap}>
              <DasaIcon className="size-4" />
            </div>
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className={L.dasaBannerLabel}>{HOROSCOPE_SCREEN.currentDasaLabel}</p>
              <p className={L.dasaBannerPath}>{bannerParts.join(" › ")}</p>
              <p className={L.dasaBannerDates}>
                {formatDasaDate(periodEntry.startDate)} —{" "}
                {formatDasaDate(periodEntry.endDate)}
              </p>
            </div>
          </div>
          <button type="button" onClick={goToCurrent} className={L.dasaBannerCta}>
            {HOROSCOPE_SCREEN.dasaViewCurrent}
          </button>
        </div>
      )}

      <div className="flex w-full gap-2">
        {(["all", "running"] as DasaFilter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "min-w-0 flex-1 rounded-full border px-3 py-2 text-xs font-semibold transition-colors sm:flex-none sm:px-4 sm:py-1.5",
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
