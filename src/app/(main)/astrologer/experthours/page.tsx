import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export default function AstrologerExpertHoursRedirectPage() {
  redirect(ROUTES.astrologerMarathon);
}
