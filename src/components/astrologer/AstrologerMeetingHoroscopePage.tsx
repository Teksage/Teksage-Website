"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { Loader } from "@/components/common/Loader";
import { AstrologerMeetingHoroscope } from "@/components/astrologer/AstrologerMeetingHoroscope";
import { FullHoroscopePanels } from "@/components/horoscope/full/FullHoroscopePanels";
import { useAstrologerEventDetail } from "@/hooks/useAstrologerEvents";
import { useEventFullHoroscope } from "@/hooks/useEventFullHoroscope";
import {
  ASTRO_PORTAL_UI,
  MEETING_DETAIL_QUERY,
} from "@/lib/constants/astrologer-portal";
import { hasAstrologerMeetingHoroscope } from "@/lib/astrologer-horoscope-display";
import { nameFromDetailEvent } from "@/lib/astrologer-meeting-display";
import { ROUTES } from "@/lib/constants/routes";

interface AstrologerMeetingHoroscopePageProps {
  eventId: string;
}

export function AstrologerMeetingHoroscopePage({
  eventId,
}: AstrologerMeetingHoroscopePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { event, loading, error } = useAstrologerEventDetail(eventId);
  const fullState = useEventFullHoroscope(
    event?.share_horoscope ? eventId : null
  );
  const nameParam = searchParams.get(MEETING_DETAIL_QUERY.name);
  const fullName = event
    ? nameFromDetailEvent(event, nameParam).fullName
    : (nameParam?.trim() ?? "");

  const backHref = `${ROUTES.astrologerMeetings}/${eventId}?${searchParams.toString()}`;
  const hasBasic = hasAstrologerMeetingHoroscope(event?.userHoroscope ?? null);
  const canFull = Boolean(event?.share_horoscope);

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

      {!loading && !error && event && hasBasic && (
        <div className="w-full px-3 pb-10 pt-3 sm:px-4 lg:px-5">
          <p className="mb-4 text-base font-semibold text-gray-900">{fullName}</p>
          <AstrologerMeetingHoroscope horoscope={event.userHoroscope!} />
          {canFull ? (
            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">
                {ASTRO_PORTAL_UI.fullHoroscopeTitle}
              </p>
              <FullHoroscopePanels state={fullState} eventId={eventId} />
            </div>
          ) : null}
        </div>
      )}

      {!loading && !error && event && !hasBasic && (
        <p className="px-6 py-12 text-center text-sm text-gray-500">
          {ASTRO_PORTAL_UI.detail.horoscopeUnavailable}
        </p>
      )}
    </div>
  );
}
