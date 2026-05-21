"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConsultationCategoryChips } from "@/components/consultation/ConsultationCategoryChips";
import { ConsultationFlowCta } from "@/components/consultation/ConsultationFlowCta";
import { ConsultationShell } from "@/components/consultation/ConsultationShell";
import {
  categoriesForApi,
  consultationCategorySelectionCount,
} from "@/lib/consultation-categories";
import { writeConsultationCategories } from "@/lib/consultation-session";
import { CONSULTATION_LAYOUT, CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";

export function ConsultationCategoryView() {
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const count = consultationCategorySelectionCount(selected);

  function onContinue() {
    const apiCategories = categoriesForApi(selected);
    if (!apiCategories.length) {
      setError(true);
      return;
    }
    writeConsultationCategories(apiCategories);
    router.push(ROUTES.consultationLanguage);
  }

  return (
    <ConsultationShell
      title={C.appBarTitle}
      onBack={() => router.back()}
      footer={
        <>
          {error ? (
            <p className="text-nav font-medium text-[var(--color-brand-error)]">
              {C.categoryError}
            </p>
          ) : null}
          <ConsultationFlowCta
            label={`${C.categoryCta} (${count})`}
            active={count > 0}
            onClick={onContinue}
          />
        </>
      }
    >
      <h1 className={CONSULTATION_LAYOUT.pageHeading}>
        {C.categoryHeading}
      </h1>
      <p className={CONSULTATION_LAYOUT.pageSubtitle}>
        {C.categorySubtitle}
      </p>
      <ConsultationCategoryChips
        selected={selected}
        onChange={(next) => {
          setError(false);
          setSelected(next);
        }}
      />
    </ConsultationShell>
  );
}
