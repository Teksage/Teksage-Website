"use client";

import { useParams } from "next/navigation";
import { MarathonListView } from "@/components/marathon/MarathonListView";

/** One AstroConnect Pro event, opened from the popup or a shared link. */
export default function AstroConnectDetailPage() {
  const params = useParams<{ slug: string }>();
  return <MarathonListView focusSlug={params.slug} />;
}
