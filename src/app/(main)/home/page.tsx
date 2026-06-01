"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { formatHomeDashboardDate } from "@/lib/utils";
import { ConsultationBanner } from "@/components/home/ConsultationBanner";
import { PredictionCircles } from "@/components/home/PredictionCircles";
import { DailyPredictionCard } from "@/components/home/DailyPredictionCard";
import { MatchMakingCard } from "@/components/home/MatchMakingCard";
import { ChatBanner } from "@/components/home/ChatBanner";
import { HomeChatPanel } from "@/components/home/HomeChatPanel";
import { HomePanchangTimingTicker } from "@/components/home/HomePanchangTimingTicker";
import { HomeDashboardHeader } from "@/components/home/HomeDashboardHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { HOME_LAYOUT, MAIN_TAB_VIEWPORT_BACKDROP, PAGE_SHELL } from "@/lib/constants";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { cn, isAstrologerHomeSession } from "@/lib/utils";

export default function HomePage() {
  const {
    user,
    isAuthenticated,
    dailyPrediction,
    unreadCount,
    isLoading,
    error: dashboardError,
    hasExistingMatch,
  } = useDashboard();
  const { t, locale } = useAppLanguage();

  const greeting = user?.name
    ? t("Hi (name)!").replace("(name)", user.name)
    : t("Good day");
  const isAstrologer = isAstrologerHomeSession(user ?? undefined);

  return (
    <div
      className={cn(
        PAGE_SHELL.homeRoot,
        "flex min-h-0 flex-1 flex-col lg:h-full lg:overflow-hidden"
      )}
    >
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.home} />
      <HomeDashboardHeader
        className={cn(PAGE_SHELL.contentLayer, "lg:hidden")}
        greeting={greeting}
        isAuthenticated={isAuthenticated}
        unreadCount={unreadCount}
      />

      <HomePanchangTimingTicker className={cn(PAGE_SHELL.contentLayer, "lg:hidden")} />

      <div className={cn("relative z-10 flex min-h-0 flex-1 flex-col lg:h-full lg:flex-row")}>
        <main
          className={cn(
            PAGE_SHELL.contentLayer,
            "min-w-0 flex-1 overflow-y-auto lg:hidden",
            HOME_LAYOUT.maxWidth,
            HOME_LAYOUT.gutterX,
            HOME_LAYOUT.mainTopPad,
            HOME_LAYOUT.bottomNavClearance,
            HOME_LAYOUT.sectionStack
          )}
        >
          <ConsultationBanner
            isLoggedIn={isAuthenticated}
            isAstrologer={isAuthenticated && isAstrologer}
          />

          <div
            className={cn(
              "flex flex-col",
              HOME_LAYOUT.exploreFeatureStackGap,
            )}
          >
            <PredictionCircles isLoggedIn={isAuthenticated} />

            <div
              className={cn(
                "flex min-h-0 min-w-0",
                HOME_LAYOUT.featureGridGap,
              )}
            >
              <MatchMakingCard
                isLoggedIn={isAuthenticated}
                hasExistingMatch={hasExistingMatch}
              />
              <DailyPredictionCard
                data={dailyPrediction ?? undefined}
                isLoading={isLoading}
                isLoggedIn={isAuthenticated}
                fetchError={dashboardError}
                currentDate={formatHomeDashboardDate(new Date(), locale)}
              />
            </div>
          </div>

          <ChatBanner isLoggedIn={isAuthenticated} />
        </main>

        <HomeChatPanel
          isLoggedIn={isAuthenticated}
          className="hidden min-h-0 min-w-0 flex-1 lg:flex"
        />
      </div>
    </div>
  );
}
