export interface FaqItem {
  faqId: number;
  question: string;
  answer: string;
}

export interface NotificationPrefs {
  dailyPredictions: boolean;
  weeklyPredictions: boolean;
  yearlyPredictions: boolean;
  promotionOffers: boolean;
  warnings: boolean;
}

export interface SubscriptionPlan {
  planId: number;
  planName: string;
  localPlanPrice: number;
  foreignPlanPrice: number;
  localTotalAmount: number;
  foreignTotalAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  cgstPercentage: number;
  sgstPercentage: number;
  planType: string;
  tenureValue: number;
  tenureCount: string;
  osType: string;
}

export interface SubscriptionCouponResult {
  plan_price: number;
  discount: number;
  discounted_price: number;
  cgst_percentage: number;
  sgst_percentage: number;
  cgst: number;
  sgst: number;
  final_price: number;
  coupon_id: number;
}

export interface UserSubscriptionSnapshot {
  planStatus: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  planId?: number;
  isAutoPay?: boolean;
  autoPayStatus?: string | null;
  nextBillingDate?: string;
}

export interface RazorpayAutoPayInitPayload {
  subscriptionId: string;
  key: string;
}

export interface RazorpayAutoPaySuccessPayload {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export interface PlanDetailsSnapshot {
  planName?: string;
  tenureValue?: number;
  tenureCount?: string;
  localPlanPrice?: number;
  foreignPlanPrice?: number;
}

export interface ProfileSettingsPayload {
  notificationPrefs: NotificationPrefs | null;
  subscription: UserSubscriptionSnapshot | null;
  planDetails: PlanDetailsSnapshot | null;
  isPremium: boolean;
}

export interface RazorpayOrderPayload {
  id: string;
  amount: number;
  currency: string;
  key: string;
}

export type AppLanguageCode =
  | "en_US"
  | "ta"
  | "hi"
  | "te_IN"
  | "kn_IN"
  | "ml_IN"
  | "mr_IN";

export interface AppLanguageOption {
  code: AppLanguageCode;
  label: string;
  nativeLabel: string;
  backendName: string;
}
