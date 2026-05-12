import Link from "next/link";
import { cn } from "@/lib/utils";

interface MatchMakingCardProps {
  isLoggedIn: boolean;
  hasExistingMatch?: boolean;
  className?: string;
}

export function MatchMakingCard({
  isLoggedIn,
  hasExistingMatch = false,
  className,
}: MatchMakingCardProps) {
  const href = isLoggedIn
    ? hasExistingMatch
      ? "/matchmaking/details"
      : "/matchmaking"
    : "/login";

  return (
    <Link href={href} className={cn("flex-1 block group", className)}>
      <div className="relative h-[175px] rounded-2xl overflow-hidden bg-white shadow-sm">
        {/* Title */}
        <div className="absolute top-5 left-0 right-0 flex justify-center">
          <p
            className="text-base font-bold text-center leading-tight"
            style={{ color: "#FF7075" }}
          >
            Marriage{"\n"}Match Making
          </p>
        </div>

        {/* Illustration (decorative heart / couple SVG) */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] flex items-end justify-center pb-3">
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
            {/* Simple couple silhouette */}
            <circle cx="35" cy="20" r="10" fill="#FFB3C0" />
            <path d="M20 50c0-8.28 6.72-15 15-15s15 6.72 15 15v5H20v-5z" fill="#FFB3C0" />
            <circle cx="65" cy="20" r="10" fill="#FF8B84" />
            <path d="M50 50c0-8.28 6.72-15 15-15s15 6.72 15 15v5H50v-5z" fill="#FF8B84" />
            {/* Heart */}
            <path
              d="M50 38c-1-3-5-5-7-2-2 3 1 6 7 10 6-4 9-7 7-10-2-3-6-1-7 2z"
              fill="#FC5D59"
            />
          </svg>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#FF7075]/0 group-hover:bg-[#FF7075]/5 transition-colors rounded-2xl" />
      </div>
    </Link>
  );
}
