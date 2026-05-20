"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ConsultationFlowCta } from "@/components/consultation/ConsultationFlowCta";
import { ConsultationLanguageField } from "@/components/consultation/ConsultationLanguageField";
import { ConsultationShell } from "@/components/consultation/ConsultationShell";
import {
  readConsultationCategories,
  writeConsultationFilter,
} from "@/lib/consultation-session";
import {
  CONSULTATION_LANGUAGES,
  CONSULTATION_LAYOUT,
  CONSULTATION_SCREEN,
  ROUTES,
} from "@/lib/constants";

export function ConsultationLanguageView() {
  const router = useRouter();
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [showError, setShowError] = useState(false);
  const [firstError, setFirstError] = useState<string | null>(null);
  const [secondError, setSecondError] = useState<string | null>(null);

  const categories = useMemo(() => readConsultationCategories(), []);

  useEffect(() => {
    if (!categories?.length) {
      router.replace(ROUTES.consultation);
    }
  }, [categories, router]);

  const canSubmit = Boolean(primary || secondary);

  function onSubmit() {
    const first = primary.trim();
    const second = secondary.trim();
    if (!first && !second) {
      setShowError(true);
      setFirstError(CONSULTATION_SCREEN.languageFieldError);
      setSecondError(CONSULTATION_SCREEN.languageFieldError);
      return;
    }
    if (first && second && first === second) {
      setShowError(true);
      setSecondError(CONSULTATION_SCREEN.languageDuplicateError);
      return;
    }
    if (!categories?.length) {
      router.replace(ROUTES.consultation);
      return;
    }
    const languages = [first, second].filter(Boolean);
    writeConsultationFilter({ categories, languages });
    router.push(ROUTES.consultationAstrologers);
  }

  if (!categories?.length) return null;

  return (
    <ConsultationShell
      title={CONSULTATION_SCREEN.appBarTitle}
      onBack={() => router.back()}
      footer={
        <>
          {showError && !firstError && !secondError ? (
            <p className="text-[11px] font-medium text-[var(--color-brand-error)]">
              {CONSULTATION_SCREEN.languageError}
            </p>
          ) : null}
          <ConsultationFlowCta
            label={CONSULTATION_SCREEN.languageSubmit}
            active={canSubmit}
            onClick={onSubmit}
          />
        </>
      }
    >
      <h1 className={CONSULTATION_LAYOUT.pageHeading}>
        {CONSULTATION_SCREEN.languageHeading}
      </h1>
      <p className={CONSULTATION_LAYOUT.pageSubtitle}>
        {CONSULTATION_SCREEN.languageSubtitle}
      </p>
      <div className="mt-12 space-y-10">
      <ConsultationLanguageField
        title={CONSULTATION_SCREEN.languageFirst}
        value={primary}
        options={CONSULTATION_LANGUAGES}
        enabled
        error={firstError}
        onChange={(value) => {
          setPrimary(value);
          setShowError(false);
          setFirstError(null);
          setSecondError(null);
          if (secondary === value) setSecondary("");
        }}
      />
      <ConsultationLanguageField
        title={CONSULTATION_SCREEN.languageSecond}
        value={secondary}
        options={CONSULTATION_LANGUAGES.filter((l) => l.id !== primary)}
        enabled={Boolean(primary)}
        error={secondError}
        onChange={(value) => {
          if (value && value === primary) {
            setSecondary("");
            setSecondError(CONSULTATION_SCREEN.languageDuplicateError);
            return;
          }
          setSecondary(value);
          setShowError(false);
          setSecondError(null);
        }}
      />
      </div>
    </ConsultationShell>
  );
}
