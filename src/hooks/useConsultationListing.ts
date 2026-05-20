"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import {
  readConsultationFilter,
  writeConsultationFilter,
} from "@/lib/consultation-session";
import { ROUTES } from "@/lib/constants";
import {
  fetchMoreAstrologers,
  fetchTopAstrologers,
} from "@/lib/services/consultation";
import type { ConsultationAstrologer } from "@/types/consultation";

export function useConsultationListing() {
  const { languageVersion } = useT();
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
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
      const ids = topList.map((a) => a.user_id);
      const rest = await fetchMoreAstrologers(ids);
      setMore(rest);
    } catch {
      setError("load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filter = readConsultationFilter();
    if (!filter?.categories?.length || !filter.languages?.length) {
      router.replace(ROUTES.consultation);
      return;
    }
    setCategories(filter.categories);
    setLanguages(filter.languages);
    writeConsultationFilter({ ...filter, categories: filter.categories, languages: filter.languages });
    void load(filter.categories, filter.languages);
  }, [load, router, languageVersion]);

  function removeCategory(category: string) {
    if (categories.length <= 1) return;
    const next = categories.filter((c) => c !== category);
    setCategories(next);
    writeConsultationFilter({ categories: next, languages });
    void load(next, languages);
  }

  function removeLanguage(language: string) {
    if (languages.length <= 1) return;
    const next = languages.filter((l) => l !== language);
    setLanguages(next);
    writeConsultationFilter({ categories, languages: next });
    void load(categories, next);
  }

  return {
    currency,
    categories,
    languages,
    top,
    more,
    loading,
    error,
    removeCategory,
    removeLanguage,
  };
}
