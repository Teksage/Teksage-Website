"use client";

import { useEffect, useRef, useState } from "react";
import { fetchPartnerMyDiscount } from "@/lib/services/partner-discount-api";
import type { PartnerDiscountState } from "@/types/partner-referral";

/** Prefer live `/my-discount` over cached profile so admin active/inactive updates show. */
export function useLivePartnerDiscount(
  initial?: PartnerDiscountState | null
): PartnerDiscountState | null | undefined {
  const [discount, setDiscount] = useState<PartnerDiscountState | null | undefined>(
    initial
  );
  const liveOk = useRef(false);

  useEffect(() => {
    // Do not overwrite a successful live fetch with stale profile cache.
    if (!liveOk.current) setDiscount(initial);
  }, [initial]);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const live = await fetchPartnerMyDiscount();
        if (!cancelled && live) {
          liveOk.current = true;
          setDiscount(live);
        }
      } catch {
        /* keep initial / last good */
      }
    }

    void refresh();
    const onFocus = () => void refresh();
    const onVisibility = () => {
      if (document.visibilityState === "visible") onFocus();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return discount;
}
