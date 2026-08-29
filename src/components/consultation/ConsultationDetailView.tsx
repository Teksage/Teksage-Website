"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationDetailExpertiseBar } from "@/components/consultation/ConsultationDetailExpertiseBar";
import { ConsultationDetailProfileCard } from "@/components/consultation/ConsultationDetailProfileCard";
import { ConsultationDetailReviews } from "@/components/consultation/ConsultationDetailReviews";
import { consultationSlotsPath, consultationCheckoutPath } from "@/lib/constants/consultation-routes";
import {
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
} from "@/lib/constants/consultation-detail";
import { CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";
import { useConsultationCurrency } from "@/hooks/useConsultationCurrency";
import { ensureConsultationFilter } from "@/lib/consultation-default-filter";
import {
  clearConsultationDraftSlot,
  readConsultationFilter,
  writeConsultationDraft,
} from "@/lib/consultation-session";
import {
  fetchAstrologerDetail,
  fetchAstrologerSlots,
} from "@/lib/services/consultation";
import {
  consultationAstrologerName,
  consultationAstrologerPublicProfileUrl,
} from "@/lib/consultation-display";
import { consultationFeeForAstrologer } from "@/lib/consultation-currency";
import { formatSlotTime12 } from "@/lib/consultation-calendar";
import { cn } from "@/lib/utils";
import type {
  ConsultationAstrologerDetail,
  ConsultationSlot,
} from "@/types/consultation";

type Props = {
  astrologerId: number;
};

export function ConsultationDetailView({ astrologerId }: Props) {
  const CD = CONSULTATION_DETAIL_SCREEN;
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();
  const [data, setData] = useState<ConsultationAstrologerDetail | null>(null);
  const [slots, setSlots] = useState<ConsultationSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<ConsultationSlot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currency = useConsultationCurrency();

  useEffect(() => {
    ensureConsultationFilter();
    let cancelled = false;
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    (async () => {
      try {
        const [detail, slotList] = await Promise.all([
          fetchAstrologerDetail(astrologerId),
          fetchAstrologerSlots(astrologerId, iso).catch(
            () => [] as ConsultationSlot[]
          ),
        ]);
        if (!cancelled) {
          setData(detail);
          const open = slotList.filter((s) => !s.event_booked).slice(0, 4);
          setSlots(open);
          setSelectedSlot(null);
        }
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
      <div className={CONSULTATION_DETAIL_LAYOUT.page}>
        <p className="mt-16 text-center text-sm text-black/50">
          {error ?? C.loadError}
        </p>
      </div>
    );
  }

  const astrologer = data?.astrologer;
  const name = astrologer
    ? consultationAstrologerName(astrologer.user)
    : "";
  const fee = astrologer
    ? consultationFeeForAstrologer(astrologer, currency)
    : 0;
  const unit = currency === "INR" ? "₹" : "$";
  const publicUrl = astrologer
    ? consultationAstrologerPublicProfileUrl(astrologer)
    : null;
  const about = astrologer?.astrologer_profile_info?.trim() || CD.noAbout;
  const reviewCount =
    astrologer?.review_count ?? data?.events?.length ?? 0;

  async function onBookWithSlot() {
    if (!astrologer) return;
    if (!selectedSlot) {
      router.push(consultationSlotsPath(astrologerId));
      return;
    }
    const filter = readConsultationFilter();
    if (!filter) {
      router.push(consultationSlotsPath(astrologerId));
      return;
    }
    writeConsultationDraft({
      ...filter,
      astrologerId,
      astrologerName: name,
      astrologerPicture: astrologer.picture,
      currency,
      fee,
      slotStart: selectedSlot.start_datetime,
      slotEnd: selectedSlot.end_datetime,
    });
    router.push(consultationCheckoutPath(astrologerId));
  }

  return (
    <>
      <div className={CONSULTATION_DETAIL_LAYOUT.page}>
        <header className={CONSULTATION_DETAIL_LAYOUT.pageHeader}>
          <div className={CONSULTATION_DETAIL_LAYOUT.pageHeaderInner}>
            <button
              type="button"
              onClick={() => router.push(ROUTES.consultation)}
              className={CONSULTATION_DETAIL_LAYOUT.backBtn}
              aria-label="Back"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <p className={CONSULTATION_DETAIL_LAYOUT.breadcrumb}>
              <Link
                href={ROUTES.consultation}
                className="hover:text-black/70"
              >
                {CD.breadcrumbParent}
              </Link>
              {" / "}
              <span className={CONSULTATION_DETAIL_LAYOUT.breadcrumbName}>
                {name || "…"}
              </span>
            </p>
          </div>
        </header>

        <div className={CONSULTATION_DETAIL_LAYOUT.scroll}>
          <div className={CONSULTATION_DETAIL_LAYOUT.leftCol}>
            {astrologer ? (
              <>
                <ConsultationDetailProfileCard
                  astrologer={astrologer}
                  consultationCount={
                    reviewCount > 0 ? reviewCount * 9 : undefined
                  }
                />

                <section className={CONSULTATION_DETAIL_LAYOUT.section}>
                  <h2 className={CONSULTATION_DETAIL_LAYOUT.sectionTitle}>
                    {CD.aboutTitle}
                  </h2>
                  <p className={CONSULTATION_DETAIL_LAYOUT.aboutText}>{about}</p>
                </section>

                <ConsultationDetailExpertiseBar
                  expertise={astrologer.expertise}
                />

                <ConsultationDetailReviews
                  events={data?.events ?? []}
                  totalReviewCount={astrologer.review_count ?? data?.events?.length ?? 0}
                  averageRating={astrologer.customer_rating}
                  seeAllUrl={publicUrl}
                  fallbackCategories={astrologer.expertise}
                />
              </>
            ) : null}
          </div>

          {astrologer ? (
            <aside className={CONSULTATION_DETAIL_LAYOUT.rightCol}>
              <div className={CONSULTATION_DETAIL_LAYOUT.pricingCard}>
                <div className={CONSULTATION_DETAIL_LAYOUT.priceRow}>
                  <span className={CONSULTATION_DETAIL_LAYOUT.priceMain}>
                    {unit}
                    {fee.toLocaleString()}
                  </span>
                  <span className={CONSULTATION_DETAIL_LAYOUT.priceSuffix}>
                    {CD.perSession}
                  </span>
                </div>

                <div className={CONSULTATION_DETAIL_LAYOUT.nextAvailRow}>
                  <p className={CONSULTATION_DETAIL_LAYOUT.nextAvailLabel}>
                    {CD.nextAvailable}
                  </p>
                  <p
                    className={
                      slots.length > 0
                        ? CONSULTATION_DETAIL_LAYOUT.nextAvailValue
                        : CONSULTATION_DETAIL_LAYOUT.nextAvailEmpty
                    }
                  >
                    {slots.length > 0
                      ? `${CD.today} · ${slots.length} slots`
                      : CD.noSlotsToday}
                  </p>
                </div>

                {slots.length > 0 ? (
                  <div className={CONSULTATION_DETAIL_LAYOUT.slotRow}>
                    {slots.map((s) => {
                      const isSelected =
                        selectedSlot?.start_datetime === s.start_datetime &&
                        selectedSlot?.end_datetime === s.end_datetime;
                      return (
                        <button
                          key={s.start_datetime}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedSlot(null);
                              clearConsultationDraftSlot();
                              return;
                            }
                            setSelectedSlot(s);
                            writeConsultationDraft({
                              astrologerId,
                              slotStart: s.start_datetime,
                              slotEnd: s.end_datetime,
                            });
                          }}
                          className={cn(
                            CONSULTATION_DETAIL_LAYOUT.slotChip,
                            isSelected &&
                              CONSULTATION_DETAIL_LAYOUT.slotChipSelected
                          )}
                        >
                          {formatSlotTime12(s.start_datetime)}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <Link
                  href={consultationSlotsPath(astrologerId)}
                  className={CONSULTATION_DETAIL_LAYOUT.seeAllBtn}
                  onClick={() => {
                    if (!selectedSlot) return;
                    writeConsultationDraft({
                      astrologerId,
                      slotStart: selectedSlot.start_datetime,
                      slotEnd: selectedSlot.end_datetime,
                    });
                  }}
                >
                  {CD.seeAllSlots}
                </Link>
              </div>
            </aside>
          ) : null}
        </div>

        <div className={CONSULTATION_DETAIL_LAYOUT.footerBar}>
          <button
            type="button"
            onClick={() => void onBookWithSlot()}
            className={CONSULTATION_DETAIL_LAYOUT.footerBtn}
          >
            {CD.bookCta}
          </button>
        </div>
      </div>

      <LoadingOverlay open={loading} />
    </>
  );
}
