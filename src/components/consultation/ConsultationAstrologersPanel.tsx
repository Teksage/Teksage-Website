"use client";

import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationHubAstroCard } from "@/components/consultation/ConsultationHubAstroCard";
import { ConsultationLanguageFilter } from "@/components/consultation/ConsultationLanguageFilter";
import { consultationAstrologerPath } from "@/lib/constants/consultation-routes";
import {
  CONSULTATION_HOME_LAYOUT,
  CONSULTATION_HOME_SCREEN,
} from "@/lib/constants/consultation-home";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { consultationRouteUserId } from "@/lib/consultation-display";
import { useConsultationListing } from "@/hooks/useConsultationListing";
import { useI18nConstants } from "@/hooks/useT";

export function ConsultationAstrologersPanel() {
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);
  const {
    currency,
    astrologers,
    availableLanguages,
    languageFilter,
    setLanguageFilter,
    loading,
    error,
  } = useConsultationListing();

  if (error) {
    return <p className={CONSULTATION_HOME_LAYOUT.empty}>{C.loadError}</p>;
  }

  if (loading && astrologers.length === 0 && !languageFilter) {
    return <LoadingOverlay open />;
  }

  return (
    <>
      <ConsultationLanguageFilter
        value={languageFilter}
        onChange={setLanguageFilter}
        options={availableLanguages}
      />
      {!loading && languageFilter && astrologers.length === 0 ? (
        <p className={CONSULTATION_HOME_LAYOUT.empty}>
          {CH.emptyLanguageFilter}
        </p>
      ) : (
        <div className={CONSULTATION_HOME_LAYOUT.astrologerList}>
          {astrologers.map((astrologer) => (
            <ConsultationHubAstroCard
              key={astrologer.astrologer_id}
              astrologer={astrologer}
              currency={currency}
              href={consultationAstrologerPath(
                consultationRouteUserId(astrologer)
              )}
            />
          ))}
        </div>
      )}
      <LoadingOverlay open={loading && astrologers.length > 0} />
    </>
  );
}
