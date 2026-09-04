/** Normalize AstroSoft `/shadBala` payload into Astrosoft desktop table rows. */
import type { ShadbalaPayload } from "@/types";
import {
  ROMAN_RANKS,
  SHADBALA_MIN_STRENGTH,
  SHADBALA_PLANET_ORDER,
  SHADBALA_RANKED_PLANETS,
  type ShadbalaRow,
  type ShadbalaSortKey,
} from "@/lib/shadbala-consts";

export type { ShadbalaRow, ShadbalaSortKey } from "@/lib/shadbala-consts";

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function readNumber(entry: Record<string, unknown>, keys: string[]): number | null {
  const lower = new Map(Object.entries(entry).map(([k, v]) => [k.toLowerCase(), v]));
  for (const key of keys) {
    const raw = entry[key] ?? lower.get(key.toLowerCase());
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string" && raw.trim() !== "") {
      const n = Number(raw);
      if (Number.isFinite(n)) return n;
    }
  }
  return null;
}

function planetEntries(payload: ShadbalaPayload): [string, Record<string, unknown>][] {
  const source = payload as Record<string, unknown>;
  const out: [string, Record<string, unknown>][] = [];
  for (const [key, value] of Object.entries(source)) {
    if (/^(bhavaBala|bhava_bala)$/i.test(key)) continue;
    const rec = asRecord(value);
    if (!rec) continue;
    out.push([key, rec]);
  }
  return out;
}

function orderIndex(planet: string): number {
  const i = SHADBALA_PLANET_ORDER.findIndex((p) => p.toLowerCase() === planet.toLowerCase());
  return i >= 0 ? i : 100;
}

function assignRanks(rows: ShadbalaRow[]): void {
  const ranked = rows
    .filter((r) =>
      SHADBALA_RANKED_PLANETS.some((p) => p.toLowerCase() === r.planet.toLowerCase())
    )
    .map((r) => ({
      row: r,
      score: r.balaPercent ?? r.shadbala ?? Number.NEGATIVE_INFINITY,
    }))
    .sort((a, b) => b.score - a.score);
  ranked.forEach((item, idx) => {
    item.row.rank = idx + 1;
    item.row.rankLabel = ROMAN_RANKS[idx] ?? String(idx + 1);
  });
}

function toRow(planet: string, entry: Record<string, unknown>): ShadbalaRow {
  const residential = readNumber(entry, ["ResidentialStrength", "residentialStrength"]);
  const sthana = readNumber(entry, ["SthanaBala", "sthanaBala"]);
  const dig = readNumber(entry, ["DigBala", "digBala"]);
  const kala = readNumber(entry, ["KalaBala", "kalaBala"]);
  const drik = readNumber(entry, ["DrikBala", "drikBala"]);
  const chesta = readNumber(entry, ["ChestaBala", "chestaBala"]);
  const naisargika = readNumber(entry, ["NaisargikaBala", "naisargikaBala"]);
  const shadbala = readNumber(entry, ["ShadBala", "shadBala"]);
  const rupa = shadbala != null ? shadbala / 60 : null;
  const min = SHADBALA_MIN_STRENGTH[planet];
  const balaPercent =
    shadbala != null && min ? (shadbala / min) * 100 : null;
  const ishta = readNumber(entry, ["IshtaBala", "ishtaBala", "ishtaPhala"]);
  const kashta = readNumber(entry, ["KashtaBala", "kashtaBala", "kashtaPhala"]);
  const hasCore =
    sthana != null || dig != null || kala != null || shadbala != null || ishta != null;

  return {
    planet,
    residential,
    sthana,
    dig,
    kala,
    drik,
    chesta,
    naisargika,
    shadbala,
    rupa,
    balaPercent,
    rank: null,
    rankLabel: "",
    ishta,
    kashta,
    ochcha: readNumber(entry, ["OchchaBala", "ochchaBala"]),
    saptavargaja: readNumber(entry, ["SaptavargajaBala", "saptavargajaBala"]),
    ojaYugma: readNumber(entry, ["OjaYugmarasyamsaBala", "ojaYugmarasyamsaBala"]),
    kendra: readNumber(entry, ["KendraBala", "kendraBala"]),
    drekkana: readNumber(entry, ["DrekkanaBala", "drekkanaBala"]),
    abda: readNumber(entry, ["AbdaBala", "abdaBala"]),
    masa: readNumber(entry, ["MasaBala", "masaBala"]),
    vara: readNumber(entry, ["VaraBala", "varaBala"]),
    hora: readNumber(entry, ["HoraBala", "horaBala"]),
    paksha: readNumber(entry, ["PakshaBala", "pakshaBala"]),
    tribhaga: readNumber(entry, ["TribhagaBala", "tribhagaBala"]),
    natonnata: readNumber(entry, ["NatonnataBala", "natonnataBala"]),
    ayana: readNumber(entry, ["AyanaBala", "ayanaBala"]),
    yuddha: readNumber(entry, ["YuddhaBala", "yuddhaBala"]),
    partial: Boolean(residential != null && !hasCore),
  };
}

export function buildShadbalaRows(payload: ShadbalaPayload | null): ShadbalaRow[] {
  if (!payload) return [];
  const entries = planetEntries(payload);
  if (!entries.length) return [];
  const byName = new Map(entries.map(([n, rec]) => [n.toLowerCase(), toRow(n, rec)]));
  const rows: ShadbalaRow[] = [];
  for (const name of SHADBALA_PLANET_ORDER) {
    const row = byName.get(name.toLowerCase());
    if (row) {
      row.planet = name;
      rows.push(row);
      byName.delete(name.toLowerCase());
    }
  }
  for (const row of byName.values()) rows.push(row);
  assignRanks(rows);
  return rows;
}

export function sortShadbalaRows(
  rows: ShadbalaRow[],
  sortKey: ShadbalaSortKey,
  ascending: boolean
): ShadbalaRow[] {
  const dir = ascending ? 1 : -1;
  return [...rows].sort((a, b) => {
    if (sortKey === "rank") {
      if (a.rank == null && b.rank == null) {
        return orderIndex(a.planet) - orderIndex(b.planet);
      }
      if (a.rank == null) return ascending ? -1 : 1;
      if (b.rank == null) return ascending ? 1 : -1;
      if (a.rank !== b.rank) return (a.rank - b.rank) * dir;
      return orderIndex(a.planet) - orderIndex(b.planet);
    }
    const score = (r: ShadbalaRow): number => {
      switch (sortKey) {
        case "shadbala":
          return r.shadbala ?? Number.NEGATIVE_INFINITY;
        case "balaPercent":
          return r.balaPercent ?? Number.NEGATIVE_INFINITY;
        case "ishta":
          return r.ishta ?? Number.NEGATIVE_INFINITY;
        case "kashta":
          return r.kashta ?? Number.NEGATIVE_INFINITY;
        case "sthana":
          return r.sthana ?? Number.NEGATIVE_INFINITY;
        case "kala":
          return r.kala ?? Number.NEGATIVE_INFINITY;
        case "planet":
        default:
          return orderIndex(r.planet);
      }
    };
    const d = (score(a) - score(b)) * dir;
    return d !== 0 ? d : orderIndex(a.planet) - orderIndex(b.planet);
  });
}

export function formatShadbalaNum(
  value: number | null,
  pattern: "000.00" | "00.0" | "0.0" = "000.00",
  empty = "—"
): string {
  if (value == null || Number.isNaN(value)) return empty;
  const intDigits = pattern === "000.00" ? 3 : pattern === "00.0" ? 2 : 1;
  const fracDigits = pattern.endsWith(".00") ? 2 : 1;
  const sign = value < 0 ? "-" : "";
  const [i, f = ""] = Math.abs(value).toFixed(fracDigits).split(".");
  return `${sign}${i.padStart(intDigits, "0")}.${f}`;
}

export function formatShadbalaCell(
  row: ShadbalaRow,
  key: keyof ShadbalaRow,
  pattern: "000.00" | "00.0" | "0.0" = "000.00"
): string {
  if (key === "planet") return row.planet;
  if (key === "rankLabel") return row.partial ? "" : row.rankLabel || "—";
  const value = row[key];
  if (typeof value !== "number") return row.partial ? "" : "—";
  if (row.partial && key !== "residential") return "";
  return formatShadbalaNum(value, pattern);
}
