import { redirect } from "next/navigation";
import { marathonCheckoutPath } from "@/lib/constants/routes";

export default async function ExpertHoursCheckoutRedirectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ slot?: string }>;
}) {
  const { slug } = await params;
  const { slot } = await searchParams;
  const slotId = Number(slot);
  redirect(marathonCheckoutPath(slug, Number.isFinite(slotId) ? slotId : 0));
}
