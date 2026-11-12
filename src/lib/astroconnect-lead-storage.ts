import type { AstroConnectLeadResponse } from "@/types/astroconnect-lead";

function storageKey(eventId: number | string): string {
  return `teksage.astroconnect.lead.${String(eventId)}`;
}

function readStore(store: Storage, eventId: number | string): AstroConnectLeadResponse | null {
  try {
    const raw = store.getItem(storageKey(eventId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AstroConnectLeadResponse;
    if (!parsed || typeof parsed !== "object" || !parsed.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Persist across refresh / new tabs on this browser. */
export function saveAstroConnectLeadResult(
  eventId: number | string,
  result: AstroConnectLeadResponse
): void {
  const payload = JSON.stringify(result);
  try {
    localStorage.setItem(storageKey(eventId), payload);
  } catch {
    /* private mode / quota */
  }
  try {
    sessionStorage.setItem(storageKey(eventId), payload);
  } catch {
    /* ignore */
  }
}

export function loadAstroConnectLeadResult(
  eventId: number | string
): AstroConnectLeadResponse | null {
  return readStore(localStorage, eventId) || readStore(sessionStorage, eventId);
}

/** Drop stale browser cache when server has no lead for this event. */
export function clearAstroConnectLeadResult(eventId: number | string): void {
  try {
    localStorage.removeItem(storageKey(eventId));
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.removeItem(storageKey(eventId));
  } catch {
    /* ignore */
  }
}
