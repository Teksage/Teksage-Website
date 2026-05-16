import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { MAIN_TAB_VIEWPORT_BACKDROP } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Full-viewport yearly gradient behind content + floating bottom nav (Flutter `extendBody`). */
export function YearlyPredictionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.yearly} />
      <div
        className={cn(
          "relative z-10 w-full min-w-0",
          "-mb-[var(--main-bottom-nav-clearance)] lg:mb-0",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
