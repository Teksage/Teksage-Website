/** Partner Referral code — Profile last section + Home days-left (web). */

export const PARTNER_REFERRAL_STORAGE_KEY = "teksage_partner_ref_code" as const;

export const PARTNER_REFERRAL_UI = {
  sectionTitle: "Referral code",
  fieldLabel: "Referral code",
  placeholder: "e.g. ASTRO001",
  apply: "Apply",
  applying: "Applying…",
  successTitle: "Referral code applied",
  successBody:
    "Your referral discounts are ready. Check Home for days left on subscription and consultation.",
  alreadyApplied: "Referral code already applied",
  invalid: "Invalid referral code",
  homeBlockTitle: "Referral discount",
  subscriptionRow: "Subscription discount — {days} days left",
  consultationRow: "Consultation discount — {days} days left",
  subscriptionLabel: "Yearly plan",
  consultationLabel: "Consultation",
  pctOff: "{pct}% off",
  daysLeftOne: "1 day left",
  daysLeftMany: "{days} days left",
  timerExpired: "Expired",
  timerLeftSuffix: "left",
  checkoutApplied: "Referral discount applied",
  checkoutDaysLeft: "{days} days left",
  checkoutCodeLabel: "REFERRAL",
  revokedTitle: "Referral code inactive",
  revokedBody:
    "This referral code is no longer active. Discount cannot be used on new purchases.",
  statusUsed: "Used",
  statusExpired: "Expired",
  statusInactive: "Referral is inactive",
} as const;

export const PARTNER_REFERRAL_LAYOUT = {
  homeCard:
    "overflow-hidden rounded-2xl border border-[var(--color-brand-primary)]/18 bg-white",
  homeHeader:
    "flex items-center justify-between gap-2 px-4 pb-1 pt-3",
  homeTitle: "text-sm font-bold text-[var(--color-brand-primary)]",
  homeBody: "flex flex-col px-4 pb-3",
  homeRow:
    "flex items-center justify-between gap-3 border-b border-neutral-100 py-2.5 last:border-b-0",
  homeLabel: "text-sm font-medium text-[var(--color-brand-black)]",
  homeMeta: "flex shrink-0 flex-col items-end gap-0.5",
  /** Desktop left rail — compact, no truncation. */
  sidebarCard:
    "shrink-0 overflow-hidden rounded-2xl border border-[var(--color-brand-primary)]/15 bg-[var(--color-home-screen-mint)]/60",
  sidebarHeader:
    "border-b border-[var(--color-brand-primary)]/10 px-3 py-2",
  sidebarTitle: "text-sm font-bold text-[var(--color-brand-primary)]",
  sidebarBody: "flex flex-col gap-1.5 p-2.5",
  sidebarRow:
    "flex flex-col gap-1 rounded-xl bg-white/90 px-2.5 py-2 ring-1 ring-[var(--color-brand-primary)]/10",
  sidebarLabel: "text-xs font-semibold text-[var(--color-brand-black)]",
  sidebarChips: "flex flex-wrap gap-1",
  chipPct:
    "inline-flex rounded-full bg-[var(--color-brand-primary)] px-2 py-0.5 text-[10px] font-bold leading-none text-white",
  chipStatusUsed:
    "inline-flex rounded-full bg-[#2e7d32]/12 px-2 py-0.5 text-[10px] font-bold leading-none text-[#1b5e20]",
  chipStatusExpired:
    "inline-flex rounded-full bg-[#ed6c02]/12 px-2 py-0.5 text-[10px] font-bold leading-none text-[#e65100]",
  chipStatusInactive:
    "inline-flex rounded-full bg-neutral-500/14 px-2 py-0.5 text-[10px] font-bold leading-none text-neutral-600",
  chipDays:
    "inline-flex items-center font-mono text-[11px] font-semibold tabular-nums leading-none text-[var(--color-brand-primary)]",
  chipTimerExpired:
    "inline-flex items-center text-[11px] font-semibold leading-none text-neutral-500",
  revokedCard:
    "overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3",
  revokedTitle: "text-sm font-bold text-neutral-700",
  revokedBody: "mt-1 text-xs text-neutral-600",
} as const;
