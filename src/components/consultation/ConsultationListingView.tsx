"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationAstroCard } from "@/components/consultation/ConsultationAstroCard";
import { consultationAstrologerPath } from "@/lib/constants/consultation-routes";
import { consultationRouteUserId } from "@/lib/consultation-display";
import {
  CONSULTATION_LISTING_LAYOUT,
  CONSULTATION_LISTING_SCREEN,
} from "@/lib/constants/consultation-listing";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { useConsultationListing } from "@/hooks/useConsultationListing";
import { cn } from "@/lib/utils";

export function ConsultationListingView() {
  const CL = useI18nConstants(CONSULTATION_LISTING_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();
  const [dotIndex, setDotIndex] = useState(0);
  const { currency, top, more, loading, error } = useConsultationListing();

  const hasOtherAstrologers = more.length > 0;
  const showCarousel = hasOtherAstrologers && top.length > 0;
  const topSlice = top.slice(0, 5);

  return (
    <div className={CONSULTATION_LISTING_LAYOUT.page}>
      <AppHeader
        title={CL.appBarTitle}
        showBack
        onBackClick={() => router.back()}
        className={cn(
          CONSULTATION_LISTING_LAYOUT.header,
          "[&_button]:text-white [&_button_svg]:text-white"
        )}
      />
      <div
        className={cn(
          "bg-gradient-to-b from-[var(--color-consult-user-bg)] from-[30%] to-white to-[30%]"
        )}
      >
        <section className={CONSULTATION_LISTING_LAYOUT.hero}>
          <div className={CONSULTATION_LISTING_LAYOUT.heroBorder} />
          <h1 className={CONSULTATION_LISTING_LAYOUT.heroTitle}>
            {CL.topHeading}
          </h1>
          {error ? (
            <p className="mt-6 text-center text-sm text-white">
              {C.loadError}
            </p>
          ) : (
            <>
              {showCarousel ? (
                <div
                  className={CONSULTATION_LISTING_LAYOUT.carousel}
                  onScroll={(e) => {
                    const el = e.currentTarget;
                    const max = el.scrollWidth - el.clientWidth;
                    if (max <= 0) return;
                    const idx = Math.round((el.scrollLeft / max) * 2);
                    setDotIndex(Math.min(2, Math.max(0, idx)));
                  }}
                >
                  {topSlice.map((a) => (
                    <ConsultationAstroCard
                      key={a.astrologer_id}
                      variant="top"
                      astrologer={a}
                      currency={currency}
                      href={consultationAstrologerPath(consultationRouteUserId(a))}
                    />
                  ))}
                </div>
              ) : (
                <div className={CONSULTATION_LISTING_LAYOUT.grid}>
                  {topSlice.map((a) => (
                    <ConsultationAstroCard
                      key={a.astrologer_id}
                      variant="grid"
                      astrologer={a}
                      currency={currency}
                      href={consultationAstrologerPath(consultationRouteUserId(a))}
                    />
                  ))}
                </div>
              )}
              {showCarousel ? (
                <div className={CONSULTATION_LISTING_LAYOUT.dots}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={cn(
                        CONSULTATION_LISTING_LAYOUT.dot,
                        dotIndex === i && CONSULTATION_LISTING_LAYOUT.dotActive
                      )}
                    />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </section>
        {!loading && hasOtherAstrologers ? (
          <section className={CONSULTATION_LISTING_LAYOUT.body}>
            <h2 className={CONSULTATION_LISTING_LAYOUT.otherTitle}>
              {CL.otherHeading}
            </h2>
            <div className={CONSULTATION_LISTING_LAYOUT.grid}>
              {more.map((astrologer) => (
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
          </section>
        ) : null}
      </div>
      <LoadingOverlay open={loading} />
    </div>
  );
}
