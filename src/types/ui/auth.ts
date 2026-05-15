import type { OtpContactType } from "../login-flow";

export interface EmailLoginFormProps {
  onOtpSent: (email: string) => void;
}

export interface MobileLoginFormProps {
  onOtpSent: (mobile: string) => void;
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
  onBack: () => void;
}

export interface LoginBackButtonProps {
  /** When set (e.g. OTP step), runs instead of `router.back()`. */
  onNavigateBack?: () => void;
}
