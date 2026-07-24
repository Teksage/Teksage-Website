"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE } from "@/lib/constants";
import { getTurnstileSiteKey, isTurnstileConfigured } from "@/lib/env";
import type { TurnstileFieldProps } from "@/types";

/** Cloudflare Turnstile widget for website login / OTP resend. */
export function TurnstileField({
  onTokenChange,
  onExpire,
  className,
  remountKey = 0,
}: TurnstileFieldProps) {
  if (!isTurnstileConfigured()) return null;

  return (
    <div className={className ?? TURNSTILE.widgetClassName}>
      <Turnstile
        key={remountKey}
        siteKey={getTurnstileSiteKey()}
        onSuccess={(token) => onTokenChange(token)}
        onExpire={() => {
          onTokenChange(null);
          onExpire?.();
        }}
        onError={() => onTokenChange(null)}
        options={{ theme: "light", size: "flexible" }}
      />
    </div>
  );
}
