import {
  EVENT_PLANNER_CACHE,
  buildEventPlannerCacheKey,
} from "@/lib/constants/event-planner-cache";
import type {
  EventPlannerCacheEntry,
  EventPlannerCacheKeyInput,
} from "@/types/event-planner-cache";
import type { MuhurthaPayload } from "@/types/muhurtha";

function isExpired(expiresAt: string): boolean {
  const expiresMs = Date.parse(expiresAt);
  if (!Number.isFinite(expiresMs)) return true;
  return expiresMs <= Date.now();
}

function computeExpiresAt(fromMs = Date.now()): string {
  const expires = new Date(fromMs);
  expires.setDate(expires.getDate() + EVENT_PLANNER_CACHE.ttlDays);
  return expires.toISOString();
}

export function eventPlannerCacheKey(params: EventPlannerCacheKeyInput): string {
  return buildEventPlannerCacheKey(params);
}

export function readEventPlannerCache(
  cacheKey: string
): MuhurthaPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(cacheKey);
    if (!raw) return null;
    const entry = JSON.parse(raw) as EventPlannerCacheEntry;
    if (!entry?.result || isExpired(entry.expiresAt)) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    return { muhurthaId: entry.muhurthaId, result: entry.result };
  } catch {
    localStorage.removeItem(cacheKey);
    return null;
  }
}

export function writeEventPlannerCache(
  cacheKey: string,
  payload: MuhurthaPayload
): void {
  if (typeof window === "undefined") return;
  const entry: EventPlannerCacheEntry = {
    muhurthaId: payload.muhurthaId,
    result: payload.result,
    cachedAt: new Date().toISOString(),
    expiresAt: computeExpiresAt(),
  };
  localStorage.setItem(cacheKey, JSON.stringify(entry));
}

export function clearAllEventPlannerCache(): void {
  if (typeof window === "undefined") return;
  const prefix = `${EVENT_PLANNER_CACHE.storagePrefix}:`;
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key?.startsWith(prefix)) keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
