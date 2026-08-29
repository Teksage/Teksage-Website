"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChatAvatarPicker } from "@/components/chat/ChatAvatarPicker";
import {
  CHAT_AVATAR_OPTIONS,
  CHAT_PREFERENCE_ASSETS,
} from "@/lib/constants/chat-preferences";
import { CHAT_OVERLAY_UI } from "@/lib/constants/chat-overlay-ui";
import { cn } from "@/lib/utils";
import type { ChatAvatarSheetProps } from "@/types/ui/chat";

export function ChatAvatarSheet({
  open,
  initialIndex,
  onClose,
  onConfirm,
}: ChatAvatarSheetProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setSelectedIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const dismiss = () => {
    onConfirm(selectedIndex);
    onClose();
  };

  if (!open || !mounted) return null;

  const gradientClass =
    CHAT_AVATAR_OPTIONS[selectedIndex]?.sheetClass ??
    CHAT_AVATAR_OPTIONS[0].sheetClass;

  return createPortal(
    <div className={CHAT_OVERLAY_UI.root} role="dialog" aria-modal="true">
      <button
        type="button"
        className={CHAT_OVERLAY_UI.backdrop}
        aria-label="Close avatar picker"
        onClick={dismiss}
      />
      <div
        className={cn(CHAT_OVERLAY_UI.avatarSheet, gradientClass)}
      >
        <img
          src={CHAT_PREFERENCE_ASSETS.sheetDecoration}
          alt=""
          className={CHAT_OVERLAY_UI.avatarDecoration}
          aria-hidden
        />
        <div className={CHAT_OVERLAY_UI.avatarHandle} />
        <div className={CHAT_OVERLAY_UI.avatarBody}>
          <ChatAvatarPicker
            selectedIndex={selectedIndex}
            onSelectIndex={setSelectedIndex}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
