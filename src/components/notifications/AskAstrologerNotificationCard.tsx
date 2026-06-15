"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { NOTIFICATIONS_TAB_CONSULTATION } from "@/lib/constants/notifications-screen";
import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
  ASK_NOTIFICATION_STATUS_COLOR,
  ASK_NOTIFICATION_STATUS_LABEL,
} from "@/lib/constants/chat-ask-astrologer";
import { acknowledgeAnswerReady } from "@/lib/services/ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerNotificationItem } from "@/types/notifications";

export function AskAstrologerNotificationCard({
  item,
}: {
  item: AskAstrologerNotificationItem;
}) {
  const router = useRouter();
  const statusLabel = ASK_NOTIFICATION_STATUS_LABEL[item.status] ?? item.status;
  const statusColor =
    ASK_NOTIFICATION_STATUS_COLOR[item.status] ?? "bg-neutral-100 text-black/60";

  return (
    <li className={ASK_ASTROLOGER_UI.notificationCard}>
      <div className="flex items-start justify-between gap-3">
        <span className={ASK_ASTROLOGER_UI.sectionLabel}>
          {ASK_ASTROLOGER_SCREEN.askCardLabel}
        </span>
        <span className={cn(ASK_ASTROLOGER_UI.statusBadge, statusColor)}>
          {statusLabel}
        </span>
      </div>

      <p className="text-sm font-medium leading-snug text-[var(--color-brand-black)] lg:text-base">
        {item.user_question}
      </p>

      {item.status !== "answered" ? (
        <p className="text-xs text-black/45 lg:text-sm">{ASK_ASTROLOGER_SCREEN.askSlaLabel}</p>
      ) : (
        <div className={ASK_ASTROLOGER_UI.notificationFooter}>
          {item.answer_voice_url ? (
            <span className="text-xs text-black/45 lg:text-sm">
              {ASK_ASTROLOGER_SCREEN.askIncludesVoice}
            </span>
          ) : (
            <span aria-hidden />
          )}
          <button
            type="button"
            onClick={() => {
              void acknowledgeAnswerReady(item.id);
              router.push(
                `${ROUTES.notifications}?tab=${NOTIFICATIONS_TAB_CONSULTATION}&ask=${item.id}`
              );
            }}
            className={ASK_ASTROLOGER_UI.notificationViewAnswer}
          >
            {ASK_ASTROLOGER_SCREEN.askViewAnswer}
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </li>
  );
}
