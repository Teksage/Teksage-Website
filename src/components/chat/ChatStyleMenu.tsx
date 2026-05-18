"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CHAT_PREFERENCE_ASSETS,
  CHAT_PREFERENCES,
  type ChatStyleFormat,
} from "@/lib/constants/chat-preferences";
import { cn } from "@/lib/utils";
import type { ChatStyleMenuProps } from "@/types/ui/chat";

type MenuPosition = { left: number; bottom: number };

function readMenuPosition(anchor: HTMLButtonElement): MenuPosition {
  const rect = anchor.getBoundingClientRect();
  return {
    left: rect.left,
    bottom: window.innerHeight - rect.top + 8,
  };
}

/** Flutter `showStyleModal` — portaled so parent overflow does not clip the menu. */
export function ChatStyleMenu({
  open,
  anchorRef,
  selectedFormat,
  onSelect,
  onClose,
}: ChatStyleMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<MenuPosition | null>(null);

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
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || anchorRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open, anchorRef, onClose]);

  if (!open || !position || typeof document === "undefined") return null;

  const items: { format: ChatStyleFormat; label: string; icon: string }[] = [
    {
      format: "long",
      label: CHAT_PREFERENCES.styleLongLabel,
      icon: CHAT_PREFERENCE_ASSETS.styleExplain,
    },
    {
      format: "short",
      label: CHAT_PREFERENCES.styleShortLabel,
      icon: CHAT_PREFERENCE_ASSETS.styleConcise,
    },
  ];

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      className="fixed z-[100] min-w-[11rem] rounded-md bg-white py-3 shadow-[0_4px_23px_rgba(0,0,0,0.17)]"
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
            className="flex w-full items-center gap-2.5 px-5 py-2 text-left"
          >
            <img src={item.icon} alt="" className="size-[1.125rem] shrink-0" />
            <span
              className={cn(
                "flex-1 text-base font-medium",
                isSelected ? "text-[var(--color-brand-primary)]" : "text-black"
              )}
            >
              {item.label}
            </span>
            {isSelected ? (
              <img src={CHAT_PREFERENCE_ASSETS.selectCheck} alt="" className="size-5 shrink-0" />
            ) : null}
          </button>
        );
      })}
    </div>,
    document.body
  );
}
