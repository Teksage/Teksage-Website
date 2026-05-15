"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { formatHomeDashboardDate } from "@/lib/utils";
import { ConsultationBanner } from "@/components/home/ConsultationBanner";
import { PredictionCircles } from "@/components/home/PredictionCircles";
import { DailyPredictionCard } from "@/components/home/DailyPredictionCard";
import { MatchMakingCard } from "@/components/home/MatchMakingCard";
import { ChatBanner } from "@/components/home/ChatBanner";
import { HomeDashboardHeader } from "@/components/home/HomeDashboardHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { HOME_LAYOUT, MAIN_TAB_VIEWPORT_BACKDROP, PAGE_SHELL } from "@/lib/constants";
import { cn, isAstrologerHomeSession } from "@/lib/utils";

export default function HomePage() {
  const {
    user,
    isAuthenticated,
    dailyPrediction,
    unreadCount,
    isLoading,
    error: dashboardError,
  } = useDashboard();

  const greeting = user?.name ? `Good day ${user.name}!` : "Good day!";
  const isAstrologer = isAstrologerHomeSession(user ?? undefined);

  return (
    <div className={PAGE_SHELL.homeRoot}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.home} />
      <HomeDashboardHeader
        className={PAGE_SHELL.contentLayer}
        greeting={greeting}
        isAuthenticated={isAuthenticated}
        unreadCount={unreadCount}
      />

      <main
        className={cn(
          PAGE_SHELL.contentLayer,
          HOME_LAYOUT.maxWidth,
          HOME_LAYOUT.gutterX,
          HOME_LAYOUT.mainTopPad,
          HOME_LAYOUT.mainBottomPad,
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
            "lg:grid lg:grid-cols-2 lg:items-stretch"
          )}
        >
          <PredictionCircles
            isLoggedIn={isAuthenticated}
            className="lg:max-w-none"
          />

          <div
            className={cn(
              "flex min-h-0 min-w-0",
              HOME_LAYOUT.featureGridGap,
              "lg:items-stretch"
            )}
          >
            <MatchMakingCard isLoggedIn={isAuthenticated} />
            <DailyPredictionCard
              data={dailyPrediction ?? undefined}
              isLoading={isLoading}
              isLoggedIn={isAuthenticated}
              fetchError={dashboardError}
              currentDate={formatHomeDashboardDate()}
            />
          </div>
        </div>

        <ChatBanner isLoggedIn={isAuthenticated} />
      </main>
    </div>
  );
}
