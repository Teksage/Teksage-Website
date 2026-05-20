import { PANCHANG_SCREEN } from "@/lib/constants";
import { shortWeekdayLabel, to12HourDisplay } from "@/lib/panchang-time-format";
import type { PanchangDetail, PanchangKarna, PanchangKarnaArm, PanchangSegment } from "@/types";

export type PanchangFormatCopy = Pick<
  typeof PANCHANG_SCREEN,
  | "segmentUptoWord"
  | "segmentSecondaryLineBreak"
  | "segmentComma"
  | "karnaArmGap"
  | "dateRibbonPieceSeparator"
>;

const DEFAULT_COPY: PanchangFormatCopy = PANCHANG_SCREEN;

function formatKarnaArm(arm: PanchangKarnaArm | undefined, copy: PanchangFormatCopy): string {
  if (!arm) return "";
  const n = arm.name?.trim();
  if (!n) return "";
  const { segmentUptoWord } = copy;
  const t12 = to12HourDisplay(arm.endTime);
  if (arm.endTime?.trim() && t12) return `${n} ${segmentUptoWord} ${t12}`;
  return n;
}

export function formatPanchangSegmentValue(
  seg?: PanchangSegment,
  copy: PanchangFormatCopy = DEFAULT_COPY
): string {
  if (!seg?.name?.trim()) return "";
  const { segmentUptoWord, segmentSecondaryLineBreak, segmentComma } = copy;
  const t12 = to12HourDisplay(seg.endTime);
  if (t12 && seg.next?.trim()) {
    return `${seg.name} ${segmentUptoWord} ${t12}${segmentSecondaryLineBreak}${seg.next}`;
  }
  if (t12) return `${seg.name} ${segmentUptoWord} ${t12}`;
  if (seg.next?.trim()) return `${seg.name}${segmentComma}${seg.next}`;
  return seg.name;
}

export function formatPanchangKarnaValue(
  k?: PanchangKarna,
  copy: PanchangFormatCopy = DEFAULT_COPY
): string {
  const first = formatKarnaArm(k?.first, copy);
  const second = formatKarnaArm(k?.second, copy);
  if (!first) return "";
  if (!second) return first;
  return `${first}${copy.karnaArmGap}${second}`;
}

/** Ribbon line for legacy use; Personalized UI uses `PanchangDateRibbon` + `shortWeekdayLabel`. */
export function formatPanchangRibbonLine(
  p: PanchangDetail,
  copy: PanchangFormatCopy = DEFAULT_COPY
): string {
  const sep = copy.dateRibbonPieceSeparator;
  return [shortWeekdayLabel(p.eng_weekday, p.weekday), p.date, p.time]
    .filter((x) => x?.trim())
    .join(sep);
}
