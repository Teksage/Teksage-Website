"use client";

import {
  GETTING_STARTED_LAYOUT,
  youtubeEmbedUrl,
} from "@/lib/constants/getting-started";
import type { GettingStartedVideoCardProps } from "@/types/ui/getting-started";

export function GettingStartedVideoCard({ video }: GettingStartedVideoCardProps) {
  return (
    <article className={GETTING_STARTED_LAYOUT.videoCell}>
      <h2 className={GETTING_STARTED_LAYOUT.videoTitle}>{video.title}</h2>
      <div className={GETTING_STARTED_LAYOUT.videoFrameWrap}>
        <iframe
          className={GETTING_STARTED_LAYOUT.videoFrame}
          src={youtubeEmbedUrl(video.youtubeVideoId)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </article>
  );
}
