"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CHAT_PREFERENCE_ASSETS,
  CHAT_PREFERENCES,
  type ChatStyleFormat,
} from "@/lib/constants/chat-preferences";
import { CHAT_OVERLAY_UI } from "@/lib/constants/chat-overlay-ui";
import { cn } from "@/lib/utils";
import type { ChatStyleMenuProps } from "@/types/ui/chat";

type MenuPosition = { left: number; bottom: number };

function readMenuPosition(anchor: HTMLButtonElement): MenuPosition {
  const rect = anchor.getBoundingClientRect();
  const menuWidth = 176;
  const left = Math.min(
    Math.max(12, rect.left),
    window.innerWidth - menuWidth - 12
  );
  return {
    left,
    bottom: Math.max(12, window.innerHeight - rect.top + 8),
  };
}

/** Flutter `showStyleModal` — portaled overlay so chat overflow cannot clip it. */
export function ChatStyleMenu({
  open,
  anchorRef,
  selectedFormat,
  onSelect,
  onClose,
}: ChatStyleMenuProps) {
  const CP = useI18nConstants(CHAT_PREFERENCES);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !anchorRef.current) {
      setPosition(null);
      return;
    }
    const update = () => {
      if (anchorRef.current) setPosition(readMenuPosition(anchorRef.current));
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, anchorRef]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || !position || !mounted) return null;

  const items: { format: ChatStyleFormat; label: string; icon: string }[] = [
    {
      format: "long",
      label: CP.styleLongLabel,
      icon: CHAT_PREFERENCE_ASSETS.styleExplain,
    },
    {
      format: "short",
      label: CP.styleShortLabel,
      icon: CHAT_PREFERENCE_ASSETS.styleConcise,
    },
  ];

  return createPortal(
    <div className={CHAT_OVERLAY_UI.root} role="presentation">
      <button
        type="button"
        className={CHAT_OVERLAY_UI.backdrop}
        aria-label="Close style menu"
        onClick={onClose}
      />
      <div
        ref={menuRef}
        role="menu"
        className={CHAT_OVERLAY_UI.styleMenu}
        style={{ left: position.left, bottom: position.bottom }}
      >
        {items.map((item) => {
          const isSelected = item.format === selectedFormat;
          return (
            <button
              key={item.format}
              type="button"
              role="menuitem"
              onClick={() => onSelect(item.format)}
              className={CHAT_OVERLAY_UI.styleMenuItem}
            >
              <img
                src={item.icon}
                alt=""
                className={CHAT_OVERLAY_UI.styleMenuIcon}
              />
              <span
                className={cn(
                  CHAT_OVERLAY_UI.styleMenuLabel,
                  isSelected
                    ? CHAT_OVERLAY_UI.styleMenuLabelActive
                    : CHAT_OVERLAY_UI.styleMenuLabelIdle
                )}
              >
                {item.label}
              </span>
              {isSelected ? (
                <img
                  src={CHAT_PREFERENCE_ASSETS.selectCheck}
                  alt=""
                  className={CHAT_OVERLAY_UI.styleMenuCheck}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>,
    document.body
  );
}
