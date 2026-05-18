"use client";

import { useRef, type RefObject } from "react";
import { ChatAvatarSheet } from "@/components/chat/ChatAvatarSheet";
import { ChatStyleMenu } from "@/components/chat/ChatStyleMenu";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import {
  avatarIndexToTitle,
  styleFormatToIcon,
  styleFormatToLabel,
} from "@/lib/chat-preference-helpers";
import { CHAT_AVATAR_OPTIONS } from "@/lib/constants/chat-preferences";
import type { ChatPreferenceBarProps } from "@/types/ui/chat";

function PreferenceChip({
  iconSrc,
  label,
  onClick,
  chipRef,
}: {
  iconSrc: string;
  label: string;
  onClick: () => void;
  chipRef?: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={chipRef}
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2 py-1 text-base font-medium text-black/60"
    >
      <img src={iconSrc} alt="" className="size-[1.125rem] shrink-0" />
      <span>{label}</span>
      <img src={CHAT_ASSETS.chevron} alt="" className="size-3 -rotate-90 opacity-60" />
    </button>
  );
}

/** Flutter `chatField.dart` style + avatar chips with menus. */
export function ChatPreferenceBar({
  styleFormat,
  avatarIndex,
  styleMenuOpen,
  avatarSheetOpen,
  onStyleChipPress,
  onAvatarChipPress,
  onStyleMenuClose,
  onSelectStyle,
  onAvatarSheetClose,
  onSelectAvatar,
}: ChatPreferenceBarProps) {
  const styleChipRef = useRef<HTMLButtonElement>(null);
  const avatarIcon =
    CHAT_AVATAR_OPTIONS[avatarIndex]?.image ?? CHAT_ASSETS.avatarIcon;

  return (
    <>
      <div className="relative flex gap-1 overflow-x-auto overflow-y-visible px-1 pb-1 pt-2">
        <div className="relative">
          <PreferenceChip
            chipRef={styleChipRef}
            iconSrc={styleFormatToIcon(styleFormat)}
            label={styleFormatToLabel(styleFormat)}
            onClick={onStyleChipPress}
          />
          <ChatStyleMenu
            open={styleMenuOpen}
            anchorRef={styleChipRef}
            selectedFormat={styleFormat}
            onSelect={onSelectStyle}
            onClose={onStyleMenuClose}
          />
        </div>
        <PreferenceChip
          iconSrc={avatarIcon}
          label={avatarIndexToTitle(avatarIndex)}
          onClick={onAvatarChipPress}
        />
      </div>

      <ChatAvatarSheet
        open={avatarSheetOpen}
        initialIndex={avatarIndex}
        onClose={onAvatarSheetClose}
        onConfirm={onSelectAvatar}
      />
    </>
  );
}
