"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import type {
  SpecialLagnaPayload,
  ShadbalaPayload,
  BhavaPositionPayload,
  PlanetaryPositionPayload,
  FullHoroscopeSection,
} from "@/types";

interface MoreSectionProps {
  specialLagna: FullHoroscopeSection<SpecialLagnaPayload>;
  shadbala: FullHoroscopeSection<ShadbalaPayload>;
  bhavaPosition: FullHoroscopeSection<BhavaPositionPayload>;
  planetaryPosition: FullHoroscopeSection<PlanetaryPositionPayload>;
  className?: string;
}

const CARD = "rounded-2xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm overflow-hidden";
const CARD_TITLE = "bg-[var(--color-brand-panchang)] px-4 py-2.5 text-sm font-bold text-white";
const ROW = "flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] px-4 py-2.5 last:border-0";
const LABEL = "text-xs font-semibold text-[var(--color-brand-panchang)]";
const VALUE = "text-xs font-medium text-[var(--color-brand-black)]";

function SectionPlaceholder({ msg }: { msg: string }) {
  return <p className="px-4 py-3 text-xs text-black/40">{msg}</p>;
}

function SpecialLagnaCard({ section }: { section: FullHoroscopeSection<SpecialLagnaPayload> }) {
  const d = section.data;
  const rows = d ? Object.entries(d).map(([k, v]) => ({
    key: k.replace(/([A-Z])/g, " $1").trim(),
    sign: (v as { sign?: string })?.sign ?? "—",
    degree: (v as { degree?: number | string })?.degree ?? "",
  })) : [];

  return (
    <div className={CARD}>
      <p className={CARD_TITLE}>{HOROSCOPE_SCREEN.sectionSpecialLagna}</p>
      {section.isLoading && <SectionPlaceholder msg={HOROSCOPE_SCREEN.loadingLabel} />}
      {!section.isLoading && (section.error || !rows.length) && (
        <SectionPlaceholder msg={section.error ?? HOROSCOPE_SCREEN.errorLoadLabel} />
      )}
      {rows.map((r) => (
        <div key={r.key} className={ROW}>
          <span className={LABEL}>{r.key}</span>
          <span className={VALUE}>{r.sign}{r.degree ? ` · ${r.degree}°` : ""}</span>
        </div>
      ))}
    </div>
  );
}

function ShadbalaCard({ section }: { section: FullHoroscopeSection<ShadbalaPayload> }) {
  const d = section.data;
  const rows = d ? Object.entries(d).filter(([, v]) => typeof v === "object" && v !== null) : [];

  return (
    <div className={CARD}>
      <p className={CARD_TITLE}>{HOROSCOPE_SCREEN.sectionShadbala}</p>
      {section.isLoading && <SectionPlaceholder msg={HOROSCOPE_SCREEN.loadingLabel} />}
      {!section.isLoading && (section.error || !rows.length) && (
        <SectionPlaceholder msg={section.error ?? HOROSCOPE_SCREEN.errorLoadLabel} />
      )}
      {rows.map(([planet, entry]) => {
        const e = entry as Record<string, unknown>;
        const ishta = typeof e.ishtaPhala === "number" ? e.ishtaPhala.toFixed(1) : "—";
        const kashta = typeof e.kashtaPhala === "number" ? e.kashtaPhala.toFixed(1) : "—";
        return (
          <div key={planet} className={ROW}>
            <span className={LABEL}>{planet}</span>
            <span className={VALUE}>Ishta: {ishta} · Kashta: {kashta}</span>
          </div>
        );
      })}
    </div>
  );
}

function SimpleDataCard({ title, section }: { title: string; section: FullHoroscopeSection<BhavaPositionPayload | PlanetaryPositionPayload> }) {
  const d = section.data;
  const rows = d ? Object.entries(d).filter(([, v]) => typeof v === "object" && v !== null) : [];

  return (
    <div className={CARD}>
      <p className={CARD_TITLE}>{title}</p>
      {section.isLoading && <SectionPlaceholder msg={HOROSCOPE_SCREEN.loadingLabel} />}
      {!section.isLoading && (section.error || !rows.length) && (
        <SectionPlaceholder msg={section.error ?? HOROSCOPE_SCREEN.errorLoadLabel} />
      )}
      {rows.map(([key, entry]) => {
        const e = entry as Record<string, unknown>;
        const sign = typeof e.sign === "string" ? e.sign : "";
        const degree = typeof e.signPosition === "number" ? `${e.signPosition.toFixed(1)}°` : "";
        const isRetro = e.isRetro === true ? " (R)" : "";
        const detail = [sign, degree].filter(Boolean).join(" ") + isRetro;
        return (
          <div key={key} className={ROW}>
            <span className={LABEL}>{key}</span>
            <span className={VALUE}>{detail || "—"}</span>
          </div>
        );
      })}
    </div>
  );
}

/** More tab — Special Lagna, Shadbala, Bhava Position, Planetary Position cards. */
export function MoreSection({ specialLagna, shadbala, bhavaPosition, planetaryPosition, className }: MoreSectionProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SpecialLagnaCard section={specialLagna} />
      <ShadbalaCard section={shadbala} />
      <SimpleDataCard title={HOROSCOPE_SCREEN.sectionBhavaPosition} section={bhavaPosition} />
      <SimpleDataCard title={HOROSCOPE_SCREEN.sectionPlanetaryPosition} section={planetaryPosition} />
    </div>
  );
}
