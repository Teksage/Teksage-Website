"use client";

import { MarathonCheckoutSignIn } from "@/components/marathon/MarathonCheckoutSignIn";
import { useI18nConstants } from "@/hooks/useT";
import { MARATHON_FLOW_COPY } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { cn } from "@/lib/utils";
import type { MarathonCheckoutSignInProps } from "@/types/marathon";

/** Login and what happens next, equal width once the row is wide enough. */
export function MarathonCheckoutLogin({ onComplete }: MarathonCheckoutSignInProps) {
  const ui = MARATHON_FLOW_UI;
  return (
    <div className={ui.loginSplit}>
      <div className={cn(ui.card, ui.loginCard)}><MarathonCheckoutSignIn onComplete={onComplete} /></div>
      <div className={cn(ui.loginFill, ui.loginCard)}><MarathonCheckoutNext /></div>
    </div>
  );
}

/** Three steps shown beside login and again on the payment review. */
export function MarathonCheckoutNext() {
  const flow = useI18nConstants(MARATHON_FLOW_COPY);
  const ui = MARATHON_FLOW_UI;
  const steps = [
    { title: flow.payConfirmed, hint: flow.payConfirmedHint },
    { title: flow.astrologerAssigned, hint: flow.astrologerAssignedHint },
    { title: flow.linkShared, hint: flow.linkSharedHint },
  ];

  return (
    <section className={cn(ui.card, ui.loginCard)}>
      <h2 className={ui.sectionTitle}>{flow.nextTitle}</h2>
      <div className={ui.nextList}>
        <span className={ui.nextRail} aria-hidden />
        {steps.map((item, index) => (
          <div key={item.title} className={ui.nextItem}>
            <span className={ui.nextNum}>{index + 1}</span>
            <div>
              <p className={ui.nextTitle}>{item.title}</p>
              <p className={ui.nextHint}>{item.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
