import { parseApiDateTime, isValidDate } from "@/lib/api-datetime";
import type {
  AskAstrologerNotificationItem,
  ConsultationNotificationEvent,
} from "@/types/notifications";

export type ConsultationFeedEntry =
  | { kind: "ask"; sortAt: number; ask: AskAstrologerNotificationItem }
  | { kind: "event"; sortAt: number; event: ConsultationNotificationEvent };

function toSortMs(iso: string | null | undefined): number {
  if (!iso) return 0;
  const d = parseApiDateTime(iso);
  return isValidDate(d) ? d.getTime() : 0;
}

/** Most recent activity among ask timestamps. */
export function askActivityMs(item: AskAstrologerNotificationItem): number {
  return Math.max(
    toSortMs(item.answered_at),
    toSortMs(item.paid_at),
    toSortMs(item.created_at)
  );
}

/**
 * Date shown on Ask cards — same timestamp used for newest-first sorting
 * so the visible date always matches list order.
 */
export function askDisplayDateIso(
  item: AskAstrologerNotificationItem
): string | null {
  const candidates = [item.answered_at, item.paid_at, item.created_at].filter(
    (v): v is string => Boolean(v)
  );
  if (candidates.length === 0) return null;

  let best = candidates[0]!;
  let bestMs = toSortMs(best);
  for (let i = 1; i < candidates.length; i++) {
    const iso = candidates[i]!;
    const ms = toSortMs(iso);
    if (ms > bestMs) {
      best = iso;
      bestMs = ms;
    }
  }
  return best;
}

/** Newest activity first — appointments and Ask cards share one timeline. */
export function buildConsultationFeed(
  events: ConsultationNotificationEvent[],
  askItems: AskAstrologerNotificationItem[]
): ConsultationFeedEntry[] {
  const feed: ConsultationFeedEntry[] = [
    ...askItems.map((ask) => ({
      kind: "ask" as const,
      sortAt: askActivityMs(ask),
      ask,
    })),
    ...events.map((event) => ({
      kind: "event" as const,
      sortAt: toSortMs(event.startDatetime),
      event,
    })),
  ];

  feed.sort((a, b) => b.sortAt - a.sortAt);
  return feed;
}
