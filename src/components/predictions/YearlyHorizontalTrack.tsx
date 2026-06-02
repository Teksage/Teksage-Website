import { YEARLY_CARD_UI } from "@/lib/constants/yearly-prediction-card-ui";
import { cn } from "@/lib/utils";

export function YearlyHorizontalTrack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(YEARLY_CARD_UI.track, className)}>{children}</div>;
}
