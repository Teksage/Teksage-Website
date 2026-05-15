"use client";

import { cn } from "@/lib/utils";
import { LOADER_DEFAULT_ARIA_LABEL } from "@/lib/constants";
import type { LoaderSize, LoaderProps } from "@/types";

export type { LoaderVariant, LoaderSize, LoaderProps } from "@/types";

const spinnerSizeClass: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
};

const dotsFrameClass: Record<LoaderSize, string> = {
  sm: "size-5",
  md: "size-8",
  lg: "size-11",
};

const dotsDotClass: Record<LoaderSize, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
};

const dotsWrapperMinH: Record<LoaderSize, string> = {
  sm: "min-h-8",
  md: "min-h-11",
  lg: "min-h-14",
};

export function Loader({
  variant = "spinner",
  size = "md",
  className,
  label = LOADER_DEFAULT_ARIA_LABEL,
}: LoaderProps) {
  if (variant === "dots") {
    const dot =
      "absolute rounded-full bg-[var(--color-brand-primary)] animate-pulse";
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          dotsWrapperMinH[size],
          className
        )}
        role="status"
        aria-label={label}
      >
        <div className={cn("relative", dotsFrameClass[size])}>
          <span
            className={cn(
              dot,
              dotsDotClass[size],
              "left-1/2 top-0 -translate-x-1/2"
            )}
          />
          <span
            className={cn(
              dot,
              dotsDotClass[size],
              "bottom-0 left-0 [animation-delay:160ms]"
            )}
          />
          <span
            className={cn(
              dot,
              dotsDotClass[size],
              "bottom-0 right-0 [animation-delay:320ms]"
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-gray-200 border-t-[var(--color-brand-primary)]",
        spinnerSizeClass[size],
        className
      )}
      role="status"
      aria-label={label}
    />
  );
}

export function FullPageLoader() {
  return (
    <div className="flex items-center justify-center bg-[var(--color-brand-bg)] py-24">
      <Loader variant="spinner" size="lg" />
    </div>
  );
}
