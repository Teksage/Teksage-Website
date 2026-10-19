"use client";

import { useParams } from "next/navigation";
import { MarathonDetailView } from "@/components/marathon/MarathonDetailView";

export default function ExpertHoursDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  if (!slug) return null;
  return <MarathonDetailView marathonId={slug} />;
}
