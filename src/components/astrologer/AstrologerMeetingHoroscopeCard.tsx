"use client";

import Link from "next/link";
import { ASTRO_PORTAL_UI, ASTRO_PORTAL_COLORS } from "@/lib/constants/astrologer-portal";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

interface AstrologerMeetingHoroscopeCardProps {
  eventId: string | number;
  hasHoroscope: boolean;
  queryString: string;
}

/** Flutter `meetingDetailsPage.dart` — Horoscope Details row + View pill. */
export function AstrologerMeetingHoroscopeCard({
  eventId,
  hasHoroscope,
  queryString,
}: AstrologerMeetingHoroscopeCardProps) {
  const horoscopeHref = `${ROUTES.astrologerMeetings}/${eventId}/horoscope?${queryString}`;

  return (
    <div className="rounded-xl border border-black/[0.04] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-base font-semibold text-gray-900/80">
          {ASTRO_PORTAL_UI.detail.horoscopeDetails}
        </p>
        {hasHoroscope ? (
          <Link
            href={horoscopeHref}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90"
            )}
            style={{
              borderColor: ASTRO_PORTAL_COLORS.brandGreen,
              color: ASTRO_PORTAL_COLORS.brandGreen,
            }}
          >
            {ASTRO_PORTAL_UI.detail.horoscopeView}
          </Link>
        ) : (
          <span className="text-xs font-medium text-gray-400">
            {ASTRO_PORTAL_UI.detail.horoscopeUnavailable}
          </span>
        )}
      </div>
    </div>
  );
}
