"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import type { ChatStarRatingProps } from "@/types/ui/chat-landing";

function StarIcon({
  kind,
  halfId,
}: {
  kind: "full" | "half" | "empty";
  halfId: string;
}) {
  const fill =
    kind === "full"
      ? "var(--color-chat-star)"
      : kind === "half"
        ? `url(#${halfId})`
        : "none";

  return (
    <svg viewBox="0 0 12 12" className="size-3.5 shrink-0" aria-hidden>
      {kind === "half" ? (
        <defs>
          <linearGradient id={halfId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="var(--color-chat-star)" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M6 0.75L7.55 4.2L11.25 4.65L8.5 7.2L9.25 10.9L6 9L2.75 10.9L3.5 7.2L0.75 4.65L4.45 4.2L6 0.75Z"
        fill={fill}
        stroke="var(--color-chat-star)"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatStarRating({ value = 0, className }: ChatStarRatingProps) {
  const halfId = useId().replace(/:/g, "");
  const clamped = Math.max(0, Math.min(5, value));
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fill = clamped - index;
    if (fill >= 1) return "full" as const;
    if (fill >= 0.5) return "half" as const;
    return "empty" as const;
  });

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${clamped} out of 5 stars`}
    >
      {stars.map((kind, index) => (
        <StarIcon key={index} kind={kind} halfId={`${halfId}-${index}`} />
      ))}
    </span>
  );
}
