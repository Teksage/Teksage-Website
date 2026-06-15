"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { NOTIFICATIONS_TAB_CONSULTATION } from "@/lib/constants/notifications-screen";
import {
  acknowledgeAnswerReady,
  fetchAskAstrologerRequest,
} from "@/lib/services/ask-astrologer";
import { ROUTES } from "@/lib/constants/routes";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";
import type { AskAstrologerNotificationItem } from "@/types/notifications";

export function useAskAnswerFromQuery(
  askRequests: AskAstrologerNotificationItem[],
  loading: boolean
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const askParam = searchParams.get("ask");
  const askId = askParam ? Number(askParam) : null;
  const acknowledgedAskRef = useRef<number | null>(null);

  const [askDetail, setAskDetail] = useState<AskAstrologerRequest | null>(null);
  const [askDetailLoading, setAskDetailLoading] = useState(false);
  const [askDetailError, setAskDetailError] = useState<string | null>(null);

  const askFromList = useMemo(
    () =>
      askId != null && Number.isFinite(askId)
        ? askRequests.find((item) => item.id === askId)
        : undefined,
    [askId, askRequests]
  );

  const closeAskAnswer = useCallback(() => {
    setAskDetail(null);
    setAskDetailError(null);
    router.replace(`${ROUTES.notifications}?tab=${NOTIFICATIONS_TAB_CONSULTATION}`);
  }, [router]);

  useEffect(() => {
    if (askId == null || !Number.isFinite(askId)) {
      acknowledgedAskRef.current = null;
      return;
    }
    if (acknowledgedAskRef.current === askId) return;
    acknowledgedAskRef.current = askId;
    void acknowledgeAnswerReady(askId);
  }, [askId]);

  useEffect(() => {
    if (askId == null || !Number.isFinite(askId)) {
      setAskDetail(null);
      setAskDetailError(null);
      return;
    }
    if (askFromList) {
      setAskDetail(null);
      setAskDetailError(null);
      return;
    }
    if (loading) return;

    let cancelled = false;
    setAskDetailLoading(true);
    setAskDetailError(null);
    void fetchAskAstrologerRequest(askId)
      .then((detail) => {
        if (!cancelled) setAskDetail(detail);
      })
      .catch(() => {
        if (!cancelled) {
          setAskDetail(null);
          setAskDetailError(ASK_ASTROLOGER_SCREEN.askAnswerLoadError);
        }
      })
      .finally(() => {
        if (!cancelled) setAskDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [askFromList, askId, loading]);

  const isOpen = askId != null && Number.isFinite(askId);

  return {
    isOpen,
    userQuestion: askDetail?.user_question ?? askFromList?.user_question ?? "",
    answerText: askDetail?.answer_text ?? askFromList?.answer_text ?? null,
    answerVoiceUrl: askDetail?.answer_voice_url ?? askFromList?.answer_voice_url ?? null,
    answerVoiceDurationSec:
      askDetail?.answer_voice_duration_sec ??
      askFromList?.answer_voice_duration_sec ??
      null,
    answeredAt: askDetail?.answered_at ?? askFromList?.answered_at ?? null,
    answeredByAstrologerName:
      askDetail?.answered_by_astrologer_name ??
      askFromList?.answered_by_astrologer_name ??
      null,
    answeredByAstrologerProfilePath:
      askDetail?.answered_by_astrologer_profile_path ??
      askFromList?.answered_by_astrologer_profile_path ??
      null,
    loading: askDetailLoading && !askDetail && !askFromList,
    error: askDetailError,
    closeAskAnswer,
  };
}
