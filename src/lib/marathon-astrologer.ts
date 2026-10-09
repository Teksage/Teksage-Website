import { MARATHON_ASTROLOGER_COPY } from "@/lib/constants/marathon-astrologer";
import type { MarathonBooking } from "@/types/marathon";

export function seatSummary(rows: MarathonBooking[], copy: typeof MARATHON_ASTROLOGER_COPY) {
  const waiting = rows.filter((row) => row.status === "paid").length;
  const confirmed = rows.filter((row) => row.status === "accepted" || row.status === "assigned").length;
  const completed = rows.filter((row) => row.status === "completed").length;
  const waitingLine = waiting === 0
    ? copy.noSeatsWaiting
    : (waiting === 1 ? copy.oneSeatWaiting : copy.seatsWaiting).replace("{count}", String(waiting));
  const parts = [waitingLine];
  if (confirmed > 0) parts.push(copy.seatsConfirmed.replace("{count}", String(confirmed)));
  if (completed > 0) parts.push(copy.seatsCompleted.replace("{count}", String(completed)));
  return parts.join(" · ");
}

export function formatMarathonWhen(iso: string, locale: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function latestFirst<T extends { starts_at: string }>(rows: T[]) {
  return [...rows].sort(
    (left, right) => new Date(right.starts_at).getTime() - new Date(left.starts_at).getTime()
  );
}

export function bookingsForEvent(
  marathonId: number,
  waiting: MarathonBooking[],
  mine: MarathonBooking[]
) {
  return latestFirst(
    [...waiting, ...mine].filter((row) => row.marathon_id === marathonId)
  );
}

export function eventIsCompleted(rows: MarathonBooking[]) {
  const waiting = rows.filter((row) => row.status === "paid");
  const owned = rows.filter((row) => row.status !== "paid");
  if (waiting.length > 0 || owned.length === 0) return false;
  return owned.every((row) => row.status === "completed");
}
