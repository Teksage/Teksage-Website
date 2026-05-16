import { YEARLY_LAYOUT } from "@/lib/constants/yearly-prediction-screen";
import { cn } from "@/lib/utils";

export function YearlyHorizontalTrack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-2.5 overflow-x-auto pb-1",
        YEARLY_LAYOUT.horizontalTrackInset,
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
