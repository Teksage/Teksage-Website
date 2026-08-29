import type { UserProfile } from "../user-profile";
import type { PaymentTotals } from "@/lib/subscription-payment-totals";
import type { ProfileDetailsFormValues } from "@/lib/profile-form-schema";
import type { SubscriptionPlan } from "@/types/settings";
import type { ReactNode } from "react";
import type { FieldErrors, UseFormSetValue } from "react-hook-form";

export type ProfileDetailsFormState = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  countryCode: string;
  chatLanguages: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  birthLocationFull: string;
  preferredLocation: string;
  preferredLocationFull: string;
  rashi: string;
  nakshatra: string;
};

export interface ProfileDetailsFieldsProps {
  user: UserProfile;
  isEditing: boolean;
  isSaving: boolean;
  onProfileRefresh?: () => void | Promise<void>;
}

export interface ProfileDetailsBirthSectionProps {
  form: ProfileDetailsFormValues;
  errors: FieldErrors<ProfileDetailsFormValues>;
  setValue: UseFormSetValue<ProfileDetailsFormValues>;
  touch: { shouldDirty: true };
  isEditing: boolean;
  guardBirthEdit: () => boolean;
  refreshRashi: () => void | Promise<void>;
  rashiBusy: boolean;
  rashiError: string | null;
}

export interface ProfileLocationFieldProps {
  label: string;
  required?: boolean;
  value: string;
  fullLocation: string;
  isEditable: boolean;
  placeholder: string;
  onChange: (city: string, fullLocation: string) => void;
  onBlurCommit?: () => void;
  hasError?: boolean;
  errorMessage?: string;
  /** Return false to block focus (e.g. premium gate). */
  onFocusAttempt?: () => boolean;
  /** Override input surface styles (e.g. white bg on Event Planner form). */
  inputClassName?: string;
}

export interface ProfileDetailsFormProps {
  user: UserProfile;
  isEditing: boolean;
  onSave: (updates: Partial<UserProfile>) => Promise<boolean>;
  isSaving: boolean;
  onDoneEditing: () => void;
  onProfileRefresh?: () => void | Promise<void>;
  className?: string;
}

export interface ProfilePageHeaderProps {
  title: string;
  subtitle?: string;
  backLabel: string;
  onBack: () => void;
  action?: React.ReactNode;
  className?: string;
}

export type SettingsPageHeaderProps = ProfilePageHeaderProps;

export interface ProfileAvatarProps {
  name?: string;
  avatarUrl?: string;
  isPremium?: boolean;
  className?: string;
}

export interface ProfileDateOfBirthFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  isEditable?: boolean;
  required?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  onBlurCommit?: () => void;
  /** Return false to block opening the picker (e.g. premium gate). */
  onFocusAttempt?: () => boolean;
}

export interface ProfileBirthDateCalendarProps {
  focusedMonth: Date;
  selectedDate: Date;
  today: Date;
  onFocusedMonthChange: (month: Date) => void;
  onSelectDate: (date: Date) => void;
}

export interface ProfileFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "tel" | "date" | "time";
  placeholder?: string;
  isEditable?: boolean;
  isReadOnly?: boolean;
  required?: boolean;
  /** Flutter-style grey tiles + sentence-case labels. */
  appearance?: "default" | "profile";
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  onBlurCommit?: () => void;
  /** Return false to block focus (e.g. premium gate). */
  onFocusAttempt?: () => boolean;
}

export interface ProfilePhoneRowProps {
  countryCode: string;
  mobile: string;
  onCountryCodeChange: (value: string) => void;
  onMobileChange: (value: string) => void;
  isMobileVerified?: boolean;
  isEditing: boolean;
  onVerificationSuccess?: () => void | Promise<void>;
  hasError?: boolean;
  errorMessage?: string;
}

export interface ProfilePhoneOtpPanelProps {
  otp: string;
  onOtpChange: (value: string) => void;
  verifyBusy: boolean;
  onConfirm: () => void;
}

export interface ProfileContactActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  busy?: boolean;
  busySlot?: React.ReactNode;
}

export interface ProfileEmailRowProps {
  email: string;
  onEmailChange: (value: string) => void;
  isEmailVerified?: boolean;
  isEditing: boolean;
  onVerificationSuccess?: () => void | Promise<void>;
  hasError?: boolean;
  errorMessage?: string;
  required?: boolean;
}

export type ChangeContactMode = "email" | "mobile";

export interface ChangeContactMobileFieldsProps {
  dialValue: string;
  mobile: string;
  maxDigits: number;
  onCountrySelect: (countryCodeNumeric: string, mobileLength: number) => void;
  onMobileChange: (value: string) => void;
}

export interface ChangeContactOtpSectionProps {
  mode: ChangeContactMode;
  otp: string;
  verifying: boolean;
  onOtpChange: (value: string) => void;
  onVerify: () => void;
}

export interface ChangeContactModeTabsProps {
  mode: ChangeContactMode;
  onModeChange: (mode: ChangeContactMode) => void;
}

export type SettingsRowVariant = "default" | "logout";

export interface SettingsRowProps {
  label: string;
  iconSrc: string;
  variant?: SettingsRowVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface SettingsModalDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  body?: ReactNode;
}

export interface SubscriptionCancelReasonFieldsProps {
  label: string;
  reasons: readonly string[];
  otherLabel: string;
  selected: string | null;
  otherText: string;
  otherPlaceholder: string;
  error: string | null;
  onSelect: (reason: string) => void;
  onOtherTextChange: (value: string) => void;
}

export interface SettingsRateDialogProps {
  open: boolean;
  onClose: () => void;
  onRateNow: () => void;
}

export interface SubscriptionPaymentFeesProps {
  totals: PaymentTotals;
  symbol: string;
  isInr: boolean;
  showPromo: boolean;
  promo: string;
  promoApplied: boolean;
  promoError: string | null;
  busy: boolean;
  /** Partner referral auto-applied (REFERRAL code locked). */
  referralLocked?: boolean;
  onPromoChange: (value: string) => void;
  onApplyPromo: () => void;
}

export interface SubscriptionPlanBenefitsProps {
  selectedPlan: SubscriptionPlan | null | undefined;
  isPremium: boolean;
  className?: string;
}
