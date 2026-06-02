import { categoriesForApi } from "@/lib/consultation-categories";
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
