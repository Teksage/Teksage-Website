"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { MATCH_MAKING_LAYOUT } from "@/lib/constants/match-making-layout";
import type { MatchMakingPartnerSectionProps } from "@/types/match-making-ui";

export function MatchMakingPartnerSection({
  variant,
  name,
  onNameChange,
  dateOfBirth,
  onDateOfBirthChange,
  timeOfBirth,
  onTimeOfBirthChange,
  placeOfBirth,
  birthLocationFull,
  onPlaceOfBirthChange,
}: MatchMakingPartnerSectionProps) {
  const MM = useI18nConstants(MATCH_MAKING_SCREEN);
  const isBoy = variant === "boy";
  const title = isBoy ? MM.boySection : MM.girlSection;
  const placeholder = isBoy ? MM.boyNamePlaceholder : MM.girlNamePlaceholder;

  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex h-12 items-center justify-center gap-2 rounded-t-xl bg-[var(--color-match-head)]">
        <Image
          src={isBoy ? MATCH_MAKING_ASSETS.boy : MATCH_MAKING_ASSETS.girl}
          alt=""
          width={24}
          height={24}
          unoptimized
        />
        <p className="text-base font-semibold text-[var(--color-brand-black)]">
          {title}
        </p>
      </div>
      <div className="space-y-2 p-5">
        <span className={MATCH_MAKING_LAYOUT.formFieldLabel}>
          {MM.nameLabel}*
        </span>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={placeholder}
          className={MATCH_MAKING_LAYOUT.formFieldInput}
          required
        />
        <div className={MATCH_MAKING_LAYOUT.dobTobRow}>
          <div className={MATCH_MAKING_LAYOUT.dobTobField}>
            <span className={MATCH_MAKING_LAYOUT.formFieldLabel}>
              {MM.dateOfBirthLabel}*
            </span>
            <Input
              type="date"
              value={dateOfBirth}
              onChange={(e) => onDateOfBirthChange(e.target.value)}
              className={MATCH_MAKING_LAYOUT.formFieldInput}
              required
            />
          </div>
          <div className={MATCH_MAKING_LAYOUT.dobTobField}>
            <span className={MATCH_MAKING_LAYOUT.formFieldLabel}>
              {MM.timeOfBirthLabel}*
            </span>
            <Input
              type="time"
              value={timeOfBirth}
              onChange={(e) => onTimeOfBirthChange(e.target.value)}
              className={MATCH_MAKING_LAYOUT.formFieldInput}
              required
            />
          </div>
        </div>
        <span className={MATCH_MAKING_LAYOUT.formFieldLabel}>
          {MM.placeOfBirthLabel}*
        </span>
        <ProfileLocationField
          label={MM.placeOfBirthLabel}
          labelClassName={MATCH_MAKING_LAYOUT.locationFieldLabel}
          inputClassName={MATCH_MAKING_LAYOUT.locationFieldInput}
          value={placeOfBirth}
          fullLocation={birthLocationFull}
          isEditable
          placeholder={MM.placeOfBirthPlaceholder}
          onChange={onPlaceOfBirthChange}
        />
      </div>
    </section>
  );
}
