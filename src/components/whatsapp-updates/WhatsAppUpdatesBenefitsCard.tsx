"use client";

import { WhatsAppUpdatesBenefitIcon } from "@/components/whatsapp-updates/WhatsAppUpdatesBenefitIcon";
import { WHATSAPP_UPDATES_ASSETS } from "@/lib/constants/assets";
import { useI18nConstants } from "@/hooks/useT";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    titleKey: "benefitTransitTitle",
    descKey: "benefitTransitDesc",
    icon: WHATSAPP_UPDATES_ASSETS.benefitTransit,
  },
  {
    titleKey: "benefitFavorableTitle",
    descKey: "benefitFavorableDesc",
    icon: WHATSAPP_UPDATES_ASSETS.benefitFavorable,
  },
  {
    titleKey: "benefitHoroscopeTitle",
    descKey: "benefitHoroscopeDesc",
    icon: WHATSAPP_UPDATES_ASSETS.benefitHoroscope,
  },
  {
    titleKey: "benefitAlertsTitle",
    descKey: "benefitAlertsDesc",
    icon: WHATSAPP_UPDATES_ASSETS.benefitAlerts,
  },
] as const;

export function WhatsAppUpdatesBenefitsCard({ className }: { className?: string }) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);

  return (
    <section className={cn(WHATSAPP_UPDATES_UI.card, className)}>
      <h2 className={cn(WHATSAPP_UPDATES_UI.benefitsSectionTitle, "mb-3")}>
        {WU.benefitsTitle}
      </h2>
      <ul className="divide-y divide-black/5">
        {BENEFITS.map((item) => (
          <li key={item.titleKey} className={WHATSAPP_UPDATES_UI.benefitRow}>
            <WhatsAppUpdatesBenefitIcon src={item.icon} />
            <div>
              <p className={WHATSAPP_UPDATES_UI.benefitTitle}>
                {WU[item.titleKey as keyof typeof WU]}
              </p>
              <p className={WHATSAPP_UPDATES_UI.benefitDesc}>
                {WU[item.descKey as keyof typeof WU]}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
