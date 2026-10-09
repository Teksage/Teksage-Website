"use client";

import { useState } from "react";
import { MarathonCheckoutContact } from "@/components/marathon/MarathonCheckoutContact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import { useI18nConstants, useT } from "@/hooks/useT";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { PROFILE_FORM_VALIDATION } from "@/lib/constants/profile-form-validation";
import { updateProfile } from "@/lib/services/profile";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonCheckoutProfileProps } from "@/types/marathon";

export function MarathonCheckoutProfile({ onComplete }: MarathonCheckoutProfileProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const details = useI18nConstants(PROFILE_DETAILS);
  const rules = useI18nConstants(PROFILE_FORM_VALIDATION);
  const { t } = useT();
  const ui = MARATHON_PAGE;
  const form = MARATHON_CHECKOUT;
  const emailLogin = Boolean(useAuthStore((s) => s.user?.email?.trim()));
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [birth, setBirth] = useState("");
  const [birthFull, setBirthFull] = useState("");
  const [current, setCurrent] = useState("");
  const [currentFull, setCurrentFull] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!first.trim() || !last.trim() || !dob || !tob || !birthFull.trim() || !currentFull.trim()) {
      setError(rules.fillAllRequired);
      return;
    }
    if (!verified) {
      setError(t(emailLogin
        ? "For security reasons, kindly verify your existing phone number"
        : "Please verify your Email"));
      return;
    }
    await updateProfile({
      firstName: first.trim(),
      lastName: last.trim(),
      dateOfBirth: dob,
      timeOfBirth: tob,
      placeOfBirth: birthFull.trim(),
      preferredLocation: currentFull.trim(),
    });
    onComplete();
  }

  return (
    <>
      <p className={form.stepTitle}>{copy.profileTitle}</p>
      <p className={form.hint}>{copy.profileHint}</p>
      {error ? <p className={ui.bookError}>{error}</p> : null}
      <div className={form.pair}>
        <label className={form.fieldStack}>
          <span className={form.label}>{copy.firstName}</span>
          <Input className={form.field} value={first} onChange={(e) => setFirst(e.target.value)} />
        </label>
        <label className={form.fieldStack}>
          <span className={form.label}>{copy.lastName}</span>
          <Input className={form.field} value={last} onChange={(e) => setLast(e.target.value)} />
        </label>
        <label className={form.fieldStack}>
          <span className={form.label}>{copy.dateOfBirth}</span>
          <Input className={form.field} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <label className={form.fieldStack}>
          <span className={form.label}>{copy.timeOfBirth}</span>
          <Input className={form.field} type="time" value={tob} onChange={(e) => setTob(e.target.value)} />
        </label>
        <ProfileLocationField
          label={copy.placeOfBirth}
          value={birth}
          fullLocation={birthFull}
          isEditable
          placeholder=""
          labelClassName={form.label}
          inputClassName={form.locationField}
          onChange={(city, full) => {
            setBirth(city);
            setBirthFull(full);
          }}
        />
        <ProfileLocationField
          label={details.currentLocation}
          value={current}
          fullLocation={currentFull}
          isEditable
          placeholder=""
          labelClassName={form.label}
          inputClassName={form.locationField}
          onChange={(city, full) => {
            setCurrent(city);
            setCurrentFull(full);
          }}
        />
        <MarathonCheckoutContact mode={emailLogin ? "mobile" : "email"} onVerified={() => setVerified(true)} />
      </div>
      <Button type="button" className={form.action} onClick={() => void save()}>{copy.continue}</Button>
    </>
  );
}
