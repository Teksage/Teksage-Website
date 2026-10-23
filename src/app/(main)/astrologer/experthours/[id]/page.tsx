import { redirect } from "next/navigation";
import { ROUTES, astrologerMarathonEventPath } from "@/lib/constants/routes";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AstrologerExpertHoursEventRedirectPage({ params }: PageProps) {
  const { id } = await params;
  const marathonId = Number(id);
  redirect(Number.isFinite(marathonId) ? astrologerMarathonEventPath(marathonId) : ROUTES.astrologerMarathon);
}
