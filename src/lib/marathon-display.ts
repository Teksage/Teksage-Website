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
