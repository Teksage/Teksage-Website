"use client";

import { useParams } from "next/navigation";
import { MarathonListView } from "@/components/marathon/MarathonListView";

/** AstroConnect Pro list, opened on the event from the popup or a shared link. */
export default function AstroConnectDetailPage() {
  const params = useParams<{ slug: string }>();
  return <MarathonListView focusSlug={params.slug} />;
}
