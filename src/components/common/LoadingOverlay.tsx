"use client";

import { Loader } from "@/components/common/Loader";
import { LOADER_UI } from "@/lib/constants/loader-ui";
import { LOADER_DEFAULT_ARIA_LABEL } from "@/lib/constants";
import type { LoadingOverlayProps } from "@/types";
import { cn } from "@/lib/utils";

/** Flutter `CustomLoader.show` — blocks interaction over current page. */
export function LoadingOverlay({ open, className }: LoadingOverlayProps) {
  if (!open) return null;

  return (
    <div
      className={cn(LOADER_UI.overlay, className)}
      role="status"
      aria-live="polite"
      aria-label={LOADER_DEFAULT_ARIA_LABEL}
    >
      <Loader variant="brand" size="lg" />
    </div>
  );
}
