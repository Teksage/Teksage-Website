"use client";

import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { ChangeContactEnterNew } from "@/components/settings/ChangeContactEnterNew";
import { ChangeContactOtpBlock } from "@/components/settings/ChangeContactOtpBlock";
import { SettingsPageHeader } from "@/components/settings/SettingsPageHeader";
import {
  CHANGE_CONTACT_LAYOUT,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  SETTINGS_CHANGE_CONTACT,
  SETTINGS_SCREEN,
} from "@/lib/constants";
import { SETTINGS_LAYOUT } from "@/lib/constants/settings-screen";
import { useChangeContactFlow } from "@/hooks/useChangeContactFlow";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { cn } from "@/lib/utils";

/** Mirrors Flutter: verify existing OTP → enter new → verify new OTP. */
export function ChangeContactView() {
  const flow = useChangeContactFlow();
  const { t } = useAppLanguage();

  return (
    <div className={cn(PAGE_SHELL.column, CHANGE_CONTACT_LAYOUT.pageRoot)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.settings} />
      <div className={CHANGE_CONTACT_LAYOUT.panel}>
        <SettingsPageHeader
          title={flow.headerTitle}
          subtitle={SETTINGS_CHANGE_CONTACT.subtitle}
          backLabel={t(SETTINGS_SCREEN.title)}
          onBack={() => flow.router.back()}
        />
        <div className={SETTINGS_LAYOUT.contentCard}>
          <div className={cn(SETTINGS_LAYOUT.contentCardPad, "flex flex-col gap-4")}>
            {flow.step === "verify-existing" ? (
              <>
                <p className={CHANGE_CONTACT_LAYOUT.lead}>
                  {flow.isEmail
                    ? SETTINGS_CHANGE_CONTACT.securityEmail
                    : SETTINGS_CHANGE_CONTACT.securityPhone}
                </p>
                <p className={CHANGE_CONTACT_LAYOUT.lead}>
                  {SETTINGS_CHANGE_CONTACT.otpSentPrefix}{" "}
                  <span className={CHANGE_CONTACT_LAYOUT.contact}>
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
                className={
                  flow.isError
                    ? CHANGE_CONTACT_LAYOUT.feedbackError
                    : CHANGE_CONTACT_LAYOUT.feedbackOk
                }
              >
                {flow.feedback}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
