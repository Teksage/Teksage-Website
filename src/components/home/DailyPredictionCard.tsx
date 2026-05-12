"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface DailyPredictionData {
  tharaBala?: string;
  chandraBala?: string;
}

interface DailyPredictionCardProps {
  data?: DailyPredictionData;
  isLoading?: boolean;
  isLoggedIn: boolean;
  currentDate: string;
  className?: string;
}

export function DailyPredictionCard({
  data,
  isLoading,
  isLoggedIn,
  currentDate,
  className,
}: DailyPredictionCardProps) {
  const href = isLoggedIn ? "/predictions/daily" : "/login";

  return (
    <Link href={href} className={cn("flex-1 block group", className)}>
      <div
        className="relative h-[175px] rounded-2xl overflow-hidden border border-black/5"
        style={{
          background: "linear-gradient(to bottom, #0DA602, rgba(16,177,0,0.75))",
        }}
      >
        {/* Animated arc decoration (simplified) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-full opacity-10">
            <svg viewBox="0 0 200 175" className="w-full h-full">
              <ellipse cx="100" cy="-20" rx="120" ry="80" fill="white" />
            </svg>
          </div>
        </div>

        <div className="relative flex flex-col items-center pt-5 px-3 gap-2">
          <p className="text-lg font-bold text-white">Daily Prediction</p>
          <p className="text-xs font-semibold text-white/75">{currentDate}</p>

          {/* Bala data card */}
          <div className="w-full bg-white rounded-xl mt-1 py-2 px-3">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="h-5 w-5 rounded-full border-2 border-[var(--color-brand-primary)] border-t-transparent animate-spin" />
              </div>
            ) : !isLoggedIn ? (
              <p className="text-center text-xs font-semibold text-[var(--color-brand-primary)]">
                Click to view
              </p>
            ) : data ? (
              <div className="flex justify-around">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-900">
                    {data.tharaBala ?? "N/A"}
                  </p>
                  <p className="text-[10px] font-semibold text-[var(--color-brand-primary)]">
                    Thara Bala
                  </p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-900">
                    {data.chandraBala ?? "N/A"}
                  </p>
                  <p className="text-[10px] font-semibold text-[var(--color-brand-primary)]">
                    Chandra Bala
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-center text-xs text-gray-400">Loading...</p>
            )}
          </div>

          {/* Down arrow hint */}
          <div className="animate-bounce mt-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
