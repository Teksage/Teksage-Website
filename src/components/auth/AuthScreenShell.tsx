"use client";

import { AuthHero } from "@/components/auth/AuthHero";
import { BrandLoginLogo } from "@/components/common/BrandLoginLogo";
import { useI18nConstants } from "@/hooks/useT";
import { AUTH_HERO, AUTH_SCREEN, LOGIN_SCREEN } from "@/lib/constants";
import type { AuthScreenShellProps } from "@/types";

export function AuthScreenShell({
  children,
  onBack,
  footer,
}: AuthScreenShellProps) {
  const H = useI18nConstants(AUTH_HERO);

  return (
    <div className={AUTH_SCREEN.shellClassName}>
      <AuthHero onBack={onBack} />

      <div className={AUTH_SCREEN.formColumnClassName}>
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className={AUTH_HERO.mobileBackButtonClassName}
            aria-label={H.backAria}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M19 12H5M5 12l7 7M5 12l7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}

        <div className={AUTH_SCREEN.mobileBrandClassName}>
          <BrandLoginLogo widthPx={LOGIN_SCREEN.brandLogoWidthPx} />
          <p className={AUTH_SCREEN.mobileBrandTaglineClassName}>
            {H.description}
          </p>
        </div>

        <div className={AUTH_SCREEN.formWrapClassName}>
          <div className={AUTH_SCREEN.panelClassName}>
            <div className={AUTH_SCREEN.accentBarClassName} />
            <div className={AUTH_SCREEN.panelBodyClassName}>{children}</div>
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
}
