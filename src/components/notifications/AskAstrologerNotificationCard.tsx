"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useI18nConstants } from "@/hooks/useT";
import { ROUTES } from "@/lib/constants/routes";
import {
  NOTIFICATIONS_TAB_CONSULTATION,
  NOTIFICATIONS_UI,
  NOTIFICATION_ASK_PAID_AT_FORMAT,
} from "@/lib/constants/notifications-screen";
import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
  ASK_NOTIFICATION_STATUS_COLOR,
  ASK_NOTIFICATION_STATUS_LABEL,
} from "@/lib/constants/chat-ask-astrologer";
import { PUBLIC_ASSETS } from "@/lib/constants/assets";
import { parseApiDateTime, isValidDate } from "@/lib/api-datetime";
import { acknowledgeAnswerReady } from "@/lib/services/ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerNotificationItem } from "@/types/notifications";

function formatPaidAt(iso: string): string {
  const d = parseApiDateTime(iso);
  if (!isValidDate(d)) return iso;
  return format(d, NOTIFICATION_ASK_PAID_AT_FORMAT);
}

export function AskAstrologerNotificationCard({
  item,
}: {
  item: AskAstrologerNotificationItem;
}) {
  const router = useRouter();
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const statusLabels = useI18nConstants(ASK_NOTIFICATION_STATUS_LABEL);
  const statusLabel = statusLabels[item.status] ?? item.status;
  const statusColor =
    ASK_NOTIFICATION_STATUS_COLOR[item.status] ?? "bg-neutral-100 text-black/60";
  const isAnswered = item.status === "answered";

  return (
    <li className={NOTIFICATIONS_UI.listCard}>
      <div className={NOTIFICATIONS_UI.notificationRow}>
        <div className={NOTIFICATIONS_UI.notificationAvatar}>
          <Image
            src={PUBLIC_ASSETS.appLogo}
            alt=""
            width={24}
            height={24}
            unoptimized
            className={NOTIFICATIONS_UI.notificationAvatarFallback}
          />
        </div>

        <div className={NOTIFICATIONS_UI.notificationContent}>
          <div className={NOTIFICATIONS_UI.notificationHeaderRow}>
            <span className={NOTIFICATIONS_UI.notificationSectionLabel}>
              {AA.askCardLabel}
            </span>
            <span className={cn(ASK_ASTROLOGER_UI.statusBadge, statusColor, "shrink-0")}>
              {statusLabel}
            </span>
          </div>

          <p
            className={cn(
              NOTIFICATIONS_UI.notificationQuestion,
              isAnswered ? "mt-2.5" : "mt-1"
            )}
          >
            {item.user_question}
          </p>

            {!isAnswered ? (
            <p className={cn(NOTIFICATIONS_UI.notificationMeta, "mt-1")}>
              {AA.askSlaLabel}
            </p>
          ) : item.answer_voice_url ? (
            <p className={cn(NOTIFICATIONS_UI.notificationMeta, "mt-1")}>
              {AA.askIncludesVoice}
            </p>
          ) : null}

          {item.paid_at ? (
            <p className={cn(NOTIFICATIONS_UI.notificationPaidDate, "mt-1")}>
              {formatPaidAt(item.paid_at)}
            </p>
          ) : null}

          {isAnswered ? (
            <div className={NOTIFICATIONS_UI.notificationActionRow}>
              <button
                type="button"
                onClick={() => {
                  void acknowledgeAnswerReady(item.id);
                  router.push(
                    `${ROUTES.notifications}?tab=${NOTIFICATIONS_TAB_CONSULTATION}&ask=${item.id}`
                  );
                }}
                className={NOTIFICATIONS_UI.consultationMeetBtn}
              >
                {AA.askViewAnswer}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
