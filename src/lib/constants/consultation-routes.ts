import { ROUTES } from "@/lib/constants/routes";

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

export function isConsultationGreenFullBleedPath(pathname: string): boolean {
  return (
    isConsultationAstrologerDetailPath(pathname) ||
    isConsultationAstrologerSlotsPath(pathname)
  );
}
