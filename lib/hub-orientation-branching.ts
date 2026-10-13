import type {
  HubOrientationAnswers,
  HubOrientationQuestion,
} from "@/lib/hub-orientation";

export function isHubOrientationQuestionVisible(
  question: HubOrientationQuestion,
  answers: HubOrientationAnswers,
): boolean {
  if (!question.visibleWhen) return true;

  return question.visibleWhen.anyOf.some(({ questionId, optionIds }) => {
    const answer = answers[questionId];
    return answer !== undefined && optionIds.includes(answer);
  });
}

export function getHubOrientationQuestionPath(
  questions: readonly HubOrientationQuestion[],
  answers: HubOrientationAnswers,
): HubOrientationQuestion[] {
  return questions.filter((question) =>
    isHubOrientationQuestionVisible(question, answers),
  );
}
