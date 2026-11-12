"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAstroConnectLeadStatus } from "@/hooks/useAstroConnectLeadStatus";
import { useI18nConstants } from "@/hooks/useT";
import { ASTROCONNECT_LEAD_COPY } from "@/lib/constants/astroconnect-leads";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { marathonNotifyPath } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import type { MarathonLeadNotifyButtonProps } from "@/types/ui/astroconnect-lead";

export function MarathonLeadNotifyButton({ event, className }: MarathonLeadNotifyButtonProps) {
  const copy = useI18nConstants(ASTROCONNECT_LEAD_COPY);
  const notified = useAstroConnectLeadStatus(event.id);
  const listed = useMemo(
    () => event.status === "published" || event.status === "ended" || event.admin_ended,
    [event.admin_ended, event.status]
  );
  if (!listed) return null;
  return (
    <Link
      href={marathonNotifyPath(event.public_slug || event.id)}
      className={cn(notified ? MARATHON_FLOW_UI.actionSoft : MARATHON_FLOW_UI.actionSolid, className)}
    >
      {notified ? copy.cardCtaView : copy.cardCta}
    </Link>
  );
}
