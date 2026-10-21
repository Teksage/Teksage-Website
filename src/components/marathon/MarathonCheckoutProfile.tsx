"use client";

import { MarathonCheckoutBirthFields } from "@/components/marathon/MarathonCheckoutBirthFields";
import { MarathonCheckoutContact } from "@/components/marathon/MarathonCheckoutContact";
import { Button } from "@/components/ui/button";
import { useI18nConstants } from "@/hooks/useT";
import { useMarathonCheckoutProfile } from "@/hooks/useMarathonCheckoutProfile";
import { CONSULTATION_LANGUAGES } from "@/lib/constants/consultation-languages";
import { CONSULTATION_SCREEN } from "@/lib/constants/consultation-screen";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import {
  RELATED_RELATIONSHIP_COPY,
  RELATED_RELATIONSHIP_IDS,
  relatedRelationshipLabel,
} from "@/lib/constants/related-profiles";
import { cn } from "@/lib/utils";
import type { MarathonCheckoutProfileProps } from "@/types/marathon";

export function MarathonCheckoutProfile({
  onComplete,
  initialQuery = "",
  initialLanguage = "",
  initialRelatedProfileId = null,
  className,
}: MarathonCheckoutProfileProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const consult = useI18nConstants(CONSULTATION_SCREEN);
  const relations = useI18nConstants(RELATED_RELATIONSHIP_COPY);
  const form = MARATHON_CHECKOUT;
  const ui = MARATHON_PAGE;
  const step = useMarathonCheckoutProfile(initialQuery, initialLanguage, initialRelatedProfileId, onComplete);
  const owner = step.owner;
  const emailReady = Boolean(owner?.isEmailVerified && owner.email?.trim());
  const phoneReady = Boolean(owner?.isMobileVerified && owner.mobile?.trim());
  /** Phone is the extra field only after email is already verified. */
  const askPhone = emailReady && !phoneReady;
  const contactVerified = !askPhone && emailReady;
  const contactValue = askPhone ? owner?.mobile?.trim() ?? "" : contactVerified ? owner?.email?.trim() ?? "" : "";
  const contactDial = (owner?.countryCode ?? "").replace(/\D/g, "");

  return (
    <div className={className}>
      <p className={form.stepTitle}>{copy.profileTitle}</p>
      <p className={form.hint}>{step.mode === "other" ? copy.othersHint : copy.profileHint}</p>
      {step.error ? <p className={ui.bookError}>{step.error}</p> : null}
      <div className={form.pair}>
        {step.canChooseSubject ? (
          <div className={form.span}>
            <span className={form.label}>{copy.consultFor}</span>
            <div className={form.subjectRow}>
              <button type="button" className={step.mode === "self" ? form.subjectOn : form.subjectOff} onClick={step.showSelf}>
                {copy.self}
              </button>
              <button type="button" className={step.mode === "other" ? form.subjectOn : form.subjectOff} onClick={step.showOthers}>
                {copy.others}
              </button>
            </div>
          </div>
        ) : null}
        {step.mode === "other" && step.people.length > 0 ? (
          <div className={form.span}>
            <span className={form.label}>{copy.savedPeople}</span>
            <div className={form.savedRow}>
              <select
                className={cn(form.field, form.savedSelect)}
                value={step.adding || step.selectedId == null ? "" : String(step.selectedId)}
                onChange={(e) => {
                  const person = step.people.find((row) => String(row.id) === e.target.value);
                  if (person) step.pickPerson(person);
                  else step.startAdd();
                }}
              >
                <option value="">{copy.selectPerson}</option>
                {step.people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.display_name} ({relatedRelationshipLabel(relations, person.relationship)})
                  </option>
                ))}
              </select>
              <button type="button" className={step.adding ? form.addNewOn : form.addNew} onClick={step.startAdd}>
                {copy.addPerson}
              </button>
            </div>
          </div>
        ) : null}
        {step.showBirth ? (
          <MarathonCheckoutBirthFields className="contents" draft={step.draft} onChange={step.setDraft} />
        ) : null}
        <div className={form.contactLangRow}>
          {step.mode === "other" && step.showBirth ? (
            <label className={form.fieldStack}>
              <span className={form.label}>{copy.relationship}</span>
              <select
                className={form.field}
                value={step.relationship}
                onChange={(e) => {
                  step.setRelationship(e.target.value);
                  if (step.relationshipError) step.setRelationshipError("");
                }}
              >
                <option value="">{copy.relationship}</option>
                {RELATED_RELATIONSHIP_IDS.map((id) => (
                  <option key={id} value={id}>{relations[id]}</option>
                ))}
              </select>
              {step.relationshipError ? <p className={ui.bookError}>{step.relationshipError}</p> : null}
            </label>
          ) : null}
          <label className={form.fieldStack}>
            <span className={form.label}>{copy.languageTitle}</span>
            <select
              className={form.field}
              value={step.language}
              onChange={(e) => {
                step.setLanguage(e.target.value);
                if (step.languageError) step.setLanguageError("");
              }}
            >
              <option value="">{consult.languagePlaceholder}</option>
              {CONSULTATION_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.label}</option>
              ))}
            </select>
            {step.languageError ? <p className={ui.bookError}>{step.languageError}</p> : null}
          </label>
          {step.mode === "other" && step.showBirth ? null : (
            <MarathonCheckoutContact
              key={askPhone ? "mobile" : "email"}
              mode={askPhone ? "mobile" : "email"}
              clarifyOwner={step.canChooseSubject && step.mode === "other"}
              initialValue={contactValue}
              initialDial={contactDial}
              alreadyVerified={contactVerified}
              onVerified={() => step.setVerified(true)}
            />
          )}
        </div>
        {step.mode === "other" && step.showBirth ? (
          <div className={form.span}>
            <MarathonCheckoutContact
              key={askPhone ? "mobile" : "email"}
              mode={askPhone ? "mobile" : "email"}
              clarifyOwner
              initialValue={contactValue}
              initialDial={contactDial}
              alreadyVerified={contactVerified}
              onVerified={() => step.setVerified(true)}
            />
          </div>
        ) : null}
        <label className={form.span}>
          <span className={form.label}>{copy.queryTitle}</span>
          {step.queryError ? <p className={ui.bookError}>{step.queryError}</p> : null}
          <textarea
            className={form.textarea}
            rows={3}
            value={step.query}
            onChange={(e) => {
              step.setQuery(e.target.value);
              if (step.queryError) step.setQueryError("");
            }}
            placeholder={copy.queryHint}
          />
        </label>
      </div>
      <div className={form.actionCenterWrap}>
        <Button type="button" className={form.actionCenter} onClick={() => void step.save()}>
          {copy.continue}
        </Button>
      </div>
    </div>
  );
}
