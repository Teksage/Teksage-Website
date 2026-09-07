/** Normalize Astrosoft planetary-position API payloads into a planet map. */

import type { PlanetaryPositionEntry, PlanetaryPositionPayload } from "@/types";
import { PLANET_ORDER, RASI_BY_INDEX } from "@/lib/planetary-position-consts";

function isPlanetKey(key: string): boolean {
  return (PLANET_ORDER as readonly string[]).includes(key);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function asSignName(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && value >= 1 && value <= 12) {
    return RASI_BY_INDEX[value - 1];
  }
  if (typeof value === "number" && value >= 0 && value <= 11) {
    return RASI_BY_INDEX[value];
  }
  const obj = asRecord(value);
  if (!obj) return undefined;
  const named = obj.name ?? obj.sign ?? obj.rasi ?? obj.planetRasi;
  if (typeof named === "string" && named.trim()) return named.trim();
  return undefined;
}

function asNak(
  value: unknown
): { nak: string; pada: number } | undefined {
  const obj = asRecord(value);
  if (!obj) return undefined;
  const nak = String(obj.nak ?? obj.nakshatra ?? obj.nakshathra ?? "").trim();
  if (!nak) return undefined;
  const pada = asNumber(obj.pada) ?? 0;
  return { nak, pada };
}

function asKaraka(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  const obj = asRecord(value);
  if (!obj) return undefined;
  const named = obj.name ?? obj.karaka ?? obj.planetKaraka;
  return typeof named === "string" && named.trim() ? named.trim() : undefined;
}

function emptyEntry(planet: string): PlanetaryPositionEntry {
  return { planet };
}

function mergeEntry(
  base: PlanetaryPositionEntry,
  patch: Partial<PlanetaryPositionEntry>
): PlanetaryPositionEntry {
  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(patch).filter(([, v]) => v !== undefined && v !== null && v !== "")
    ),
  } as PlanetaryPositionEntry;
}

/**
 * Flat planet objects from `/planetaryPosition`:
 * `{ Sun: { planetPosition, planetRasi, planetRasiPosition, planetKaraka }, ... }`
 */
function readFlatPlanets(
  raw: Record<string, unknown>
): Record<string, PlanetaryPositionEntry> {
  const out: Record<string, PlanetaryPositionEntry> = {};
  for (const name of PLANET_ORDER) {
    const obj = asRecord(raw[name]);
    if (!obj) continue;
    const nak = asNak(obj.nakshatraPada) ?? asNak(obj.nakshathraPada);
    out[name] = {
      planet: name,
      position:
        asNumber(obj.planetPosition) ??
        asNumber(obj.position) ??
        asNumber(obj.longitude),
      sign:
        asSignName(obj.planetRasi) ??
        asSignName(obj.sign) ??
        asSignName(obj.rasi),
      signNumber: asNumber(obj.signNumber),
      signPosition:
        asNumber(obj.planetRasiPosition) ??
        asNumber(obj.signPosition) ??
        asNumber(obj.rasiPosition),
      isRetro: obj.isRetro === true || obj.direction === false,
      karaka:
        asKaraka(obj.planetKaraka) ??
        asKaraka(obj.karaka) ??
        asKaraka(obj.jaiminiKaraka),
      nakshatraPada: nak,
    };
  }
  return out;
}

/** Overlay sibling map `planetNakshathra` (and similar EnumMap dumps). */
function applyMultiMaps(
  out: Record<string, PlanetaryPositionEntry>,
  raw: Record<string, unknown>
): void {
  const nakMap =
    asRecord(raw.planetNakshathra) ??
    asRecord(raw.planetNakshatra) ??
    asRecord(raw.planetNakshathraPada);

  if (!nakMap) return;

  for (const [key, value] of Object.entries(nakMap)) {
    if (!isPlanetKey(key)) continue;
    const nak = asNak(value);
    if (!nak) continue;
    const base = out[key] ?? emptyEntry(key);
    out[key] = mergeEntry(base, { nakshatraPada: nak });
  }
}

function deriveMissingFields(
  out: Record<string, PlanetaryPositionEntry>
): void {
  for (const name of PLANET_ORDER) {
    const e = out[name];
    if (!e) continue;
    const pos = e.position;
    if (typeof pos !== "number") continue;
    if (!e.sign) e.sign = RASI_BY_INDEX[Math.floor(pos / 30) % 12];
    if (e.signNumber == null) e.signNumber = (Math.floor(pos / 30) % 12) + 1;
    if (e.signPosition == null) e.signPosition = pos % 30;
  }
}

/** Normalize API shapes → planet → entry map. */
export function normalizePlanetaryPayload(
  raw: PlanetaryPositionPayload | Record<string, unknown> | null
): Record<string, PlanetaryPositionEntry> {
  if (!raw || typeof raw !== "object") return {};

  const root = asRecord(raw.planetaryInfo) ?? asRecord(raw.data) ?? asRecord(raw) ?? {};
  const out = readFlatPlanets(root);
  applyMultiMaps(out, root);
  deriveMissingFields(out);
  return out;
}
