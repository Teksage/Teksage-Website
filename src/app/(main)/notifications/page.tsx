"use client";

import { Suspense } from "react";
import { NotificationsPageContent } from "@/components/notifications/NotificationsPageContent";
import { PageLoadingCenter } from "@/components/common/Loader";
import { NOTIFICATIONS_UI } from "@/lib/constants/notifications-screen";
import { PAGE_SHELL } from "@/lib/constants/page-shell";

function NotificationsRouteInner() {
  return <NotificationsPageContent />;
}

export default function NotificationsPage() {
  return (
    <div className={`${PAGE_SHELL.root} ${NOTIFICATIONS_UI.page}`}>
      <Suspense
        fallback={<PageLoadingCenter />}
      >
        <NotificationsRouteInner />
      </Suspense>
    </div>
  );
}
