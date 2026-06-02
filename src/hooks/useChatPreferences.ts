"use client";

import { useCallback, useEffect, useState } from "react";
import {
  avatarIndexToStorage,
  findAvatarIndexByStorage,
} from "@/lib/chat-preference-helpers";
import {
  getStoredChatAvatar,
  getStoredChatStyle,
  saveChatAvatar,
  saveChatStyle,
} from "@/lib/chat-preference-storage";
import type { ChatStyleFormat } from "@/lib/constants/chat-preferences";
import type { ChatOnboardingStep } from "@/types/chat-preferences";

function resolveOnboardingStep(
  style: ChatStyleFormat | null,
  avatar: string | null
): ChatOnboardingStep {
  if (!style) return "style";
  if (!avatar) return "avatar";
  return null;
}

export function useChatPreferences() {
  const [hydrated, setHydrated] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<ChatOnboardingStep>(null);
  const [styleFormat, setStyleFormat] = useState<ChatStyleFormat>("long");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [styleMenuOpen, setStyleMenuOpen] = useState(false);
  const [avatarSheetOpen, setAvatarSheetOpen] = useState(false);

  useEffect(() => {
    const style = getStoredChatStyle();
    const avatar = getStoredChatAvatar();
    if (style) setStyleFormat(style);
    if (avatar) setAvatarIndex(findAvatarIndexByStorage(avatar));
    setOnboardingStep(resolveOnboardingStep(style, avatar));
    setHydrated(true);
  }, []);

  const chatUnlocked = hydrated && onboardingStep === null;

  const completeStyleOnboarding = useCallback((format: ChatStyleFormat) => {
    saveChatStyle(format);
    setStyleFormat(format);
    const avatar = getStoredChatAvatar();
    setOnboardingStep(avatar ? null : "avatar");
  }, []);

  const completeAvatarOnboarding = useCallback((index: number) => {
    const storage = avatarIndexToStorage(index);
    saveChatAvatar(storage);
    setAvatarIndex(index);
    setOnboardingStep(null);
  }, []);

  const selectStyle = useCallback((format: ChatStyleFormat) => {
    saveChatStyle(format);
    setStyleFormat(format);
    setStyleMenuOpen(false);
  }, []);

  const selectAvatar = useCallback((index: number) => {
    saveChatAvatar(avatarIndexToStorage(index));
    setAvatarIndex(index);
    setAvatarSheetOpen(false);
  }, []);

  const backToStyleOnboarding = useCallback(() => {
    setOnboardingStep("style");
  }, []);

  return {
    hydrated,
    onboardingStep,
    chatUnlocked,
    styleFormat,
    avatarIndex,
    styleMenuOpen,
    setStyleMenuOpen,
    avatarSheetOpen,
    setAvatarSheetOpen,
    completeStyleOnboarding,
    completeAvatarOnboarding,
    selectStyle,
    selectAvatar,
    backToStyleOnboarding,
    setAvatarIndex,
  };
}
