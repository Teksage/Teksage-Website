"use client";

import { useAuthStore } from "@/store/auth.store";
import {
  isIndiaDisplayTimezone,
  resolveViewerTimezone,
} from "@/lib/viewer-timezone";

/**
 * Display timezone for consultation + Expert Hours (same rules):
 * 1. Profile timezone from Current Location (preferred_location → API `timezone`)
 * 2. Else browser local (omit Intl `timeZone`)
 * Skips empty / UTC. Normalizes Asia/Calcutta → Asia/Kolkata.
 */
export function useViewerTimezone(): string | undefined {
  const profileTimezone = useAuthStore((s) => s.user?.timezone);
  return resolveViewerTimezone(profileTimezone);
}

/** Hint copy: IST when India/missing zone, else “your timezone” — same as consultation date strip. */
export function useViewerTimezoneHint(istLabel: string, yourZoneLabel: string): string {
  const zone = useViewerTimezone();
  return isIndiaDisplayTimezone(zone) ? istLabel : yourZoneLabel;
}
