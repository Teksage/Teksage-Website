"use client";

/**
 * Login — email-only UI (matches Flutter `LoginPageEmail` / design reference).
 *
 * Mobile login (`LoginPageMobile` + `MobileLoginForm`) is intentionally not shown.
 * To restore tabs + mobile flow, uncomment the imports and JSX blocks marked below.
 */

import { useState } from "react";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { OtpVerifyView } from "@/components/auth/OtpVerifyView";
import { BrandLoginLogo } from "@/components/common/BrandLoginLogo";
import { LoginBackButton, LoginOrSignupHeading } from "@/components/auth/LoginChrome";
import { LOGIN_SCREEN } from "@/lib/constants";
import type { LoginStep } from "@/types";
import { OTP_CONTACT_TYPE_EMAIL } from "@/types";

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>("form");
  const [contact, setContact] = useState("");

  function handleOtpSent(email: string) {
    setContact(email);
    setStep("otp");
  }

  if (step === "otp") {
    return (
      <OtpVerifyView
        contact={contact}
        contactType={OTP_CONTACT_TYPE_EMAIL}
        onBack={() => setStep("form")}
      />
    );
  }

  return (
    <div className={LOGIN_SCREEN.shellClassName}>
      {/* Status bar / native chrome is not rendered — web only (per design reference). */}
      <LoginBackButton />

      <div className="relative mx-auto flex w-full max-w-md flex-col px-6 pb-10 pt-16">
        <div className="mb-10 flex flex-col items-center">
          <BrandLoginLogo widthPx={LOGIN_SCREEN.brandLogoWidthPx} />
        </div>

        <LoginOrSignupHeading />

        <EmailLoginForm onOtpSent={handleOtpSent} />

        {/*
        --- Mobile login (restore when needed) ---
        const [activeTab, setActiveTab] = useState<"mobile" | "email">("mobile");
        <div className="flex rounded-xl bg-gray-100 p-1 mb-6"> ... tabs ... </div>
        {activeTab === "mobile" ? (
          <MobileLoginForm onOtpSent={(v) => { setContact(v); setStep("otp"); }} />
        ) : (
          <EmailLoginForm onOtpSent={handleOtpSent} />
        )}
        */}

        <p className="mt-10 text-center text-xs text-neutral-400">
          {LOGIN_SCREEN.legalFootnote}
        </p>
      </div>
    </div>
  );
}
