import { PANCHANG_SCREEN } from "@/lib/constants/panchang-screen";
import { ROUTES } from "@/lib/constants/routes";

/** Desktop sidebar — today’s timing summary (links to full Panchang). */
export const DESKTOP_SIDEBAR_PANCHANG_TIMING = {
  sectionTitle: "Today's timings",
  rahuKala: PANCHANG_SCREEN.rowLabels.rahuKala,
  yamaKanda: PANCHANG_SCREEN.rowLabels.yamaKanda,
  auspiciousTime: PANCHANG_SCREEN.rowLabels.auspiciousTime,
  knowMore: "Click to know more",
  auspiciousMore: "more",
  viewPanchangCta: "View full Panchang",
  unavailable: "—",
  loading: "Loading…",
} as const;

export const DESKTOP_SIDEBAR_PANCHANG_HREF = ROUTES.panchang;
