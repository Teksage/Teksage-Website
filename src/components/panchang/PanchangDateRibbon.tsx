"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { Fragment } from "react";
import { PANCHANG_ASSETS, PANCHANG_SCREEN, PANCHANG_SECTIONS } from "@/lib/constants";
import { PANCHANG_DATE, PANCHANG_DATE_LAYOUT } from "@/lib/constants/panchang-date";
import { shortWeekdayLabel } from "@/lib/panchang-time-format";
import type { PanchangDateRibbonProps } from "@/types";

function RibbonChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={PANCHANG_DATE_LAYOUT.ribbonChevron}
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PanchangDateRibbon({ panchang, onOpenCalendar }: PanchangDateRibbonProps) {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const L = PANCHANG_DATE_LAYOUT;
  const sep = P.dateRibbonPieceSeparator;
  const short = shortWeekdayLabel(panchang.eng_weekday, panchang.weekday);
  const parts = [short, panchang.date, panchang.time].filter((x) => x?.trim());

  return (
    <div className={L.ribbonWrap}>
      <p id={PANCHANG_DATE.changeDateHintId} className={L.changeDateHint}>
        {P.changeDateHint}
      </p>
      <button
        type="button"
        className={L.ribbonTrigger}
        onClick={onOpenCalendar}
        aria-label={PANCHANG_DATE.pickDateAria}
        aria-describedby={PANCHANG_DATE.changeDateHintId}
      >
        <div className={PANCHANG_SECTIONS.dateRibbon}>
          <Image
            src={PANCHANG_ASSETS.timeRibbon}
            alt=""
            width={275}
            height={37}
            className="mx-auto block h-auto w-full max-w-[min(100%,275px)]"
            unoptimized
          />
          <div className={L.ribbonInnerRow}>
            <Image
              src={PANCHANG_ASSETS.datePickerIcon}
              alt=""
              width={18}
              height={18}
              unoptimized
              className={L.ribbonCalendarIcon}
              aria-hidden
            />
            <p className={L.ribbonDateText}>
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
            <RibbonChevronDown />
          </div>
        </div>
      </button>
    </div>
  );
}
