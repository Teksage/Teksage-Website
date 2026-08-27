import { isAxiosError } from "axios";

export function bookConsultationCheckoutErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const detail = err.response?.data as { detail?: string } | undefined;
    if (typeof detail?.detail === "string") return detail.detail;
  }
  return fallback;
}

export function formatConsultationCheckoutFee(amount: number, currency: string): string {
  const unit = currency === "INR" ? "₹" : "$";
  return `${unit}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
