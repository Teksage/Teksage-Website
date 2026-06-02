"use client";

import { NOTIFICATIONS_UI } from "@/lib/constants/notifications-screen";
import type { NotificationDetailDialogProps } from "@/types/ui/notifications";

export function NotificationDetailDialog({
  open,
  title,
  message,
  onClose,
}: NotificationDetailDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-black/50 hover:bg-black/5"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className={NOTIFICATIONS_UI.dialogTitle}>{title}</h2>
        <p className={`mt-3 ${NOTIFICATIONS_UI.dialogBody}`}>{message}</p>
      </div>
    </div>
  );
}
