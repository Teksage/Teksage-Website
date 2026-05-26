"use client";

import { useI18nConstants } from "@/hooks/useT";
import { format } from "date-fns";
import { EmptyState } from "@/components/common/EmptyState";
import {
  NOTIFICATIONS_SCREEN,
  NOTIFICATIONS_UI,
} from "@/lib/constants/notifications-screen";
import { notificationDisplayCopy } from "@/lib/notification-display";
import { cn } from "@/lib/utils";
import type { NotificationGeneralListProps } from "@/types/ui/notifications";

function formatSentAt(iso: string): string {
  try {
    return format(new Date(iso), "dd MMM, yyyy - h:mm a");
  } catch {
    return iso;
  }
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
                NOTIFICATIONS_UI.item,
                "w-full",
                item.isRead ? NOTIFICATIONS_UI.itemRead : NOTIFICATIONS_UI.itemUnread
              )}
              onClick={() => onOpen(item)}
            >
              <p className={NOTIFICATIONS_UI.itemTitle}>{copy.title}</p>
              <p className={NOTIFICATIONS_UI.itemMessage}>{copy.message}</p>
              {item.createdAt ? (
                <p className={NOTIFICATIONS_UI.itemDate}>
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
