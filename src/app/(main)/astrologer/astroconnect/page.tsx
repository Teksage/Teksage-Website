"use client";

import { MarathonAstrologerList } from "@/components/marathon/MarathonAstrologerList";
import { MarathonAstrologerShell } from "@/components/marathon/MarathonAstrologerShell";
import { useI18nConstants } from "@/hooks/useT";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { ROUTES } from "@/lib/constants/routes";

export default function AstrologerAstroConnectPage() {
  const copy = useI18nConstants(MARATHON_COPY);

  return (
    <MarathonAstrologerShell title={copy.title} subtitle={copy.confirmHint} backHref={ROUTES.astrologer}>
      <MarathonAstrologerList />
    </MarathonAstrologerShell>
  );
}
