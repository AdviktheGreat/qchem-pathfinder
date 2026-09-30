import { questions } from "@/data/questions";
import { normalizeAnswers } from "@/lib/answer-conflicts";
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

export function getVisibleQuestions(
  answers: AnswerMap,
  questionSet: readonly SurveyQuestion[] = questions,
): SurveyQuestion[] {
  const normalized = normalizeAnswers(answers, questionSet);
  return questionSet.filter((question) =>
    isQuestionVisible(question, normalized),
  );
}

export function getPlannedQuestionCount(
  answers: AnswerMap,
  questionSet: readonly SurveyQuestion[] = questions,
  branchQuestionId = "motivation",
): number {
  if (answers[branchQuestionId]?.length)
    return getVisibleQuestions(answers, questionSet).length;
  // Reserve room for the upcoming branch without rendering it prematurely.
  const branchQuestion = questionSet.find(
    (question) => question.id === branchQuestionId,
  );
  return Math.max(
    getVisibleQuestions(answers, questionSet).length,
    ...(branchQuestion?.options.map(
      (option) =>
        getVisibleQuestions(
          { ...answers, [branchQuestionId]: [option.id] },
          questionSet,
        ).length,
    ) ?? []),
  );
}

export function pruneHiddenAnswers(
  answers: AnswerMap,
  questionSet: readonly SurveyQuestion[] = questions,
): AnswerMap {
  const normalized = normalizeAnswers(answers, questionSet);
  const visibleIds = new Set(
    getVisibleQuestions(normalized, questionSet).map((question) => question.id),
  );
  return Object.fromEntries(
    Object.entries(normalized).filter(([questionId]) =>
      visibleIds.has(questionId),
    ),
  );
}

export function getNextQuestionId(
  answers: AnswerMap,
  currentQuestionId: string,
  questionSet: readonly SurveyQuestion[] = questions,
): string | undefined {
  const visible = getVisibleQuestions(answers, questionSet);
  const index = visible.findIndex(
    (question) => question.id === currentQuestionId,
  );
  return visible[index + 1]?.id;
}

export function getPreviousQuestionId(
  answers: AnswerMap,
  currentQuestionId: string,
  questionSet: readonly SurveyQuestion[] = questions,
): string | undefined {
  const visible = getVisibleQuestions(answers, questionSet);
  const index = visible.findIndex(
    (question) => question.id === currentQuestionId,
  );
  return index > 0 ? visible[index - 1]?.id : undefined;
}

export function getAnsweredCount(
  answers: AnswerMap,
  questionSet: readonly SurveyQuestion[] = questions,
): number {
  return getVisibleQuestions(answers, questionSet).filter(
    (question) => (answers[question.id]?.length ?? 0) > 0,
  ).length;
}
