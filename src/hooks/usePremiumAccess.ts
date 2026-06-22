"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchProfileSettings } from "@/lib/services/settings-profile";

type PremiumAccessState = {
  isPremium: boolean;
  planStatus: string;
  loading: boolean;
};

const INITIAL: PremiumAccessState = {
  isPremium: false,
  planStatus: "",
  loading: true,
};

/** Premium + active subscription — mirrors Flutter `getUserPremium` + `planStatus`. */
export function usePremiumAccess() {
  const [state, setState] = useState<PremiumAccessState>(INITIAL);

  const reload = useCallback(async () => {
    try {
      const settings = await fetchProfileSettings();
      setState({
        isPremium: settings.isPremium,
        planStatus: settings.subscription?.planStatus ?? "",
        loading: false,
      });
    } catch {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const normalizedStatus = state.planStatus.trim().toLowerCase();
  const isExpired = normalizedStatus === "expired";
  const hasPremiumAccess = state.isPremium && !isExpired;

  return {
    ...state,
    isExpired,
    hasPremiumAccess,
    reload,
  };
}
