import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { LIFE_SHELL_GRADIENT_CLASS, MAIN_TAB_VIEWPORT_BACKDROP } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Full-viewport life gradient behind content + floating bottom nav (Flutter `extendBody`). */
export function LifePredictionShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.life} />
      <div
        className={cn(
          "relative z-10 w-full min-w-0",
          LIFE_SHELL_GRADIENT_CLASS,
          "bg-gradient-to-b from-[#9754f6] to-[#abaedb]",
          "-mb-[var(--main-bottom-nav-clearance)] lg:mb-0",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
