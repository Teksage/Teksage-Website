/** Predefined Try Asking questions — swap copy here without code changes. */

export type ChatLandingQuestionCategory =
  | "today"
  | "relationship"
  | "career"
  | "wealth";

export const CHAT_LANDING_QUESTION_CATEGORIES: ChatLandingQuestionCategory[] = [
  "today",
  "relationship",
  "career",
  "wealth",
];

export const CHAT_LANDING_QUESTIONS: Record<
  ChatLandingQuestionCategory,
  readonly string[]
> = {
  today: [
    "What does today hold for me?",
    "Is today good for important decisions?",
    "What should I focus on today?",
    "Any cautions for me today?",
  ],
  relationship: [
    "How is my love life this week?",
    "Is this a good time for marriage?",
    "Will my relationship improve soon?",
    "What does my chart say about compatibility?",
  ],
  career: [
    "When should I sign my job offer?",
    "Is a career change favorable now?",
    "How can I grow professionally?",
    "What blocks my career progress?",
  ],
  wealth: [
    "Is this a good month for investments?",
    "Will finances improve this quarter?",
    "What should I avoid financially today?",
    "How can I improve my wealth luck?",
  ],
};
