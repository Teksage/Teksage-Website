/**
 * Internal table components for the More section sub-tabs.
 * Kept separate to respect the 200-line file limit.
 */
"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { buildBhavaRows } from "@/lib/format-bhava-position";
import { buildPlanetaryRows } from "@/lib/format-planetary-position";
import type {
  SpecialLagnaPayload,
  ShadbalaPayload,
  BhavaPositionPayload,
  PlanetaryPositionPayload,
  FullHoroscopeSection,
} from "@/types";

const TH = "bg-[var(--color-brand-panchang)] px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-white";
const TD = "px-3 py-2 text-xs text-[var(--color-brand-black)]";
const TR = "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0";
const TABLE = "w-full border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm";
const LABEL_COL = "font-semibold text-[var(--color-brand-panchang)]";
const PLACEHOLDER = "py-8 text-center text-xs text-black/40";

function Placeholder({ section }: { section: { isLoading: boolean; error: string | null } }) {
  if (section.isLoading) return <p className={PLACEHOLDER}>{HOROSCOPE_SCREEN.loadingLabel}</p>;
  if (section.error) return <p className={PLACEHOLDER}>{section.error}</p>;
  return <p className={PLACEHOLDER}>{HOROSCOPE_SCREEN.errorLoadLabel}</p>;
}

/** Planetary Positions — Astrosoft columns: Planet, Longitude, Rasi, Nakshathra Pada, Jaimini Karaka. */
export function PlanetsTable({ section }: { section: FullHoroscopeSection<PlanetaryPositionPayload> }) {
  const rows = buildPlanetaryRows(section.data);
  if (section.isLoading || section.error) return <Placeholder section={section} />;
  if (!rows.length) return <Placeholder section={section} />;

  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionPlanetaryPositions}
      </p>
      <table className={TABLE}>
        <thead>
          <tr>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colPlanet}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colLongitude}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colRasi}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colNakshatraPada}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colJaiminiKaraka}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.planet} className={TR}>
              <td
                className={cn(
                  TD,
                  "font-semibold",
                  r.highlight ? "text-[var(--color-brand-primary)]" : LABEL_COL
                )}
              >
                {r.planet}
                {r.isRetro ? HOROSCOPE_SCREEN.retroSuffix : ""}
              </td>
              <td className={cn(TD, "whitespace-nowrap", r.highlight && "text-[var(--color-brand-primary)]")}>
                {r.longitude}
              </td>
              <td className={cn(TD, r.highlight && "text-[var(--color-brand-primary)]")}>{r.rasi}</td>
              <td className={cn(TD, "whitespace-nowrap", r.highlight && "text-[var(--color-brand-primary)]")}>
                {r.nakshatraPada}
              </td>
              <td className={cn(TD, r.highlight && "text-[var(--color-brand-primary)]")}>
                {r.jaiminiKaraka}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Bhava Positions — Astrosoft columns: House, Bhava, Start, Mid, End, Length. */
export function BhavaTable({ section }: { section: FullHoroscopeSection<BhavaPositionPayload> }) {
  const rows = buildBhavaRows(section.data);
  if (section.isLoading || section.error) return <Placeholder section={section} />;
  if (!rows.length) return <Placeholder section={section} />;

  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionBhavaPositions}
      </p>
      <table className={TABLE}>
        <thead>
          <tr>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colHouse}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colBhava}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colStart}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colMid}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colEnd}</th>
            <th className={cn(TH, "text-center")}>{HOROSCOPE_SCREEN.colLength}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.house} className={TR}>
              <td className={cn(TD, LABEL_COL, "text-center")}>{r.house}</td>
              <td className={cn(TD, "text-center")}>{r.bhava}</td>
              <td className={cn(TD, "whitespace-nowrap text-center")}>{r.start}</td>
              <td className={cn(TD, "whitespace-nowrap text-center")}>{r.mid}</td>
              <td className={cn(TD, "whitespace-nowrap text-center")}>{r.end}</td>
              <td className={cn(TD, "whitespace-nowrap text-center")}>{r.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Shadbala table — Ishta Phala & Kashta Phala per planet. */
export function ShadbalaTable({ section }: { section: FullHoroscopeSection<ShadbalaPayload> }) {
  const d = section.data;
  const rows = d ? Object.entries(d).filter(([, v]) => typeof v === "object" && v !== null) : [];
  if (!rows.length) return <Placeholder section={section} />;
  return (
    <div className="overflow-x-auto">
      <table className={TABLE}>
        <thead>
          <tr>
            <th className={TH}>{HOROSCOPE_SCREEN.colPlanet}</th>
            <th className={TH}>{HOROSCOPE_SCREEN.colIshta}</th>
            <th className={TH}>{HOROSCOPE_SCREEN.colKashta}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([planet, entry]) => {
            const e = entry as Record<string, unknown>;
            return (
              <tr key={planet} className={TR}>
                <td className={cn(TD, LABEL_COL)}>{planet}</td>
                <td className={TD}>{typeof e.ishtaPhala === "number" ? e.ishtaPhala.toFixed(2) : "—"}</td>
                <td className={TD}>{typeof e.kashtaPhala === "number" ? e.kashtaPhala.toFixed(2) : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Special Lagna table. */
export function SpecialLagnaTable({ section }: { section: FullHoroscopeSection<SpecialLagnaPayload> }) {
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
    <div className="overflow-x-auto">
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
    </div>
  );
}
