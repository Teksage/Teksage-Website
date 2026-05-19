"use client";

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
      title={CONSULTATION_SCREEN.appBarTitle}
      onBack={() => router.back()}
      footer={
        <>
          {error ? (
            <p className="text-[11px] font-medium text-[var(--color-brand-error)]">
              {CONSULTATION_SCREEN.categoryError}
            </p>
          ) : null}
          <ConsultationFlowCta
            label={`${CONSULTATION_SCREEN.categoryCta} (${count})`}
            active={count > 0}
            onClick={onContinue}
          />
        </>
      }
    >
      <h1 className={CONSULTATION_LAYOUT.pageHeading}>
        {CONSULTATION_SCREEN.categoryHeading}
      </h1>
      <p className={CONSULTATION_LAYOUT.pageSubtitle}>
        {CONSULTATION_SCREEN.categorySubtitle}
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
