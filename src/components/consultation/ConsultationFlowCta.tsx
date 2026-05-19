"use client";

import { CONSULTATION_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ConsultationFlowCtaProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function ConsultationFlowCta({
  label,
  active,
  onClick,
}: ConsultationFlowCtaProps) {
  return (
    <button
      type="button"
      disabled={!active}
      onClick={onClick}
      className={cn(
        CONSULTATION_LAYOUT.flowCta,
        active ? CONSULTATION_LAYOUT.flowCtaActive : CONSULTATION_LAYOUT.flowCtaInactive
      )}
    >
      {label}
    </button>
  );
}
