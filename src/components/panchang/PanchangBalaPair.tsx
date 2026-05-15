"use client";

import Image from "next/image";
import { PANCHANG_ASSETS, PANCHANG_SCREEN, PANCHANG_SECTIONS } from "@/lib/constants";
import type { PanchangBalaPairProps } from "@/types";

function BalaCell({
  label,
  value,
  isPositive,
}: {
  label: string;
  value: number;
  isPositive?: boolean;
}) {
  const src = isPositive ? PANCHANG_ASSETS.balaPositive : PANCHANG_ASSETS.balaNegative;
  const alt = isPositive
    ? PANCHANG_SCREEN.balaPositiveAlt
    : PANCHANG_SCREEN.balaNegativeAlt;

  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white py-3.5">
      <div className="flex flex-row flex-wrap items-center justify-center gap-1.5 px-1">
        <span className="text-sm font-medium text-[var(--color-panchang-card-muted-text)]">{label}</span>
        <span className="text-base font-semibold text-[var(--color-brand-primary)]">
          {value}
        </span>
        <Image src={src} alt={alt} width={30} height={30} className="size-[30px]" unoptimized />
      </div>
    </div>
  );
}

export function PanchangBalaPair({ panchang }: PanchangBalaPairProps) {
  if (panchang.thara_bala == null || panchang.chandra_bala == null) return null;

  const R = PANCHANG_SCREEN.rowLabels;
  const thara = panchang.thara_bala === 0 ? 9 : panchang.thara_bala;

  return (
    <div className={PANCHANG_SECTIONS.pairRow}>
      <BalaCell
        label={R.tharaBalaShort}
        value={thara}
        isPositive={panchang.thara_bala_is_positive ?? false}
      />
      <BalaCell
        label={R.chandraBalaShort}
        value={panchang.chandra_bala}
        isPositive={panchang.chandra_bala_is_positive ?? false}
      />
    </div>
  );
}
