import { cn } from "@/lib/utils";
import { MAIN_TAB_VIEWPORT_BACKDROP } from "@/lib/constants";
import type { MainTabViewportBackdropProps } from "@/types";

/** Full-viewport fill so tab backgrounds show under the floating bottom nav. */
export function MainTabViewportBackdrop({
  className,
  overflowHidden = false,
}: MainTabViewportBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn(
        overflowHidden
          ? MAIN_TAB_VIEWPORT_BACKDROP.overflowHidden
          : MAIN_TAB_VIEWPORT_BACKDROP.base,
        className
      )}
    />
  );
}
