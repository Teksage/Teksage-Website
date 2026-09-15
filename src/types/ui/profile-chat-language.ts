export interface ProfileChatLanguageFieldProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  hasError?: boolean;
  errorMessage?: string;
}
