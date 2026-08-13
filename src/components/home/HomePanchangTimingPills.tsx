"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useSidebarPanchangTiming } from "@/hooks/useSidebarPanchangTiming";
import { HomePanchangTimingPill } from "@/components/home/HomePanchangTimingPill";
import {
  DESKTOP_SIDEBAR_PANCHANG_HREF,
  DESKTOP_SIDEBAR_PANCHANG_TIMING,
} from "@/lib/constants/desktop-sidebar-panchang";
import { HOME_PANCHANG_TIMING_UI as UI } from "@/lib/constants/home-panchang-timing-ui";

export function HomePanchangTimingPills() {
  const copy = useI18nConstants(DESKTOP_SIDEBAR_PANCHANG_TIMING);
  const { guardNavigation } = useAuthNavigation();
  const { isAuthenticated, isLoading, rahuKala, yamaKanda, auspiciousSlots } =
    useSidebarPanchangTiming();

  if (!isAuthenticated) return null;

  const placeholder = isLoading ? copy.loading : copy.unavailable;
  const firstSlot = auspiciousSlots[0] ?? placeholder;
  const extraCount = Math.max(0, auspiciousSlots.length - 1);

  return (
    <div className={UI.pillsStrip} role="group" aria-label={copy.sectionTitle}>
      <div className={UI.pillsRow}>
        <HomePanchangTimingPill
          tone="auspicious"
          label={copy.auspiciousTime}
          value={firstSlot}
          extraLabel={
            extraCount > 0
              ? copy.auspiciousExtra.replace("{count}", String(extraCount))
              : undefined
          }
          extraSlots={auspiciousSlots}
        />
        <HomePanchangTimingPill
          tone="inauspicious"
          label={copy.rahuKala}
          value={rahuKala ?? placeholder}
        />
        <HomePanchangTimingPill
          tone="inauspicious"
          label={copy.yamaKandaPills}
          value={yamaKanda ?? placeholder}
        />
      </div>
      <button
        type="button"
        className={UI.pillsCta}
        onClick={() =>
          guardNavigation(DESKTOP_SIDEBAR_PANCHANG_HREF, {
            redirectHomeOnClose: true,
          })
        }
      >
        {copy.panchangLink}
      </button>
    </div>
  );
}
