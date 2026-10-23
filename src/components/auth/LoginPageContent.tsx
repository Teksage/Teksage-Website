"use client";

import { Suspense, startTransition, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { useHydratedLoggedIn } from "@/hooks/useHydratedLoggedIn";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { LoginMethodTabs } from "@/components/auth/LoginMethodTabs";
import { MobileLoginForm } from "@/components/auth/MobileLoginForm";
import { OtpVerifyView } from "@/components/auth/OtpVerifyView";
import { AuthScreenShell } from "@/components/auth/AuthScreenShell";
import { PageLoadingCenter } from "@/components/common/Loader";
import { LoginOrSignupHeading } from "@/components/auth/LoginChrome";
import { AUTH_SCREEN, DEFAULT_COUNTRY_CALLING_CODE, LOGIN_SCREEN } from "@/lib/constants";
import { LOGIN_REDIRECT_QUERY } from "@/lib/constants/routes";
import { reconcileAuthSession } from "@/lib/auth-session";
import { resolvePostLoginRedirectPath } from "@/lib/login-redirect";
import { useAuthStore } from "@/store/auth.store";
import type { LoginMethodTab, LoginStep } from "@/types";
import { OTP_CONTACT_TYPE_EMAIL, OTP_CONTACT_TYPE_MOBILE } from "@/types";

function LoginPageInner() {
  const LS = useI18nConstants(LOGIN_SCREEN);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<LoginStep>("form");
  const [activeTab, setActiveTab] = useState<LoginMethodTab>(
    LS.showMobileLoginTab ? "mobile" : "email"
  );
  const [contact, setContact] = useState("");
  const [mobileCountryCode, setMobileCountryCode] = useState<string>(
    DEFAULT_COUNTRY_CALLING_CODE
  );

  const { ready, loggedIn } = useHydratedLoggedIn();
  const profileUpdated = useAuthStore((s) => s.user?.isProfileUpdated);

  useEffect(() => {
    reconcileAuthSession();
  }, []);

  useEffect(() => {
    if (!ready || !loggedIn) return;
    const dest = resolvePostLoginRedirectPath(
      searchParams.get(LOGIN_REDIRECT_QUERY),
      { profileUpdated }
    );
    router.replace(dest);
  }, [ready, loggedIn, profileUpdated, router, searchParams]);

  function handleEmailOtpSent(email: string) {
    setContact(email);
    setStep("otp");
  }

  function handleMobileOtpSent(mobile: string, countryCode: string) {
    setContact(mobile);
    setMobileCountryCode(countryCode);
    setStep("otp");
  }

  function handleTabChange(tab: LoginMethodTab) {
    startTransition(() => setActiveTab(tab));
  }

  if (!ready || loggedIn) return <PageLoadingCenter className="min-h-dvh" />;

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
    <AuthScreenShell
      footer={<p className={AUTH_SCREEN.legalClassName}>{LS.legalFootnote}</p>}
    >
      <LoginOrSignupHeading />
      {LS.showMobileLoginTab ? (
        <LoginMethodTabs active={activeTab} onChange={handleTabChange} />
      ) : null}
      <div key={activeTab} className={AUTH_SCREEN.tabPanelClassName}>
        {LS.showMobileLoginTab && activeTab === "mobile" ? (
          <MobileLoginForm onOtpSent={handleMobileOtpSent} />
        ) : (
          <EmailLoginForm onOtpSent={handleEmailOtpSent} />
        )}
      </div>
    </AuthScreenShell>
  );
}

export function LoginPageContent() {
  return (
    <Suspense fallback={<PageLoadingCenter className="min-h-dvh" />}>
      <LoginPageInner />
    </Suspense>
  );
}
