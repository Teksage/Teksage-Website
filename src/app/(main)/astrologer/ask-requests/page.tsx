"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { AppHeader } from "@/components/common/AppHeader";
import { PageLoadingCenter } from "@/components/common/Loader";
import { EmptyState } from "@/components/common/EmptyState";
import { AskAstrologerRequestCard } from "@/components/astrologer/AskAstrologerRequestCard";
import { fetchAstrologerAskRequests } from "@/lib/services/astrologer-ask-requests";
import { ROUTES } from "@/lib/constants/routes";
import {
  ASK_ASTROLOGER_LAYOUT,
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export default function AstrologerAskRequestsPage() {
  const router = useRouter();
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const [requests, setRequests] = useState<AskAstrologerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAstrologerAskRequests();
      setRequests(data);
    } catch {
      setError(AA.astrologerLoadFailed);
    } finally {
      setLoading(false);
    }
  }, [AA]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className={ASK_ASTROLOGER_LAYOUT.page}>
      <AppHeader
        title={AA.astrologerPageTitle}
        showBack
        onBackClick={() => router.push(ROUTES.astrologer)}
        blend
      />
      <div className={ASK_ASTROLOGER_UI.portalList}>
        <p className={ASK_ASTROLOGER_UI.subtitle}>{AA.astrologerPageSubtitle}</p>
        {loading ? (
          <PageLoadingCenter />
        ) : error ? (
          <p className="py-12 text-center text-sm text-[var(--color-brand-error)] lg:text-base">
            {error}
          </p>
        ) : requests.length === 0 ? (
          <EmptyState
            title={AA.emptyAskRequests}
            className="py-16"
          />
        ) : (
          <ul className="mt-5 space-y-5 lg:mt-6 lg:space-y-6">
            {requests.map((req) => (
              <AskAstrologerRequestCard
                key={req.id}
                req={req}
                onAnswered={() => void load()}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
