"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { AppHeader } from "@/components/common/AppHeader";
import { PageLoadingCenter } from "@/components/common/Loader";
import { AskAstrologerAnswerDialog } from "@/components/notifications/AskAstrologerAnswerDialog";
import { NotificationConsultationList } from "@/components/notifications/NotificationConsultationList";
import { NotificationDetailDialog } from "@/components/notifications/NotificationDetailDialog";
import { NotificationGeneralList } from "@/components/notifications/NotificationGeneralList";
import { NotificationsTabBar } from "@/components/notifications/NotificationsTabBar";
import { useAskAnswerFromQuery } from "@/hooks/useAskAnswerFromQuery";
import { useNotifications } from "@/hooks/useNotifications";
import { notificationDisplayCopy, notificationPredictionRoute } from "@/lib/notification-display";
import {
  NOTIFICATIONS_SCREEN,
  NOTIFICATIONS_UI,
} from "@/lib/constants/notifications-screen";
import { ROUTES } from "@/lib/constants/routes";
import { PAGE_SHELL } from "@/lib/constants/page-shell";
import type { AppNotification, NotificationTab } from "@/types/notifications";

interface NotificationsPageContentProps {
  initialTab?: NotificationTab;
}

export function NotificationsPageContent({
  initialTab = "general",
}: NotificationsPageContentProps) {
  const NS = useI18nConstants(NOTIFICATIONS_SCREEN);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTabFromUrl: NotificationTab =
    tabParam === "consultation" ? "consultation" : initialTab;

  const {
    tab,
    setTab,
    general,
    consultation,
    askRequests,
    loading,
    error,
    actionLoading,
    isAstrologer,
    markRead,
    clearAll,
  } = useNotifications(initialTabFromUrl);

  const askAnswer = useAskAnswerFromQuery(askRequests, loading);

  const [dialog, setDialog] = useState<{ title: string; message: string } | null>(
    null
  );

  const handleOpenGeneral = useCallback(
    async (item: AppNotification) => {
      const copy = notificationDisplayCopy(item.title, item.message);
      const route = notificationPredictionRoute(item.title);

      if (!item.isRead) {
        try {
          await markRead(item.id);
        } catch {
          /* still show content */
        }
      }

      if (route) {
        router.push(route);
        return;
      }

      setDialog({ title: copy.title, message: copy.message });
    },
    [markRead, router]
  );

  const clearAllAction =
    tab === "general" && general.length > 0 ? (
      <button
        type="button"
        disabled={actionLoading}
        onClick={() => void clearAll()}
        className="text-sm font-semibold text-[var(--color-brand-error)] disabled:opacity-50"
      >
        {NS.clearAll}
      </button>
    ) : undefined;

  return (
    <div className={PAGE_SHELL.column}>
      <AppHeader
        title={NS.title}
        showBack
        onBackClick={() => router.push(ROUTES.home)}
        action={clearAllAction}
        className={PAGE_SHELL.contentLayer}
      />

      <div className={NOTIFICATIONS_UI.content}>
        <NotificationsTabBar tab={tab} onTabChange={setTab} />

        {loading ? (
          <PageLoadingCenter />
        ) : error ? (
          <p className="px-5 py-12 text-center text-sm text-black/60">
            {NS.loadFailed}
          </p>
        ) : tab === "general" ? (
          <NotificationGeneralList items={general} onOpen={handleOpenGeneral} />
        ) : (
          <NotificationConsultationList
            items={consultation}
            isAstrologer={isAstrologer}
            askItems={askRequests}
          />
        )}
      </div>

      <NotificationDetailDialog
        open={dialog != null}
        title={dialog?.title ?? ""}
        message={dialog?.message ?? ""}
        onClose={() => setDialog(null)}
      />

      <AskAstrologerAnswerDialog
        open={askAnswer.isOpen}
        userQuestion={askAnswer.userQuestion}
        answerText={askAnswer.answerText}
        answerVoiceUrl={askAnswer.answerVoiceUrl}
        answerVoiceDurationSec={askAnswer.answerVoiceDurationSec}
        answeredAt={askAnswer.answeredAt}
        loading={askAnswer.loading}
        error={askAnswer.error}
        onClose={askAnswer.closeAskAnswer}
      />
    </div>
  );
}
