import { categoriesForApi } from "@/lib/consultation-categories";
import { writeConsultationFilter, readConsultationFilter } from "@/lib/consultation-session";
import { CONSULTATION_CATEGORIES } from "@/lib/constants/consultation-screen";
import type { ConsultationFilter } from "@/types/consultation";

/** Default filter when skipping category/language steps (all topics + English). */
export function defaultConsultationFilter(): ConsultationFilter {
  return {
    categories: categoriesForApi(
      CONSULTATION_CATEGORIES.map((category) => category.id)
    ),
    languages: ["english"],
  };
}

/** Ensures session filter exists — supports deep links such as `/consultation/astrologer/:id`. */
export function ensureConsultationFilter(): ConsultationFilter {
  const existing = readConsultationFilter();
  if (existing) return existing;
  const filter = defaultConsultationFilter();
  writeConsultationFilter(filter);
  return filter;
}
