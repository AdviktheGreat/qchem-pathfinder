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

export function updateHubOrientationAnswer(
  questions: readonly HubOrientationQuestion[],
  answers: HubOrientationAnswers,
  questionId: string,
  optionId: string,
): Record<string, string> {
  const nextAnswers: Record<string, string> = {
    ...answers,
    [questionId]: optionId,
  };

  let changed = true;
  while (changed) {
    changed = false;
    const visibleIds = new Set(
      getHubOrientationQuestionPath(questions, nextAnswers).map(
        (question) => question.id,
      ),
    );

    for (const answeredQuestionId of Object.keys(nextAnswers)) {
      if (visibleIds.has(answeredQuestionId)) continue;
      delete nextAnswers[answeredQuestionId];
      changed = true;
    }
  }

  return nextAnswers;
}
