"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { AstrologerMeetingHoroscope } from "@/components/astrologer/AstrologerMeetingHoroscope";
import { useAstrologerEventDetail } from "@/hooks/useAstrologerEvents";
import {
  ASTRO_PORTAL_COLORS,
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
  const nameParam = searchParams.get(MEETING_DETAIL_QUERY.name);
  const fullName = event
    ? nameFromDetailEvent(event, nameParam).fullName
    : (nameParam?.trim() ?? "");

  const backHref = `${ROUTES.astrologerMeetings}/${eventId}?${searchParams.toString()}`;

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
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
            style={{
              borderColor: `${ASTRO_PORTAL_COLORS.brandGreen} transparent transparent transparent`,
            }}
          />
        </div>
      )}

      {error && !loading && (
        <p className="px-6 py-12 text-center text-sm text-gray-600">{error}</p>
      )}

      {!loading &&
        !error &&
        event &&
        hasAstrologerMeetingHoroscope(event.userHoroscope) && (
        <div className="mx-auto w-full max-w-2xl px-5 py-4">
          <p className="mb-4 text-base font-semibold text-gray-900">{fullName}</p>
          <AstrologerMeetingHoroscope horoscope={event.userHoroscope!} />
        </div>
      )}

      {!loading &&
        !error &&
        event &&
        !hasAstrologerMeetingHoroscope(event.userHoroscope) && (
        <p className="px-6 py-12 text-center text-sm text-gray-500">
          {ASTRO_PORTAL_UI.detail.horoscopeUnavailable}
        </p>
      )}
    </div>
  );
}
