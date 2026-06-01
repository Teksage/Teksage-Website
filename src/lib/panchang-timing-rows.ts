import { formatPanchangSegmentValue, type PanchangFormatCopy } from "@/lib/panchang-detail-format";
import type { PanchangDetail } from "@/types";

export type PanchangTimingRowKey =
  | "rahuKala"
  | "yamaKanda"
  | "auspiciousTime"
  | "paksha"
  | "amirthathiYoga";

export interface PanchangTimingRow {
  key: PanchangTimingRowKey;
  label: string;
  value: string;
}

export type PanchangTimingRowLabels = {
  rahuKala: string;
  yamaKanda: string;
  auspiciousTime: string;
  paksha: string;
  amirthathiYoga: string;
};

const PRIMARY_KEYS = new Set<PanchangTimingRowKey>([
  "rahuKala",
  "yamaKanda",
  "auspiciousTime",
]);

export function buildPanchangTimingRows(
  panchang: PanchangDetail,
  labels: PanchangTimingRowLabels,
  copy: PanchangFormatCopy
): {
  all: PanchangTimingRow[];
  primary: PanchangTimingRow[];
  secondary: PanchangTimingRow[];
} {
  const auspicious = panchang.auspiciousTime?.filter((t) => t?.trim()) ?? [];
  const auspiciousBody = auspicious.length ? auspicious.join("\n") : undefined;
  const amirthathi = formatPanchangSegmentValue(panchang.amirthathiYoga, copy);

  const all: PanchangTimingRow[] = [
    { key: "rahuKala", label: labels.rahuKala, value: panchang.rahuKala ?? "" },
    { key: "yamaKanda", label: labels.yamaKanda, value: panchang.yamaKanda ?? "" },
    {
      key: "auspiciousTime",
      label: labels.auspiciousTime,
      value: auspiciousBody ?? "",
    },
    { key: "paksha", label: labels.paksha, value: panchang.paksha ?? "" },
    { key: "amirthathiYoga", label: labels.amirthathiYoga, value: amirthathi },
  ].filter((r) => r.value.trim());

  return {
    all,
    primary: all.filter((r) => PRIMARY_KEYS.has(r.key)),
    secondary: all.filter((r) => !PRIMARY_KEYS.has(r.key)),
  };
}
