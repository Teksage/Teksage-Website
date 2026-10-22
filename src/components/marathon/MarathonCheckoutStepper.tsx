import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { cn } from "@/lib/utils";
import type { MarathonCheckoutStep, MarathonCheckoutStepperProps } from "@/types/marathon";

function Check() {
  return (
    <svg viewBox="0 0 24 24" className={MARATHON_FLOW_UI.check} fill="none" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MarathonCheckoutStepper({ step, labels, onSelectStep }: MarathonCheckoutStepperProps) {
  const ui = MARATHON_FLOW_UI;

  function canOpen(number: number): boolean {
    return number === 2 && step === 3;
  }

  function select(number: number) {
    if (!canOpen(number) || !onSelectStep) return;
    onSelectStep(number as MarathonCheckoutStep);
  }

  return (
    <div className={ui.stepper}>
      {labels.map((label, index) => {
        const number = index + 1;
        const done = number < step;
        const active = number === step;
        const clickable = canOpen(number);
        return (
          <button
            key={label.title}
            type="button"
            disabled={!clickable}
            className={cn(ui.step, clickable && ui.stepOn)}
            onClick={() => select(number)}
            aria-current={active ? "step" : undefined}
          >
            {done ? <Check /> : (
              <span className={cn(ui.bubble, active ? ui.bubbleOn : ui.bubbleOff)}>{number}</span>
            )}
            <span className={done ? ui.stepLabelDone : active ? ui.stepLabelOn : ui.stepLabelOff}>
              {label.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
