"use client";

import { useI18nConstants } from "@/hooks/useT";
import { PROFILE_DETAILS, PROFILE_LAYOUT as L } from "@/lib/constants/profile-details";
import { userInitialsFromProfile } from "@/lib/chat-helpers";
import type { UserProfile } from "@/types";

export function ProfileDetailsHero({ user }: { user: UserProfile }) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const name =
    user.name?.trim() ||
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    PD.title;
  const initials = userInitialsFromProfile(
    user.firstName,
    user.lastName,
    user.name
  );
  const contact = user.email?.trim() || user.mobile?.trim() || PD.heroHint;

  return (
    <div className={L.heroCard}>
      <div className={L.heroInner}>
        <div className={L.heroGlow} aria-hidden />
        <span className={L.heroAvatar} aria-hidden>
          {initials}
        </span>
        <div className={L.heroText}>
          <p className={L.heroName}>{name}</p>
          <p className={L.heroHint}>{contact}</p>
          {user.rashi || user.nakshatra ? (
            <div className={L.heroMeta}>
              {user.rashi ? (
                <span className={L.heroPill}>
                  {PD.rasi}: {user.rashi}
                </span>
              ) : null}
              {user.nakshatra ? (
                <span className={L.heroPill}>
                  {PD.nakshatram}: {user.nakshatra}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
