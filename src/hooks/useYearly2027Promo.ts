"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import {
  clearPromoHiddenLocal,
  dismissYearly2027Promo,
  fetchYearly2027PromoStatus,
  localTodayIso,
  readPromoHiddenLocal,
  writePromoHiddenLocal,
} from "@/lib/services/yearly-2027-promo";
import { useAuthStore } from "@/store/auth.store";
import type { Yearly2027PromoStatus } from "@/types/yearly-2027-promo";

const EMPTY: Yearly2027PromoStatus = {
  showBanner: false,
  showSheet: false,
  hiddenToday: false,
  scores: null,
  isPremium: false,
  hasYearly: false,
  generating: false,
};

export function useYearly2027Promo(enabled = true) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [status, setStatus] = useState<Yearly2027PromoStatus>(EMPTY);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(
    async (ensure = true) => {
      if (!enabled || !isAuthenticated) {
        setStatus(EMPTY);
        return;
      }
      const localHidden = readPromoHiddenLocal() === localTodayIso();
      setLoading(true);
      try {
        // DB is source of truth — clearing dismissed_on in DB must show promo again.
        const next = await fetchYearly2027PromoStatus(ensure);
        if (next.hiddenToday) {
          writePromoHiddenLocal(localTodayIso());
        } else {
          clearPromoHiddenLocal();
        }
        setStatus(next);
      } catch {
        setStatus((prev) =>
          localHidden
            ? { ...prev, showBanner: false, showSheet: false, hiddenToday: true }
            : prev
        );
      } finally {
        setLoading(false);
      }
    },
    [enabled, isAuthenticated]
  );

  useEffect(() => {
    void refresh(true);
  }, [refresh]);

  const dismiss = useCallback(async () => {
    writePromoHiddenLocal(localTodayIso());
    setStatus((prev) => ({
      ...prev,
      showBanner: false,
      showSheet: false,
      hiddenToday: true,
    }));
    try {
      const next = await dismissYearly2027Promo();
      setStatus(next);
    } catch {
      /* local hide already applied */
    }
  }, []);

  const openYearly = useCallback(async () => {
    await dismiss();
    router.push(ROUTES.predictionsYearly);
  }, [dismiss, router]);

  const openUpgrade = useCallback(async () => {
    await dismiss();
    router.push(ROUTES.settingsSubscriptions);
  }, [dismiss, router]);

  return {
    status,
    loading,
    dismiss,
    openYearly,
    openUpgrade,
    refresh,
  };
}
