"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { ConsultationLanguageField } from "@/components/consultation/ConsultationLanguageField";
import { ConsultationFlowCta } from "@/components/consultation/ConsultationFlowCta";
import {
  readAskAstrologerFlow,
  writeAskAstrologerFlow,
} from "@/lib/ask-astrologer-session";
import { CONSULTATION_LANGUAGES } from "@/lib/constants";
import { ROUTES } from "@/lib/constants/routes";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";

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
    <div className={ASK_ASTROLOGER_UI.page}>
      <AppHeader
        title={ASK_ASTROLOGER_SCREEN.languagePageTitle}
        showBack
        onBackClick={() => router.back()}
      />
      <div className={ASK_ASTROLOGER_UI.inner}>
        <h1 className={ASK_ASTROLOGER_UI.heading}>
          {ASK_ASTROLOGER_SCREEN.languageHeading}
        </h1>
        <p className={ASK_ASTROLOGER_UI.subtitle}>
          {ASK_ASTROLOGER_SCREEN.languageSubtitle}
        </p>
        <div className="mt-6 space-y-8">
          <ConsultationLanguageField
            title={ASK_ASTROLOGER_SCREEN.languageFirst}
            value={primary}
            options={CONSULTATION_LANGUAGES}
            enabled
            error={firstError}
            onChange={(v) => {
              setPrimary(v);
              clearErrors();
              if (secondary === v) setSecondary("");
            }}
          />
          <ConsultationLanguageField
            title={ASK_ASTROLOGER_SCREEN.languageSecond}
            value={secondary}
            options={CONSULTATION_LANGUAGES.filter((l) => l.id !== primary)}
            enabled={Boolean(primary)}
            error={secondError}
            onChange={(v) => {
              if (v && v === primary) {
                setSecondary("");
                setSecondError(ASK_ASTROLOGER_SCREEN.languageDuplicateError);
                return;
              }
              setSecondary(v);
              clearErrors();
            }}
          />
        </div>
      </div>
      <footer className="sticky bottom-0 border-t border-black/10 bg-white px-5 py-4">
        <ConsultationFlowCta
          label={ASK_ASTROLOGER_SCREEN.languageContinue}
          active={canSubmit}
          onClick={onContinue}
        />
      </footer>
    </div>
  );
}
