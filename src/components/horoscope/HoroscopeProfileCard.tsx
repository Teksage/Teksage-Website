"use client";

import { useI18nConstants } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import { HOROSCOPE_LAYOUT, HOROSCOPE_SCREEN } from "@/lib/constants";
import { formatHoroscopeDob, formatHoroscopeTimeOfBirth } from "@/lib/horoscope-display-format";
import type { HoroscopeProfileCardProps } from "@/types";

function ProfileRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value?: string;
  isLast: boolean;
}) {
  if (!value?.trim()) return null;
  const L = HOROSCOPE_LAYOUT;

  return (
    <div className={cn(L.profileRow, !isLast && "border-b")}>
      <span className={L.profileRowLabel}>{label}</span>
      <span className={L.profileRowValue}>{value}</span>
    </div>
  );
}

export function HoroscopeProfileCard({ data }: HoroscopeProfileCardProps) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ").trim();
  const displayName = fullName || H.fallbackName;
  const place =
    data.birth_location?.trim() || data.preferred_location?.trim() || "";

  const rows = [
    { label: H.profileNameLabel, value: displayName },
    { label: H.profileDobLabel, value: formatHoroscopeDob(data.date_of_birth) },
    { label: H.profileTimeOfBirthLabel, value: formatHoroscopeTimeOfBirth(data.time_of_birth) },
    { label: H.profilePlaceLabel, value: place },
    { label: H.profileRasiLabel, value: data.rashi },
    { label: H.profileNakshatramLabel, value: data.nakshatra },
    { label: H.profileLagnaLabel, value: data.lagna },
  ].filter((r) => r.value?.trim());

  return (
    <div className={HOROSCOPE_LAYOUT.profileCard}>
      {rows.map((row, index) => (
        <ProfileRow
          key={row.label}
          label={row.label}
          value={row.value}
          isLast={index === rows.length - 1}
        />
      ))}
    </div>
  );
}
