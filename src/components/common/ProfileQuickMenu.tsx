"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18nConstants } from "@/hooks/useT";
import { CHAT_LANDING_UI } from "@/lib/constants/chat-landing-ui";
import {
  PROFILE_QUICK_MENU_LINKS,
  PROFILE_QUICK_MENU_SETTINGS,
  PROFILE_QUICK_MENU_UI as UI,
} from "@/lib/constants/profile-quick-menu-ui";
import { cn } from "@/lib/utils";
import type { ProfileQuickMenuProps } from "@/types/ui/profile-quick-menu";

export function ProfileQuickMenu({
  userInitials,
  userName,
  className,
}: ProfileQuickMenuProps) {
  const copy = useI18nConstants(CHAT_LANDING_UI);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={UI.trigger}
        aria-label={copy.profileMenuProfile}
        aria-expanded={open}
      >
        {userInitials}
      </button>
      {open ? (
        <div className={UI.panel} role="menu">
          <div className={UI.header}>
            <span className={UI.headerAvatar} aria-hidden>
              {userInitials}
            </span>
            <div className={UI.headerText}>
              <p className={UI.headerName}>{userName || copy.profileMenuProfile}</p>
              <p className={UI.headerHint}>{copy.profileMenuHeaderHint}</p>
            </div>
          </div>

          <div className={UI.list}>
            {PROFILE_QUICK_MENU_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={UI.item}
                onClick={() => setOpen(false)}
              >
                <span className={UI.itemIconWrap}>
                  <Image
                    src={item.icon}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className={UI.itemIcon}
                  />
                </span>
                <span className={UI.itemLabel}>{copy[item.labelKey]}</span>
              </Link>
            ))}

            <div className={UI.divider} role="separator" />

            <Link
              href={PROFILE_QUICK_MENU_SETTINGS.href}
              role="menuitem"
              className={UI.settingsItem}
              onClick={() => setOpen(false)}
            >
              <span className={UI.itemIconWrap}>
                <Image
                  src={PROFILE_QUICK_MENU_SETTINGS.icon}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  className={UI.itemIcon}
                />
              </span>
              <span className={UI.settingsLabel}>
                {copy[PROFILE_QUICK_MENU_SETTINGS.labelKey]}
              </span>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
