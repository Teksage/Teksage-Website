/** Display helpers for astrologer ask-request cards. */

export function askRequestInitials(name: string | null | undefined): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function formatAskRequestLanguages(languages: string[] | null | undefined): string {
  if (!languages?.length) return "—";
  return languages
    .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
    .join(", ");
}

/** Newest actionable Ask updates first: Answer ready, then by latest activity. */
export function compareAskNotificationRecency(
  a: {
    status: string;
    answered_at?: string | null;
    paid_at?: string | null;
    created_at?: string | null;
    answer_ready_acknowledged?: boolean;
  },
  b: {
    status: string;
    answered_at?: string | null;
    paid_at?: string | null;
    created_at?: string | null;
    answer_ready_acknowledged?: boolean;
  }
): number {
  const rank = (item: typeof a) => {
    if (item.status === "answered" && !item.answer_ready_acknowledged) return 0;
    if (item.status === "answered") return 1;
    return 2;
  };
  const rankDiff = rank(a) - rank(b);
  if (rankDiff !== 0) return rankDiff;

  const activity = (item: typeof a) => {
    const stamps = [item.answered_at, item.paid_at, item.created_at]
      .filter(Boolean)
      .map((iso) => Date.parse(iso as string) || 0);
    return stamps.length ? Math.max(...stamps) : 0;
  };
  return activity(b) - activity(a);
}
