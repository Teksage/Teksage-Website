"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/components/common/Loader";
import { ConsultationAstroShell } from "@/components/consultation/ConsultationAstroShell";
import { ConsultationDetailExpertiseBar } from "@/components/consultation/ConsultationDetailExpertiseBar";
import { ConsultationDetailProfileCard } from "@/components/consultation/ConsultationDetailProfileCard";
import { ConsultationDetailReviews } from "@/components/consultation/ConsultationDetailReviews";
import { consultationSlotsPath } from "@/lib/constants/consultation-routes";
import {
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
} from "@/lib/constants/consultation-detail";
import { CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { readConsultationFilter } from "@/lib/consultation-session";
import { fetchAstrologerDetail } from "@/lib/services/consultation";
import type { ConsultationAstrologerDetail } from "@/types/consultation";

type ConsultationDetailViewProps = {
  astrologerId: number;
};

export function ConsultationDetailView({ astrologerId }: ConsultationDetailViewProps) {
  const router = useRouter();
  const [data, setData] = useState<ConsultationAstrologerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currency = useConsultationCurrency();

  useEffect(() => {
    if (!readConsultationFilter()) {
      router.replace(ROUTES.consultation);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const detail = await fetchAstrologerDetail(astrologerId);
        if (!cancelled) setData(detail);
      } catch {
        if (!cancelled) setError(CONSULTATION_SCREEN.loadError);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [astrologerId, router]);

  if (loading) {
    return (
      <ConsultationAstroShell
        title={CONSULTATION_DETAIL_SCREEN.appBarTitle}
        onBack={() => router.back()}
      >
        <div className={CONSULTATION_DETAIL_LAYOUT.loaderBox}>
          <Loader />
        </div>
      </ConsultationAstroShell>
    );
  }

  if (error || !data) {
    return (
      <ConsultationAstroShell
        title={CONSULTATION_DETAIL_SCREEN.appBarTitle}
        onBack={() => router.back()}
      >
        <p className="mt-10 text-center text-sm text-white">
          {error ?? CONSULTATION_SCREEN.loadError}
        </p>
      </ConsultationAstroShell>
    );
  }

  return (
    <ConsultationAstroShell
      title={CONSULTATION_DETAIL_SCREEN.appBarTitle}
      onBack={() => router.back()}
      footer={
        <Link href={consultationSlotsPath(astrologerId)} className={CONSULTATION_DETAIL_LAYOUT.footerBtn}>
          {CONSULTATION_DETAIL_SCREEN.bookCta}
        </Link>
      }
    >
      <ConsultationDetailProfileCard astrologer={data.astrologer} currency={currency} />
      <ConsultationDetailExpertiseBar expertise={data.astrologer.expertise} />
      <ConsultationDetailReviews events={data.events} />
    </ConsultationAstroShell>
  );
}
