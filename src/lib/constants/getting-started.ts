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
  pageRoot: "relative min-h-dvh mint-glow-surface",
  panel:
    "relative z-10 mx-auto w-full max-w-lg px-4 pb-8 pt-5 lg:my-6 lg:max-w-6xl lg:px-8 lg:pb-10",
  videoGrid:
    "grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-8",
  videoCell: "flex min-w-0 flex-col gap-3",
  videoTitle: `${TYPO.chatBubble} text-[var(--color-brand-primary)]`,
  videoFrameWrap:
    "relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--color-chat-bot-border)] bg-[var(--color-brand-black)] shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]",
  videoFrame: "absolute inset-0 size-full border-0",
} as const;
