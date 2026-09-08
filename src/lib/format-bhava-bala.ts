/** Parse Astrosoft Bhava Bala rows attached to shadbala payload. */

import type { ShadbalaPayload } from "@/types";
import { formatShadbalaNum } from "@/lib/format-shadbala";

const BHAVA_ROMAN = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
] as const;

/** Sort keys that match Bhava Bala table columns. */
export type BhavaBalaSortKey = "rank" | "bhavaBala" | "rupa" | "house";

export interface BhavaBalaRow {
  house: number;
  houseLabel: string;
  bhava: string;
  bhavaAdhipathi: string;
  bhavaDig: string;
  bhavaDrishti: string;
  bhavaBala: string;
  rupa: string;
  rank: number | null;
  rankLabel: string;
  bhavaBalaValue: number | null;
  rupaValue: number | null;
}

function romanToRank(label: string): number | null {
  const i = BHAVA_ROMAN.findIndex((r) => r === label.trim().toUpperCase());
  return i >= 0 ? i + 1 : null;
}

export function buildBhavaBalaRows(payload: ShadbalaPayload | null): BhavaBalaRow[] {
  if (!payload) return [];
  const raw = (payload as Record<string, unknown>).bhavaBala;
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const r = item as Record<string, unknown>;
      const house = typeof r.house === "number" ? r.house : Number(r.house);
      if (!Number.isFinite(house)) return null;
      const adhipathi = typeof r.bhavaAdhipathi === "number" ? r.bhavaAdhipathi : null;
      const dig = typeof r.bhavaDig === "number" ? r.bhavaDig : null;
      const drishti = typeof r.bhavaDrishti === "number" ? r.bhavaDrishti : null;
      const total = typeof r.bhavaBala === "number" ? r.bhavaBala : null;
      const rupa = typeof r.rupa === "number" ? r.rupa : null;
      const rankLabel = String(r.rankLabel ?? "—");
      const rankFromApi =
        typeof r.rank === "number" && Number.isFinite(r.rank) ? r.rank : null;
      return {
        house,
        houseLabel: String(r.houseLabel ?? house),
        bhava: String(r.bhava ?? "—"),
        bhavaAdhipathi: formatShadbalaNum(adhipathi, "000.00"),
        bhavaDig: formatShadbalaNum(dig, "000.00"),
        bhavaDrishti: formatShadbalaNum(drishti, "000.00"),
        bhavaBala: formatShadbalaNum(total, "000.00"),
        rupa: formatShadbalaNum(rupa, "0.0"),
        rank: rankFromApi ?? romanToRank(rankLabel),
        rankLabel,
        bhavaBalaValue: total,
        rupaValue: rupa,
      } satisfies BhavaBalaRow;
    })
    .filter((r): r is BhavaBalaRow => r != null)
    .sort((a, b) => a.house - b.house);
}

export function sortBhavaBalaRows(
  rows: BhavaBalaRow[],
  sortKey: BhavaBalaSortKey,
  ascending: boolean
): BhavaBalaRow[] {
  const dir = ascending ? 1 : -1;
  return [...rows].sort((a, b) => {
    if (sortKey === "house") {
      return (a.house - b.house) * dir;
    }
    if (sortKey === "rank") {
      if (a.rank == null && b.rank == null) return a.house - b.house;
      if (a.rank == null) return ascending ? 1 : -1;
      if (b.rank == null) return ascending ? -1 : 1;
      if (a.rank !== b.rank) return (a.rank - b.rank) * dir;
      return a.house - b.house;
    }
    const score = (r: BhavaBalaRow): number => {
      if (sortKey === "bhavaBala") {
        return r.bhavaBalaValue ?? Number.NEGATIVE_INFINITY;
      }
      return r.rupaValue ?? Number.NEGATIVE_INFINITY;
    };
    const d = (score(a) - score(b)) * dir;
    return d !== 0 ? d : a.house - b.house;
  });
}
