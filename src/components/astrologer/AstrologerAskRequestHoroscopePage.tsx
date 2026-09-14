"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { Loader } from "@/components/common/Loader";
import { AstrologerMeetingHoroscope } from "@/components/astrologer/AstrologerMeetingHoroscope";
import { FullHoroscopePanels } from "@/components/horoscope/full/FullHoroscopePanels";
import { useAstrologerAskRequestHoroscope } from "@/hooks/useAstrologerAskRequestHoroscope";
import { useAskRequestFullHoroscope } from "@/hooks/useAskRequestFullHoroscope";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import { hasAstrologerMeetingHoroscope } from "@/lib/astrologer-horoscope-display";
import { ROUTES } from "@/lib/constants/routes";
import type { AstrologerAskRequestHoroscopePageProps } from "@/types/ui/astrologer-portal";

export function AstrologerAskRequestHoroscopePage({
  requestId,
}: AstrologerAskRequestHoroscopePageProps) {
  const router = useRouter();
  const { data, loading, error } = useAstrologerAskRequestHoroscope(requestId);
  const fullState = useAskRequestFullHoroscope(requestId);

  const backHref = ROUTES.astrologerAskRequests;
  const hasBasic = hasAstrologerMeetingHoroscope(data?.user_horoscope ?? null);
  const fullName = data?.customer_name?.trim() || "Client";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader
        title={ASTRO_PORTAL_UI.horoscopeDetailTitle}
        showBack
        onBackClick={() => router.push(backHref)}
        className="border-b border-black/10"
        foregroundColor="var(--color-gray-900)"
      />

      {loading && (
        <div className="flex flex-1 items-center justify-center py-16">
          <Loader variant="brand" size="lg" />
        </div>
      )}

      {error && !loading && (
        <p className="px-6 py-12 text-center text-sm text-gray-600">{error}</p>
      )}

      {!loading && !error && data && hasBasic && (
        <div className="w-full px-4 pb-12 pt-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="mb-4">
            <p className="text-base font-semibold text-gray-900">{fullName}</p>
            {data.user_question ? (
              <div className="mt-2 rounded-xl border border-black/10 bg-neutral-50 p-3.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
                  {ASTRO_PORTAL_UI.detail.questions}
                </p>
                <p className="mt-1 text-sm text-gray-800">{data.user_question}</p>
              </div>
            ) : null}
          </div>

          <AstrologerMeetingHoroscope horoscope={data.user_horoscope!} />

          <div className="mt-8 border-t border-black/10 pt-6">
            <p className="mb-3 text-sm font-semibold text-gray-900">
              {ASTRO_PORTAL_UI.fullHoroscopeTitle}
            </p>
            <FullHoroscopePanels state={fullState} askRequestId={requestId} />
          </div>
        </div>
      )}

      {!loading && !error && data && !hasBasic && (
        <p className="px-6 py-12 text-center text-sm text-gray-500">
          {ASTRO_PORTAL_UI.detail.horoscopeUnavailable}
        </p>
      )}
    </div>
  );
}
