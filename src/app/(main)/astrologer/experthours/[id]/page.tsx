"use client";

import { use } from "react";
import { MarathonAstrologerBookings } from "@/components/marathon/MarathonAstrologerBookings";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AstrologerMarathonEventPage({ params }: PageProps) {
  const { id } = use(params);
  const marathonId = Number(id);

  return Number.isFinite(marathonId) ? <MarathonAstrologerBookings marathonId={marathonId} /> : null;
}
