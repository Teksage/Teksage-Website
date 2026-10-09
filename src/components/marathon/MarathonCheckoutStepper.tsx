import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { cn } from "@/lib/utils";
import type { MarathonCheckoutStepperProps } from "@/types/marathon";

export function MarathonCheckoutStepper({ step, labels }: MarathonCheckoutStepperProps) {
  const ui = MARATHON_CHECKOUT;
  const last = labels.length - 1;
  return (
    <div className={ui.stepper}>
      <div className={ui.track}>
        {labels.map((label, index) => {
          const number = index + 1;
          const done = number < step;
          const active = number === step;
          const left = index === 0 ? ui.lineHidden : step > index ? ui.lineOn : ui.lineOff;
          const right = index === last ? ui.lineHidden : step > index + 1 ? ui.lineOn : ui.lineOff;
          return (
            <div key={label.title} className={ui.step}>
              <div className={ui.bubbleRow}>
                <span className={cn(ui.line, left)} />
                <span className={cn(ui.bubble, active || done ? ui.bubbleOn : ui.bubbleOff)}>
                  {done ? "✓" : number}
                </span>
                <span className={cn(ui.line, right)} />
              </div>
              <span className={active || done ? ui.titleOn : ui.titleOff}>{label.title}</span>
              <span className={ui.caption}>{label.caption}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
