"use client";

import { useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { ChatLandingQuestionCard } from "@/components/chat/ChatLandingQuestionCard";
import {
  CHAT_LANDING_CATEGORY_LABELS,
  CHAT_LANDING_LAYOUT,
  CHAT_LANDING_UI,
} from "@/lib/constants/chat-landing-ui";
import {
  CHAT_LANDING_QUESTION_CATEGORIES,
  CHAT_LANDING_QUESTIONS,
  type ChatLandingQuestionCategory,
} from "@/lib/constants/chat-landing-questions";
import { cn } from "@/lib/utils";
import type { ChatTryAskingSectionProps } from "@/types/ui/chat-landing";

export function ChatTryAskingSection({ onSelectQuestion }: ChatTryAskingSectionProps) {
  const copy = useI18nConstants(CHAT_LANDING_UI);
  const categoryLabels = useI18nConstants(CHAT_LANDING_CATEGORY_LABELS);
  const [activeCategory, setActiveCategory] =
    useState<ChatLandingQuestionCategory>("today");

  const questions = CHAT_LANDING_QUESTIONS[activeCategory];

  return (
    <section className={CHAT_LANDING_LAYOUT.tryAskingSection}>
      <h3 className={CHAT_LANDING_LAYOUT.tryAskingTitle}>{copy.sectionTitle}</h3>
      <div className={CHAT_LANDING_LAYOUT.tabRow}>
        {CHAT_LANDING_QUESTION_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={cn(
              activeCategory === category
                ? CHAT_LANDING_LAYOUT.tabActive
                : CHAT_LANDING_LAYOUT.tabIdle
            )}
            onClick={() => setActiveCategory(category)}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>
      <div className={CHAT_LANDING_LAYOUT.questionGrid}>
        {questions.map((question) => (
          <ChatLandingQuestionCard
            key={question}
            question={question}
            onSelect={onSelectQuestion}
          />
        ))}
      </div>
    </section>
  );
}
