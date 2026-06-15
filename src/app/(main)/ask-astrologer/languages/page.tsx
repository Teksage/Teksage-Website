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
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";

export default function AskAstrologerLanguagesPage() {
  const router = useRouter();
  const flow = useMemo(() => readAskAstrologerFlow(), []);

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
      setFirstError(ASK_ASTROLOGER_SCREEN.languageFieldError);
      return;
    }
    if (!flowState.user_question || !flowState.ai_response) {
      router.replace(ROUTES.chat);
      return;
    }
    writeAskAstrologerFlow({
      user_question: flowState.user_question,
      ai_response: flowState.ai_response,
      preferred_languages: [primary],
    });
    router.push(ROUTES.askAstrologerCheckout);
  }

  return (
    <AskAstrologerShell
      title={ASK_ASTROLOGER_SCREEN.languagePageTitle}
      onBack={() => router.back()}
      centered
      footer={
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onContinue}
          className={CONSULTATION_BOOKING_LAYOUT.payBtn}
        >
          {ASK_ASTROLOGER_SCREEN.languageContinue}
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
      />
    </AskAstrologerShell>
  );
}
