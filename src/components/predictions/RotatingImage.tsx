"use client";

import { cn } from "@/lib/utils";

/** Mirrors Flutter `RotatingImage` — 8s linear spin (`rotaingImage.dart`). */
export function RotatingImage({
  src,
  alt = "",
  className,
  durationClass = "prediction-rotate-slow",
}: {
  src: string;
  alt?: string;
  className?: string;
  durationClass?: "prediction-rotate-slow" | "prediction-rotate-landing";
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("pointer-events-none object-cover", durationClass, className)}
    />
  );
}
