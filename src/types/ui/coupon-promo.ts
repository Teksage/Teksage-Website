export type PromoCodeFieldVariant = "subscription" | "consultation";

export type PromoCodeFieldProps = {
  variant: PromoCodeFieldVariant;
  value: string;
  applied: boolean;
  error: string | null;
  busy: boolean;
  placeholder: string;
  applyLabel: string;
  appliedLabel: string;
  savingsLabel?: string;
  savingsAmount?: number | null;
  currencySymbol?: string;
  onChange: (value: string) => void;
  onApply: () => void;
};
