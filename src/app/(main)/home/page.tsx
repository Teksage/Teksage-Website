"use client";

import Link from "next/link";
import { useDashboard } from "@/hooks/useDashboard";
import { ConsultationBanner } from "@/components/home/ConsultationBanner";
import { PredictionCircles } from "@/components/home/PredictionCircles";
import { DailyPredictionCard } from "@/components/home/DailyPredictionCard";
import { MatchMakingCard } from "@/components/home/MatchMakingCard";
import { ChatBanner } from "@/components/home/ChatBanner";

function getFormattedDate(): string {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function HomePage() {
  const { user, isAuthenticated, dailyPrediction, unreadCount, isLoading } =
    useDashboard();

  const greeting = user?.name ? `Good day, ${user.name}!` : "Good day!";

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.5) -200%, rgba(16,177,0,0.3) 100%)",
      }}
    >
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-black/10 px-5 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-gray-900 truncate">{greeting}</h1>
          <Link
            href={isAuthenticated ? "/notifications" : "/login"}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-[var(--color-brand-error)] text-white text-[10px] font-bold flex items-center justify-center px-1">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Divider */}
      <div className="h-px bg-black/10 mx-5" />

      {/* Content */}
      <main className="flex-1 px-5 py-4 max-w-lg mx-auto w-full space-y-6">
        {/* Consultation banner */}
        <ConsultationBanner isLoggedIn={isAuthenticated} />

        {/* Prediction circles */}
        <PredictionCircles isLoggedIn={isAuthenticated} />

        {/* Match Making + Daily Prediction side by side */}
        <div className="flex gap-4">
          <MatchMakingCard isLoggedIn={isAuthenticated} />
          <DailyPredictionCard
            data={dailyPrediction ?? undefined}
            isLoading={isLoading}
            isLoggedIn={isAuthenticated}
            currentDate={getFormattedDate()}
          />
        </div>

        {/* AI Chat banner */}
        <ChatBanner isLoggedIn={isAuthenticated} />
      </main>
    </div>
  );
}
