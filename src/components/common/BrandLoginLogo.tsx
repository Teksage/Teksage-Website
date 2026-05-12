import Image from "next/image";
import { cn } from "@/lib/utils";
import { PUBLIC_ASSETS } from "@/lib/constants";

interface BrandLoginLogoProps {
  className?: string;
  /** Width in CSS pixels; height scales with intrinsic 121×98 aspect ratio */
  widthPx?: number;
}

export function BrandLoginLogo({
  className,
  widthPx = 200,
}: BrandLoginLogoProps) {
  const heightPx = Math.round((widthPx * 98) / 121);

  return (
    <div className={cn("flex w-full justify-center", className)}>
      <Image
        src={PUBLIC_ASSETS.loginLogo}
        alt="teksage"
        width={widthPx}
        height={heightPx}
        priority
        className="h-auto max-w-[min(100%,280px)] w-auto object-contain"
      />
    </div>
  );
}
