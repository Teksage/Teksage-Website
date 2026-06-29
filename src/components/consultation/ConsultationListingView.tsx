"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationAstroCard } from "@/components/consultation/ConsultationAstroCard";
import { consultationAstrologerPath } from "@/lib/constants/consultation-routes";
import { consultationRouteUserId } from "@/lib/consultation-display";
import { CONSULTATION_LISTING_LAYOUT, CONSULTATION_LISTING_SCREEN } from "@/lib/constants/consultation-listing";
import { CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";
import { useConsultationListing } from "@/hooks/useConsultationListing";
import { cn } from "@/lib/utils";

export function ConsultationListingView() {
  const CL = useI18nConstants(CONSULTATION_LISTING_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();
  const { currency, astrologers, loading, error } = useConsultationListing();

  return (
    <div className={CONSULTATION_LISTING_LAYOUT.page}>
      <AppHeader
        title={CL.appBarTitle}
        showBack
        onBackClick={() => router.push(ROUTES.consultation)}
        className={cn(
          CONSULTATION_LISTING_LAYOUT.header,
          "[&_button]:text-white [&_button_svg]:text-white"
        )}
      />
      <div className="min-h-[50vh] bg-white px-5 pb-10 pt-6">
        {error ? (
          <p className="text-center text-sm text-neutral-600">{C.loadError}</p>
        ) : (
          <div className={CONSULTATION_LISTING_LAYOUT.grid}>
            {astrologers.map((astrologer) => (
              <ConsultationAstroCard
                key={astrologer.astrologer_id}
                variant="grid"
                astrologer={astrologer}
                currency={currency}
                href={consultationAstrologerPath(
                  consultationRouteUserId(astrologer)
                )}
              />
            ))}
          </div>
        )}
      </div>
      <LoadingOverlay open={loading} />
    </div>
  );
}
