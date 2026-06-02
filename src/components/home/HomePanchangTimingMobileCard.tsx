"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useSidebarPanchangTiming } from "@/hooks/useSidebarPanchangTiming";
import {
  DESKTOP_SIDEBAR_PANCHANG_HREF,
  DESKTOP_SIDEBAR_PANCHANG_TIMING,
} from "@/lib/constants/desktop-sidebar-panchang";
import { HOME_PANCHANG_TIMING_UI } from "@/lib/constants/home-panchang-timing-ui";
import type { HomePanchangTimingMobileCardProps } from "@/types/ui/home-panchang-timing";
import { cn } from "@/lib/utils";

function TimingRow({ label, value }: { label: string; value: string }) {
  const L = HOME_PANCHANG_TIMING_UI;
  return (
    <div className={L.mobileRow}>
      <span className={L.mobileLabel}>{label}</span>
      <span className={L.mobileValue}>{value}</span>
    </div>
  );
}

/** Mobile home — timings card in main scroll (replaces cramped header strip). */
export function HomePanchangTimingMobileCard({
  className,
}: HomePanchangTimingMobileCardProps) {
  const copy = useI18nConstants(DESKTOP_SIDEBAR_PANCHANG_TIMING);
  const { guardNavigation } = useAuthNavigation();
  const { isLoading, rahuKala, yamaKanda, auspiciousSlots } =
    useSidebarPanchangTiming();

  const placeholder = isLoading ? copy.loading : copy.unavailable;
  const auspiciousValues = auspiciousSlots.length ? auspiciousSlots : [placeholder];

  return (
    <section
      className={cn(HOME_PANCHANG_TIMING_UI.mobileCard, className)}
      aria-label={copy.sectionTitle}
    >
      <h2 className={HOME_PANCHANG_TIMING_UI.mobileTitle}>{copy.sectionTitle}</h2>
      <div className={HOME_PANCHANG_TIMING_UI.mobileRowGroup}>
        <TimingRow label={copy.rahuKala} value={rahuKala ?? placeholder} />
        <TimingRow label={copy.yamaKanda} value={yamaKanda ?? placeholder} />
        <div className={HOME_PANCHANG_TIMING_UI.mobileRow}>
          <span className={HOME_PANCHANG_TIMING_UI.mobileLabel}>{copy.auspiciousTime}</span>
          <ul className={HOME_PANCHANG_TIMING_UI.mobileValueStack}>
            {auspiciousValues.map((slot) => (
              <li key={slot} className={HOME_PANCHANG_TIMING_UI.mobileValue}>
                {slot}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        className={HOME_PANCHANG_TIMING_UI.mobileCta}
        onClick={() =>
          guardNavigation(DESKTOP_SIDEBAR_PANCHANG_HREF, { redirectHomeOnClose: true })
        }
      >
        {copy.knowMore}
      </button>
    </section>
  );
}
