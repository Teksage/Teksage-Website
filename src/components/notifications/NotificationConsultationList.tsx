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
import { PUBLIC_ASSETS } from "@/lib/constants/assets";
import type { NotificationConsultationListProps } from "@/types/ui/notifications";

function formatEventDate(iso: string): string {
  const d = parseApiDateTime(iso);
  if (!isValidDate(d)) return iso;
  return format(d, NOTIFICATION_SENT_AT_FORMAT);
}

export function NotificationConsultationList({
  items,
  isAstrologer,
  askItems = [],
}: NotificationConsultationListProps) {
  const NS = useI18nConstants(NOTIFICATIONS_SCREEN);
  const label = isAstrologer
    ? NS.astrologerAppointmentOn
    : NS.customerAppointmentOn;

  if (items.length === 0 && askItems.length === 0) {
    return <EmptyState title={NS.emptyConsultation} className="py-12" />;
  }

  return (
    <ul className={NOTIFICATIONS_UI.list}>
      {askItems.map((ask) => (
        <AskAstrologerNotificationCard key={`ask-${ask.id}`} item={ask} />
      ))}
      {items.map((event) => (
        <li key={event.id} className={NOTIFICATIONS_UI.consultationCard}>
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-brand-primary)]/30 bg-neutral-100">
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
                  className="absolute inset-0 m-auto size-6 object-contain opacity-40"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-black/80">{label}</p>
              <p className="mt-0.5 text-sm font-semibold text-[var(--color-brand-black)]">
                {formatEventDate(event.startDatetime)}
              </p>
            </div>
          </div>
          {event.eventLink ? (
            <a
              href={event.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className={NOTIFICATIONS_UI.consultationMeetBtn}
            >
              {NS.meetingLink}
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
