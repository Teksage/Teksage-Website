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

export function useConsultationListing() {
  const { languageVersion } = useT();
  const [top, setTop] = useState<ConsultationAstrologer[]>([]);
  const [more, setMore] = useState<ConsultationAstrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currency = useConsultationCurrency();

  const load = useCallback(async (cats: string[], langs: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const topList = await fetchTopAstrologers(cats, langs);
      setTop(topList);
      const excludeUserIds = consultationExcludeUserIds(topList);
      const rest = await fetchMoreAstrologers(excludeUserIds);
      setMore(rest);
    } catch {
      setTop([]);
      setMore([]);
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
    top,
    more,
    loading,
    error,
  };
}
