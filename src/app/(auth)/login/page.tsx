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
// import { MobileLoginForm } from "@/components/auth/MobileLoginForm";

type LoginStep = "form" | "otp";

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
        contactType="email"
        onBack={() => setStep("form")}
      />
    );
  }

  return (
    <div
      className={
        "relative flex min-h-dvh flex-col " +
        "bg-[linear-gradient(180deg,#C2EDC0_0%,#eef8ed_42%,#ffffff_100%)]"
      }
    >
      {/* Status bar / native chrome is not rendered — web only (per design reference). */}
      <LoginBackButton />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-16">
        <div className="mb-10 flex flex-col items-center">
          <BrandLoginLogo widthPx={176} />
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
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
