"use client";

import { useI18nConstants } from "@/hooks/useT";
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
  const WS = useI18nConstants(WEEKLY_SCREEN);
  const user = useAuthStore((s) => s.user);
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const programmaticScrollRef = useRef(false);

  const name = user?.name?.trim() || "there";

  const scrollCardIntoView = useCallback((index: number) => {
    const el = cardRefs.current[index];
    if (!el) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const container = listRef.current;
    if (!container) return;

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
      if (window.matchMedia("(min-width: 1024px)").matches) return;

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
    <div className={WEEKLY_PREDICTION_LAYOUT.pageRoot}>
      <header className={WEEKLY_PREDICTION_LAYOUT.heroHeader}>
        <RotatingImage
          src={WEEKLY_PREDICTION_ASSETS.background}
          className="absolute left-0 top-[61px] w-full opacity-90"
        />
        <div className={WEEKLY_PREDICTION_LAYOUT.heroInner}>
            <button type="button" onClick={onBackClick} className="p-3" aria-label="Go back">
              <img
                src={WEEKLY_PREDICTION_ASSETS.back}
                alt=""
                className="h-5 w-5 brightness-0 invert"
              />
            </button>
            <div className="mt-2 flex flex-col items-center gap-4 text-center text-white">
              <h1 className="text-xl font-bold lg:text-2xl">{WS.title}</h1>
              <p className="max-w-3xl text-lg font-medium leading-snug lg:max-w-none">
                {WS.greetingPrefix} {name}!<br />
                {WS.greetingSuffix}
              </p>
            </div>
            <div className={WEEKLY_PREDICTION_LAYOUT.dayTabRow}>
              {WS.dayTabs.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => scrollToDay(i)}
                  aria-pressed={selected === i}
                  className={cn(
                    WEEKLY_PREDICTION_LAYOUT.dayTabBase,
                    selected === i
                      ? WEEKLY_PREDICTION_LAYOUT.dayTabSelected
                      : WEEKLY_PREDICTION_LAYOUT.dayTabIdle
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
        </div>
      </header>

      <div ref={listRef} className={WEEKLY_PREDICTION_LAYOUT.cardGrid}>
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
        <div className={WEEKLY_PREDICTION_LAYOUT.consultStripSpan}>
          <DailyPredictionConsultStrip />
        </div>
      </div>
    </div>
  );
}
