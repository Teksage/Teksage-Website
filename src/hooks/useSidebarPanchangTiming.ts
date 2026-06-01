"use client";

import { usePanchang } from "@/hooks/usePanchang";
import {
  filterAuspiciousSlots,
  formatSidebarAuspiciousTime,
} from "@/lib/sidebar-panchang-display";

/** Panchang timing rows for the home header strip. */
export function useSidebarPanchangTiming() {
  const { data, isLoading, isPremium, isAuthenticated } = usePanchang();
  const panchang = data?.panchang;

  return {
    isAuthenticated,
    isPremium,
    isLoading: isAuthenticated && isPremium && isLoading,
    rahuKala: panchang?.rahuKala?.trim() || undefined,
    yamaKanda: panchang?.yamaKanda?.trim() || undefined,
    auspiciousTime: formatSidebarAuspiciousTime(panchang?.auspiciousTime),
    auspiciousSlots: filterAuspiciousSlots(panchang?.auspiciousTime),
  };
}