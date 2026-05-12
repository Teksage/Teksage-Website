import Link from "next/link";
import { cn } from "@/lib/utils";

interface ChatBannerProps {
  isLoggedIn: boolean;
  className?: string;
}

export function ChatBanner({ isLoggedIn, className }: ChatBannerProps) {
  const href = isLoggedIn ? "/chat" : "/login";

  return (
    <Link href={href} className={cn("block group", className)}>
      <div
        className="flex items-center justify-between rounded-2xl px-5 h-[90px]"
        style={{ backgroundColor: "#100C0D" }}
      >
        <p className="text-base font-bold text-white flex-1">
          AI Astro{"\n"}Chat Assistant
        </p>

        {/* Decorative element */}
        <div className="flex items-center justify-center w-10 h-10 shrink-0">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#A2C734" opacity="0.3" />
            <path
              d="M8 12h8M12 8l4 4-4 4"
              stroke="#A2C734"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* CTA button */}
        <div
          className={cn(
            "ml-4 px-4 py-2 rounded-full bg-white flex items-center gap-1 shrink-0 transition-opacity group-hover:opacity-90"
          )}
        >
          <span className="text-xs font-semibold text-[#0E0D0C]">Chat Now</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#0E0D0C" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
