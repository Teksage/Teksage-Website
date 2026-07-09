/** Event Planner localStorage L1 cache — mirrors backend 10-day TTL. */

export const EVENT_PLANNER_CACHE = {
  storagePrefix: "teksage_event_planner_v1",
  ttlDays: 10,
} as const;

export interface EventPlannerCacheKeyParams {
  userId: string;
  event: string;
  startDate: string;
  location: string;
  language: string;
}

export function buildEventPlannerCacheKey(
  params: EventPlannerCacheKeyParams
): string {
  const parts = [
    params.userId.trim() || "guest",
    params.event.trim(),
    params.startDate.trim(),
    params.location.trim().toLowerCase(),
    params.language.trim().toLowerCase(),
  ];
  return `${EVENT_PLANNER_CACHE.storagePrefix}:${parts.join("|")}`;
}
