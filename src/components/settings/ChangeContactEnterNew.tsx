"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { ChangeContactMobileFields } from "@/components/settings/ChangeContactMobileFields";
import { SETTINGS_CHANGE_CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ChangeContactEnterNewProps } from "@/types/ui/change-contact";

export function ChangeContactEnterNew({
  mode,
  email,
  mobile,
  dialValue,
  maxDigits,
  busy,
  feedback,
  isError,
  onEmailChange,
  onMobileChange,
  onCountrySelect,
  onContinue,
}: ChangeContactEnterNewProps) {
  const isEmail = mode === "email";
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-black/60">
        {isEmail
          ? SETTINGS_CHANGE_CONTACT.enterNewEmail
          : SETTINGS_CHANGE_CONTACT.enterNewPhone}
      </p>
      {isEmail ? (
        <Input
          type="email"
          value={email}
          placeholder={SETTINGS_CHANGE_CONTACT.newEmailLabel}
          onChange={(e) => onEmailChange(e.target.value)}
          className="h-12 rounded-xl border-black/15 bg-neutral-100"
        />
      ) : (
        <ChangeContactMobileFields
          dialValue={dialValue}
          mobile={mobile}
          maxDigits={maxDigits}
          onCountrySelect={onCountrySelect}
          onMobileChange={onMobileChange}
        />
      )}
      <Button
        type="button"
        onClick={onContinue}
        disabled={busy}
        className="h-11 rounded-full bg-[var(--color-brand-primary)] font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
      >
        {busy ? (
          <Loader variant="inline" size="sm" />
        ) : (
          SETTINGS_CHANGE_CONTACT.continueCta
        )}
      </Button>
      {feedback ? (
        <p
          className={cn(
            "text-sm font-semibold",
            isError ? "text-[var(--color-brand-error)]" : "text-emerald-700"
          )}
        >
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
