"use client";

import { useEffect, useState } from "react";
import { ChatAvatarPicker } from "@/components/chat/ChatAvatarPicker";
import {
  CHAT_AVATAR_OPTIONS,
  CHAT_PREFERENCE_ASSETS,
} from "@/lib/constants/chat-preferences";
import { cn } from "@/lib/utils";
import type { ChatAvatarSheetProps } from "@/types/ui/chat";

export function ChatAvatarSheet({
  open,
  initialIndex,
  onClose,
  onConfirm,
}: ChatAvatarSheetProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setSelectedIndex(initialIndex);
  }, [open, initialIndex]);

  const dismiss = () => {
    onConfirm(selectedIndex);
    onClose();
  };

  if (!open) return null;

  const gradientClass =
    CHAT_AVATAR_OPTIONS[selectedIndex]?.sheetClass ?? CHAT_AVATAR_OPTIONS[0].sheetClass;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close avatar picker"
        onClick={dismiss}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-t-[3.125rem] pb-6 pt-3",
          gradientClass
        )}
      >
        <img
          src={CHAT_PREFERENCE_ASSETS.sheetDecoration}
          alt=""
          className="pointer-events-none absolute left-0 top-0 w-24 opacity-80"
          aria-hidden
        />
        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/30" />
        <ChatAvatarPicker selectedIndex={selectedIndex} onSelectIndex={setSelectedIndex} />
      </div>
    </div>
  );
}
