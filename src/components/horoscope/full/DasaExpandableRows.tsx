"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { dasaEntryKey, formatDasaDate } from "@/lib/format-dasa-date";
import {
  DASA_ANTRA_WRAP,
  DASA_COL_COUNT,
  DASA_SUB_LABEL,
  DASA_SUB_TABLE,
  DASA_SUB_TD,
  DASA_SUB_TH,
  DASA_SUB_WRAP,
} from "@/components/horoscope/full/dasa-table-styles";
import type { DasaEntry } from "@/types";

interface RowProps {
  entry: DasaEntry;
  isExpanded: boolean;
  onToggle: () => void;
  hasChildren: boolean;
}

function PeriodRow({ entry, isExpanded, onToggle, hasChildren }: RowProps) {
  const isRunning = entry.isRunning;
  return (
    <tr
      onClick={hasChildren ? onToggle : undefined}
      className={cn(
        "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] transition-colors last:border-0",
        hasChildren && "cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_5%,white)]",
        isExpanded && "bg-[color-mix(in_srgb,var(--color-brand-primary)_6%,white)]",
        isRunning && !isExpanded && "bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)]"
      )}
    >
      <td className="w-8 px-2 py-2.5 text-center text-[var(--color-brand-primary)]">
        {hasChildren ? (
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_12%,white)] text-xs font-bold">
            {isExpanded ? "▾" : "▸"}
          </span>
        ) : (
          <span className="inline-block size-5" />
        )}
      </td>
      <td className={cn("px-3 py-2 text-xs font-semibold sm:text-sm", isRunning ? "text-[var(--color-brand-primary)]" : "text-[var(--color-brand-black)]")}>
        {entry.name}
      </td>
      <td className={cn("px-3 py-2 text-xs whitespace-nowrap sm:text-sm", isRunning && "font-medium text-[var(--color-brand-primary)]")}>
        {formatDasaDate(entry.startDate)}
      </td>
      <td className={cn("px-3 py-2 text-xs whitespace-nowrap sm:text-sm", isRunning && "font-medium text-[var(--color-brand-primary)]")}>
        {formatDasaDate(entry.endDate)}
      </td>
      <td className="px-3 py-2 text-center text-xs sm:text-sm">
        {isRunning && (
          <span className="rounded-full bg-[var(--color-brand-primary)] px-2 py-0.5 text-[10px] font-bold text-white">
            {HOROSCOPE_SCREEN.dasaActiveBadge}
          </span>
        )}
      </td>
    </tr>
  );
}

interface DasaRowsProps {
  dasa: DasaEntry;
  dasaOpen: boolean;
  expandedBuktiKey: string | null;
  onToggleDasa: () => void;
  onToggleBukti: (entry: DasaEntry) => void;
}

export function DasaExpandableRows({ dasa, dasaOpen, expandedBuktiKey, onToggleDasa, onToggleBukti }: DasaRowsProps) {
  const hasBukti = dasa.subDasa.length > 0;
  return (
    <>
      <PeriodRow entry={dasa} isExpanded={dasaOpen} onToggle={onToggleDasa} hasChildren={hasBukti} />
      {dasaOpen && hasBukti && (
        <tr>
          <td colSpan={DASA_COL_COUNT} className="p-0">
            <div className={DASA_SUB_WRAP}>
              <p className={DASA_SUB_LABEL}>{HOROSCOPE_SCREEN.dasaLevelBukti}</p>
              <table className={DASA_SUB_TABLE}>
                <thead>
                  <tr>
                    <th className={cn(DASA_SUB_TH, "w-7")} aria-hidden />
                    <th className={DASA_SUB_TH}>{HOROSCOPE_SCREEN.dasaColPlanet}</th>
                    <th className={DASA_SUB_TH}>{HOROSCOPE_SCREEN.dasaColStart}</th>
                    <th className={DASA_SUB_TH}>{HOROSCOPE_SCREEN.dasaColEnd}</th>
                    <th className={cn(DASA_SUB_TH, "text-center")}>{HOROSCOPE_SCREEN.dasaColStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {dasa.subDasa.map((bukti) => (
                    <BuktiRows
                      key={dasaEntryKey(bukti)}
                      bukti={bukti}
                      buktiOpen={expandedBuktiKey === dasaEntryKey(bukti)}
                      onToggle={() => onToggleBukti(bukti)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function BuktiRows({ bukti, buktiOpen, onToggle }: { bukti: DasaEntry; buktiOpen: boolean; onToggle: () => void }) {
  const hasAntra = bukti.subDasa.length > 0;
  const isRunning = bukti.isRunning;
  return (
    <>
      <tr
        onClick={hasAntra ? onToggle : undefined}
        className={cn(
          "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_10%,transparent)] last:border-0",
          hasAntra && "cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_4%,white)]",
          buktiOpen && "bg-[color-mix(in_srgb,var(--color-brand-primary)_5%,white)]",
          isRunning && !buktiOpen && "bg-[color-mix(in_srgb,var(--color-brand-primary)_7%,white)]"
        )}
      >
        <td className="w-7 px-1.5 py-1.5 text-center text-[var(--color-brand-primary)]">
          {hasAntra ? <span className="text-[10px] font-bold">{buktiOpen ? "▾" : "▸"}</span> : null}
        </td>
        <td className={cn(DASA_SUB_TD, "font-semibold", isRunning && "text-[var(--color-brand-primary)]")}>{bukti.name}</td>
        <td className={cn(DASA_SUB_TD, "whitespace-nowrap")}>{formatDasaDate(bukti.startDate)}</td>
        <td className={cn(DASA_SUB_TD, "whitespace-nowrap")}>{formatDasaDate(bukti.endDate)}</td>
        <td className={cn(DASA_SUB_TD, "text-center")}>
          {isRunning && (
            <span className="rounded-full bg-[var(--color-brand-primary)] px-1.5 py-0.5 text-[9px] font-bold text-white">
              {HOROSCOPE_SCREEN.dasaActiveBadge}
            </span>
          )}
        </td>
      </tr>
      {buktiOpen && hasAntra && (
        <tr>
          <td colSpan={DASA_COL_COUNT} className="p-0">
            <div className={DASA_ANTRA_WRAP}>
              <p className={DASA_SUB_LABEL}>{HOROSCOPE_SCREEN.dasaLevelAntra}</p>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={DASA_SUB_TH}>{HOROSCOPE_SCREEN.dasaColPlanet}</th>
                    <th className={DASA_SUB_TH}>{HOROSCOPE_SCREEN.dasaColStart}</th>
                    <th className={DASA_SUB_TH}>{HOROSCOPE_SCREEN.dasaColEnd}</th>
                    <th className={cn(DASA_SUB_TH, "text-center")}>{HOROSCOPE_SCREEN.dasaColStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {bukti.subDasa.map((antra) => (
                    <tr key={dasaEntryKey(antra)} className="border-b border-[color-mix(in_srgb,var(--color-brand-primary)_8%,transparent)] last:border-0">
                      <td className={cn(DASA_SUB_TD, "font-semibold", antra.isRunning && "text-[var(--color-brand-primary)]")}>{antra.name}</td>
                      <td className={cn(DASA_SUB_TD, "whitespace-nowrap")}>{formatDasaDate(antra.startDate)}</td>
                      <td className={cn(DASA_SUB_TD, "whitespace-nowrap")}>{formatDasaDate(antra.endDate)}</td>
                      <td className={cn(DASA_SUB_TD, "text-center")}>
                        {antra.isRunning && (
                          <span className="rounded-full bg-[var(--color-brand-primary)] px-1.5 py-0.5 text-[9px] font-bold text-white">
                            {HOROSCOPE_SCREEN.dasaActiveBadge}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
