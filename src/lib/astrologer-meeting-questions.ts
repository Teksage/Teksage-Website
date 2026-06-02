/** Astrologer meeting Q&A helpers — mirrors Flutter meeting end gate in `meetingDetailsPage.dart`. */

export function astrologerCanAnswerQuestions(
  startDatetime: string,
  durationMinutes: number | null
): boolean {
  const start = new Date(startDatetime);
  if (Number.isNaN(start.getTime())) return false;
  const mins = durationMinutes ?? 30;
  const end = new Date(start.getTime() + mins * 60_000);
  return Date.now() >= end.getTime();
}

export function formatQuestionAnswer(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function allQuestionsAnswered(
  questions: Array<{ answer: string | null }>
): boolean {
  return (
    questions.length > 0 &&
    questions.every((q) => (q.answer?.trim().length ?? 0) > 0)
  );
}
