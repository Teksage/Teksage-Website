/**
 * Planets / Bhava / Special Lagna tables for Full Horoscope.
 */
"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { FullHoroscopeTableScroll } from "@/components/horoscope/full/FullHoroscopeTableScroll";
import { buildBhavaRows } from "@/lib/format-bhava-position";
import { buildPlanetaryRows } from "@/lib/format-planetary-position";
import type {
  SpecialLagnaPayload,
  BhavaPositionPayload,
  PlanetaryPositionPayload,
  FullHoroscopeSection,
} from "@/types";

const TH =
  "bg-[var(--color-brand-panchang)] px-2 py-3 text-center text-[10px] font-bold uppercase tracking-wide text-white sm:px-3 sm:text-xs";
const TD =
  "px-2 py-3 text-center text-[10px] text-[var(--color-brand-black)] sm:px-3 sm:text-xs";
const TR =
  "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0";
const TABLE =
  "w-full min-w-[20rem] border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm";
const LABEL_COL = "font-semibold text-[var(--color-brand-panchang)]";
const PLACEHOLDER = "py-8 text-center text-xs text-black/40";
const STICKY_TH = cn(TH, "sticky left-0 z-[2]");
const STICKY_TD = "sticky left-0 z-[1] bg-white";

function Placeholder({ section }: { section: { isLoading: boolean; error: string | null } }) {
  if (section.isLoading) return <p className={PLACEHOLDER}>{HOROSCOPE_SCREEN.loadingLabel}</p>;
  if (section.error) return <p className={PLACEHOLDER}>{section.error}</p>;
  return <p className={PLACEHOLDER}>{HOROSCOPE_SCREEN.errorLoadLabel}</p>;
}

/** Planetary Positions — Astrosoft columns. */
export function PlanetsTable({
  section,
}: {
  section: FullHoroscopeSection<PlanetaryPositionPayload>;
}) {
  const rows = buildPlanetaryRows(section.data);
  if (section.isLoading || section.error) return <Placeholder section={section} />;
  if (!rows.length) return <Placeholder section={section} />;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionPlanetaryPositions}
      </p>
      <FullHoroscopeTableScroll>
        <table className={cn(TABLE, "min-w-[32rem]")}>
          <thead>
            <tr>
              <th className={STICKY_TH}>{HOROSCOPE_SCREEN.colPlanet}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colLongitude}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colRasi}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colNakshatraPada}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colJaiminiKaraka}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.planet} className={TR}>
                <td
                  className={cn(
                    TD,
                    STICKY_TD,
                    "font-semibold",
                    r.highlight ? "text-[var(--color-brand-primary)]" : LABEL_COL
                  )}
                >
                  {r.planet}
                  {r.isRetro ? HOROSCOPE_SCREEN.retroSuffix : ""}
                </td>
                <td
                  className={cn(
                    TD,
                    "whitespace-nowrap",
                    r.highlight && "text-[var(--color-brand-primary)]"
                  )}
                >
                  {r.longitude}
                </td>
                <td className={cn(TD, r.highlight && "text-[var(--color-brand-primary)]")}>
                  {r.rasi}
                </td>
                <td
                  className={cn(
                    TD,
                    "whitespace-nowrap",
                    r.highlight && "text-[var(--color-brand-primary)]"
                  )}
                >
                  {r.nakshatraPada}
                </td>
                <td className={cn(TD, r.highlight && "text-[var(--color-brand-primary)]")}>
                  {r.jaiminiKaraka}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FullHoroscopeTableScroll>
    </div>
  );
}

/** Bhava Positions — Astrosoft columns. */
export function BhavaTable({
  section,
}: {
  section: FullHoroscopeSection<BhavaPositionPayload>;
}) {
  const rows = buildBhavaRows(section.data);
  if (section.isLoading || section.error) return <Placeholder section={section} />;
  if (!rows.length) return <Placeholder section={section} />;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionBhavaPositions}
      </p>
      <FullHoroscopeTableScroll>
        <table className={cn(TABLE, "min-w-[28rem]")}>
          <thead>
            <tr>
              <th className={STICKY_TH}>{HOROSCOPE_SCREEN.colHouse}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colBhava}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colStart}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colMid}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colEnd}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colLength}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.house} className={TR}>
                <td className={cn(TD, STICKY_TD, LABEL_COL)}>{r.house}</td>
                <td className={TD}>{r.bhava}</td>
                <td className={cn(TD, "whitespace-nowrap")}>{r.start}</td>
                <td className={cn(TD, "whitespace-nowrap")}>{r.mid}</td>
                <td className={cn(TD, "whitespace-nowrap")}>{r.end}</td>
                <td className={cn(TD, "whitespace-nowrap")}>{r.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FullHoroscopeTableScroll>
    </div>
  );
}

/** Special Lagna table. */
export function SpecialLagnaTable({
  section,
}: {
  section: FullHoroscopeSection<SpecialLagnaPayload>;
}) {
  const d = section.data;
  const rows = d
    ? Object.entries(d).map(([k, v]) => ({
        key: k.replace(/([A-Z])/g, " $1").trim(),
        sign: (v as { sign?: string })?.sign ?? "—",
        degree: (v as { degree?: number | string })?.degree ?? "",
      }))
    : [];
  if (!rows.length) return <Placeholder section={section} />;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionSpecialLagna}
      </p>
      <FullHoroscopeTableScroll>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>{HOROSCOPE_SCREEN.colLagna}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colSign}</th>
              <th className={TH}>{HOROSCOPE_SCREEN.colDegree}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className={TR}>
                <td className={cn(TD, LABEL_COL)}>{r.key}</td>
                <td className={TD}>{r.sign}</td>
                <td className={TD}>{r.degree ? `${r.degree}°` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FullHoroscopeTableScroll>
    </div>
  );
}
