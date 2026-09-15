/** Build Astrosoft-style Bhava Position rows from API payload. */

import { formatLongitudeDms, formatRasiName } from "@/lib/format-planetary-position";
import type { BhavaPositionPayload } from "@/types";

const HOUSE_ROMAN = [
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

export interface BhavaPositionRow {
  house: string;
  bhava: string;
  start: string;
  mid: string;
  end: string;
  length: string;
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

/**
 * API shape:
 * `{ bhava: { "1": { house, start, mid, end, length }, ... } }`
 */
export function buildBhavaRows(
  raw: BhavaPositionPayload | Record<string, unknown> | null
): BhavaPositionRow[] {
  if (!raw || typeof raw !== "object") return [];

  const root = asRecord(raw);
  const bhavaMap =
    asRecord(root?.bhava) ??
    asRecord(root?.bhavaPosition) ??
    asRecord(root?.houses) ??
    root;

  if (!bhavaMap) return [];

  const rows: BhavaPositionRow[] = [];
  for (let i = 1; i <= 12; i++) {
    const entry =
      asRecord(bhavaMap[String(i)]) ??
      asRecord(bhavaMap[i]) ??
      asRecord(bhavaMap[HOUSE_ROMAN[i - 1]]);
    if (!entry) continue;

    const houseName =
      typeof entry.house === "string"
        ? entry.house
        : typeof entry.sign === "string"
          ? entry.sign
          : typeof entry.bhava === "string"
            ? entry.bhava
            : "";

    rows.push({
      house: HOUSE_ROMAN[i - 1],
      bhava: formatRasiName(houseName),
      start: formatLongitudeDms(asNumber(entry.start)),
      mid: formatLongitudeDms(asNumber(entry.mid)),
      end: formatLongitudeDms(asNumber(entry.end)),
      length: formatLongitudeDms(asNumber(entry.length)),
    });
  }

  return rows;
}
