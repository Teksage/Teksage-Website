"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  dismissAstroConnectPopup,
  fetchAstroConnectPopup,
} from "@/lib/services/astroconnect-popup";
import { useAuthStore } from "@/store/auth.store";
import type { AstroConnectPopupEvent } from "@/types/astroconnect-popup";

/** Shows the published AstroConnect Pro event once per user. */
export function useAstroConnectPopup() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [event, setEvent] = useState<AstroConnectPopupEvent | null>(null);
  const checkingRef = useRef(false);
  const handledRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      handledRef.current = false;
      setEvent(null);
      return;
    }
    if (checkingRef.current || handledRef.current) return;
    checkingRef.current = true;
    void fetchAstroConnectPopup()
      .then((status) => {
        handledRef.current = true;
        if (status.shouldShow && status.event) setEvent(status.event);
      })
      .catch(() => {
        /* try again on the next signed-in visit */
      })
      .finally(() => {
        checkingRef.current = false;
      });
  }, [isAuthenticated]);

  const dismiss = useCallback(async () => {
    const current = event;
    setEvent(null);
    if (!current) return;
    try {
      await dismissAstroConnectPopup(current.id);
    } catch {
      /* the next visit can show it again if the save failed */
    }
  }, [event]);

  return { event, dismiss };
}
