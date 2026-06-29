"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18nConstants } from "@/hooks/useT";
import { AppHeader } from "@/components/common/AppHeader";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { SubscribePromptDialog } from "@/components/common/SubscribePromptDialog";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { DASHBOARD_ASSETS } from "@/lib/constants/assets";
import {
  PREDICTION_PREMIUM_GATE,
  PREDICTION_PREMIUM_GATE_UI,
} from "@/lib/constants/prediction-premium-gate";
import type { PredictionPremiumGateProps } from "@/types/ui/prediction-premium-gate";

export function PredictionPremiumGate({ children, onBack }: PredictionPremiumGateProps) {
  const PG = useI18nConstants(PREDICTION_PREMIUM_GATE);
  const { hasPremiumAccess, loading, planStatus } = usePremiumAccess();
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const isExpired = planStatus.trim().toLowerCase() === "expired";

  if (loading) {
    return (
      <div className={PREDICTION_PREMIUM_GATE_UI.root}>
        <LoadingOverlay open />
      </div>
    );
  }

  if (!hasPremiumAccess) {
    return (
      <div className={PREDICTION_PREMIUM_GATE_UI.root}>
        <AppHeader
          title={isExpired ? PG.expiredTitle : PG.title}
          showBack
          onBackClick={onBack}
        />
        <div className={PREDICTION_PREMIUM_GATE_UI.body}>
          <Image
            src={DASHBOARD_ASSETS.sidebarPremiumCrown}
            alt=""
            width={40}
            height={40}
            unoptimized
            className={PREDICTION_PREMIUM_GATE_UI.crown}
          />
          <h2 className={PREDICTION_PREMIUM_GATE_UI.title}>
            {isExpired ? PG.expiredTitle : PG.title}
          </h2>
          <p className={PREDICTION_PREMIUM_GATE_UI.description}>{PG.description}</p>
          <button
            type="button"
            className={PREDICTION_PREMIUM_GATE_UI.cta}
            onClick={() => setSubscribeOpen(true)}
          >
            {PG.upgradeCta}
          </button>
        </div>
        <SubscribePromptDialog
          open={subscribeOpen}
          onClose={() => setSubscribeOpen(false)}
          planStatus={isExpired ? "expired" : "default"}
        />
      </div>
    );
  }

  return <>{children}</>;
}
