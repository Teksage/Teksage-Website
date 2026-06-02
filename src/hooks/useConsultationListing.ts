"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { defaultConsultationFilter } from "@/lib/consultation-default-filter";
import { consultationExcludeUserIds } from "@/lib/consultation-display";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { writeConsultationFilter } from "@/lib/consultation-session";
import {
  fetchMoreAstrologers,
  fetchTopAstrologers,
} from "@/lib/services/consultation";
import type { ConsultationAstrologer } from "@/types/consultation";

function mergeAstrologerLists(
  primary: ConsultationAstrologer[],
  secondary: ConsultationAstrologer[]
): ConsultationAstrologer[] {
  const seen = new Set(primary.map((a) => a.astrologer_id));
  const merged = [...primary];
  for (const row of secondary) {
    if (seen.has(row.astrologer_id)) continue;
    seen.add(row.astrologer_id);
    merged.push(row);
  }
  return merged;
}

export function useConsultationListing() {
  const { languageVersion } = useT();
  const [astrologers, setAstrologers] = useState<ConsultationAstrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currency = useConsultationCurrency();

  const load = useCallback(async (cats: string[], langs: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const topList = await fetchTopAstrologers(cats, langs);
      const excludeUserIds = consultationExcludeUserIds(topList);
      const rest = await fetchMoreAstrologers(excludeUserIds);
      setAstrologers(mergeAstrologerLists(topList, rest));
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
    void load(filter.categories, filter.languages);
  }, [load, languageVersion]);

  return {
    currency,
    astrologers,
    loading,
    error,
  };
}
