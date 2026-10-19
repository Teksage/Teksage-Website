import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { cn } from "@/lib/utils";
import type { MarathonCheckoutStep, MarathonCheckoutStepperProps } from "@/types/marathon";

export function MarathonCheckoutStepper({ step, labels, onSelectStep }: MarathonCheckoutStepperProps) {
  const ui = MARATHON_CHECKOUT;
  const last = labels.length - 1;

  function canOpen(number: number): boolean {
    // From Pay, allow going back only to Birth details — never Login.
    return number === 2 && step === 3;
  }

  function select(number: number) {
    if (!canOpen(number) || !onSelectStep) return;
    onSelectStep(number as MarathonCheckoutStep);
  }

  return (
    <div className={ui.stepper}>
      <div className={ui.track}>
        {labels.map((label, index) => {
          const number = index + 1;
          const done = number < step;
          const active = number === step;
          const clickable = canOpen(number);
          const left = index === 0 ? ui.lineHidden : step > index ? ui.lineOn : ui.lineOff;
          const right = index === last ? ui.lineHidden : step > index + 1 ? ui.lineOn : ui.lineOff;
          return (
            <button
              key={label.title}
              type="button"
              disabled={!clickable}
              className={cn(ui.step, clickable && ui.stepClickable)}
              onClick={() => select(number)}
              aria-current={active ? "step" : undefined}
            >
              <div className={ui.bubbleRow}>
                <span className={cn(ui.line, left)} />
                <span className={cn(ui.bubble, active || done ? ui.bubbleOn : ui.bubbleOff)}>
                  {done ? "✓" : number}
                </span>
                <span className={cn(ui.line, right)} />
              </div>
              <span className={active || done ? ui.titleOn : ui.titleOff}>{label.title}</span>
              <span className={ui.caption}>{label.caption}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
