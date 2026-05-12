import Link from "next/link";
import { cn } from "@/lib/utils";

interface ConsultationBannerProps {
  isLoggedIn: boolean;
  isAstrologer?: boolean;
  className?: string;
}

export function ConsultationBanner({
  isLoggedIn,
  isAstrologer = false,
  className,
}: ConsultationBannerProps) {
  const buttonLabel = isAstrologer ? "My Profile" : "Book Now";
  const title = isAstrologer ? "Astrologer" : "Astrologer Consultation";
  const href = isLoggedIn
    ? isAstrologer
      ? "/consultation/astrologer"
      : "/consultation"
    : "/login";

  return (
    <div
      className={cn(
        "relative flex items-center justify-between rounded-2xl overflow-hidden px-4 py-3",
        "border-2 h-[90px]",
        className
      )}
      style={{
        borderColor: "#C8EF54",
        backgroundColor: "#A2C734",
      }}
    >
      {/* Decorative circle (mirrors Flutter homeBanDeco) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-20"
          style={{ backgroundColor: "#ffffff" }}
        />
      </div>

      {/* Avatar placeholder */}
      <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center shrink-0">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="white" />
          <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill="white" />
        </svg>
      </div>

      {/* Title */}
      <p
        className="text-sm font-bold flex-1 mx-3 leading-tight"
        style={{ color: "#3a3b00" }}
      >
        {title}
      </p>

      {/* CTA button */}
      <Link
        href={href}
        className={cn(
          "px-4 py-2 rounded-full bg-white text-xs font-semibold shrink-0 transition-opacity hover:opacity-90",
          "text-[var(--color-brand-banner-dark)]"
        )}
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
