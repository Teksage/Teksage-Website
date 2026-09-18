"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLoadingCenter } from "@/components/common/Loader";
import { useI18nConstants, useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import { ASTRO_PORTAL_UI, ASTRO_PORTAL_COLORS } from "@/lib/constants/astrologer-portal";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import {
  meetingDetailQueryString,
  nameFromListEvent,
} from "@/lib/astrologer-meeting-display";
import { ROUTES } from "@/lib/constants/routes";
import type { AstroEvent } from "@/types/astrologer-portal";

interface AstrologerMeetingsListProps {
  upcomingEvents: AstroEvent[];
  completedEvents: AstroEvent[];
  loading: boolean;
}

function formatMeetingDate(iso: string, locale: string): string {
  try {
    const d = new Date(iso);
    const date = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
    const time = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
    return `${date} - ${time}`;
  } catch {
    return iso;
  }
}

interface MeetingRowProps {
  event: AstroEvent;
}

function MeetingRow({ event }: MeetingRowProps) {
  const AP = useI18nConstants(ASTRO_PORTAL_UI);
  const { locale } = useT();
  const router = useRouter();
  const { initials, firstName } = nameFromListEvent(event);
  const date = formatMeetingDate(
    event.start_datetime,
    bcp47FromAppLocale(locale)
  );
  const detailHref = `${ROUTES.astrologerMeetings}/${event.id}?${meetingDetailQueryString(event)}`;

  return (
    <div
      className="mb-4 flex items-center justify-between rounded-xl border border-black/[0.04] px-3.5 py-5"
      style={{ backgroundColor: ASTRO_PORTAL_COLORS.listItemBg }}
    >
      {/* Avatar + name/date */}
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-[2.6px] bg-gray-100 text-xs font-semibold leading-none"
          style={{
            borderColor: `${ASTRO_PORTAL_COLORS.brandGreen}4D`,
            color: ASTRO_PORTAL_COLORS.brandGreen,
          }}
        >
          {initials}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium text-gray-800/80">
            {firstName}{" "}
            <span className="font-normal">{AP.bookedSlotOn}</span>
          </p>
          <p className="text-sm font-semibold text-gray-900">{date}</p>
        </div>
      </div>

      {/* View Details pill */}
      <button
        type="button"
        onClick={() => router.push(detailHref)}
        className="flex-shrink-0 whitespace-pre-line rounded-full px-3 py-1.5 text-center text-xs font-semibold leading-none text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}
      >
        {AP.viewDetails}
      </button>
    </div>
  );
}

function EmptyState({ isUpcoming }: { isUpcoming: boolean }) {
  const AP = useI18nConstants(ASTRO_PORTAL_UI);

  return (
    <div className="flex flex-col items-center px-5 pt-24 text-center">
      <p className="text-sm font-medium text-gray-400">
        {isUpcoming
          ? AP.emptyUpcoming
          : AP.emptyCompleted}
      </p>
    </div>
  );
}

export function AstrologerMeetingsList({
  upcomingEvents,
  completedEvents,
  loading,
}: AstrologerMeetingsListProps) {
  const AP = useI18nConstants(ASTRO_PORTAL_UI);
  const [isUpcoming, setIsUpcoming] = useState(true);
  const meetings = isUpcoming ? upcomingEvents : completedEvents;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      {/* Tabs — mirrors meetingsTab.dart */}
      <div
        className="mx-4 mb-0 flex justify-center gap-2 border-b border-black/30 pb-5 pt-2"
      >
        {[
          { label: AP.tab.upcoming, value: true },
          { label: AP.tab.completed, value: false },
        ].map(({ label, value }) => (
          <button
            key={label}
            type="button"
            onClick={() => setIsUpcoming(value)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              isUpcoming === value
                ? "text-white"
                : "border border-black/10 bg-white text-gray-800 hover:bg-gray-50"
            )}
            style={
              isUpcoming === value
                ? { backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }
                : undefined
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <PageLoadingCenter />
        ) : meetings.length === 0 ? (
          <EmptyState isUpcoming={isUpcoming} />
        ) : (
          <ul className="px-5 py-2.5">
            {meetings.map((e) => (
              <li key={e.id}>
                <MeetingRow event={e} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop: wider max-width wrapper is applied by parent */}
    </div>
  );
}
