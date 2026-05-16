"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WEEKLY_PREDICTION_LAYOUT } from "@/lib/constants/weekly-prediction-layout";
import { RotatingImage } from "@/components/predictions/RotatingImage";
import { WeeklyPredictionDayCard } from "@/components/predictions/WeeklyPredictionDayCard";
import { DailyPredictionConsultStrip } from "@/components/predictions/DailyPredictionConsultStrip";
import { WEEKLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";
import { WEEKLY_SCREEN } from "@/lib/constants/prediction-screen-copy";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";
import type { WeeklyPredictionDetail } from "@/types/prediction-detail";

export function WeeklyPredictionLayout({
  data,
  onBackClick,
}: {
  data: WeeklyPredictionDetail;
  onBackClick: () => void;
}) {
  const user = useAuthStore((s) => s.user);
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const programmaticScrollRef = useRef(false);

  const name = user?.name?.trim() || "there";

  const scrollCardIntoView = useCallback((index: number) => {
    const container = listRef.current;
    const el = cardRefs.current[index];
    if (!container || !el) return;

    const top =
      container.scrollTop +
      el.getBoundingClientRect().top -
      container.getBoundingClientRect().top -
      WEEKLY_PREDICTION_LAYOUT.scrollCardTopInsetPx;

    container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  const scrollToDay = useCallback(
    (index: number) => {
      setSelected(index);
      programmaticScrollRef.current = true;
      requestAnimationFrame(() => scrollCardIntoView(index));
      window.setTimeout(() => {
        programmaticScrollRef.current = false;
      }, WEEKLY_PREDICTION_LAYOUT.programmaticScrollMs);
    },
    [scrollCardIntoView]
  );

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const onScroll = () => {
      if (programmaticScrollRef.current) return;
      const scrollTop = container.scrollTop;
      let active = 0;
      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        if (el.offsetTop - WEEKLY_PREDICTION_LAYOUT.scrollSpyTopThresholdPx <= scrollTop) {
          active = i;
        }
      }
      setSelected((prev) => (prev === active ? prev : active));
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [data.days.length]);

  return (
    <div className="w-full min-w-0 bg-[var(--color-brand-bg)] pb-10">
      <header className="relative w-full min-h-[347px] overflow-hidden bg-[linear-gradient(180deg,var(--color-weekly-hero-from)_28.54%,var(--color-weekly-hero-to)_100%)]">
        <RotatingImage
          src={WEEKLY_PREDICTION_ASSETS.background}
          className="absolute left-0 top-[61px] w-full opacity-90"
        />
        <div className="relative z-10 px-5 pt-10">
          <button type="button" onClick={onBackClick} className="p-3" aria-label="Go back">
            <img src={WEEKLY_PREDICTION_ASSETS.back} alt="" className="h-5 w-5 brightness-0 invert" />
          </button>
          <div className="mt-2 flex flex-col items-center gap-4 text-center text-white">
            <h1 className="flex items-center gap-2 text-xl font-bold">
              {WEEKLY_SCREEN.title}
              <button
                type="button"
                title={WEEKLY_SCREEN.infoTooltip}
                aria-label={WEEKLY_SCREEN.infoTooltip}
              >
                <img
                  src={WEEKLY_PREDICTION_ASSETS.toolTip}
                  alt=""
                  className="size-[22px] brightness-0 invert"
                />
              </button>
            </h1>
            <p className="text-lg font-medium leading-snug">
              {WEEKLY_SCREEN.greetingPrefix} {name}!<br />
              {WEEKLY_SCREEN.greetingSuffix}
            </p>
          </div>
          <div className="mt-6 flex justify-between gap-1 pb-5">
            {WEEKLY_SCREEN.dayTabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => scrollToDay(i)}
                className={cn(
                  "min-w-[2.6rem] rounded-2xl px-1 py-1.5 text-sm font-semibold",
                  selected === i
                    ? "bg-[var(--color-brand-primary)] text-white"
                    : "bg-white text-black/40"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div
        ref={listRef}
        className="relative z-10 -mt-6 max-h-[calc(100dvh-300px)] space-y-5 overflow-y-auto px-5 pb-8"
      >
        {data.days.map((d, i) => (
          <WeeklyPredictionDayCard
            key={d.day}
            day={d.day}
            data={d}
            cardRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
        <DailyPredictionConsultStrip />
      </div>
    </div>
  );
}
