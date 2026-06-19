"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  dismissFeatureDiscoveryPopup,
  fetchFeatureDiscoveryStatus,
} from "@/lib/services/feature-discovery";
import { useAuthStore } from "@/store/auth.store";

/** App-wide WhatsApp / Ask Astrologer discovery popup (not chat-only). */
export function useFeatureDiscovery() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [open, setOpen] = useState(false);
  const checkingRef = useRef(false);
  const handledRef = useRef(false);

  const checkAndPrompt = useCallback(async () => {
    if (!isAuthenticated || checkingRef.current || handledRef.current) return;
    checkingRef.current = true;
    try {
      const status = await fetchFeatureDiscoveryStatus();
      if (status.dismissed) {
        handledRef.current = true;
        return;
      }
      if (status.shouldShowPopup) {
        setOpen(true);
      }
    } catch {
      /* non-blocking */
    } finally {
      checkingRef.current = false;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      handledRef.current = false;
      setOpen(false);
      return;
    }
    void checkAndPrompt();
  }, [checkAndPrompt, isAuthenticated, pathname]);

  const dismiss = useCallback(async () => {
    setOpen(false);
    handledRef.current = true;
    try {
      await dismissFeatureDiscoveryPopup();
    } catch {
      /* still handled locally */
    }
  }, []);

  return { open, dismiss };
}
