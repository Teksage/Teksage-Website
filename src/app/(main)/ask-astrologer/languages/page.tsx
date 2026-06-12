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
  const [secondary, setSecondary] = useState("");
  const [firstError, setFirstError] = useState<string | null>(null);
  const [secondError, setSecondError] = useState<string | null>(null);

  useEffect(() => {
    if (!flow) {
      router.replace(ROUTES.chat);
    }
  }, [flow, router]);

  if (!flow) return null;

  const canSubmit = Boolean(primary);

  function clearErrors() {
    setFirstError(null);
    setSecondError(null);
  }

  function onContinue() {
    if (!primary) {
      setFirstError(ASK_ASTROLOGER_SCREEN.languageFieldError);
      return;
    }
    if (primary && secondary && primary === secondary) {
      setSecondError(ASK_ASTROLOGER_SCREEN.languageDuplicateError);
      return;
    }
    const languages = [primary, secondary].filter(Boolean);
    writeAskAstrologerFlow({ ...flow, preferred_languages: languages });
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
        primary={primary}
        secondary={secondary}
        firstError={firstError}
        secondError={secondError}
        onPrimaryChange={(v) => {
          setPrimary(v);
          clearErrors();
          if (secondary === v) setSecondary("");
        }}
        onSecondaryChange={(v) => {
          if (v && v === primary) {
            setSecondary("");
            setSecondError(ASK_ASTROLOGER_SCREEN.languageDuplicateError);
            return;
          }
          setSecondary(v);
          clearErrors();
        }}
      />
    </AskAstrologerShell>
  );
}
