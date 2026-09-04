"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import {
  PlanetsIcon,
  BhavaIcon,
  ShadbalaIcon,
  SpecialLagnaIcon,
  EphemerisIcon,
} from "@/components/horoscope/full/FullHoroscopeIcons";
import {
  PlanetsTable,
  BhavaTable,
  SpecialLagnaTable,
} from "@/components/horoscope/full/MoreSectionTables";
import { ShadbalaTable } from "@/components/horoscope/full/ShadbalaTable";
import type {
  SpecialLagnaPayload,
  ShadbalaPayload,
  BhavaPositionPayload,
  PlanetaryPositionPayload,
  FullHoroscopeSection,
} from "@/types";
import type { ComponentType } from "react";

type MoreTab = "planets" | "bhava" | "shadbala" | "lagna" | "ephemeris";

interface Props {
  specialLagna: FullHoroscopeSection<SpecialLagnaPayload>;
  shadbala: FullHoroscopeSection<ShadbalaPayload>;
  bhavaPosition: FullHoroscopeSection<BhavaPositionPayload>;
  planetaryPosition: FullHoroscopeSection<PlanetaryPositionPayload>;
  className?: string;
}

const MORE_TABS: { id: MoreTab; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { id: "planets",   label: HOROSCOPE_SCREEN.moreTabPlanets,   Icon: PlanetsIcon },
  { id: "bhava",     label: HOROSCOPE_SCREEN.moreTabBhava,     Icon: BhavaIcon },
  { id: "shadbala",  label: HOROSCOPE_SCREEN.moreTabShadbala,  Icon: ShadbalaIcon },
  { id: "lagna",     label: HOROSCOPE_SCREEN.moreTabLagna,     Icon: SpecialLagnaIcon },
  { id: "ephemeris", label: HOROSCOPE_SCREEN.moreTabEphemeris, Icon: EphemerisIcon },
];

const TAB_BTN_BASE =
  "flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 text-center transition-colors min-w-[3.5rem]";
const TAB_BTN_ACTIVE =
  "bg-[var(--color-brand-primary)] text-white shadow-sm";
const TAB_BTN_IDLE =
  "text-[var(--color-brand-panchang)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)]";

/** More section — 5 internal sub-tabs: Planets, Bhava, Shadbala, Special Lagna, Ephemeris. */
export function MoreSection({ specialLagna, shadbala, bhavaPosition, planetaryPosition, className }: Props) {
  const [activeTab, setActiveTab] = useState<MoreTab>("planets");

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Inner tab bar — horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-1 rounded-2xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white p-1.5 shadow-sm">
          {MORE_TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={cn(TAB_BTN_BASE, activeTab === id ? TAB_BTN_ACTIVE : TAB_BTN_IDLE)}
            >
              <Icon className="size-4 shrink-0" />
              <span className="text-[10px] font-semibold leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "planets" && (
        <PlanetsTable section={planetaryPosition} />
      )}
      {activeTab === "bhava" && (
        <BhavaTable section={bhavaPosition} />
      )}
      {activeTab === "shadbala" && (
        <ShadbalaTable section={shadbala} />
      )}
      {activeTab === "lagna" && (
        <SpecialLagnaTable section={specialLagna} />
      )}
      {activeTab === "ephemeris" && (
        <EphemerisPlaceholder planetaryPosition={planetaryPosition} />
      )}
    </div>
  );
}

/** Ephemeris — shows current day's snapshot (dedicated API endpoint coming soon). */
function EphemerisPlaceholder({ planetaryPosition }: { planetaryPosition: FullHoroscopeSection<PlanetaryPositionPayload> }) {
  const d = planetaryPosition.data;
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-primary)_4%,white)] px-4 py-3">
        <div className="flex items-center gap-2">
          <EphemerisIcon className="size-4 text-[var(--color-brand-primary)]" />
          <p className="text-xs font-semibold text-[var(--color-brand-panchang)]">
            {HOROSCOPE_SCREEN.ephemerisLabel} — {today}
          </p>
        </div>
        <p className="mt-1 text-xs text-black/50">{HOROSCOPE_SCREEN.ephemerisNote}</p>
      </div>
      {d && <PlanetsTable section={planetaryPosition} />}
    </div>
  );
}
