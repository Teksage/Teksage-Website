"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AskAstrologerLanguagesContent } from "@/components/ask-astrologer/AskAstrologerLanguagesContent";
import { AskAstrologerShell } from "@/components/ask-astrologer/AskAstrologerShell";
import {
  readAskAstrologerFlow,
  writeAskAstrologerFlow,
} from "@/lib/ask-astrologer-session";
import { ROUTES } from "@/lib/constants/routes";
import { useI18nConstants } from "@/hooks/useT";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";

export default function AskAstrologerLanguagesPage() {
  const router = useRouter();
  const flow = useMemo(() => readAskAstrologerFlow(), []);
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);

  const [primary, setPrimary] = useState("");
  const [firstError, setFirstError] = useState<string | null>(null);

  useEffect(() => {
    if (!flow) {
      router.replace(ROUTES.chat);
    }
  }, [flow, router]);

  if (!flow) return null;

  const flowState = flow;
  const canSubmit = Boolean(primary);

  function onContinue() {
    if (!primary) {
      setFirstError(AA.languageFieldError);
      return;
    }
    // Chat flow needs question + AI answer; Event Planner needs muhurtha_result
    // (ai_response is intentionally empty for Muhurtha).
    const isMuhurtha = Boolean(flowState.muhurtha_result);
    if (!flowState.user_question || (!isMuhurtha && !flowState.ai_response)) {
      router.replace(isMuhurtha ? ROUTES.eventPlannerResults : ROUTES.chat);
      return;
    }
    writeAskAstrologerFlow({
      user_question: flowState.user_question,
      ai_response: flowState.ai_response,
      preferred_languages: [primary],
      ...(flowState.muhurtha_result
        ? { muhurtha_result: flowState.muhurtha_result }
        : {}),
    });
    router.push(ROUTES.askAstrologerCheckout);
  }

  return (
    <AskAstrologerShell
      title={AA.languagePageTitle}
      onBack={() => router.back()}
      centered
      footer={
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onContinue}
          className={CONSULTATION_BOOKING_LAYOUT.payBtn}
        >
          {AA.languageContinue}
        </button>
      }
    >
      <AskAstrologerLanguagesContent
        userQuestion={flowState.user_question}
        primary={primary}
        firstError={firstError}
        onPrimaryChange={(value) => {
          setPrimary(value);
          setFirstError(null);
        }}
        muhurthaResult={flowState.muhurtha_result}
      />
    </AskAstrologerShell>
  );
}
