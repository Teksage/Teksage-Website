import { PANCHANG_SCREEN } from "@/lib/constants";
import { shortWeekdayLabel, to12HourDisplay } from "@/lib/panchang-time-format";
import type { PanchangDetail, PanchangKarna, PanchangKarnaArm, PanchangSegment } from "@/types";

function formatKarnaArm(arm?: PanchangKarnaArm): string {
  if (!arm) return "";
  const n = arm.name?.trim();
  if (!n) return "";
  const { segmentUptoWord } = PANCHANG_SCREEN;
  const t12 = to12HourDisplay(arm.endTime);
  if (arm.endTime?.trim() && t12) return `${n} ${segmentUptoWord} ${t12}`;
  return n;
}

export function formatPanchangSegmentValue(seg?: PanchangSegment): string {
  if (!seg?.name?.trim()) return "";
  const { segmentUptoWord, segmentSecondaryLineBreak, segmentComma } = PANCHANG_SCREEN;
  const t12 = to12HourDisplay(seg.endTime);
  if (t12 && seg.next?.trim()) {
    return `${seg.name} ${segmentUptoWord} ${t12}${segmentSecondaryLineBreak}${seg.next}`;
  }
  if (t12) return `${seg.name} ${segmentUptoWord} ${t12}`;
  if (seg.next?.trim()) return `${seg.name}${segmentComma}${seg.next}`;
  return seg.name;
}

export function formatPanchangKarnaValue(k?: PanchangKarna): string {
  const first = formatKarnaArm(k?.first);
  const second = formatKarnaArm(k?.second);
  if (!first) return "";
  if (!second) return first;
  return `${first}${PANCHANG_SCREEN.karnaArmGap}${second}`;
}

/** Ribbon line for legacy use; Personalized UI uses `PanchangDateRibbon` + `shortWeekdayLabel`. */
export function formatPanchangRibbonLine(p: PanchangDetail): string {
  const sep = PANCHANG_SCREEN.dateRibbonPieceSeparator;
  return [shortWeekdayLabel(p.eng_weekday, p.weekday), p.date, p.time]
    .filter((x) => x?.trim())
    .join(sep);
}
