import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  PUBLIC_ASSETS,
  BRAND_LOGIN_LOGO_DEFAULT_WIDTH_PX,
  BRAND_LOGIN_LOGO_INTRINSIC_HEIGHT,
  BRAND_LOGIN_LOGO_INTRINSIC_WIDTH,
} from "@/lib/constants";
import type { BrandLoginLogoProps } from "@/types";
export function BrandLoginLogo({
  className,
  widthPx = BRAND_LOGIN_LOGO_DEFAULT_WIDTH_PX,
}: BrandLoginLogoProps) {
  const heightPx = Math.round(
    (widthPx * BRAND_LOGIN_LOGO_INTRINSIC_HEIGHT) / BRAND_LOGIN_LOGO_INTRINSIC_WIDTH
  );

  return (
    <div className={cn("flex w-full justify-center", className)}>
      <Image
        src={PUBLIC_ASSETS.loginLogo}
        alt="teksage"
        width={widthPx}
        height={heightPx}
        priority
        className="h-auto max-w-[min(100%,var(--brand-login-max-display))] w-auto object-contain"
      />
    </div>
  );
}
