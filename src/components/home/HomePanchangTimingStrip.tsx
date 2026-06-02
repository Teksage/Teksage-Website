"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useSidebarPanchangTiming } from "@/hooks/useSidebarPanchangTiming";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { HomePanchangAuspiciousCell } from "@/components/home/HomePanchangAuspiciousCell";
import {
  DESKTOP_SIDEBAR_PANCHANG_HREF,
  DESKTOP_SIDEBAR_PANCHANG_TIMING,
} from "@/lib/constants/desktop-sidebar-panchang";
import { HOME_PANCHANG_TIMING_UI } from "@/lib/constants/home-panchang-timing-ui";
import type {
  HomePanchangTimingStripCellProps,
  HomePanchangTimingStripProps,
} from "@/types/ui/home-panchang-timing";
import { cn } from "@/lib/utils";

function StripCell({ label, value, variant }: HomePanchangTimingStripCellProps) {
  const onPrimary = variant === "onPrimary";
  return (
    <div
      className={cn(
        HOME_PANCHANG_TIMING_UI.cell,
        onPrimary
          ? HOME_PANCHANG_TIMING_UI.cellDividerOnPrimary
          : HOME_PANCHANG_TIMING_UI.cellDividerLight
      )}
    >
      <p
        className={
          onPrimary
            ? HOME_PANCHANG_TIMING_UI.labelOnPrimary
            : HOME_PANCHANG_TIMING_UI.labelLight
        }
      >
        {label}
      </p>
      <p
        className={cn(
          onPrimary
            ? HOME_PANCHANG_TIMING_UI.valueOnPrimary
            : HOME_PANCHANG_TIMING_UI.valueLight,
          "line-clamp-1"
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function HomePanchangTimingStrip({
  variant = "light",
  flush = false,
  className,
}: HomePanchangTimingStripProps) {
  const copy = useI18nConstants(DESKTOP_SIDEBAR_PANCHANG_TIMING);
  const { guardNavigation } = useAuthNavigation();
  const { isAuthenticated, isLoading, rahuKala, yamaKanda, auspiciousSlots } =
    useSidebarPanchangTiming();

  if (!isAuthenticated) return null;

  const placeholder = isLoading ? copy.loading : copy.unavailable;
  const onPrimary = variant === "onPrimary";
  const stripClass = onPrimary
    ? HOME_PANCHANG_TIMING_UI.stripOnPrimary
    : flush
      ? HOME_PANCHANG_TIMING_UI.stripLightFlush
      : HOME_PANCHANG_TIMING_UI.stripLight;

  return (
    <div className={cn(stripClass, className)} role="group" aria-label={copy.sectionTitle}>
      <StripCell
        variant={variant}
        label={copy.rahuKala}
        value={rahuKala ?? placeholder}
      />
      <StripCell
        variant={variant}
        label={copy.yamaKanda}
        value={yamaKanda ?? placeholder}
      />
      <HomePanchangAuspiciousCell
        variant={variant}
        label={copy.auspiciousTime}
        slots={auspiciousSlots}
        placeholder={placeholder}
      />
      <div
        className={cn(
          HOME_PANCHANG_TIMING_UI.cell,
          "min-w-[5.5rem] max-w-[6.5rem] flex-none justify-center sm:min-w-[6rem]"
        )}
      >
        <button
          type="button"
          className={
            onPrimary
              ? HOME_PANCHANG_TIMING_UI.ctaOnPrimary
              : HOME_PANCHANG_TIMING_UI.ctaLight
          }
          onClick={() =>
            guardNavigation(DESKTOP_SIDEBAR_PANCHANG_HREF, { redirectHomeOnClose: true })
          }
        >
          {copy.knowMore}
        </button>
      </div>
    </div>
  );
}
