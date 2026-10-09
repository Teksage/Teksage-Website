export const MARATHON_PARTICIPANT_COPY = {
  one: "1 participant",
  many: "{count} participants",
} as const;

export function eventShowsParticipants(event: { admin_ended?: boolean; ends_at?: string | null } | null) {
  if (!event) return false;
  if (event.admin_ended) return true;
  if (!event.ends_at) return false;
  const end = new Date(event.ends_at).getTime();
  return !Number.isNaN(end) && end <= Date.now();
}

export function participantLabel(count: number, copy: { one: string; many: string }) {
  return count === 1 ? copy.one : copy.many.replace("{count}", String(count));
}
