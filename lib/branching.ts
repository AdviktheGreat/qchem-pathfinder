import { questions } from "@/data/questions";
import type { AnswerMap, SurveyQuestion } from "@/lib/types";

export function isQuestionVisible(
  question: SurveyQuestion,
  answers: AnswerMap,
): boolean {
  if (!question.visibleWhen) return true;
  const selected = answers[question.visibleWhen.questionId] ?? [];
  return question.visibleWhen.anyOf.some((optionId) =>
    selected.includes(optionId),
  );
}

export function getVisibleQuestions(answers: AnswerMap): SurveyQuestion[] {
  return questions.filter((question) => isQuestionVisible(question, answers));
}

export function getPlannedQuestionCount(answers: AnswerMap): number {
  if (answers.motivation?.length) return getVisibleQuestions(answers).length;
  // Reserve room for the upcoming branch without rendering it prematurely.
  const motivation = questions.find((question) => question.id === "motivation");
  return Math.max(
    getVisibleQuestions(answers).length,
    ...(motivation?.options.map(
      (option) =>
        getVisibleQuestions({ ...answers, motivation: [option.id] }).length,
    ) ?? []),
  );
}

export function pruneHiddenAnswers(answers: AnswerMap): AnswerMap {
  const visibleIds = new Set(
    getVisibleQuestions(answers).map((question) => question.id),
  );
  return Object.fromEntries(
    Object.entries(answers).filter(([questionId]) =>
      visibleIds.has(questionId),
    ),
  );
}

export function getNextQuestionId(
  answers: AnswerMap,
  currentQuestionId: string,
): string | undefined {
  const visible = getVisibleQuestions(answers);
  const index = visible.findIndex(
    (question) => question.id === currentQuestionId,
  );
  return visible[index + 1]?.id;
}

export function getPreviousQuestionId(
  answers: AnswerMap,
  currentQuestionId: string,
): string | undefined {
  const visible = getVisibleQuestions(answers);
  const index = visible.findIndex(
    (question) => question.id === currentQuestionId,
  );
  return index > 0 ? visible[index - 1]?.id : undefined;
}

export function getAnsweredCount(answers: AnswerMap): number {
  return getVisibleQuestions(answers).filter(
    (question) => (answers[question.id]?.length ?? 0) > 0,
  ).length;
}
