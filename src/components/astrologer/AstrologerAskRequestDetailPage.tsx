"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { Loader } from "@/components/common/Loader";
import { AskRequestProfileCard } from "@/components/astrologer/AskRequestProfileCard";
import { AskRequestQuestionSection } from "@/components/astrologer/AskRequestQuestionSection";
import { AskRequestAnswerSection } from "@/components/astrologer/AskRequestAnswerSection";
import { FullHoroscopePanels } from "@/components/horoscope/full/FullHoroscopePanels";
import { useAstrologerAskRequestDetail } from "@/hooks/useAstrologerAskRequestDetail";
import { useAstrologerAskRequestHoroscope } from "@/hooks/useAstrologerAskRequestHoroscope";
import { useAskRequestFullHoroscope } from "@/hooks/useAskRequestFullHoroscope";
import { useI18nConstants } from "@/hooks/useT";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import { ROUTES } from "@/lib/constants/routes";

export function AstrologerAskRequestDetailPage({
  requestId,
}: {
  requestId: string;
}) {
  const router = useRouter();
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const AP = useI18nConstants(ASTRO_PORTAL_UI);
  const {
    request,
    loading: requestLoading,
    error: requestError,
    reload: reloadRequest,
  } = useAstrologerAskRequestDetail(requestId);

  const {
    data: horoscopeSummary,
    loading: horoscopeLoading,
  } = useAstrologerAskRequestHoroscope(requestId);

  const fullState = useAskRequestFullHoroscope(requestId);

  const loading = requestLoading || (horoscopeLoading && !request);
  const error = requestError;

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
          title={AA.astrologerDetailPageTitle}
          showBack
          onBackClick={() => router.push(ROUTES.astrologerAskRequests)}
          blend
        />

        {loading && (
          <div className="flex flex-1 items-center justify-center py-20">
            <Loader variant="brand" size="lg" />
          </div>
        )}

        {error && !loading && (
          <div className="mx-auto max-w-2xl px-5 py-16 text-center">
            <p className="text-sm font-medium text-[var(--color-brand-error)]">
              {error}
            </p>
            <button
              type="button"
              onClick={() => router.push(ROUTES.astrologerAskRequests)}
              className="mt-4 rounded-full border border-black/15 bg-white px-5 py-2 text-xs font-semibold text-gray-700"
            >
              {AP.detail.backToMeetings}
            </button>
          </div>
        )}

        {!loading && !error && request && (
          <main className="w-full space-y-6 px-4 py-5 sm:px-6 sm:py-6 lg:space-y-8 lg:px-8 xl:px-10 pb-16">
            {/* 1 & 2: Customer Profile & Question Details side-by-side on desktop */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-stretch">
              <AskRequestProfileCard
                req={request}
                horoscope={horoscopeSummary?.user_horoscope}
              />
              <AskRequestQuestionSection req={request} />
            </div>

            {/* 3. Full Horoscope Workspace */}
            <section className="w-full rounded-2xl border border-[var(--color-chat-bot-border)] bg-white p-5 shadow-[0_1px_6px_rgb(0_0_0_/_0.06)] sm:p-6 lg:p-8">
              <h3 className="mb-4 text-base font-bold text-[var(--color-brand-black)] sm:text-lg">
                {AP.fullHoroscopeTitle}
              </h3>

              <FullHoroscopePanels
                state={fullState}
                askRequestId={requestId}
              />
            </section>

            {/* 4. Astrologer Answer Section */}
            <div className="w-full">
              <AskRequestAnswerSection
                req={request}
                onAnswerSubmitted={() => void reloadRequest()}
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
