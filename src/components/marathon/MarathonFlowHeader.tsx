"use client";

import { MarathonCheckoutStepper } from "@/components/marathon/MarathonCheckoutStepper";
import { useT } from "@/hooks/useT";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import type { MarathonCheckoutStep, MarathonCheckoutStepLabel } from "@/types/marathon";

export function MarathonFlowHeader({
  title,
  step,
  labels,
  onBack,
  onSelectStep,
}: {
  title: string;
  step: MarathonCheckoutStep;
  labels: MarathonCheckoutStepLabel[];
  onBack: () => void;
  onSelectStep?: (step: MarathonCheckoutStep) => void;
}) {
  const { t } = useT();
  const ui = MARATHON_FLOW_UI;

  return (
    <div className={ui.bar}>
      <div className={ui.titleRow}>
        <button type="button" className={ui.back} onClick={onBack} aria-label={t("Go back")}>
          <svg viewBox="0 0 24 24" className={ui.backIcon} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className={ui.title}>{title}</h1>
      </div>
      {labels.length > 0 ? (
        <MarathonCheckoutStepper step={step} labels={labels} onSelectStep={onSelectStep} />
      ) : null}
    </div>
  );
}
