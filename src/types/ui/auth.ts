import type { ReactNode } from "react";
import type { OtpContactType } from "../login-flow";

export interface EmailLoginFormProps {
  onOtpSent: (email: string) => void;
}

export interface MobileLoginFormProps {
  onOtpSent: (mobile: string, countryCode: string) => void;
}

export interface TurnstileFieldProps {
  onTokenChange: (token: string | null) => void;
  onExpire?: () => void;
  className?: string;
  /** Change to force a fresh widget after a token is consumed. */
  remountKey?: number;
}

export interface OtpResendBlockProps {
  canResend: boolean;
  isResending: boolean;
  resendSecondsLeft: number;
  showCaptcha: boolean;
  turnstileKey: number;
  onTokenChange: (token: string | null) => void;
  onResend: () => void;
  labels: {
    resendWaitPrefix: string;
    resendWaitSuffix: string;
    resendQuestion: string;
    resendCta: string;
  };
}

export interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  hasError?: boolean;
  className?: string;
}

export interface OtpVerifyViewProps {
  contact: string;
  contactType: OtpContactType;
  /** Dial code used for mobile OTP (e.g. `+91`). */
  mobileCountryCode?: string;
  onBack: () => void;
}

export interface LoginBackButtonProps {
  /** When set (e.g. OTP step), runs instead of `router.back()`. */
  onNavigateBack?: () => void;
}

export interface AuthScreenShellProps {
  children: ReactNode;
  /** OTP step — shows back control on the left hero (and mobile form column). */
  onBack?: () => void;
  /** Rendered under the glass panel, e.g. the login legal footnote. */
  footer?: ReactNode;
}

export interface AuthHeroProps {
  onBack?: () => void;
}
