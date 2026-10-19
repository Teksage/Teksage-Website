import { redirect } from "next/navigation";
import { marathonBookingPath } from "@/lib/constants/routes";

export default async function MarathonBookingRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(marathonBookingPath(Number(id)));
}
