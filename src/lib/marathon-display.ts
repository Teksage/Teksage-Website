export function marathonFeeLabel(fee: string, usd?: string | null) {
  const inr = Number(fee);
  const inrText = Number.isFinite(inr) ? `₹${inr.toFixed(2)}` : `₹${fee}`;
  if (usd == null || usd === "") return inrText;
  const dollars = Number(usd);
  const usdText = Number.isFinite(dollars) ? `$${dollars.toFixed(2)}` : `$${usd}`;
  return `${inrText} – ${usdText}`;
}

export function marathonProfileReady(profile: {
  firstName?: string | null;
  dateOfBirth?: string | null;
  timeOfBirth?: string | null;
  placeOfBirth?: string | null;
  email?: string | null;
}) {
  return Boolean(
    profile.firstName
    && profile.dateOfBirth
    && profile.timeOfBirth
    && profile.placeOfBirth
    && profile.email?.trim()
  );
}

const INR_CGST_PCT = 9;
const INR_SGST_PCT = 9;

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export type MarathonFeeParts = {
  base: number;
  cgst: number;
  sgst: number;
  total: number;
  cgstPct: number;
  sgstPct: number;
};

/** Event fee is pre-tax. INR adds 9% CGST and 9% SGST, same as a single query. */
export function marathonFeeAdded(fee: string | number, currency: string): MarathonFeeParts {
  const base = round2(Number(fee) || 0);
  if ((currency || "INR").toUpperCase() !== "INR") {
    return { base, cgst: 0, sgst: 0, total: base, cgstPct: 0, sgstPct: 0 };
  }
  const cgst = round2((base * INR_CGST_PCT) / 100);
  const sgst = round2((base * INR_SGST_PCT) / 100);
  return { base, cgst, sgst, total: round2(base + cgst + sgst), cgstPct: INR_CGST_PCT, sgstPct: INR_SGST_PCT };
}

/** Split a collected total that already includes GST. */
export function marathonFeeIncluded(paid: string | number, currency: string): MarathonFeeParts {
  const total = round2(Number(paid) || 0);
  if ((currency || "INR").toUpperCase() !== "INR") {
    return { base: total, cgst: 0, sgst: 0, total, cgstPct: 0, sgstPct: 0 };
  }
  const base = round2(total / (1 + (INR_CGST_PCT + INR_SGST_PCT) / 100));
  const gst = round2(total - base);
  const cgst = round2(gst / 2);
  const sgst = round2(gst - cgst);
  return { base, cgst, sgst, total, cgstPct: INR_CGST_PCT, sgstPct: INR_SGST_PCT };
}

export function marathonPaidLabel(fee: string, currency: string) {
  const amount = Number(fee);
  const text = Number.isFinite(amount) ? amount.toFixed(2) : fee;
  return currency === "USD" ? `$${text}` : `₹${text}`;
}

export function marathonDateParts(iso: string, zone: string, locale = "en-US") {
  const date = new Date(iso);
  const month = new Intl.DateTimeFormat(locale, {
    month: "short",
    timeZone: zone,
  }).format(date);
  const day = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    timeZone: zone,
  }).format(date);
  const time = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: zone,
  }).format(date);
  return { month, day, time };
}
