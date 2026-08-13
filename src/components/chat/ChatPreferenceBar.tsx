"use client";

import { useRef, type RefObject } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { ChatAvatarSheet } from "@/components/chat/ChatAvatarSheet";
import { ChatStyleMenu } from "@/components/chat/ChatStyleMenu";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import {
  avatarIndexToTitle,
  styleFormatToIcon,
  styleFormatToLabel,
} from "@/lib/chat-preference-helpers";
import { CHAT_AVATAR_OPTIONS } from "@/lib/constants/chat-preferences";
import { CHAT_LANDING_LAYOUT } from "@/lib/constants/chat-landing-ui";
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
      className={CHAT_LANDING_LAYOUT.preferenceChip}
    >
      <img
        src={iconSrc}
        alt=""
        className={CHAT_LANDING_LAYOUT.preferenceChipIcon}
      />
      <span className={CHAT_LANDING_LAYOUT.preferenceChipLabel}>{label}</span>
      <img
        src={CHAT_ASSETS.chevron}
        alt=""
        className={CHAT_LANDING_LAYOUT.preferenceChipChevron}
        aria-hidden
      />
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
  const { t } = useAppLanguage();
  const styleChipRef = useRef<HTMLButtonElement>(null);
  const avatarIcon =
    CHAT_AVATAR_OPTIONS[avatarIndex]?.image ?? CHAT_ASSETS.avatarIcon;

  return (
    <>
      <div className={CHAT_LANDING_LAYOUT.preferenceChipRow}>
        <div className="relative">
          <PreferenceChip
            chipRef={styleChipRef}
            iconSrc={styleFormatToIcon(styleFormat)}
            label={styleFormatToLabel(styleFormat, t)}
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
          label={avatarIndexToTitle(avatarIndex, t)}
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
