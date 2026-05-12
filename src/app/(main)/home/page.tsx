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

        <PredictionCircles isLoggedIn={isAuthenticated} />

        <div className={cn("flex", HOME_LAYOUT.featureGridGap)}>
          <MatchMakingCard isLoggedIn={isAuthenticated} />
          <DailyPredictionCard
            data={dailyPrediction ?? undefined}
            isLoading={isLoading}
            isLoggedIn={isAuthenticated}
            fetchError={dashboardError}
            currentDate={formatHomeDashboardDate()}
          />
        </div>

        <ChatBanner isLoggedIn={isAuthenticated} />
      </main>
    </div>
  );
}
