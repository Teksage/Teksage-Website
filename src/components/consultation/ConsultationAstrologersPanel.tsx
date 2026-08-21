"use client";

import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationHubAstroCard } from "@/components/consultation/ConsultationHubAstroCard";
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
      <div className={CONSULTATION_HOME_LAYOUT.astrologerList}>
        {astrologers.map((astrologer) => (
          <ConsultationHubAstroCard
            key={astrologer.astrologer_id}
            astrologer={astrologer}
            currency={currency}
            href={consultationAstrologerPath(consultationRouteUserId(astrologer))}
          />
        ))}
      </div>
      <LoadingOverlay open={loading && astrologers.length > 0} />
    </>
  );
}
