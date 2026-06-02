import { MEETING_DETAIL_QUERY } from "@/lib/constants/astrologer-portal";
import type { AstroEvent, AstroEventDetail } from "@/types/astrologer-portal";

/** Mirrors Flutter `myMeetingsPage.dart` name / initials builders. */
export function meetingCustomerFullName(
  first: string | null | undefined,
  last: string | null | undefined
): string {
  return `${first?.trim() || "Unknown"} ${last?.trim() ?? ""}`.trim();
}

export function meetingCustomerInitials(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed || trimmed === "Unknown") return "--";
  return trimmed
    .split(" ")
    .map((w) => (w ? w[0] : ""))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function meetingCustomerFirstName(
  first: string | null | undefined
): string {
  return first?.trim() || "Unknown";
}

export function nameFromListEvent(event: AstroEvent): {
  fullName: string;
  initials: string;
  firstName: string;
} {
  const fullName = meetingCustomerFullName(
    event.customer_first_name,
    event.customer_last_name
  );
  return {
    fullName,
    initials: meetingCustomerInitials(fullName),
    firstName: meetingCustomerFirstName(event.customer_first_name),
  };
}

export function nameFromDetailEvent(
  event: AstroEventDetail,
  fallbackFullName?: string | null
): { fullName: string; initials: string } {
  const fullName =
    fallbackFullName?.trim() ||
    meetingCustomerFullName(
      event.customer?.first_name,
      event.customer?.last_name
    );
  return {
    fullName,
    initials: meetingCustomerInitials(fullName),
  };
}

export function meetingDetailQueryString(event: AstroEvent): string {
  const { fullName, initials } = nameFromListEvent(event);
  const params = new URLSearchParams({
    [MEETING_DETAIL_QUERY.name]: fullName,
    [MEETING_DETAIL_QUERY.initials]: initials,
  });
  if (event.event_link?.trim()) {
    params.set(MEETING_DETAIL_QUERY.link, event.event_link.trim());
  }
  return params.toString();
}
