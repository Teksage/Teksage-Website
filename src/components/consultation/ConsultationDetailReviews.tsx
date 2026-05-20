"use client";

import Image from "next/image";
import {
  CONSULTATION_DETAIL_ASSETS,
  CONSULTATION_DETAIL_LAYOUT,
  CONSULTATION_DETAIL_SCREEN,
} from "@/lib/constants/consultation-detail";
import type { ConsultationReviewEvent } from "@/types/consultation";

type ConsultationDetailReviewsProps = {
  events: ConsultationReviewEvent[];
};

function StarRow({ rating }: { rating: number }) {
  const safe = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className={CONSULTATION_DETAIL_LAYOUT.reviewStars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Image
          key={i}
          src={
            i < safe
              ? CONSULTATION_DETAIL_ASSETS.ratingStar
              : CONSULTATION_DETAIL_ASSETS.ratingStarEmpty
          }
          alt=""
          width={14}
          height={14}
          unoptimized
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ConsultationDetailReviews({ events }: ConsultationDetailReviewsProps) {
  return (
    <>
      <h3 className={CONSULTATION_DETAIL_LAYOUT.reviewsHeading}>
        {CONSULTATION_DETAIL_SCREEN.reviewsTitle}
      </h3>
      <div className={CONSULTATION_DETAIL_LAYOUT.reviewsCard}>
        {events.length === 0 ? (
          <p className="text-center text-sm font-semibold text-[var(--color-brand-black)]/50">
            {CONSULTATION_DETAIL_SCREEN.noReviews}
          </p>
        ) : (
          <ul>
            {events.map((ev, index) => {
              const name = [ev.first_name, ev.last_name].filter(Boolean).join(" ");
              const rating = ev.rating ?? 0;
              return (
                <li key={`${name}-${index}`}>
                  {index > 0 ? (
                    <Image
                      src={CONSULTATION_DETAIL_ASSETS.ratingLine}
                      alt=""
                      width={320}
                      height={8}
                      unoptimized
                      className={CONSULTATION_DETAIL_LAYOUT.reviewDivider}
                      aria-hidden
                    />
                  ) : null}
                  <div className={CONSULTATION_DETAIL_LAYOUT.reviewRow}>
                    <div className={CONSULTATION_DETAIL_LAYOUT.reviewAvatar}>
                      <Image
                        src={CONSULTATION_DETAIL_ASSETS.reviewPerson}
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                        className="opacity-80"
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={CONSULTATION_DETAIL_LAYOUT.reviewName}>{name}</p>
                      <StarRow rating={rating} />
                    </div>
                    <div className={CONSULTATION_DETAIL_LAYOUT.reviewScore}>
                      <span>{rating.toFixed(1)}</span>
                      <Image
                        src={CONSULTATION_DETAIL_ASSETS.ratingStar}
                        alt=""
                        width={16}
                        height={16}
                        unoptimized
                        aria-hidden
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
