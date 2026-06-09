import type { ReactNode, RefObject } from "react";
import type { ChatMessage } from "@/types/chat";
import type { ChatStyleFormat } from "@/lib/constants/chat-preferences";

export interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  placeholder: string;
  onMicPress?: () => void;
  isRecording?: boolean;
  isTranscribing?: boolean;
  recordingElapsedSec?: number;
  recordingAmplitudes?: number[];
  onCancelRecording?: () => void;
  onStopRecording?: () => void;
  micDisabled?: boolean;
  preferenceBar?: ReactNode;
  embedded?: boolean;
}

export interface ChatRecordingComposerProps {
  elapsedSec: number;
  amplitudes: number[];
  isTranscribing: boolean;
  onCancel: () => void;
  onStop: () => void;
  preferenceBar?: ReactNode;
  embedded?: boolean;
}

export interface ChatMessageListProps {
  messages: ChatMessage[];
  userInitials: string;
  onRetry: (messageId: string) => void;
  listEndRef: RefObject<HTMLDivElement | null>;
  showTyping: boolean;
}

export interface ChatRelatedQueriesProps {
  queries: string[];
  loading: boolean;
  visible: boolean;
  onSelect: (query: string) => void;
}

export interface ChatInitialBannerProps {
  visible: boolean;
}

export interface ChatAvatarPickerProps {
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  chooseLabel?: string;
}

export interface ChatStyleOptionCardProps {
  label: string;
  hint: string;
  selected: boolean;
  onSelect: () => void;
}

export interface ChatStyleOnboardingProps {
  embedded?: boolean;
  onContinue: (format: ChatStyleFormat) => void;
}

export interface ChatAvatarOnboardingProps {
  embedded?: boolean;
  initialIndex: number;
  onContinue: (index: number) => void;
  onBack: () => void;
}

export interface ChatStyleMenuProps {
  open: boolean;
  anchorRef: RefObject<HTMLButtonElement | null>;
  selectedFormat: ChatStyleFormat;
  onSelect: (format: ChatStyleFormat) => void;
  onClose: () => void;
}

export interface ChatAvatarSheetProps {
  open: boolean;
  initialIndex: number;
  onClose: () => void;
  onConfirm: (index: number) => void;
}

export interface ChatPageViewProps {
  /** Home dashboard right panel — hides full-page chrome. */
  embedded?: boolean;
  /** Replaces default `ChatEmbedHeader` when `embedded` (e.g. home timings + title). */
  embedHeader?: ReactNode;
}

export interface ChatPreferenceBarProps {
  styleFormat: ChatStyleFormat;
  avatarIndex: number;
  styleMenuOpen: boolean;
  avatarSheetOpen: boolean;
  onStyleChipPress: () => void;
  onAvatarChipPress: () => void;
  onStyleMenuClose: () => void;
  onSelectStyle: (format: ChatStyleFormat) => void;
  onAvatarSheetClose: () => void;
  onSelectAvatar: (index: number) => void;
}
