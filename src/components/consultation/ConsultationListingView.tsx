"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { Loader } from "@/components/common/Loader";
import { ConsultationAstroCard } from "@/components/consultation/ConsultationAstroCard";
import { ConsultationFilterChips } from "@/components/consultation/ConsultationFilterChips";
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
  const router = useRouter();
  const [dotIndex, setDotIndex] = useState(0);
  const {
    currency,
    categories,
    languages,
    top,
    more,
    loading,
    error,
    removeCategory,
    removeLanguage,
  } = useConsultationListing();

  const showCarousel = more.length > 0 && top.length > 0;
  const topSlice = top.slice(0, 5);

  return (
    <div className={CONSULTATION_LISTING_LAYOUT.page}>
      <AppHeader
        title={CONSULTATION_LISTING_SCREEN.appBarTitle}
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
            {CONSULTATION_LISTING_SCREEN.topHeading}
          </h1>
          <ConsultationFilterChips
            categories={categories}
            languages={languages}
            onRemoveCategory={removeCategory}
            onRemoveLanguage={removeLanguage}
          />
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader />
            </div>
          ) : error ? (
            <p className="mt-6 text-center text-sm text-white">
              {CONSULTATION_SCREEN.loadError}
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
        {!loading && more.length > 0 ? (
          <section className={CONSULTATION_LISTING_LAYOUT.body}>
            <h2 className={CONSULTATION_LISTING_LAYOUT.otherTitle}>
              {CONSULTATION_LISTING_SCREEN.otherHeading}
            </h2>
            <div className={CONSULTATION_LISTING_LAYOUT.grid}>
              {more.map((a) => (
                <ConsultationAstroCard
                  key={a.astrologer_id}
                  variant="grid"
                  astrologer={a}
                  currency={currency}
                  href={consultationAstrologerPath(consultationRouteUserId(a))}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
