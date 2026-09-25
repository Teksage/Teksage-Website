"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ASK_SUMMARY_QUERY_ID } from "@/lib/constants/ask-astrologer-summary";
import { acknowledgeAnswerReady } from "@/lib/services/ask-astrologer";
import { ROUTES } from "@/lib/constants/routes";

/**
 * Legacy `?ask=` deep links used to open an answer modal.
 * Redirect to Ask Details (summary) instead — answer + review live there.
 */
export function useAskAnswerFromQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const askParam = searchParams.get("ask");
  const askId = askParam ? Number(askParam) : null;

  useEffect(() => {
    if (askId == null || !Number.isFinite(askId) || askId < 1) return;
    void acknowledgeAnswerReady(askId);
    router.replace(
      `${ROUTES.askAstrologerSummary}?${ASK_SUMMARY_QUERY_ID}=${askId}`
    );
  }, [askId, router]);
}
