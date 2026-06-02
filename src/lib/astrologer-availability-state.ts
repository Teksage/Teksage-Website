/** Draft slot state per day — supports multi-date edit before one Save. */

export type SlotRangeSet = Set<string>;
export type SlotsByDate = Record<string, SlotRangeSet>;

export function setsEqual(a: SlotRangeSet, b: SlotRangeSet): boolean {
  if (a.size !== b.size) return false;
  for (const value of a) {
    if (!b.has(value)) return false;
  }
  return true;
}

export function cloneSet(source: SlotRangeSet): SlotRangeSet {
  return new Set(source);
}

export function collectChangedDates(
  draftByDate: SlotsByDate,
  originalByDate: SlotsByDate
): string[] {
  const dates = new Set([
    ...Object.keys(draftByDate),
    ...Object.keys(originalByDate),
  ]);
  const changed: string[] = [];
  for (const date of dates) {
    const draft = draftByDate[date] ?? new Set();
    const original = originalByDate[date] ?? new Set();
    if (!setsEqual(draft, original)) changed.push(date);
  }
  return changed;
}

export function buildSlotsPayload(
  draftByDate: SlotsByDate,
  dates: string[]
): Array<{ start_datetime: string; end_datetime: string; create: boolean }> {
  const payload: Array<{
    start_datetime: string;
    end_datetime: string;
    create: boolean;
  }> = [];
  for (const date of dates) {
    const ranges = draftByDate[date];
    if (!ranges) continue;
    for (const range of ranges) {
      const parts = range.split(" - ");
      if (parts.length !== 2) continue;
      payload.push({
        start_datetime: `${date}T${parts[0]}:00`,
        end_datetime: `${date}T${parts[1]}:00`,
        create: true,
      });
    }
  }
  return payload;
}

export function datesWithSlotMarkers(
  draftByDate: SlotsByDate,
  originalByDate: SlotsByDate,
  bookedByDate: SlotsByDate
): Set<string> {
  const marked = new Set<string>();
  const dates = new Set([
    ...Object.keys(draftByDate),
    ...Object.keys(originalByDate),
    ...Object.keys(bookedByDate),
  ]);
  for (const date of dates) {
    const draft = draftByDate[date];
    const original = originalByDate[date];
    const booked = bookedByDate[date];
    if ((draft && draft.size > 0) || (original && original.size > 0) || (booked && booked.size > 0)) {
      marked.add(date);
    }
  }
  return marked;
}
