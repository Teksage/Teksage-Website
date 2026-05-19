import { CONSULTATION_CATEGORIES } from "@/lib/constants/consultation-screen";

/** Selected chip ids → API category strings (Flutter lowercases before API). */
export function categoriesForApi(selectedIds: string[]): string[] {
  const values =
    selectedIds.includes("all")
      ? CONSULTATION_CATEGORIES.filter((c) => c.id !== "all").map((c) => c.apiValue)
      : CONSULTATION_CATEGORIES.filter((c) => selectedIds.includes(c.id)).map(
          (c) => c.apiValue
        );
  return values.map((v) => v.toLowerCase());
}

export function toggleCategorySelection(
  selectedIds: string[],
  toggledId: string
): string[] {
  if (toggledId === "all") {
    return selectedIds.includes("all")
      ? []
      : CONSULTATION_CATEGORIES.map((c) => c.id);
  }
  const withoutAll = selectedIds.filter((id) => id !== "all");
  const next = withoutAll.includes(toggledId)
    ? withoutAll.filter((id) => id !== toggledId)
    : [...withoutAll, toggledId];
  const allExceptAll = CONSULTATION_CATEGORIES.filter((c) => c.id !== "all").map(
    (c) => c.id
  );
  if (allExceptAll.every((id) => next.includes(id))) {
    return CONSULTATION_CATEGORIES.map((c) => c.id);
  }
  return next;
}

export function consultationCategorySelectionCount(selectedIds: string[]): number {
  if (selectedIds.includes("all")) {
    return CONSULTATION_CATEGORIES.filter((c) => c.id !== "all").length;
  }
  return selectedIds.filter((id) => id !== "all").length;
}
