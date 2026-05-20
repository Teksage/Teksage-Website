"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { PANCHANG_ASSETS, PANCHANG_SCREEN, PANCHANG_SECTIONS } from "@/lib/constants";
import type { PanchangSunTimeGridProps } from "@/types";

function SunCell({
  iconSrc,
  label,
  time,
}: {
  iconSrc: string;
  label: string;
  time?: string;
}) {
  if (!time?.trim()) return null;

  return (
    <div className="flex flex-1 flex-col items-center rounded-xl bg-white py-3.5">
      <div className="flex items-center gap-1.5">
        <Image src={iconSrc} alt="" width={28} height={28} className="size-7" unoptimized />
        <span className="text-sm font-medium text-[var(--color-panchang-card-muted-text)]">{label}</span>
      </div>
      <div className="my-1.5 flex w-full justify-center px-4">
        <Image
          src={PANCHANG_ASSETS.timeDivider}
          alt=""
          width={120}
          height={4}
          className="h-1 w-full max-w-[120px]"
          unoptimized
        />
      </div>
      <p className="text-[22px] font-semibold leading-none text-[var(--color-brand-primary)]">
        {time}
      </p>
    </div>
  );
}

export function PanchangSunTimeGrid({ sunrise, sunset }: PanchangSunTimeGridProps) {
  const P = useI18nConstants(PANCHANG_SCREEN);
  if (!sunrise?.trim() && !sunset?.trim()) return null;

  const R = P.rowLabels;

  return (
    <div className={PANCHANG_SECTIONS.pairRow}>
      {sunrise?.trim() ? (
        <SunCell iconSrc={PANCHANG_ASSETS.sunrise} label={R.sunrise} time={sunrise} />
      ) : (
        <div className="min-h-1 flex-1 rounded-xl bg-transparent" aria-hidden />
      )}
      {sunset?.trim() ? (
        <SunCell iconSrc={PANCHANG_ASSETS.sunset} label={R.sunset} time={sunset} />
      ) : (
        <div className="min-h-1 flex-1 rounded-xl bg-transparent" aria-hidden />
      )}
    </div>
  );
}
