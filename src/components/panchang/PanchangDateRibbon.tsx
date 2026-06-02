"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { Fragment } from "react";
import { PANCHANG_ASSETS, PANCHANG_SCREEN, PANCHANG_SECTIONS } from "@/lib/constants";
import { shortWeekdayLabel } from "@/lib/panchang-time-format";
import type { PanchangDateRibbonProps } from "@/types";

export function PanchangDateRibbon({ panchang }: PanchangDateRibbonProps) {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const sep = P.dateRibbonPieceSeparator;
  const short = shortWeekdayLabel(panchang.eng_weekday, panchang.weekday);
  const parts = [short, panchang.date, panchang.time].filter((x) => x?.trim());

  return (
    <div className={PANCHANG_SECTIONS.dateRibbon}>
      <Image
        src={PANCHANG_ASSETS.timeRibbon}
        alt=""
        width={275}
        height={37}
        className="mx-auto block h-auto w-full max-w-[min(100%,275px)]"
        unoptimized
      />
      <div className="absolute inset-0 flex items-center justify-center px-10">
        <p className="flex flex-wrap items-center justify-center gap-x-0.5 text-center text-xs font-semibold text-white sm:text-sm">
          {parts.map((p, i) => (
            <Fragment key={`${i}-${p}`}>
              {i > 0 ? (
                <span className="px-0.5" aria-hidden>
                  {sep}
                </span>
              ) : null}
              <span>{p}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}
