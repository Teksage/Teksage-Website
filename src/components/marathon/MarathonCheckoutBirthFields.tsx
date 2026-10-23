"use client";

import { Input } from "@/components/ui/input";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import { useI18nConstants } from "@/hooks/useT";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { MARATHON_FLOW_COPY } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { cn } from "@/lib/utils";
import type { MarathonCheckoutBirthFieldsProps } from "@/types/marathon";

export function MarathonCheckoutBirthFields({
  draft,
  onChange,
  className,
}: MarathonCheckoutBirthFieldsProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const flow = useI18nConstants(MARATHON_FLOW_COPY);
  const details = useI18nConstants(PROFILE_DETAILS);
  const form = MARATHON_CHECKOUT;
  const set = (patch: Partial<typeof draft>) => onChange({ ...draft, ...patch });

  return (
    <div className={cn("contents", className)}>
      <label className={form.fieldStack}>
        <span className={form.label}>{copy.firstName}</span>
        <Input className={form.field} value={draft.first} onChange={(e) => set({ first: e.target.value })} />
      </label>
      <label className={form.fieldStack}>
        <span className={form.label}>{copy.lastName}</span>
        <Input className={form.field} value={draft.last} onChange={(e) => set({ last: e.target.value })} />
      </label>
      <label className={form.fieldStack}>
        <span className={form.label}>{copy.dateOfBirth}</span>
        <Input className={form.field} type="date" value={draft.dob} onChange={(e) => set({ dob: e.target.value })} />
      </label>
      <label className={form.fieldStack}>
        <span className={form.label}>{copy.timeOfBirth}</span>
        <Input className={form.field} type="time" value={draft.tob} onChange={(e) => set({ tob: e.target.value })} />
      </label>
      <ProfileLocationField
        label={copy.placeOfBirth}
        value={draft.birth}
        fullLocation={draft.birthFull}
        isEditable
        placeholder={flow.birthCity}
        labelClassName={form.label}
        inputClassName={form.locationField}
        onChange={(city, full) => set({ birth: city, birthFull: full })}
      />
      <ProfileLocationField
        label={details.currentLocation}
        value={draft.current}
        fullLocation={draft.currentFull}
        isEditable
        placeholder={flow.liveCity}
        labelClassName={form.label}
        inputClassName={form.locationField}
        onChange={(city, full) => set({ current: city, currentFull: full })}
      />
    </div>
  );
}
