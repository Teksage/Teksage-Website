import type { ChatStyleFormat } from "@/lib/constants/chat-preferences";

export type ChatOnboardingStep = "style" | "avatar" | null;

export interface ChatPreferencesState {
  hydrated: boolean;
  onboardingStep: ChatOnboardingStep;
  chatUnlocked: boolean;
  styleFormat: ChatStyleFormat;
  avatarIndex: number;
  styleMenuOpen: boolean;
  avatarSheetOpen: boolean;
}
