"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { PageLoadingCenter } from "@/components/common/Loader";
import { EmptyState } from "@/components/common/EmptyState";
import { AskAstrologerRequestCard } from "@/components/astrologer/AskAstrologerRequestCard";
import { useI18nConstants } from "@/hooks/useT";
import { fetchAstrologerAskRequests } from "@/lib/services/astrologer-ask-requests";
import { ROUTES } from "@/lib/constants/routes";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

type AskRequestTab = "assigned" | "answered";

export default function AstrologerAskRequestsPage() {
  const AP = useI18nConstants(ASTRO_PORTAL_UI);
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const router = useRouter();
  const [requests, setRequests] = useState<AskAstrologerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AskRequestTab>("assigned");

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
  }, [AA.astrologerLoadFailed]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) =>
      activeTab === "assigned"
        ? r.status === "assigned"
        : r.status === "answered"
    );
  }, [requests, activeTab]);

  return (
    <div className="chat-conversation-surface relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Ambient mint glow matching chat page */}
      <div
        className="pointer-events-none absolute left-[25%] top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-chat-conversation-glow)] opacity-90 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[15%] top-64 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,transparent)] opacity-60 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <AppHeader
          title={AP.card.askRequests.title}
          showBack
          onBackClick={() => router.push(ROUTES.astrologer)}
          blend
        />

        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-3 sm:px-6">
          {/* Tabs — pill segmented control */}
          <div className="flex justify-center pb-5 pt-1">
            <div className="inline-flex items-center rounded-full border border-black/[0.08] bg-white/90 p-1 shadow-sm backdrop-blur-sm">
              {(
                [
                  {
                    label: AA.astrologerStatusAssigned,
                    value: "assigned" as const,
                  },
                  {
                    label: AA.astrologerStatusAnswered,
                    value: "answered" as const,
                  },
                ] as const
              ).map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveTab(value)}
                  className={cn(
                    "rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all",
                    activeTab === value
                      ? "bg-[var(--color-brand-primary)] text-white shadow-[0_2px_8px_rgb(16_177_0_/_0.25)]"
                      : "text-black/65 hover:text-black/90 hover:bg-black/[0.03]"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <PageLoadingCenter />
          ) : error ? (
            <p className="py-12 text-center text-sm font-medium text-[var(--color-brand-error)]">
              {error}
            </p>
          ) : filteredRequests.length === 0 ? (
            <EmptyState
              title={AA.emptyAskRequests}
              className="py-16"
            />
          ) : (
            <ul className="space-y-4 pb-12">
              {filteredRequests.map((req) => (
                <AskAstrologerRequestCard key={req.id} req={req} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
