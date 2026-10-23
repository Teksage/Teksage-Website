"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useT } from "@/hooks/useT";
import { consultationLanguagesInUse } from "@/lib/constants/consultation-languages";
import { defaultConsultationFilter } from "@/lib/consultation-default-filter";
import {
  astrologerSpeaksLanguage,
  sortConsultationAstrologersByName,
} from "@/lib/consultation-display";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { writeConsultationFilter } from "@/lib/consultation-session";
import { fetchMoreAstrologers } from "@/lib/services/consultation";
import type { ConsultationAstrologer } from "@/types/consultation";

/** Empty string = All Languages. */
export type ConsultationLanguageFilterId = string;

export function useConsultationListing() {
  const { t, languageVersion } = useT();
  const [astrologers, setAstrologers] = useState<ConsultationAstrologer[]>([]);
  const [languageFilter, setLanguageFilter] =
    useState<ConsultationLanguageFilterId>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currency = useConsultationCurrency();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const all = await fetchMoreAstrologers([]);
      setAstrologers(sortConsultationAstrologersByName(all, t));
    } catch {
      setAstrologers([]);
      setError("load");
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    const filter = defaultConsultationFilter();
    writeConsultationFilter(filter);
    void load();
  }, [load, languageVersion]);

  const availableLanguages = useMemo(
    () => consultationLanguagesInUse(astrologers),
    [astrologers]
  );

  useEffect(() => {
    if (
      languageFilter &&
      !availableLanguages.some((lang) => lang.id === languageFilter)
    ) {
      setLanguageFilter("");
    }
  }, [availableLanguages, languageFilter]);

  const filteredAstrologers = useMemo(() => {
    if (!languageFilter) return astrologers;
    return astrologers.filter((row) =>
      astrologerSpeaksLanguage(row.languages, languageFilter)
    );
  }, [astrologers, languageFilter]);

  return {
    currency,
    astrologers: filteredAstrologers,
    availableLanguages,
    languageFilter,
    setLanguageFilter,
    loading,
    error,
  };
}
