"use client";

import { useEffect, useState } from "react";
import { resolveDailyEnergyScores } from "@/lib/daily-energy-scores";
import { fetchPredictionDetail } from "@/lib/services/predictions";
import { fetchProfile } from "@/lib/services/profile";
import { isPredictionError } from "@/lib/prediction-api-parse";
import type { CurrentDasaSummary } from "@/types/astrology";
import type { ChatLandingEnergyScores } from "@/types/ui/chat-landing";

export function useChatLandingData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState<string | null>(null);
  const [themeIsPositive, setThemeIsPositive] = useState<boolean | undefined>();
  const [scores, setScores] = useState<ChatLandingEnergyScores>({});
  const [dasaSummary, setDasaSummary] = useState<CurrentDasaSummary | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [dailyResult, profile] = await Promise.all([
          fetchPredictionDetail("daily"),
          fetchProfile(),
        ]);
        if (cancelled) return;

        if (!isPredictionError(dailyResult) && dailyResult.kind === "daily") {
          setTheme(dailyResult.cautious ?? null);
          setThemeIsPositive(dailyResult.cautiousIsPositiveDay);
          setScores(
            resolveDailyEnergyScores({
              careerScore: dailyResult.careerScore,
              relationshipScore: dailyResult.relationshipScore,
              wealthScore: dailyResult.wealthScore,
              healthScore: dailyResult.healthScore,
              tharaBala: dailyResult.tharaBala,
              chandraBala: dailyResult.chandraBala,
            })
          );
        }

        setDasaSummary(profile.currentDasaSummary ?? null);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, error, theme, themeIsPositive, scores, dasaSummary };
}
