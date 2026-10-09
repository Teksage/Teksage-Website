"use client";

import { useParams } from "next/navigation";
import { MarathonDetailView } from "@/components/marathon/MarathonDetailView";

export default function MarathonDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  if (!Number.isFinite(id)) return null;
  return <MarathonDetailView marathonId={id} />;
}
