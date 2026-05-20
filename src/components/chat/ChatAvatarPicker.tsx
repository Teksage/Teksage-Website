"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_AVATAR_OPTIONS, CHAT_PREFERENCES } from "@/lib/constants/chat-preferences";
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
  const label = chooseLabel ?? CP.avatarSheetChooseLabel;
  const active = avatars[selectedIndex] ?? avatars[0];

  return (
    <div className="w-full px-5">
      <div className="relative mx-auto max-w-md">
        <div className="relative pt-10">
          <img
            src={active.image}
            alt=""
            className="absolute left-1/2 top-0 z-10 size-[5.5rem] -translate-x-1/2 rounded-full bg-white shadow-md"
          />
          <div className="rounded-[1.25rem] border border-black/20 bg-white px-6 pb-6 pt-16 text-center shadow-sm">
            <p className="text-xl font-bold text-black/70">{active.title}</p>
            <p className="mt-2.5 text-base italic leading-snug text-black/50">{active.description}</p>
          </div>
        </div>

        <p className="mt-8 text-center text-base font-medium text-black/60">{label}</p>
        <div className="mt-3 flex justify-center gap-3.5">
          {avatars.map((avatar, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={avatar.storageTitle}
                type="button"
                onClick={() => onSelectIndex(index)}
                className="flex flex-col items-center"
                aria-pressed={isSelected}
                aria-label={avatar.title}
              >
                <span
                  className={cn(
                    "flex size-[3.125rem] items-center justify-center rounded-2xl border-2 p-0.5",
                    isSelected
                      ? "border-[var(--color-brand-primary)]"
                      : "border-black/15"
                  )}
                >
                  <img
                    src={avatar.image}
                    alt=""
                    className={cn(
                      "size-full rounded-[0.875rem] object-cover",
                      !isSelected && "grayscale"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "mt-1 h-0.5 rounded-full bg-[var(--color-brand-primary)] transition-all",
                    isSelected ? "w-4" : "w-0"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
