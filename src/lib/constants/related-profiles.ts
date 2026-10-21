export const RELATED_RELATIONSHIP_COPY = {
  spouse: "Spouse",
  brother: "Brother",
  sister: "Sister",
  father: "Father",
  mother: "Mother",
  son: "Son",
  daughter: "Daughter",
  friend: "Friend",
  other: "Others",
} as const;

export const RELATED_PROFILE_LIMIT = 3;

export const RELATED_RELATIONSHIP_IDS = [
  "spouse",
  "brother",
  "sister",
  "father",
  "mother",
  "son",
  "daughter",
  "friend",
  "other",
] as const;

export type RelatedRelationshipId = (typeof RELATED_RELATIONSHIP_IDS)[number];

export function formatRelatedPerson(template: string, name: string, relationship: string): string {
  return template.replaceAll("{name}", name).replaceAll("{relationship}", relationship);
}

export function relatedRelationshipLabel(
  labels: Record<RelatedRelationshipId, string>,
  id: string
): string {
  if ((RELATED_RELATIONSHIP_IDS as readonly string[]).includes(id)) {
    return labels[id as RelatedRelationshipId];
  }
  return id;
}
