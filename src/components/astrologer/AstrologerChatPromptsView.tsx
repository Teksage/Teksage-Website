"use client";

import { useState } from "react";
import { useChatPrompts } from "@/hooks/useChatPrompts";
import { CHAT_PROMPTS_ADMIN } from "@/lib/constants/chat-prompts-admin";
import { ASTRO_PORTAL_COLORS } from "@/lib/constants/astrologer-portal";
import { Loader } from "@/components/common/Loader";

export function AstrologerChatPromptsView() {
  const { prompts, loading, error, addPrompt, togglePrompt } = useChatPrompts();
  const [input, setInput] = useState("");
  const [adding, setAdding] = useState(false);

  async function handleAdd() {
    if (!input.trim() || adding) return;
    setAdding(true);
    const ok = await addPrompt(input);
    if (ok) setInput("");
    setAdding(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") void handleAdd();
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5 px-5 pb-12 pt-4">
      <p className="text-sm font-medium text-white/70">
        {CHAT_PROMPTS_ADMIN.subtitle}
      </p>

      {/* Add form */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={CHAT_PROMPTS_ADMIN.addPlaceholder}
          maxLength={200}
          className="min-w-0 flex-1 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="button"
          onClick={() => void handleAdd()}
          disabled={!input.trim() || adding}
          className="shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          {adding ? CHAT_PROMPTS_ADMIN.adding : CHAT_PROMPTS_ADMIN.addBtn}
        </button>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-100">
          {error}
        </p>
      ) : null}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader variant="inline" size="md" />
        </div>
      ) : prompts.length === 0 ? (
        <p className="text-center text-sm font-medium text-white/50">
          {CHAT_PROMPTS_ADMIN.emptyState}
        </p>
      ) : (
        <div className="divide-y divide-white/10 rounded-xl border border-white/20 bg-white/10">
          {prompts.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <p className="flex-1 text-sm font-medium leading-snug text-white">
                {p.prompt}
              </p>
              <button
                type="button"
                onClick={() => void togglePrompt(p.id, !p.is_active)}
                className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: p.is_active
                    ? ASTRO_PORTAL_COLORS.brandGreen
                    : "rgba(255,255,255,0.15)",
                  color: p.is_active ? "#fff" : "rgba(255,255,255,0.6)",
                }}
              >
                {p.is_active
                  ? CHAT_PROMPTS_ADMIN.activeLabel
                  : CHAT_PROMPTS_ADMIN.inactiveLabel}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
