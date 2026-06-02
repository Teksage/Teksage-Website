import { cn } from "@/lib/utils";

const DOT =
  "absolute size-2 rounded-full bg-[var(--color-brand-primary)] teksage-half-triangle-dot";

type HalfTriangleDotProps = {
  className?: string;
  dotClassName?: string;
};

/** Flutter `LoadingAnimationWidget.halfTriangleDot` (triangle of three dots). */
export function HalfTriangleDot({ className, dotClassName }: HalfTriangleDotProps) {
  return (
    <div
      className={cn("relative size-[1.875rem]", className)}
      aria-hidden
    >
      <span className={cn(DOT, "left-1/2 top-0 -translate-x-1/2", dotClassName)} />
      <span
        className={cn(
          DOT,
          "bottom-0 left-0 teksage-half-triangle-dot-delay-1",
          dotClassName
        )}
      />
      <span
        className={cn(
          DOT,
          "bottom-0 right-0 teksage-half-triangle-dot-delay-2",
          dotClassName
        )}
      />
    </div>
  );
}
