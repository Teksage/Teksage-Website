import { MUHURTHA_QUERY } from "@/lib/constants/muhurtha-query";
import { ROUTES } from "@/lib/constants/routes";
import type { MuhurthaSearchParams } from "@/types/muhurtha";

export function buildEventPlannerResultsPath(params: MuhurthaSearchParams): string {
  const query = new URLSearchParams({
    [MUHURTHA_QUERY.event]: params.event,
    [MUHURTHA_QUERY.startDate]: params.startDate,
    [MUHURTHA_QUERY.location]: params.location,
  });
  return `${ROUTES.eventPlannerResults}?${query.toString()}`;
}
