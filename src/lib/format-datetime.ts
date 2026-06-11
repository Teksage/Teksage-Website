import { format, isValid } from "date-fns";
import { DATETIME_FORMAT_DMY } from "@/lib/constants/datetime";
import { isValidDate, parseApiDateTime } from "@/lib/api-datetime";

export function formatDateTimeDMY(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  const d = typeof value === "string" ? parseApiDateTime(value) : value;
  if (!isValidDate(d) || !isValid(d)) return null;
  return format(d, DATETIME_FORMAT_DMY);
}
