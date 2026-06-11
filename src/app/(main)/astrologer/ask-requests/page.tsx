"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { PageLoadingCenter } from "@/components/common/Loader";
import { EmptyState } from "@/components/common/EmptyState";
import { AskAstrologerRequestCard } from "@/components/astrologer/AskAstrologerRequestCard";
import { fetchAstrologerAskRequests } from "@/lib/services/astrologer-ask-requests";
import { ROUTES } from "@/lib/constants/routes";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export default function AstrologerAskRequestsPage() {
  const router = useRouter();
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
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader
        title="Ask Requests"
        showBack
        onBackClick={() => router.push(ROUTES.astrologer)}
      />
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-4">
        {loading ? (
          <PageLoadingCenter />
        ) : error ? (
          <p className="py-12 text-center text-sm text-[var(--color-brand-error)]">{error}</p>
        ) : requests.length === 0 ? (
          <EmptyState
            title={ASK_ASTROLOGER_SCREEN.emptyAskRequests}
            className="py-16"
          />
        ) : (
          <ul className="space-y-4">
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
