import type { OtpContactType } from "../login-flow";

export interface EmailLoginFormProps {
  onOtpSent: (email: string) => void;
}

export interface MobileLoginFormProps {
  onOtpSent: (mobile: string, countryCode: string) => void;
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
