"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { MarathonFlowHeader } from "@/components/marathon/MarathonFlowHeader";
import { MarathonLeadCapture } from "@/components/marathon/MarathonLeadCapture";
import { useI18nConstants } from "@/hooks/useT";
import { ASTROCONNECT_LEAD_COPY, ASTROCONNECT_LEAD_UI } from "@/lib/constants/astroconnect-leads";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { ROUTES } from "@/lib/constants/routes";
import { fetchPublicMarathon } from "@/lib/services/marathon";
import type { MarathonEvent } from "@/types/marathon";

export default function AstroConnectNotifyPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const copy = useI18nConstants(ASTROCONNECT_LEAD_COPY);
  const ui = ASTROCONNECT_LEAD_UI;
  const [event, setEvent] = useState<MarathonEvent | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.slug) return;
    setLoading(true);
    fetchPublicMarathon(params.slug)
      .then(setEvent)
      .catch(() => setError(copy.notFound))
      .finally(() => setLoading(false));
  }, [copy.notFound, params.slug]);

  if (loading) return <LoadingOverlay open />;
  if (error || !event) {
    return (
      <div className={ui.page}>
        <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
        <div className={ui.pageInner}>
          <MarathonFlowHeader
            title={copy.title}
            step={1}
            labels={[]}
            onBack={() => router.push(ROUTES.expertHours)}
          />
          <div className={ui.stage}>
            <div className={ui.card}>
              <p className={ui.error}>{error || copy.notFound}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <MarathonLeadCapture event={event} />;
}
