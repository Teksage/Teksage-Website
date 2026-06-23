/** Profile DOB display — mirrors Flutter `CustomDatePicker.formatDate` (dd/MM/yyyy). */

import { format, isValid, parse } from "date-fns";

export const PROFILE_DOB_DISPLAY_FORMAT = "dd/MM/yyyy" as const;
export const PROFILE_DOB_API_FORMAT = "yyyy-MM-dd" as const;

export function formatProfileDobForDisplay(iso: string): string {
  const trimmed = iso.trim();
  if (!trimmed) return "";
  const d = parse(trimmed.slice(0, 10), PROFILE_DOB_API_FORMAT, new Date());
  if (!isValid(d)) return trimmed;
  return format(d, PROFILE_DOB_DISPLAY_FORMAT);
}

export function parseProfileDobIsoToDate(iso: string): Date | null {
  const trimmed = iso.trim();
  if (!trimmed) return null;
  const d = parse(trimmed.slice(0, 10), PROFILE_DOB_API_FORMAT, new Date());
  return isValid(d) ? d : null;
}

export function formatProfileDobToIso(date: Date): string {
  return format(date, PROFILE_DOB_API_FORMAT);
}
