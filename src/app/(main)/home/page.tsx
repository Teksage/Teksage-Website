"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { formatHomeDashboardDate } from "@/lib/utils";
import { ConsultationBanner } from "@/components/home/ConsultationBanner";
import { PredictionCircles } from "@/components/home/PredictionCircles";
import { DailyPredictionCard } from "@/components/home/DailyPredictionCard";
import { MatchMakingCard } from "@/components/home/MatchMakingCard";
import { ChatBanner } from "@/components/home/ChatBanner";
import { HomeDashboardHeader } from "@/components/home/HomeDashboardHeader";
import { HOME_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-home-screen-mint)]">
      <HomeDashboardHeader
        greeting={greeting}
        isAuthenticated={isAuthenticated}
        unreadCount={unreadCount}
      />

      <main
        className={cn(
          HOME_LAYOUT.maxWidth,
          HOME_LAYOUT.gutterX,
          HOME_LAYOUT.mainTopPad,
          HOME_LAYOUT.mainBottomPad,
          HOME_LAYOUT.sectionStack,
          "flex-1"
        )}
      >
        <ConsultationBanner isLoggedIn={isAuthenticated} />

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
