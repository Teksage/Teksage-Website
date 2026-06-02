import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

/** Legacy home-banner href — forwards to astrologer portal. */
export default function ConsultationAstrologerHubPage() {
  redirect(ROUTES.astrologer);
}
