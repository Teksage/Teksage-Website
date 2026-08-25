import { ROUTES } from "@/lib/constants/routes";

export const CONSULTATION_HUB_TAB_QUERY = "tab" as const;
export const CONSULTATION_HUB_TAB_ASTROLOGER = "astrologer" as const;
export const CONSULTATION_HUB_TAB_MEETING = "meeting" as const;

export type ConsultationHubTab =
  | typeof CONSULTATION_HUB_TAB_ASTROLOGER
  | typeof CONSULTATION_HUB_TAB_MEETING;

/** Consultation hub — `?tab=meeting` for meetings; astrologer grid is the default. */
export function consultationHubPath(
  tab: ConsultationHubTab = CONSULTATION_HUB_TAB_ASTROLOGER
): string {
  if (tab === CONSULTATION_HUB_TAB_ASTROLOGER) return ROUTES.consultation;
  const q = new URLSearchParams({ [CONSULTATION_HUB_TAB_QUERY]: tab });
  return `${ROUTES.consultation}?${q.toString()}`;
}

export function parseConsultationHubTab(
  raw: string | null | undefined
): ConsultationHubTab {
  return raw === CONSULTATION_HUB_TAB_MEETING
    ? CONSULTATION_HUB_TAB_MEETING
    : CONSULTATION_HUB_TAB_ASTROLOGER;
}

/** Route + detail/slots/book APIs use astrologer `user_id` (Flutter `userId`). */
export function consultationAstrologerPath(userId: number): string {
  return `${ROUTES.consultationAstrologer}/${userId}`;
}

export function consultationSlotsPath(userId: number): string {
  return `${consultationAstrologerPath(userId)}/slots`;
}

export function consultationCheckoutPath(userId: number): string {
  return `${consultationAstrologerPath(userId)}/checkout`;
}

/** `/consultation/astrologer/:id` only (not slots/checkout). */
export function isConsultationAstrologerDetailPath(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  return (
    parts.length === 3 &&
    parts[0] === "consultation" &&
    parts[1] === "astrologer" &&
    /^\d+$/.test(parts[2] ?? "")
  );
}

/** `/consultation/astrologer/:id/slots`. */
export function isConsultationAstrologerSlotsPath(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  return (
    parts.length === 4 &&
    parts[0] === "consultation" &&
    parts[1] === "astrologer" &&
    /^\d+$/.test(parts[2] ?? "") &&
    parts[3] === "slots"
  );
}

export function isConsultationCheckoutPath(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  return (
    parts.length === 4 &&
    parts[0] === "consultation" &&
    parts[1] === "astrologer" &&
    /^\d+$/.test(parts[2] ?? "") &&
    parts[3] === "checkout"
  );
}

export function isConsultationGreenFullBleedPath(_pathname: string): boolean {
  return false;
}
