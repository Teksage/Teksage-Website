"use client";

import { useI18nConstants } from "@/hooks/useT";
import type { ReactNode } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import type { RashiOption } from "@/types/match-making";

function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="mb-1 block text-xs font-semibold text-neutral-700">{children}</span>;
}

const selectClass =
  "mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800";

export function MatchMakingPartnerSection({
  variant,
  name,
  onNameChange,
  rashi,
  onRashiChange,
  nakshatra,
  onNakshatraChange,
  rashiList,
  nakshatraList,
}: {
  variant: "boy" | "girl";
  name: string;
  onNameChange: (v: string) => void;
  rashi: string;
  onRashiChange: (v: string) => void;
  nakshatra: string;
  onNakshatraChange: (v: string) => void;
  rashiList: RashiOption[];
  nakshatraList: { id: number; name: string }[];
}) {
  const MM = useI18nConstants(MATCH_MAKING_SCREEN);
  const isBoy = variant === "boy";
  const title = isBoy ? MM.boySection : MM.girlSection;
  const placeholder = isBoy
    ? MM.boyNamePlaceholder
    : MM.girlNamePlaceholder;

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
        <p className="text-base font-semibold text-[var(--color-brand-black)]">{title}</p>
      </div>
      <div className="space-y-2 p-5">
        <FieldLabel>{MM.nameLabel}*</FieldLabel>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-xl border-neutral-200"
          required
        />
        <FieldLabel>{MM.rashiFormLabel}*</FieldLabel>
        <select className={selectClass} required value={rashi} onChange={(e) => onRashiChange(e.target.value)}>
          <option value="">{MM.selectPlaceholder}</option>
          {rashiList.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <FieldLabel>{MM.nakshatraFormLabel}*</FieldLabel>
        <select
          className={selectClass}
          required
          value={nakshatra}
          onChange={(e) => onNakshatraChange(e.target.value)}
        >
          <option value="">{MM.selectPlaceholder}</option>
          {nakshatraList.map((n) => (
            <option key={n.id} value={n.name}>
              {n.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
