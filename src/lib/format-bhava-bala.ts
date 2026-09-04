/** Parse Astrosoft Bhava Bala rows attached to shadbala payload. */

import type { ShadbalaPayload } from "@/types";
import { formatShadbalaNum } from "@/lib/format-shadbala";

export interface BhavaBalaRow {
  house: number;
  houseLabel: string;
  bhava: string;
  bhavaAdhipathi: string;
  bhavaDig: string;
  bhavaDrishti: string;
  bhavaBala: string;
  rupa: string;
  rankLabel: string;
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
      return {
        house,
        houseLabel: String(r.houseLabel ?? house),
        bhava: String(r.bhava ?? "—"),
        bhavaAdhipathi: formatShadbalaNum(adhipathi, "000.00"),
        bhavaDig: formatShadbalaNum(dig, "000.00"),
        bhavaDrishti: formatShadbalaNum(drishti, "000.00"),
        bhavaBala: formatShadbalaNum(total, "000.00"),
        rupa: formatShadbalaNum(rupa, "0.0"),
        rankLabel: String(r.rankLabel ?? "—"),
      } satisfies BhavaBalaRow;
    })
    .filter((r): r is BhavaBalaRow => r != null)
    .sort((a, b) => a.house - b.house);
}
