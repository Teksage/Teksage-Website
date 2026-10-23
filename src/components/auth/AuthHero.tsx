"use client";

import { BrandLoginLogo } from "@/components/common/BrandLoginLogo";
import { useI18nConstants } from "@/hooks/useT";
import { AUTH_HERO } from "@/lib/constants";
import type { AuthHeroProps } from "@/types";

export function AuthHero({ onBack }: AuthHeroProps) {
  const H = useI18nConstants(AUTH_HERO);

  return (
    <aside className={AUTH_HERO.asideClassName}>
      <div className={AUTH_HERO.contentClassName}>
        <div>
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className={AUTH_HERO.backButtonClassName}
              aria-label={H.backAria}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M19 12H5M5 12l7 7M5 12l7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
          <BrandLoginLogo
            widthPx={AUTH_HERO.logoWidthPx}
            className={AUTH_HERO.logoClassName}
          />
        </div>

        <div className={AUTH_HERO.bodyClassName}>
          <div className={AUTH_HERO.copyBlockClassName}>
            <p className={AUTH_HERO.eyebrowClassName}>{H.eyebrow}</p>
            <h1 className={AUTH_HERO.titleClassName}>{H.title}</h1>
            <p className={AUTH_HERO.descriptionClassName}>{H.description}</p>
          </div>

          <ul className={AUTH_HERO.listClassName}>
            {H.highlights.map((item, i) => (
              <li key={item.title} className={AUTH_HERO.chipClassName}>
                <span className={AUTH_HERO.chipIndexClassName}>{i + 1}</span>
                <div>
                  <p className={AUTH_HERO.chipTitleClassName}>{item.title}</p>
                  <p className={AUTH_HERO.chipDetailClassName}>{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
