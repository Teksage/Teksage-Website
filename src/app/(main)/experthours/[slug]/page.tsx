import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

/** Session step was removed. Old event links return to the list. */
export default function ExpertHoursDetailPage() {
  redirect(ROUTES.expertHours);
}
