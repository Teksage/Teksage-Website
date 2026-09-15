"use client";

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
import { parseApiDateTime, isValidDate } from "@/lib/api-datetime";
import { buildConsultationFeed } from "@/lib/notifications-consultation-feed";
import { PUBLIC_ASSETS } from "@/lib/constants/assets";
import type { NotificationConsultationListProps } from "@/types/ui/notifications";
import type { ConsultationNotificationEvent } from "@/types/notifications";

function formatEventDate(iso: string): string {
  const d = parseApiDateTime(iso);
  if (!isValidDate(d)) return iso;
  return format(d, NOTIFICATION_SENT_AT_FORMAT);
}

function EventNotificationCard({
  event,
  appointmentLabel,
  meetingLinkLabel,
}: {
  event: ConsultationNotificationEvent;
  appointmentLabel: string;
  meetingLinkLabel: string;
}) {
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
    </li>
  );
}

export function NotificationConsultationList({
  items,
  isAstrologer,
  askItems = [],
}: NotificationConsultationListProps) {
  const NS = useI18nConstants(NOTIFICATIONS_SCREEN);
  const appointmentLabel = isAstrologer
    ? NS.astrologerAppointmentOn
    : NS.customerAppointmentOn;

  const feed = buildConsultationFeed(items, askItems);

  if (feed.length === 0) {
    return <EmptyState title={NS.emptyConsultation} className="py-12" />;
  }

  return (
    <ul className={NOTIFICATIONS_UI.list}>
      {feed.map((entry) =>
        entry.kind === "ask" ? (
          <AskAstrologerNotificationCard key={`ask-${entry.ask.id}`} item={entry.ask} />
        ) : (
          <EventNotificationCard
            key={`event-${entry.event.id}`}
            event={entry.event}
            appointmentLabel={appointmentLabel}
            meetingLinkLabel={NS.meetingLink}
          />
        )
      )}
    </ul>
  );
}
