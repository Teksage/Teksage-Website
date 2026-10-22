"use client";

import { useEffect, useState } from "react";
import { useI18nConstants, useT } from "@/hooks/useT";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { marathonBornLine } from "@/lib/marathon-display";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { PROFILE_FORM_VALIDATION } from "@/lib/constants/profile-form-validation";
import {
  createRelatedProfile,
  fetchRelatedProfiles,
  updateRelatedProfile,
} from "@/lib/services/marathon";
import { fetchProfile, updateProfile } from "@/lib/services/profile";
import { useAuthStore } from "@/store/auth.store";
import { RELATED_PROFILE_LIMIT } from "@/lib/constants/related-profiles";
import {
  birthDraftFingerprint,
  birthDraftFromPerson,
  birthDraftFromProfile,
  profileHasBirthRecord,
  birthDraftToInput,
  emptyBirthDraft,
} from "@/lib/marathon-birth-draft";
import type { MarathonBirthDraft, MarathonCheckoutProfileResult, RelatedProfile } from "@/types/marathon";
import type { UserProfile } from "@/types/user-profile";

export function useMarathonCheckoutProfile(
  initialQuery: string,
  initialLanguage: string,
  initialRelatedProfileId: number | null,
  onComplete: (result: MarathonCheckoutProfileResult) => void
) {
  const copy = useI18nConstants(MARATHON_COPY);
  const rules = useI18nConstants(PROFILE_FORM_VALIDATION);
  const { t, locale } = useT();
  const [owner, setOwner] = useState<UserProfile | null>(null);
  const [people, setPeople] = useState<RelatedProfile[]>([]);
  const [mode, setMode] = useState<"self" | "other">("self");
  const [draft, setDraft] = useState<MarathonBirthDraft>(emptyBirthDraft);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [relationship, setRelationship] = useState("");
  const [baseline, setBaseline] = useState("");
  const [query, setQuery] = useState(initialQuery);
  const [language, setLanguage] = useState(initialLanguage);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [queryError, setQueryError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [relationshipError, setRelationshipError] = useState("");

  useEffect(() => {
    void Promise.all([fetchProfile(), fetchRelatedProfiles()])
      .then(([profile, rows]) => {
        setOwner(profile);
        setPeople(rows);
        if (profile.isEmailVerified && profile.email?.trim()) {
          setVerified(true);
        }
        const picked = initialRelatedProfileId
          ? rows.find((row) => row.id === initialRelatedProfileId)
          : undefined;
        if (picked) {
          const next = birthDraftFromPerson(picked);
          setMode("other");
          setDraft(next);
          setSelectedId(picked.id);
          setRelationship(picked.relationship);
          setBaseline(birthDraftFingerprint(next, picked.relationship));
          return;
        }
        setDraft(birthDraftFromProfile(profile));
      })
      .catch(() => undefined);
  }, [initialRelatedProfileId]);

  function showSelf() {
    setMode("self");
    setSelectedId(null);
    setAdding(false);
    setRelationship("");
    setError("");
    if (owner) setDraft(birthDraftFromProfile(owner));
  }

  function showOthers() {
    setMode("other");
    setSelectedId(null);
    setRelationship("");
    setAdding(people.length === 0);
    setDraft(emptyBirthDraft());
    setBaseline("");
    setError("");
  }

  function pickPerson(person: RelatedProfile) {
    const next = birthDraftFromPerson(person);
    setSelectedId(person.id);
    setAdding(false);
    setDraft(next);
    setRelationship(person.relationship);
    setBaseline(birthDraftFingerprint(next, person.relationship));
    setError("");
  }

  function startAdd() {
    if (people.length >= RELATED_PROFILE_LIMIT) {
      setError(copy.othersLimit);
      return;
    }
    setError("");
    setAdding(true);
    setSelectedId(null);
    setDraft(emptyBirthDraft());
    setRelationship("");
    setBaseline("");
  }

  const canChooseSubject = profileHasBirthRecord(owner);
  const showBirth = true;

  async function save() {
    setError("");
    setQueryError("");
    setLanguageError("");
    setRelationshipError("");
    if (!draft.first.trim() || !draft.last.trim() || !draft.dob || !draft.tob || !draft.birthFull.trim() || !draft.currentFull.trim()) {
      setError(rules.fillAllRequired);
      return;
    }
    if (mode === "other" && !relationship.trim()) {
      setRelationshipError(copy.relationshipRequired);
      return;
    }
    const emailReady = Boolean(owner?.isEmailVerified && owner.email?.trim());
    if (!emailReady && !verified) {
      setError(t("Please verify your Email"));
      return;
    }
    if (!language.trim()) {
      setLanguageError(copy.languageRequired);
      return;
    }
    const customerQuery = query.trim();
    if (!customerQuery) {
      setQueryError(copy.queryRequired);
      return;
    }
    if (mode === "self" || !canChooseSubject) {
      const { profile } = await updateProfile({
        firstName: draft.first.trim(),
        lastName: draft.last.trim(),
        dateOfBirth: draft.dob,
        timeOfBirth: draft.tob,
        placeOfBirth: draft.birthFull.trim(),
        preferredLocation: draft.currentFull.trim(),
      });
      useAuthStore.getState().updateUser(profile);
      onComplete({ customerQuery, preferredLanguage: language.trim(), relatedProfileId: null, memberDisplayName: null, relationship: null, bornLine: marathonBornLine(draft.dob, draft.tob, draft.birth, bcp47FromAppLocale(locale)) });
      return;
    }
    if (selectedId == null && people.length >= RELATED_PROFILE_LIMIT) {
      setError(copy.othersLimit);
      return;
    }
    const body = birthDraftToInput(draft, relationship.trim());
    let relatedProfileId = selectedId;
    if (selectedId == null) {
      relatedProfileId = (await createRelatedProfile(body)).id;
    } else if (birthDraftFingerprint(draft, relationship.trim()) !== baseline) {
      await updateRelatedProfile(selectedId, body);
    }
    const memberDisplayName = `${draft.first.trim()} ${draft.last.trim()}`.trim();
    onComplete({ customerQuery, preferredLanguage: language.trim(), relatedProfileId, memberDisplayName, relationship: relationship.trim(), bornLine: marathonBornLine(draft.dob, draft.tob, draft.birth, bcp47FromAppLocale(locale)) });
  }

  return {
    people,
    mode,
    draft,
    setDraft,
    selectedId,
    adding,
    relationship,
    setRelationship,
    query,
    setQuery,
    language,
    setLanguage,
    setVerified,
    error,
    queryError,
    setQueryError,
    languageError,
    setLanguageError,
    relationshipError,
    setRelationshipError,
    owner,
    showBirth,
    canChooseSubject,
    showSelf,
    showOthers,
    pickPerson,
    startAdd,
    save,
  };
}
