"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { NotificationsPageContent } from "@/components/notifications/NotificationsPageContent";
import { NOTIFICATIONS_UI } from "@/lib/constants/notifications-screen";
import { PAGE_SHELL } from "@/lib/constants/page-shell";
import type { NotificationTab } from "@/types/notifications";

function NotificationsRouteInner() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab: NotificationTab =
    tabParam === "consultation" ? "consultation" : "general";

  return <NotificationsPageContent initialTab={initialTab} />;
}

export default function NotificationsPage() {
  return (
    <div className={`${PAGE_SHELL.root} ${NOTIFICATIONS_UI.page}`}>
      <Suspense
        fallback={
          <div className={PAGE_SHELL.loadingCenter}>
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-brand-primary)] border-t-transparent" />
          </div>
        }
      >
        <NotificationsRouteInner />
      </Suspense>
    </div>
  );
}
