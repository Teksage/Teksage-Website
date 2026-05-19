"use client";

import Image from "next/image";
import { CONSULTATION_CATEGORIES, CONSULTATION_LAYOUT } from "@/lib/constants";
import { toggleCategorySelection } from "@/lib/consultation-categories";
import { cn } from "@/lib/utils";
import type { ConsultationCategoryChipsProps } from "@/types/ui/consultation";

export function ConsultationCategoryChips({
  selected,
  onChange,
}: ConsultationCategoryChipsProps) {
  return (
    <div className={CONSULTATION_LAYOUT.chipWrap}>
      {CONSULTATION_CATEGORIES.map((cat) => {
        const isOn = selected.includes(cat.id);
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(toggleCategorySelection(selected, cat.id))}
            className={cn(
              CONSULTATION_LAYOUT.chip,
              isOn && CONSULTATION_LAYOUT.chipSelected
            )}
          >
            <Image
              src={cat.image}
              alt=""
              width={18}
              height={18}
              unoptimized
              className={CONSULTATION_LAYOUT.chipIcon}
              aria-hidden
            />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
