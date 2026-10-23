"use client";

import { useI18nConstants } from "@/hooks/useT";
import { AUTH_SCREEN, LOGIN_SCREEN } from "@/lib/constants";

export function LoginOrSignupHeading() {
  const LS = useI18nConstants(LOGIN_SCREEN);
  return (
    <div className={AUTH_SCREEN.headingBlockClassName}>
      <h1 className={AUTH_SCREEN.headingClassName}>{LS.heading}</h1>
      <p className={AUTH_SCREEN.subtextClassName}>{LS.subtitle}</p>
    </div>
  );
}
