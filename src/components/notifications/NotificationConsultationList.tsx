"use client";

import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { format } from "date-fns";
import { EmptyState } from "@/components/common/EmptyState";
import { AskAstrologerNotificationCard } from "@/components/notifications/AskAstrologerNotificationCard";
import {
  NOTIFICATIONS_SCREEN,
  NOTIFICATIONS_UI,
  NOTIFICATION_SENT_AT_FORMAT,
} from "@/lib/constants/notifications-screen";
import { ROUTES } from "@/lib/constants/routes";
import { writeConsultationSummary } from "@/lib/consultation-session";
import { parseApiDateTime, isValidDate } from "@/lib/api-datetime";
import { PUBLIC_ASSETS } from "@/lib/constants/assets";
import type { NotificationConsultationListProps } from "@/types/ui/notifications";
import type { ConsultationNotificationEvent } from "@/types/notifications";

function formatEventDate(iso: string): string {
  const d = parseApiDateTime(iso);
  if (!isValidDate(d)) return iso;
  return format(d, NOTIFICATION_SENT_AT_FORMAT);
}

function eventToSummary(event: ConsultationNotificationEvent) {
  const astrologerName = [event.astrologerFirstName, event.astrologerLastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return {
    eventId: event.id,
    eventLink: event.eventLink,
    startDatetime: event.startDatetime,
    endDatetime: event.endDatetime ?? event.startDatetime,
    categories: event.categories ?? [],
    languages: event.languages ?? [],
    consultationFee: event.consultationFee ?? 0,
    currency: event.currency ?? "INR",
    astrologerName: astrologerName || "Astrologer",
    astrologerPicture: event.astrologerPicture,
    astrologerId: event.astrologerId ?? undefined,
    status: event.status,
    queriesAnswered: event.queriesAnswered,
  };
}

function EventNotificationCard({
  event,
  appointmentLabel,
  meetingLinkLabel,
  viewDetailsLabel,
  showDetails,
}: {
  event: ConsultationNotificationEvent;
  appointmentLabel: string;
  meetingLinkLabel: string;
  viewDetailsLabel: string;
  showDetails: boolean;
}) {
  const router = useRouter();

  const openDetails = () => {
    writeConsultationSummary(eventToSummary(event));
    router.push(ROUTES.consultationSummary);
  };

  return (
    <li className={NOTIFICATIONS_UI.listCard}>
      <div className={NOTIFICATIONS_UI.notificationRow}>
        <div className={NOTIFICATIONS_UI.notificationAvatar}>
          {event.astrologerPicture ? (
            <Image
              src={event.astrologerPicture}
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <Image
              src={PUBLIC_ASSETS.appLogo}
              alt=""
              width={24}
              height={24}
              unoptimized
              className={NOTIFICATIONS_UI.notificationAvatarFallback}
            />
          )}
        </div>

        <div className={NOTIFICATIONS_UI.notificationContent}>
          <p className="text-sm font-medium leading-none text-black/80 lg:text-base">
            {appointmentLabel}
          </p>
          <p className="mt-1 text-sm font-semibold leading-none text-[var(--color-brand-black)] lg:text-base">
            {formatEventDate(event.startDatetime)}
          </p>
        </div>

        <div className={NOTIFICATIONS_UI.consultationActions}>
          {showDetails ? (
            <button
              type="button"
              onClick={openDetails}
              className={NOTIFICATIONS_UI.consultationSecondaryBtn}
            >
              {viewDetailsLabel}
            </button>
          ) : null}
          {event.eventLink ? (
            <a
              href={event.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className={NOTIFICATIONS_UI.consultationMeetBtn}
            >
              {meetingLinkLabel}
            </a>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function NotificationConsultationList({
  items,
  isAstrologer,
  askItems = [],
  variant = "appointments",
}: NotificationConsultationListProps) {
  const NS = useI18nConstants(NOTIFICATIONS_SCREEN);
  const appointmentLabel = isAstrologer
    ? NS.astrologerAppointmentOn
    : NS.customerAppointmentOn;

  if (variant === "ask") {
    if (askItems.length === 0) {
      return <EmptyState title={NS.emptySingleQuery} className="py-12" />;
    }
    return (
      <ul className={NOTIFICATIONS_UI.list}>
        {askItems.map((ask) => (
          <AskAstrologerNotificationCard key={`ask-${ask.id}`} item={ask} />
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return <EmptyState title={NS.emptyThirtyMins} className="py-12" />;
  }

  return (
    <ul className={NOTIFICATIONS_UI.list}>
      {items.map((event) => (
        <EventNotificationCard
          key={`event-${event.id}`}
          event={event}
          appointmentLabel={appointmentLabel}
          meetingLinkLabel={NS.meetingLink}
          viewDetailsLabel={NS.viewDetails}
          showDetails={!isAstrologer}
        />
      ))}
    </ul>
  );
}
