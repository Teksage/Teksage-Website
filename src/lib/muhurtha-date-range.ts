import { MUHURTHA_DATE } from "@/lib/constants/muhurtha-date";
import { toIsoDate } from "@/lib/consultation-calendar";

/** Latest ISO start date allowed for Event Planner (today + maxStartDaysAhead). */
export function muhurthaMaxStartIso(today: Date = new Date()): string {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  d.setDate(d.getDate() + MUHURTHA_DATE.maxStartDaysAhead);
  return toIsoDate(d);
}

/** Earliest ISO start date (today local calendar day). */
export function muhurthaMinStartIso(today: Date = new Date()): string {
  return toIsoDate(today);
}

export function isMuhurthaStartDateAllowed(
  isoDate: string,
  today: Date = new Date()
): boolean {
  const min = muhurthaMinStartIso(today);
  const max = muhurthaMaxStartIso(today);
  return isoDate >= min && isoDate <= max;
}
