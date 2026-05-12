"use client";

import { cn } from "@/lib/utils";

export type LoaderVariant = "spinner" | "dots";
export type LoaderSize = "sm" | "md" | "lg";

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

export interface LoaderProps {
  /** Default `spinner` — ring spin. `dots` — three pulsing dots (Flutter-style). */
  variant?: LoaderVariant;
  size?: LoaderSize;
  className?: string;
  /** Accessible name; defaults to `"Loading"`. */
  label?: string;
}

export function Loader({
  variant = "spinner",
  size = "md",
  className,
  label = "Loading",
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
    <div className="flex min-h-screen flex-1 items-center justify-center bg-[var(--color-brand-bg)]">
      <Loader variant="spinner" size="lg" />
    </div>
  );
}
