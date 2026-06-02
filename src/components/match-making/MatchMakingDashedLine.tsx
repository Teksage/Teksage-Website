import { cn } from "@/lib/utils";

export function MatchMakingDashedLine({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px w-full border-t border-dashed border-black/30", className)}
      role="presentation"
    />
  );
}
