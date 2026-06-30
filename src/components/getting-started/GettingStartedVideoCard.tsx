"use client";

import {
  GETTING_STARTED_LAYOUT,
  youtubeEmbedUrl,
  youtubeWatchUrl,
} from "@/lib/constants/getting-started";
import type { GettingStartedVideoCardProps } from "@/types/ui/getting-started";

export function GettingStartedVideoCard({
  video,
  watchOnYoutubeLabel,
}: GettingStartedVideoCardProps) {
  const embedTitle = video.title;

  return (
    <article className={GETTING_STARTED_LAYOUT.videoCard}>
      <div className={GETTING_STARTED_LAYOUT.videoFrameWrap}>
        <iframe
          className={GETTING_STARTED_LAYOUT.videoFrame}
          src={youtubeEmbedUrl(video.youtubeVideoId)}
          title={embedTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className={GETTING_STARTED_LAYOUT.videoBody}>
        <h2 className={GETTING_STARTED_LAYOUT.videoTitle}>{video.title}</h2>
        <p className={GETTING_STARTED_LAYOUT.videoDescription}>{video.description}</p>
        <a
          href={youtubeWatchUrl(video.youtubeVideoId)}
          target="_blank"
          rel="noopener noreferrer"
          className={GETTING_STARTED_LAYOUT.videoLink}
        >
          {watchOnYoutubeLabel}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  );
}
