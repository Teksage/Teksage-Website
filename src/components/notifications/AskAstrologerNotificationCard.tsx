"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerNotificationItem } from "@/types/notifications";

const STATUS_LABEL: Record<string, string> = {
  pending_payment: "Pending",
  paid: ASK_ASTROLOGER_SCREEN.askStatusReceived,
  assigned: ASK_ASTROLOGER_SCREEN.askStatusAssigned,
  answered: ASK_ASTROLOGER_SCREEN.askStatusAnswered,
  cancelled: "Cancelled",
};

const STATUS_COLOR: Record<string, string> = {
  pending_payment: "bg-amber-50 text-amber-700",
  paid: "bg-blue-50 text-blue-700",
  assigned: "bg-purple-50 text-purple-700",
  answered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-600",
};

export function AskAstrologerNotificationCard({
  item,
}: {
  item: AskAstrologerNotificationItem;
}) {
  const router = useRouter();
  const statusLabel = STATUS_LABEL[item.status] ?? item.status;
  const statusColor = STATUS_COLOR[item.status] ?? "bg-neutral-100 text-black/60";

  return (
    <li className={cn(ASK_ASTROLOGER_UI.card, "space-y-2")}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
          {ASK_ASTROLOGER_SCREEN.askCardLabel}
        </span>
        <span
          className={cn(
            ASK_ASTROLOGER_UI.statusBadge,
            statusColor
          )}
        >
          {statusLabel}
        </span>
      </div>

      <p className="line-clamp-2 text-sm text-black/80">{item.user_question}</p>

      {item.status !== "answered" ? (
        <p className="text-xs text-black/40">{ASK_ASTROLOGER_SCREEN.askSlaLabel}</p>
      ) : null}

      {item.status === "answered" ? (
        <button
          type="button"
          onClick={() =>
            router.push(`${ROUTES.notifications}?tab=consultation&ask=${item.id}`)
          }
          className="mt-1 text-sm font-semibold text-[var(--color-brand-primary)]"
        >
          {ASK_ASTROLOGER_SCREEN.askViewAnswer}
        </button>
      ) : null}
    </li>
  );
}
