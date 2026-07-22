"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AskAstrologerShell } from "@/components/ask-astrologer/AskAstrologerShell";
import { AskAstrologerConfirmationContent } from "@/components/ask-astrologer/AskAstrologerConfirmationContent";
import {
  clearAskAstrologerFlow,
  readAskAstrologerFlow,
} from "@/lib/ask-astrologer-session";
import { useI18nConstants } from "@/hooks/useT";
import { ROUTES } from "@/lib/constants/routes";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { buildEventPlannerResultsPath } from "@/lib/muhurtha-route";
import type { MuhurthaEventType } from "@/types/muhurtha";

export default function AskAstrologerConfirmationPage() {
  const router = useRouter();
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const [ctaHref, setCtaHref] = useState(ROUTES.chat);
  const [fromEventPlanner, setFromEventPlanner] = useState(false);

  useEffect(() => {
    const flow = readAskAstrologerFlow();
    const result = flow?.muhurtha_result;
    const isEventPlanner = Boolean(result);
    setFromEventPlanner(isEventPlanner);
    if (
      result?.event &&
      result.start_date &&
      result.location
    ) {
      setCtaHref(
        buildEventPlannerResultsPath({
          event: result.event as MuhurthaEventType,
          startDate: result.start_date,
          location: result.location,
        })
      );
    } else if (isEventPlanner) {
      setCtaHref(ROUTES.eventPlanner);
    } else {
      setCtaHref(ROUTES.chat);
    }
    clearAskAstrologerFlow();
  }, []);

  return (
    <AskAstrologerShell
      title={AA.confirmationTitle}
      showBack={false}
      centered
      footer={
        <button
          type="button"
          onClick={() => router.push(ctaHref)}
          className={CONSULTATION_BOOKING_LAYOUT.payBtn}
        >
          {fromEventPlanner
            ? AA.confirmationDoneEventPlanner
            : AA.confirmationDone}
        </button>
      }
    >
      <AskAstrologerConfirmationContent />
    </AskAstrologerShell>
  );
}
