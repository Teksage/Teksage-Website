"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_AVATAR_OPTIONS, CHAT_PREFERENCES } from "@/lib/constants/chat-preferences";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";
import type { ChatAvatarPickerProps } from "@/types/ui/chat";

/** Shared avatar hero + row — Flutter `ChatAvatar` / `AvatarBottomSheet`. */
export function ChatAvatarPicker({
  selectedIndex,
  onSelectIndex,
  chooseLabel,
}: ChatAvatarPickerProps) {
  const CP = useI18nConstants(CHAT_PREFERENCES);
  const avatars = useI18nConstants(CHAT_AVATAR_OPTIONS);
  const ui = CHAT_LAYOUT;
  const label = chooseLabel ?? CP.avatarSheetChooseLabel;
  const active = avatars[selectedIndex] ?? avatars[0];

  return (
    <div className={ui.avatarWrap}>
      <img src={active.image} alt="" className={ui.avatarImage} />
      <div className={ui.avatarHero}>
        <p className={ui.avatarTitle}>{active.title}</p>
        <p className={ui.avatarHint}>{active.description}</p>
      </div>
      <p className={ui.avatarChoose}>{label}</p>
      <div className={ui.avatarRow}>
        {avatars.map((avatar, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={avatar.storageTitle}
              type="button"
              onClick={() => onSelectIndex(index)}
              className={cn(ui.avatarThumb, isSelected && ui.avatarThumbOn)}
              aria-pressed={isSelected}
              aria-label={avatar.title}
            >
              <img src={avatar.image} alt="" className={ui.avatarThumbImg} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
