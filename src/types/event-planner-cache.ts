import type { MuhurthaPayload } from "@/types/muhurtha";

/** Persisted Event Planner L1 cache entry (localStorage). */
export interface EventPlannerCacheEntry {
  muhurthaId: MuhurthaPayload["muhurthaId"];
  result: MuhurthaPayload["result"];
  expiresAt: string;
  cachedAt: string;
}

export interface EventPlannerCacheKeyInput {
  userId: string;
  event: string;
  startDate: string;
  location: string;
  language: string;
}
