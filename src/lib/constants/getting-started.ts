import { TYPO } from "@/lib/constants/typography";
import type { GettingStartedVideo } from "@/types/getting-started";

export const GETTING_STARTED_YOUTUBE_VIDEO_ID_INTRO = "ZDkYDsDu42Y" as const;

export const GETTING_STARTED_SCREEN = {
  menuLabel: "Getting Started",
  title: "Getting Started",
  subtitle:
    "Learn how to get the most out of Teksage with short guided videos. New tutorials will appear here over time.",
  videosSectionTitle: "Tutorial videos",
  watchOnYoutube: "Watch on YouTube",
} as const;

/** Ordered list — append new videos here as they are produced. */
export const GETTING_STARTED_VIDEOS: readonly GettingStartedVideo[] = [
  {
    id: "intro",
    title: "Welcome to Teksage",
    description:
      "A quick walkthrough of the app and how to begin your astrology journey.",
    youtubeVideoId: GETTING_STARTED_YOUTUBE_VIDEO_ID_INTRO,
  },
] as const;

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
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
  videoList: "flex w-full flex-col gap-6",
  videoCard:
    "w-full overflow-hidden rounded-2xl border border-[var(--color-home-dashboard-rule)] bg-white shadow-[0_2px_16px_rgb(0_0_0_/0.06)] lg:shadow-[0_4px_24px_rgb(0_0_0_/0.05)]",
  videoFrameWrap: "relative aspect-video w-full bg-[var(--color-brand-black)]",
  videoFrame: "absolute inset-0 size-full border-0",
  videoBody: "flex flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5",
  videoTitle: `${TYPO.h3} text-[var(--color-brand-black)]`,
  videoDescription: `${TYPO.bodySm} text-[var(--color-brand-black)]/65`,
  videoLink:
    "inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-primary)] transition-opacity hover:opacity-80",
} as const;
