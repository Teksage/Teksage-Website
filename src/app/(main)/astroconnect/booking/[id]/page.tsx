"use client";

import { useParams } from "next/navigation";
import { MarathonBookingView } from "@/components/marathon/MarathonBookingView";

export default function AstroConnectBookingPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  if (!Number.isFinite(id)) return null;
  return <MarathonBookingView bookingId={id} />;
}
