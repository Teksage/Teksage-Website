import { useState, useEffect, useCallback } from "react";
import {
  fetchChatPrompts,
  createChatPrompt,
  updateChatPromptStatus,
} from "@/lib/services/chat-prompts";
import type { ChatPrompt } from "@/types/chat-prompts";
import { CHAT_PROMPTS_ADMIN } from "@/lib/constants/chat-prompts-admin";

export function useChatPrompts() {
  const [prompts, setPrompts] = useState<ChatPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchChatPrompts();
      setPrompts(data);
    } catch {
      setError(CHAT_PROMPTS_ADMIN.loadFailed);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function addPrompt(text: string): Promise<boolean> {
    try {
      const created = await createChatPrompt({ prompt: text.trim() });
      setPrompts((prev) => [created, ...prev]);
      return true;
    } catch {
      setError(CHAT_PROMPTS_ADMIN.addFailed);
      return false;
    }
  }

  async function togglePrompt(id: number, is_active: boolean): Promise<void> {
    const prev = prompts;
    setPrompts((p) =>
      p.map((pr) => (pr.id === id ? { ...pr, is_active } : pr))
    );
    try {
      await updateChatPromptStatus({ prompt_id: id, is_active });
    } catch {
      setPrompts(prev);
      setError(CHAT_PROMPTS_ADMIN.toggleFailed);
    }
  }

  return { prompts, loading, error, addPrompt, togglePrompt, reload: load };
}
