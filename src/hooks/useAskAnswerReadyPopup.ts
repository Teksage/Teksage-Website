"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  acknowledgeAnswerReady,
  fetchPendingAnswerPopup,
} from "@/lib/services/ask-astrologer";
import { NOTIFICATIONS_TAB_CONSULTATION } from "@/lib/constants/notifications-screen";
import { ROUTES, isAskAstrologerFlowPath } from "@/lib/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { isAstrologerHomeSession } from "@/lib/utils";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

function shouldSkipPopup(
  pathname: string,
  tabParam: string | null,
  askParam: string | null,
  requestId: number
): boolean {
  if (isAskAstrologerFlowPath(pathname)) return true;
  if (pathname !== ROUTES.notifications) return false;
  if (tabParam !== NOTIFICATIONS_TAB_CONSULTATION) return false;
  const askId = askParam ? Number(askParam) : null;
  return askId != null && Number.isFinite(askId) && askId === requestId;
}

export function useAskAnswerReadyPopup() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const askParam = searchParams.get("ask");
  const tabParam = searchParams.get("tab");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const isAstrologer = isAstrologerHomeSession(user ?? undefined);

  const [pending, setPending] = useState<AskAstrologerRequest | null>(null);
  const [open, setOpen] = useState(false);
  const promptedIdRef = useRef<number | null>(null);

  const tryOpen = useCallback(
    (req: AskAstrologerRequest) => {
      if (shouldSkipPopup(pathname, tabParam, askParam, req.id)) return;
      if (promptedIdRef.current === req.id) return;
      promptedIdRef.current = req.id;
      setOpen(true);
    },
    [askParam, pathname, tabParam]
  );

  const loadPending = useCallback(async () => {
    if (!isAuthenticated || isAstrologer) {
      setPending(null);
      setOpen(false);
      return;
    }
    try {
      const { request } = await fetchPendingAnswerPopup();
      if (!request) {
        setPending(null);
        setOpen(false);
        return;
      }
      setPending(request);
      tryOpen(request);
    } catch {
      setPending(null);
      setOpen(false);
    }
  }, [isAstrologer, isAuthenticated, tryOpen]);

  useEffect(() => {
    if (!isAuthenticated || isAstrologer) {
      promptedIdRef.current = null;
      setPending(null);
      setOpen(false);
      return;
    }
    void loadPending();
  }, [isAstrologer, isAuthenticated, loadPending, pathname]);

  useEffect(() => {
    if (!pending || !open) return;
    if (shouldSkipPopup(pathname, tabParam, askParam, pending.id)) {
      setOpen(false);
    }
  }, [askParam, open, pathname, pending, tabParam]);

  const dismissAndAcknowledge = useCallback(async (requestId: number) => {
    setOpen(false);
    setPending(null);
    try {
      await acknowledgeAnswerReady(requestId);
    } catch {
      // Popup stays dismissed locally; server may retry on next visit if ack failed.
    }
  }, []);

  const onLater = useCallback(() => {
    if (!pending) return;
    void dismissAndAcknowledge(pending.id);
  }, [dismissAndAcknowledge, pending]);

  const onViewAnswer = useCallback(() => {
    if (!pending) return;
    const id = pending.id;
    void dismissAndAcknowledge(id).then(() => {
      router.push(
        `${ROUTES.notifications}?tab=${NOTIFICATIONS_TAB_CONSULTATION}&ask=${id}`
      );
    });
  }, [dismissAndAcknowledge, pending, router]);

  return { open, pending, onLater, onViewAnswer };
}
