/** Dasa period date display — normalises API strings to dd/MM/yyyy. */

import { format, isValid, parse } from "date-fns";

const DASA_DATE_DISPLAY = "dd/MM/yyyy" as const;

const PARSE_FORMATS = ["yyyy-MM-dd", "dd-MMM-yyyy", "dd/MM/yyyy"] as const;

export function formatDasaDate(value: string | null | undefined): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "—";

  for (const fmt of PARSE_FORMATS) {
    const d = parse(trimmed, fmt, new Date());
    if (isValid(d)) return format(d, DASA_DATE_DISPLAY);
  }

  const fallback = new Date(trimmed);
  if (isValid(fallback)) return format(fallback, DASA_DATE_DISPLAY);

  return trimmed;
}

export function dasaEntryKey(entry: { name: string; startDate: string }): string {
  return `${entry.name}-${entry.startDate}`;
}
