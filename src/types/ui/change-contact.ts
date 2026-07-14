import type { ChangeContactMode } from "@/types";

export type ChangeContactStep =
  | "verify-existing"
  | "enter-new"
  | "verify-new";

export interface ChangeContactOtpBlockProps {
  otp: string;
  onOtpChange: (value: string) => void;
  verifying: boolean;
  onConfirm: () => void;
  confirmLabel: string;
  hint: string;
  onResend?: () => void;
  resendLabel?: string;
  resending?: boolean;
}

export interface ChangeContactEnterNewProps {
  mode: ChangeContactMode;
  email: string;
  mobile: string;
  dialValue: string;
  maxDigits: number;
  busy: boolean;
  feedback: string | null;
  isError: boolean;
  onEmailChange: (value: string) => void;
  onMobileChange: (value: string) => void;
  onCountrySelect: (code: string, length: number) => void;
  onContinue: () => void;
}
