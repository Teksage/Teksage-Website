/** Helpers to format planetary-position fields like Astrosoft desktop. */

import type { PlanetaryPositionEntry, PlanetaryPositionPayload } from "@/types";
import { normalizePlanetaryPayload } from "@/lib/normalize-planetary-payload";
import {
  KARAKA_NAMES,
  KARAKA_PLANETS,
  PLANET_ORDER,
  RASI_TO_SANSKRIT,
} from "@/lib/planetary-position-consts";

export interface PlanetaryPositionRow {
  planet: string;
  longitude: string;
  rasi: string;
  nakshatraPada: string;
  jaiminiKaraka: string;
  isRetro: boolean;
  highlight: boolean;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function pad3(n: number): string {
  return String(n).padStart(3, "0");
}

/** Astrosoft `AstroUtil.dms` — e.g. `168 : 56 : 35`. */
export function formatLongitudeDms(degrees: number | null | undefined): string {
  if (typeof degrees !== "number" || Number.isNaN(degrees)) return "—";
  let val = Math.abs(degrees);
  const deg = Math.floor(val);
  val = (val - deg) * 60;
  const min = Math.floor(val);
  const sec = Math.floor((val - min) * 60);
  const prefix = degrees < 0 ? "-" : "";
  return `${prefix}${pad3(deg)} : ${pad2(min)} : ${pad2(sec)}`;
}

export function formatRasiName(sign: string | null | undefined): string {
  if (!sign?.trim()) return "—";
  return RASI_TO_SANSKRIT[sign.trim()] ?? sign.trim();
}

export function formatNakshatraPada(
  nak: string | null | undefined,
  pada: number | null | undefined
): string {
  const name = nak?.trim();
  if (!name) return "—";
  if (pada == null) return name;
  return `${name} ~ ${pada}`;
}

/** Astrosoft ranks 7 planets by descending rasi longitude → Atma…Dara. */
function computeKarakas(
  planets: Record<string, PlanetaryPositionEntry>
): Record<string, string> {
  const ranked = KARAKA_PLANETS.map((name) => {
    const e = planets[name];
    const deg =
      typeof e?.signPosition === "number"
        ? e.signPosition
        : typeof e?.position === "number"
          ? e.position % 30
          : -1;
    return { name, deg };
  })
    .filter((p) => p.deg >= 0)
    .sort((a, b) => b.deg - a.deg);

  const out: Record<string, string> = {};
  ranked.forEach((p, i) => {
    out[p.name] = KARAKA_NAMES[i] ?? "";
  });
  return out;
}

function resolveAbsoluteLongitude(e: PlanetaryPositionEntry): number | undefined {
  if (typeof e.position === "number") return e.position;
  if (typeof e.signNumber === "number" && typeof e.signPosition === "number") {
    return (e.signNumber - 1) * 30 + e.signPosition;
  }
  return undefined;
}

export function buildPlanetaryRows(
  raw: PlanetaryPositionPayload | Record<string, unknown> | null
): PlanetaryPositionRow[] {
  const planets = normalizePlanetaryPayload(raw);
  const karakas = computeKarakas(planets);

  return PLANET_ORDER.filter((name) => planets[name]).map((name) => {
    const e = planets[name]!;
    const absolute = resolveAbsoluteLongitude(e);
    const apiKaraka = typeof e.karaka === "string" ? e.karaka : "";
    const karaka =
      apiKaraka && apiKaraka !== "NoKaraka"
        ? apiKaraka
        : karakas[name] ?? "";

    return {
      planet: name === "Ascendant" ? "Asc" : name,
      longitude: formatLongitudeDms(absolute),
      rasi: formatRasiName(e.sign),
      nakshatraPada: formatNakshatraPada(e.nakshatraPada?.nak, e.nakshatraPada?.pada),
      jaiminiKaraka: karaka || "—",
      isRetro: e.isRetro === true,
      highlight: name === "Moon" || name === "Ascendant",
    };
  });
}
