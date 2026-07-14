"use client";

import { useEffect, useState } from "react";
import { fetchCountries } from "@/lib/services/countries";
import type { CountryDialInfo } from "@/types/country";

export function useCountries() {
  const [countries, setCountries] = useState<CountryDialInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetchCountries()
      .then((list) => {
        if (cancelled) return;
        setCountries(list);
        setError(null);
      })
      .catch(() => {
        if (cancelled) return;
        setError("load_failed");
        setCountries([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { countries, isLoading, error };
}
