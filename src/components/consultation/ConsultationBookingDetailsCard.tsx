"use client";

import Image from "next/image";
import { ConsultationBookingDetailRow } from "@/components/consultation/ConsultationBookingDetailRow";
import {
  CONSULTATION_BOOKING_ASSETS,
  CONSULTATION_BOOKING_LAYOUT,
} from "@/lib/constants/consultation-booking";
import {
  formatProfileDateOfBirth,
  formatProfileTimeOfBirth,
} from "@/lib/consultation-booking-format";
import type { ConsultationBookingDetailsCardProps } from "@/types/ui/consultation-booking";

export function ConsultationBookingDetailsCard({
  date,
  time,
  consultingOn,
  language,
  profile,
  labels,
}: ConsultationBookingDetailsCardProps) {
  return (
    <div className={CONSULTATION_BOOKING_LAYOUT.grayCard}>
      <ConsultationBookingDetailRow label={labels.date} value={date} />
      <ConsultationBookingDetailRow label={labels.time} value={time} />
      <ConsultationBookingDetailRow label={labels.consultingOn} value={consultingOn} />
      <ConsultationBookingDetailRow label={labels.language} value={language} />
      <Image
        src={CONSULTATION_BOOKING_ASSETS.dashedLine}
        alt=""
        width={280}
        height={4}
        unoptimized
        className="my-3 block w-full opacity-20"
        aria-hidden
      />
      <ConsultationBookingDetailRow
        label={labels.dob}
        value={formatProfileDateOfBirth(profile?.dateOfBirth)}
      />
      <ConsultationBookingDetailRow
        label={labels.tob}
        value={formatProfileTimeOfBirth(profile?.timeOfBirth)}
      />
      <ConsultationBookingDetailRow
        label={labels.pob}
        value={profile?.placeOfBirth?.trim() || "—"}
      />
      <ConsultationBookingDetailRow
        label={labels.rasi}
        value={profile?.rashi?.trim() || "—"}
      />
      <ConsultationBookingDetailRow
        label={labels.nakshatram}
        value={profile?.nakshatra?.trim() || "—"}
      />
    </div>
  );
}
