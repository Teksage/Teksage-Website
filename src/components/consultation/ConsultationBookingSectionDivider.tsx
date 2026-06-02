"use client";

import Image from "next/image";
import {
  CONSULTATION_BOOKING_ASSETS,
  CONSULTATION_BOOKING_LAYOUT,
} from "@/lib/constants/consultation-booking";

type ConsultationBookingSectionDividerProps = {
  title: string;
};

export function ConsultationBookingSectionDivider({
  title,
}: ConsultationBookingSectionDividerProps) {
  return (
    <>
      <Image
        src={CONSULTATION_BOOKING_ASSETS.dashedLine}
        alt=""
        width={280}
        height={4}
        unoptimized
        className={CONSULTATION_BOOKING_LAYOUT.dashed}
        aria-hidden
      />
      <p className={CONSULTATION_BOOKING_LAYOUT.sectionTitle}>{title}</p>
      <Image
        src={CONSULTATION_BOOKING_ASSETS.dashedLine}
        alt=""
        width={280}
        height={4}
        unoptimized
        className={CONSULTATION_BOOKING_LAYOUT.dashed}
        aria-hidden
      />
    </>
  );
}
