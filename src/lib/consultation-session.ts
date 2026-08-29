import { STORAGE_KEYS } from "@/lib/constants";
import type {
  ConsultationBookingDraft,
  ConsultationCompletedBooking,
  ConsultationFilter,
} from "@/types/consultation";

const KEY = STORAGE_KEYS.consultationDraft;

/** Categories chosen on step 1 (languages may still be empty). */
export function readConsultationCategories(): string[] | null {
  const draft = readConsultationDraft();
  if (!draft?.categories?.length) return null;
  return draft.categories;
}

/** Full filter after language step. */
export function readConsultationFilter(): ConsultationFilter | null {
  const draft = readConsultationDraft();
  if (!draft?.categories?.length || !draft.languages?.length) return null;
  return { categories: draft.categories, languages: draft.languages };
}

export function writeConsultationCategories(categories: string[]): void {
  const prev = readConsultationDraft() ?? {};
  writeConsultationDraft({ ...prev, categories, languages: prev.languages ?? [] });
}

export function writeConsultationFilter(filter: ConsultationFilter): void {
  const prev = readConsultationDraft() ?? {};
  writeConsultationDraft({ ...prev, ...filter });
}

export function readConsultationDraft(): Partial<ConsultationBookingDraft> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<ConsultationBookingDraft>) : null;
  } catch {
    return null;
  }
}

export function writeConsultationDraft(
  patch: Partial<ConsultationBookingDraft>
): void {
  if (typeof window === "undefined") return;
  const prev = readConsultationDraft() ?? {};
  sessionStorage.setItem(KEY, JSON.stringify({ ...prev, ...patch }));
}

export function clearConsultationDraft(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}

/** Drop only the selected slot times from the booking draft. */
export function clearConsultationDraftSlot(): void {
  if (typeof window === "undefined") return;
  const prev = readConsultationDraft();
  if (!prev) return;
  const next = { ...prev };
  delete next.slotStart;
  delete next.slotEnd;
  sessionStorage.setItem(KEY, JSON.stringify(next));
}

const SUMMARY_KEY = STORAGE_KEYS.consultationSummary;

export function writeConsultationSummary(summary: ConsultationCompletedBooking): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SUMMARY_KEY, JSON.stringify(summary));
}

export function readConsultationSummary(): ConsultationCompletedBooking | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SUMMARY_KEY);
    return raw ? (JSON.parse(raw) as ConsultationCompletedBooking) : null;
  } catch {
    return null;
  }
}

export function clearConsultationSummary(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SUMMARY_KEY);
}
