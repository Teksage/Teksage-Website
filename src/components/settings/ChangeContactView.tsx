"use client";

import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { ChangeContactEnterNew } from "@/components/settings/ChangeContactEnterNew";
import { ChangeContactOtpBlock } from "@/components/settings/ChangeContactOtpBlock";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  SETTINGS_CHANGE_CONTACT,
} from "@/lib/constants";
import { useChangeContactFlow } from "@/hooks/useChangeContactFlow";
import { cn } from "@/lib/utils";

/** Mirrors Flutter: verify existing OTP → enter new → verify new OTP. */
export function ChangeContactView() {
  const flow = useChangeContactFlow();

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.settings} />
      <AppHeader
        blend
        title={flow.headerTitle}
        showBack
        onBackClick={() => flow.router.back()}
        className={PAGE_SHELL.contentLayer}
      />
      <main
        className={cn(
          PAGE_SHELL.contentLayer,
          "mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-5 pb-6 pt-5"
        )}
      >
        {flow.step === "verify-existing" ? (
          <>
            <p className="text-sm font-medium text-black/70">
              {flow.isEmail
                ? SETTINGS_CHANGE_CONTACT.securityEmail
                : SETTINGS_CHANGE_CONTACT.securityPhone}
            </p>
            <p className="text-sm text-black/60">
              {SETTINGS_CHANGE_CONTACT.otpSentPrefix}{" "}
              <span className="font-semibold text-black">
                {flow.maskedExisting}
              </span>
            </p>
            <ChangeContactOtpBlock
              otp={flow.otp}
              onOtpChange={flow.setOtp}
              verifying={flow.verifying}
              onConfirm={flow.confirmExistingOtp}
              confirmLabel={SETTINGS_CHANGE_CONTACT.confirmOtp}
              hint={SETTINGS_CHANGE_CONTACT.otpHintExisting}
              onResend={flow.sendExistingOtp}
              resendLabel={SETTINGS_CHANGE_CONTACT.resendOtp}
              resending={flow.sending}
            />
          </>
        ) : null}
        {flow.step === "enter-new" ? (
          <ChangeContactEnterNew
            mode={flow.mode}
            email={flow.newEmail}
            mobile={flow.newMobile}
            dialValue={flow.dialValue}
            maxDigits={flow.maxDigits}
            busy={flow.sending}
            feedback={flow.feedback}
            isError={flow.isError}
            onEmailChange={flow.setNewEmail}
            onMobileChange={flow.setNewMobile}
            onCountrySelect={(code, length) => {
              flow.setCountryCode(code);
              flow.setMobileLength(length);
              flow.setNewMobile("");
            }}
            onContinue={flow.continueWithNewContact}
          />
        ) : null}
        {flow.step === "verify-new" ? (
          <ChangeContactOtpBlock
            otp={flow.otp}
            onOtpChange={flow.setOtp}
            verifying={flow.verifying}
            onConfirm={flow.confirmNewOtp}
            confirmLabel={SETTINGS_CHANGE_CONTACT.confirmOtp}
            hint={
              flow.isEmail
                ? SETTINGS_CHANGE_CONTACT.otpHintNewEmail
                : SETTINGS_CHANGE_CONTACT.otpHintNewPhone
            }
            onResend={flow.continueWithNewContact}
            resendLabel={SETTINGS_CHANGE_CONTACT.resendOtp}
            resending={flow.sending}
          />
        ) : null}
        {flow.step !== "enter-new" && flow.feedback ? (
          <p
            className={cn(
              "text-sm font-semibold",
              flow.isError
                ? "text-[var(--color-brand-error)]"
                : "text-emerald-700"
            )}
          >
            {flow.feedback}
          </p>
        ) : null}
      </main>
    </div>
  );
}
