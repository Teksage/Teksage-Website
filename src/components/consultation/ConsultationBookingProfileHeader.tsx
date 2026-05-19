"use client";

import Image from "next/image";
import {
  CONSULTATION_BOOKING_ASSETS,
  CONSULTATION_BOOKING_LAYOUT,
} from "@/lib/constants/consultation-booking";

type ConsultationBookingProfileHeaderProps = {
  name: string;
  picture?: string | null;
  compact?: boolean;
};

export function ConsultationBookingProfileHeader({
  name,
  picture,
  compact,
}: ConsultationBookingProfileHeaderProps) {
  const src = picture?.trim() || CONSULTATION_BOOKING_ASSETS.dummyAvatar;

  if (compact) {
    return (
      <div className={CONSULTATION_BOOKING_LAYOUT.profileChip}>
        <Image
          src={src}
          alt=""
          width={40}
          height={40}
          unoptimized
          className={CONSULTATION_BOOKING_LAYOUT.profileChipAvatar}
        />
        <span className={CONSULTATION_BOOKING_LAYOUT.profileChipName}>{name}</span>
      </div>
    );
  }

  return (
    <div className={CONSULTATION_BOOKING_LAYOUT.profileWrap}>
      <Image
        src={src}
        alt=""
        width={80}
        height={80}
        unoptimized
        className={CONSULTATION_BOOKING_LAYOUT.avatar}
      />
      <h2 className={CONSULTATION_BOOKING_LAYOUT.profileName}>{name}</h2>
    </div>
  );
}
