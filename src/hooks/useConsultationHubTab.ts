"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  CONSULTATION_HUB_TAB_ASTROLOGER,
  CONSULTATION_HUB_TAB_MEETING,
  CONSULTATION_HUB_TAB_QUERY,
  parseConsultationHubTab,
  type ConsultationHubTab,
} from "@/lib/constants/consultation-routes";

export function useConsultationHubTab() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = parseConsultationHubTab(searchParams.get(CONSULTATION_HUB_TAB_QUERY));

  const setTab = useCallback(
    (next: ConsultationHubTab) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === CONSULTATION_HUB_TAB_ASTROLOGER) {
        params.delete(CONSULTATION_HUB_TAB_QUERY);
      } else {
        params.set(CONSULTATION_HUB_TAB_QUERY, CONSULTATION_HUB_TAB_MEETING);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams]
  );

  return { tab, setTab };
}
