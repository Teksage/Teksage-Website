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
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 border-dashed border-[var(--color-panchang-row-divider)] py-2.5 text-sm",
        !isLast && "border-b"
      )}
    >
      <span className="w-1/3 shrink-0 font-semibold text-[var(--color-brand-panchang)]">
        {label}
      </span>
      <span className="min-w-0 flex-1 text-right font-medium leading-snug text-[var(--color-brand-black)]">
        {value}
      </span>
    </div>
  );
}

export function HoroscopeProfileCard({ data }: HoroscopeProfileCardProps) {
  const H = HOROSCOPE_SCREEN;
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
  const n = rows.length;

  return (
    <div className={HOROSCOPE_LAYOUT.profileCard}>
      {rows.map((row, i) => (
        <ProfileRow
          key={row.label}
          label={row.label}
          value={row.value}
          isLast={i === n - 1}
        />
      ))}
    </div>
  );
}
