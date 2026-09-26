import type { AnswerMap, SurveyQuestion } from "@/lib/types";

export function isStillExploring(
  question: SurveyQuestion,
  answers: AnswerMap,
): boolean {
  return question.options.some(
    (option) => option.uncertainty && answers[question.id]?.includes(option.id),
  );
}
