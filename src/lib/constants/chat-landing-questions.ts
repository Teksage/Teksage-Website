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
    "What opportunity should I not miss today?",
    "What should I be careful about today?",
    "Is today a good day to make an important decision?",
    "What does my horoscope want me to focus on today?",
  ],
  relationship: [
    "Is someone from my past likely to come back?",
    "What is likely to change in my love life soon?",
    "What does my horoscope say about my relationship future?",
    "When is a favourable time for love or marriage?",
  ],
  career: [
    "When could my next career breakthrough happen?",
    "Am I on the right career path right now?",
    "Is a job change favourable for me at this time?",
    "Should I focus on a job or start my own business?",
  ],
  wealth: [
    "When is my next strong financial period?",
    "Is this a good time to make a major investment?",
    "What does my horoscope say about my wealth potential?",
    "Could a new income opportunity come my way soon?",
  ],
};
