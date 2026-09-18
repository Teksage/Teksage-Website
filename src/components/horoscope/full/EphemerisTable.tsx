/**
 * Astrosoft Ephemeris — month picker, Daily/Monthly, Date|Sun…Ketu table.
 */
"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
import { useEphemeris } from "@/hooks/useEphemeris";
import { useI18nConstants, useT } from "@/hooks/useT";
import {
  ephemerisFirstColLabel,
  ephemerisMonthLabel,
  ephemerisTitle,
} from "@/lib/format-ephemeris";
import type { EphemerisMode } from "@/types";

const TH =
  "bg-[var(--color-brand-panchang)] px-1 py-3 text-center text-micro font-bold uppercase tracking-wide text-white sm:text-xs";
const TD =
  "whitespace-nowrap px-1.5 py-3 text-center text-micro font-medium tabular-nums text-[var(--color-brand-black)] sm:text-xs";
const TD_DATE =
  "sticky left-0 z-[1] whitespace-nowrap bg-white px-2 py-3 text-center text-micro font-bold tabular-nums text-[var(--color-brand-black)] sm:text-xs";
const TH_DATE = cn(TH, "sticky left-0 z-[2]");
const TR =
  "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0";
const TABLE = "w-full min-w-[36rem] border-collapse bg-white sm:min-w-[44rem]";
const PLACEHOLDER = "py-8 text-center text-xs text-black/50";
const CTRL =
  "rounded-md border border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)] bg-white px-2 py-1.5 text-xs font-semibold text-[var(--color-brand-black)]";
const NAV_BTN = cn(CTRL, "min-w-[2rem] px-2 text-base leading-none");
const MODE_BTN = "min-w-0 flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors sm:flex-none";

function shiftMonth(year: number, month: number, delta: number) {
  const d = new Date(year, month - 1 + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

export function EphemerisTable() {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const { t } = useT();
  const now = useMemo(() => new Date(), []);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [mode, setMode] = useState<EphemerisMode>("daily");
  const { data, isLoading, isRefreshing, error } = useEphemeris(year, month, mode);
  const planets = data?.planets ?? [...HOROSCOPE_SCREEN.ephemerisPlanets];
  const firstCol = ephemerisFirstColLabel(mode, {
    month: H.ephemerisColMonth,
    date: H.ephemerisColDate,
  });
  const yearSpan = HOROSCOPE_SCREEN.ephemerisYearSpan;
  const years = useMemo(
    () => Array.from({ length: yearSpan * 2 + 1 }, (_, i) => now.getFullYear() - yearSpan + i),
    [now, yearSpan]
  );

  const step = (delta: number) => {
    if (mode === "monthly") setYear((y) => y + delta);
    else {
      const n = shiftMonth(year, month, delta);
      setYear(n.year);
      setMonth(n.month);
    }
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <div className={HOROSCOPE_LAYOUT.toolbarMobile}>
        <div className="flex items-center justify-center gap-1 sm:justify-start">
          <button
            type="button"
            className={NAV_BTN}
            aria-label={H.ephemerisPrevLabel}
            disabled={isRefreshing}
            onClick={() => step(-1)}
          >
            {H.ephemerisPrevSymbol}
          </button>
          {mode === "daily" ? (
            <select
              className={cn(CTRL, "min-w-[4.5rem]")}
              aria-label={H.ephemerisMonthAria}
              value={month}
              disabled={isRefreshing}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {H.ephemerisMonths.map((label, i) => (
                <option key={label} value={i + 1}>
                  {label}
                </option>
              ))}
            </select>
          ) : null}
          <select
            className={cn(CTRL, "min-w-[4.25rem]")}
            aria-label={H.ephemerisYearAria}
            value={year}
            disabled={isRefreshing}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={NAV_BTN}
            aria-label={H.ephemerisNextLabel}
            disabled={isRefreshing}
            onClick={() => step(1)}
          >
            {H.ephemerisNextSymbol}
          </button>
        </div>

        <p className="order-first text-center text-xs font-bold text-[var(--color-brand-black)] sm:order-none sm:flex-1 sm:text-sm">
          {data
            ? ephemerisTitle(data, {
                fallback: H.tabEphemeris,
                prefix: H.ephemerisTitlePrefix,
                at: H.ephemerisTitleAt,
              })
            : ephemerisMonthLabel(month, year, H.ephemerisMonths)}
        </p>

        <div className="flex w-full items-center gap-1 rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white p-1 sm:w-auto">
          {(["daily", "monthly"] as const).map((m) => (
            <button
              key={m}
              type="button"
              disabled={isRefreshing}
              onClick={() => setMode(m)}
              className={cn(
                MODE_BTN,
                mode === m
                  ? "bg-[var(--color-brand-primary)] text-white"
                  : "text-[var(--color-brand-black)]"
              )}
            >
              {m === "daily"
                ? H.ephemerisModeDaily
                : H.ephemerisModeMonthly}
            </button>
          ))}
        </div>
      </div>

      {isLoading && !data ? (
        <p className={PLACEHOLDER}>{H.ephemerisLoading}</p>
      ) : error && !data ? (
        <p className={PLACEHOLDER}>{H.ephemerisError}</p>
      ) : data ? (
        <div className="scrollbar-hidden relative max-h-[70vh] overflow-auto rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] shadow-sm sm:max-h-[28rem]">
          {isRefreshing ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
              <p className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-black)] shadow-sm">
                {H.ephemerisUpdating}
              </p>
            </div>
          ) : null}
          <table className={cn(TABLE, isRefreshing && "opacity-60")}>
            <thead className="sticky top-0 z-10">
              <tr>
                <th className={TH_DATE}>{firstCol}</th>
                {planets.map((p) => (
                  <th key={p} className={TH}>
                    {t(p)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={`${row.index}-${row.label}`} className={TR}>
                  <td className={TD_DATE}>{row.label}</td>
                  {planets.map((p) => (
                    <td key={p} className={TD}>
                      {row.planets[p]?.text ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
