"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { writeConsultationSummary } from "@/lib/consultation-session";
import {
  acknowledgeConsultationAnswersReady,
  fetchPendingConsultationAnswersPopup,
  pendingToConsultationSummary,
} from "@/lib/services/consultation-answers-ready";
import { useAuthStore } from "@/store/auth.store";
import { isAstrologerHomeSession } from "@/lib/utils";
import type { ConsultationAnswersReadyPending } from "@/types/consultation";

export function useConsultationAnswersReadyPopup() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const isAstrologer = isAstrologerHomeSession(user ?? undefined);

  const [pending, setPending] = useState<ConsultationAnswersReadyPending | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const promptedIdRef = useRef<number | null>(null);

  const shouldSkip = pathname === ROUTES.consultationSummary;

  const loadPending = useCallback(async () => {
    if (!isAuthenticated || isAstrologer) {
      setPending(null);
      setOpen(false);
      return;
    }
    try {
      const { event } = await fetchPendingConsultationAnswersPopup();
      if (!event) {
        setPending(null);
        setOpen(false);
        return;
      }
      setPending(event);
      if (shouldSkip || promptedIdRef.current === event.id) return;
      promptedIdRef.current = event.id;
      setOpen(true);
    } catch {
      setPending(null);
      setOpen(false);
    }
  }, [isAstrologer, isAuthenticated, shouldSkip]);

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
    if (shouldSkip && open) setOpen(false);
  }, [open, shouldSkip]);

  const dismissAndAcknowledge = useCallback(async (eventId: number) => {
    setOpen(false);
    setPending(null);
    try {
      await acknowledgeConsultationAnswersReady(eventId);
    } catch {
      // Local dismiss; server may re-prompt if ack failed.
    }
  }, []);

  const onLater = useCallback(() => {
    if (!pending) return;
    void dismissAndAcknowledge(pending.id);
  }, [dismissAndAcknowledge, pending]);

  const onViewAnswers = useCallback(() => {
    if (!pending) return;
    const summary = pendingToConsultationSummary(pending);
    writeConsultationSummary(summary);
    const id = pending.id;
    void dismissAndAcknowledge(id).then(() => {
      router.push(ROUTES.consultationSummary);
    });
  }, [dismissAndAcknowledge, pending, router]);

  return { open, pending, onLater, onViewAnswers };
}
