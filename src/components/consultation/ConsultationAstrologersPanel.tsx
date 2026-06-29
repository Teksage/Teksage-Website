"use client";

import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationAstroCard } from "@/components/consultation/ConsultationAstroCard";
import { consultationAstrologerPath } from "@/lib/constants/consultation-routes";
import { CONSULTATION_HOME_LAYOUT } from "@/lib/constants/consultation-home";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { consultationRouteUserId } from "@/lib/consultation-display";
import { useConsultationListing } from "@/hooks/useConsultationListing";
import { useI18nConstants } from "@/hooks/useT";

export function ConsultationAstrologersPanel() {
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const { currency, astrologers, loading, error } = useConsultationListing();

  if (error) {
    return <p className={CONSULTATION_HOME_LAYOUT.empty}>{C.loadError}</p>;
  }

  if (loading && astrologers.length === 0) {
    return <LoadingOverlay open />;
  }

  return (
    <>
      <div className="px-4">
        <div className={CONSULTATION_HOME_LAYOUT.astrologerGrid}>
        {astrologers.map((astrologer) => (
          <ConsultationAstroCard
            key={astrologer.astrologer_id}
            variant="grid"
            astrologer={astrologer}
            currency={currency}
            href={consultationAstrologerPath(consultationRouteUserId(astrologer))}
          />
        ))}
        </div>
      </div>
      <LoadingOverlay open={loading && astrologers.length > 0} />
    </>
  );
}
