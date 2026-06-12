"use client";

import { useI18nConstants } from "@/hooks/useT";
import { format } from "date-fns";
import { EmptyState } from "@/components/common/EmptyState";
import {
  NOTIFICATIONS_SCREEN,
  NOTIFICATIONS_UI,
  NOTIFICATION_SENT_AT_FORMAT,
} from "@/lib/constants/notifications-screen";
import { parseApiDateTime, isValidDate } from "@/lib/api-datetime";
import { notificationDisplayCopy } from "@/lib/notification-display";
import { cn } from "@/lib/utils";
import type { NotificationGeneralListProps } from "@/types/ui/notifications";

function formatSentAt(iso: string): string {
  const d = parseApiDateTime(iso);
  if (!isValidDate(d)) return iso;
  return format(d, NOTIFICATION_SENT_AT_FORMAT);
}

export function NotificationGeneralList({
  items,
  onOpen,
}: NotificationGeneralListProps) {
  const NS = useI18nConstants(NOTIFICATIONS_SCREEN);

  if (items.length === 0) {
    return <EmptyState title={NS.emptyGeneral} className="py-12" />;
  }

  return (
    <ul className={NOTIFICATIONS_UI.list}>
      {items.map((item) => {
        const copy = notificationDisplayCopy(item.title, item.message);
        return (
          <li key={item.id}>
            <button
              type="button"
              className={cn(
                NOTIFICATIONS_UI.generalCard,
                !item.isRead && NOTIFICATIONS_UI.generalCardUnread
              )}
              onClick={() => onOpen(item)}
            >
              <p className={NOTIFICATIONS_UI.generalCardTitle}>
                {!item.isRead ? (
                  <span className={NOTIFICATIONS_UI.generalUnreadDot} aria-hidden />
                ) : null}
                {copy.title}
              </p>
              <p className={NOTIFICATIONS_UI.generalCardMessage}>{copy.message}</p>
              {item.createdAt ? (
                <p className={NOTIFICATIONS_UI.generalCardDate}>
                  {formatSentAt(item.createdAt)}
                </p>
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
