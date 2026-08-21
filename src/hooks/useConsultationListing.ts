"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { TEKSAGE_APP_ASTROLOGER_USER_IDS } from "@/lib/constants/consultation-featured-astrologers";
import { defaultConsultationFilter } from "@/lib/consultation-default-filter";
import { consultationRouteUserId } from "@/lib/consultation-display";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { writeConsultationFilter } from "@/lib/consultation-session";
import { fetchMoreAstrologers } from "@/lib/services/consultation";
import type { ConsultationAstrologer } from "@/types/consultation";

const FEATURED_ORDER = new Map<number, number>(
  TEKSAGE_APP_ASTROLOGER_USER_IDS.map((id, index) => [id, index])
);

function sortAstrologersForHub(
  rows: ConsultationAstrologer[]
): ConsultationAstrologer[] {
  return [...rows].sort((a, b) => {
    const aId = consultationRouteUserId(a);
    const bId = consultationRouteUserId(b);
    const aRank = FEATURED_ORDER.get(aId);
    const bRank = FEATURED_ORDER.get(bId);
    if (aRank != null && bRank != null) return aRank - bRank;
    if (aRank != null) return -1;
    if (bRank != null) return 1;
    return aId - bId;
  });
}

export function useConsultationListing() {
  const { languageVersion } = useT();
  const [astrologers, setAstrologers] = useState<ConsultationAstrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currency = useConsultationCurrency();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Full roster — same as Flutter GET /api/astrologer/filter (no language bias).
      const all = await fetchMoreAstrologers([]);
      setAstrologers(sortAstrologersForHub(all));
    } catch {
      setAstrologers([]);
      setError("load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filter = defaultConsultationFilter();
    writeConsultationFilter(filter);
    void load();
  }, [load, languageVersion]);

  return {
    currency,
    astrologers,
    loading,
    error,
  };
}
