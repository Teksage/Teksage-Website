"use client";

import Image from "next/image";
import { HalfTriangleDot } from "@/components/common/HalfTriangleDot";
import { PUBLIC_ASSETS } from "@/lib/constants/assets";
import { LOADER_DEFAULT_ARIA_LABEL } from "@/lib/constants";
import { LOADER_ICON_PX, LOADER_UI } from "@/lib/constants/loader-ui";
import { PAGE_SHELL } from "@/lib/constants/page-shell";
import { cn } from "@/lib/utils";
import type { LoaderSize, LoaderProps } from "@/types";

export type { LoaderVariant, LoaderSize, LoaderProps } from "@/types";

const spinnerSizeClass: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
};

function resolveVariant(variant: LoaderProps["variant"]) {
  if (variant === "dots") return "brand";
  return variant ?? "brand";
}

function BrandLoaderMark({ size }: { size: LoaderSize }) {
  const px = LOADER_ICON_PX[size];
  return (
    <Image
      src={PUBLIC_ASSETS.appLogo}
      alt=""
      width={px}
      height={px}
      unoptimized
      className="teksage-brand-logo-pulse object-contain"
      aria-hidden
    />
  );
}

function LogoLoader({
  size,
  className,
  label,
  inline,
}: {
  size: LoaderSize;
  className?: string;
  label: string;
  inline?: boolean;
}) {
  return (
    <div
      className={cn(
        inline ? "inline-flex shrink-0" : "flex",
        "items-center justify-center",
        className
      )}
      role="status"
      aria-label={label}
    >
      <BrandLoaderMark size={size} />
    </div>
  );
}

export function Loader({
  variant: rawVariant,
  size = "md",
  className,
  label = LOADER_DEFAULT_ARIA_LABEL,
}: LoaderProps) {
  const variant = resolveVariant(rawVariant);

  if (variant === "spinner") {
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

  if (variant === "halfTriangle") {
    return (
      <div className={cn("flex items-center justify-center", className)} role="status" aria-label={label}>
        <HalfTriangleDot />
      </div>
    );
  }

  return (
    <LogoLoader
      size={size}
      className={className}
      label={label}
      inline={variant === "inline"}
    />
  );
}

/** Centered in-page loader — same logo as `LoadingOverlay`. */
export function PageLoadingCenter({
  size = "lg",
  className,
}: {
  size?: LoaderSize;
  className?: string;
}) {
  return (
    <div className={cn(PAGE_SHELL.loadingCenter, className)}>
      <Loader variant="brand" size={size} />
    </div>
  );
}

/** Centered full-viewport overlay — prefer `LoadingOverlay` for page-level loads. */
export function FullPageLoader() {
  return (
    <div className={LOADER_UI.overlay}>
      <Loader variant="brand" size="lg" />
    </div>
  );
}
