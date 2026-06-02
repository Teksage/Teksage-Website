"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { LoginMethodTabs } from "@/components/auth/LoginMethodTabs";
import { MobileLoginForm } from "@/components/auth/MobileLoginForm";
import { OtpVerifyView } from "@/components/auth/OtpVerifyView";
import { BrandLoginLogo } from "@/components/common/BrandLoginLogo";
import { PageLoadingCenter } from "@/components/common/Loader";
import { LoginBackButton, LoginOrSignupHeading } from "@/components/auth/LoginChrome";
import { DEFAULT_COUNTRY_CALLING_CODE, LOGIN_SCREEN } from "@/lib/constants";
import { LOGIN_REDIRECT_QUERY } from "@/lib/constants/routes";
import { hasClientAuthToken, reconcileAuthSession } from "@/lib/auth-session";
import { resolvePostLoginRedirectPath } from "@/lib/login-redirect";
import type { LoginMethodTab, LoginStep } from "@/types";
import { OTP_CONTACT_TYPE_EMAIL, OTP_CONTACT_TYPE_MOBILE } from "@/types";

function LoginPageInner() {
  const LS = useI18nConstants(LOGIN_SCREEN);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<LoginStep>("form");
  const showMobileTab = LS.showMobileLoginTab;
  const [activeTab, setActiveTab] = useState<LoginMethodTab>(
    showMobileTab ? "mobile" : "email"
  );
  const [contact, setContact] = useState("");
  const [mobileCountryCode, setMobileCountryCode] = useState<string>(
    DEFAULT_COUNTRY_CALLING_CODE
  );

  const hasSession = hasClientAuthToken();

  useEffect(() => {
    reconcileAuthSession();
  }, []);

  useEffect(() => {
    if (!hasSession) return;
    const dest = resolvePostLoginRedirectPath(searchParams.get(LOGIN_REDIRECT_QUERY));
    router.replace(dest);
  }, [hasSession, router, searchParams]);

  function handleEmailOtpSent(email: string) {
    setContact(email);
    setStep("otp");
  }

  function handleMobileOtpSent(mobile: string, countryCode: string) {
    setContact(mobile);
    setMobileCountryCode(countryCode);
    setStep("otp");
  }

  if (hasSession) return <PageLoadingCenter className="min-h-dvh" />;

  if (step === "otp") {
    return (
      <OtpVerifyView
        contact={contact}
        contactType={
          activeTab === "mobile" ? OTP_CONTACT_TYPE_MOBILE : OTP_CONTACT_TYPE_EMAIL
        }
        mobileCountryCode={activeTab === "mobile" ? mobileCountryCode : undefined}
        onBack={() => setStep("form")}
      />
    );
  }

  return (
    <div className={LS.shellClassName}>
      <LoginBackButton />

      <div className="relative mx-auto flex w-full max-w-md flex-col px-6 pb-10 pt-16">
        <div className="mb-10 flex flex-col items-center">
          <BrandLoginLogo widthPx={LS.brandLogoWidthPx} />
        </div>

        <LoginOrSignupHeading />

        {showMobileTab ? (
          <LoginMethodTabs active={activeTab} onChange={setActiveTab} />
        ) : null}

        {showMobileTab && activeTab === "mobile" ? (
          <MobileLoginForm onOtpSent={handleMobileOtpSent} />
        ) : (
          <EmailLoginForm onOtpSent={handleEmailOtpSent} />
        )}

        <p className="mt-10 text-center text-xs text-neutral-400">{LS.legalFootnote}</p>
      </div>
    </div>
  );
}

export function LoginPageContent() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
