"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationAstroShell } from "@/components/consultation/ConsultationAstroShell";
import { ConsultationDetailExpertiseBar } from "@/components/consultation/ConsultationDetailExpertiseBar";
import { ConsultationDetailProfileCard } from "@/components/consultation/ConsultationDetailProfileCard";
import { ConsultationDetailReviews } from "@/components/consultation/ConsultationDetailReviews";
import { consultationSlotsPath } from "@/lib/constants/consultation-routes";
import {
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
} from "@/lib/constants/consultation-detail";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { ensureConsultationFilter } from "@/lib/consultation-default-filter";
import { fetchAstrologerDetail } from "@/lib/services/consultation";
import type { ConsultationAstrologerDetail } from "@/types/consultation";

type ConsultationDetailViewProps = {
  astrologerId: number;
};

export function ConsultationDetailView({ astrologerId }: ConsultationDetailViewProps) {
  const CD = useI18nConstants(CONSULTATION_DETAIL_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();
  const [data, setData] = useState<ConsultationAstrologerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currency = useConsultationCurrency();

  useEffect(() => {
    ensureConsultationFilter();
    let cancelled = false;
    (async () => {
      try {
        const detail = await fetchAstrologerDetail(astrologerId);
        if (!cancelled) setData(detail);
      } catch {
        if (!cancelled) setError(C.loadError);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [astrologerId, C.loadError]);

  if (error || (!loading && !data)) {
    return (
      <ConsultationAstroShell
        title={CD.appBarTitle}
        onBack={() => router.back()}
      >
        <p className="mt-10 text-center text-sm text-white">
          {error ?? C.loadError}
        </p>
      </ConsultationAstroShell>
    );
  }

  return (
    <>
      <ConsultationAstroShell
        title={CD.appBarTitle}
        onBack={() => router.back()}
        footer={
          data ? (
            <Link
              href={consultationSlotsPath(astrologerId)}
              className={CONSULTATION_DETAIL_LAYOUT.footerBtn}
            >
              {CD.bookCta}
            </Link>
          ) : undefined
        }
      >
        {data ? (
          <>
            <ConsultationDetailProfileCard
              astrologer={data.astrologer}
              currency={currency}
            />
            <ConsultationDetailExpertiseBar expertise={data.astrologer.expertise} />
            <ConsultationDetailReviews events={data.events} />
          </>
        ) : null}
      </ConsultationAstroShell>
      <LoadingOverlay open={loading} />
    </>
  );
}
