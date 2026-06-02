/** Chat prompt types — mirrors backend `/api/chat-prompts/` schema. */

export interface ChatPrompt {
  id: number;
  prompt: string;
  is_active: boolean;
  created_at?: string;
}

export interface ChatPromptCreatePayload {
  prompt: string;
}

export interface ChatPromptStatusPayload {
  prompt_id: number;
  is_active: boolean;
}
