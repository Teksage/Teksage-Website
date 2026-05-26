"use client";

import { use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { AstrologerMeetingDetail } from "@/components/astrologer/AstrologerMeetingDetail";
import { useAstrologerEventDetail } from "@/hooks/useAstrologerEvents";
import {
  ASTRO_PORTAL_COLORS,
  ASTRO_PORTAL_UI,
  MEETING_DETAIL_QUERY,
} from "@/lib/constants/astrologer-portal";
import { nameFromDetailEvent } from "@/lib/astrologer-meeting-display";
import { ROUTES } from "@/lib/constants/routes";

interface AstrologerMeetingDetailPageProps {
  eventId: string;
}

export function AstrologerMeetingDetailPage({
  eventId,
}: AstrologerMeetingDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { event, loading, error, reload } = useAstrologerEventDetail(eventId);

  const nameParam = searchParams.get(MEETING_DETAIL_QUERY.name);
  const initialsParam = searchParams.get(MEETING_DETAIL_QUERY.initials);
  const linkParam = searchParams.get(MEETING_DETAIL_QUERY.link);

  const resolved = event
    ? nameFromDetailEvent(event, nameParam)
    : {
        fullName: nameParam?.trim() || "Unknown",
        initials: initialsParam?.trim() || "--",
      };
  const fullName = resolved.fullName;
  const initials = initialsParam?.trim() || resolved.initials;

  const queryString = searchParams.toString();

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}
    >
      <AppHeader
        title={ASTRO_PORTAL_UI.meetingDetailTitle}
        showBack
        onBackClick={() => router.push(ROUTES.astrologerMeetings)}
        className="border-none"
        style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}
        foregroundColor="white"
      />

      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-white shadow">
            <div
              className="h-7 w-7 animate-spin rounded-full border-4 border-t-transparent"
              style={{
                borderColor: `${ASTRO_PORTAL_COLORS.brandGreen} transparent transparent transparent`,
              }}
            />
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-1 items-center justify-center px-6">
          <p className="text-center text-sm font-medium text-white/80">{error}</p>
        </div>
      )}

      {!loading && !error && !event && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm font-semibold text-white">No event found.</p>
        </div>
      )}

      {!loading && event && (
        <AstrologerMeetingDetail
          event={event}
          initials={initials}
          fullName={fullName}
          queryString={queryString}
          meetingLinkFallback={linkParam}
          onRefresh={reload}
        />
      )}
    </div>
  );
}
