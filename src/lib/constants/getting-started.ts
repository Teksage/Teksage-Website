import { TYPO } from "@/lib/constants/typography";
import type { GettingStartedVideo } from "@/types/getting-started";

export const GETTING_STARTED_YOUTUBE_VIDEO_ID_INTRO = "ZDkYDsDu42Y" as const;
export const GETTING_STARTED_YOUTUBE_VIDEO_ID_AUSPICIOUS_DATES =
  "JccJJZJGWUQ" as const;

export const GETTING_STARTED_SCREEN = {
  menuLabel: "Getting Started",
  title: "Getting Started",
  subtitle:
    "Learn how to get the most out of Teksage with short guided videos. New tutorials will appear here over time.",
  videosSectionTitle: "Tutorial videos",
} as const;

/** Ordered list — append new videos here as they are produced. */
export const GETTING_STARTED_VIDEOS: readonly GettingStartedVideo[] = [
  {
    id: "intro",
    title: "Welcome to Teksage",
    youtubeVideoId: GETTING_STARTED_YOUTUBE_VIDEO_ID_INTRO,
  },
  {
    id: "auspicious-dates",
    title: "Find the Best Auspicious Dates for Any Important Event",
    youtubeVideoId: GETTING_STARTED_YOUTUBE_VIDEO_ID_AUSPICIOUS_DATES,
  },
] as const;

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export const GETTING_STARTED_LAYOUT = {
  pageRoot: "relative min-h-dvh bg-white lg:pb-6",
  headerChrome:
    "lg:border-b lg:border-[var(--color-home-dashboard-rule)] lg:bg-white lg:shadow-[0_1px_3px_rgb(0_0_0_/0.06)]",
  panel:
    "relative z-10 w-full px-4 pb-8 pt-4 sm:px-5 lg:px-8 lg:pt-6 xl:px-10",
  hero: "mb-6 text-center lg:mb-8 lg:text-left",
  heroTitle: `${TYPO.h2Semibold} text-[var(--color-brand-black)]`,
  heroSubtitle: `mt-2 max-w-3xl ${TYPO.bodySm} text-[var(--color-brand-black)]/60`,
  sectionTitle: `mb-4 ${TYPO.labelSemibold} text-[var(--color-brand-black)]/80`,
  videoGrid:
    "grid w-full grid-cols-1 gap-6 rounded-xl border border-[var(--color-home-dashboard-rule)] bg-[var(--color-brand-bg)]/35 p-4 sm:p-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-8",
  videoCell: "flex min-w-0 flex-col gap-3",
  videoTitle: `${TYPO.labelSemibold} text-[var(--color-brand-primary)]`,
  videoFrameWrap: "relative aspect-video w-full overflow-hidden rounded-lg bg-[var(--color-brand-black)]",
  videoFrame: "absolute inset-0 size-full border-0",
} as const;
