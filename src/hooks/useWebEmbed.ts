"use client";

import { useSearchParams } from "next/navigation";
import { WEB_EMBED, isWebEmbedParam } from "@/lib/constants/web-embed";

/** True when opened from the mobile app WebView (`?embed=1`). */
export function useWebEmbed(): boolean {
  const searchParams = useSearchParams();
  return isWebEmbedParam(searchParams.get(WEB_EMBED.queryKey));
}
