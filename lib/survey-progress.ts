import {
  getAnsweredCount,
  getPlannedQuestionCount,
  getVisibleQuestions,
} from "@/lib/branching";
import type { AnswerMap, SurveyQuestion } from "@/lib/types";

export interface SurveyProgress {
  visibleQuestions: SurveyQuestion[];
  answeredCount: number;
  plannedQuestionCount: number;
  isComplete: boolean;
  resumeQuestion?: SurveyQuestion;
  resumeIndex: number;
}

export function getSurveyProgress(
  answers: AnswerMap,
  currentQuestionId: string | undefined,
  questions: readonly SurveyQuestion[],
  branchQuestionId: string,
): SurveyProgress {
  const visibleQuestions = getVisibleQuestions(answers, questions);
  const isComplete = visibleQuestions.every(
    (question) => (answers[question.id]?.length ?? 0) > 0,
  );
  const resumeQuestion =
    visibleQuestions.find((question) => question.id === currentQuestionId) ??
    visibleQuestions.find((question) => !answers[question.id]?.length) ??
    visibleQuestions[0];

  return {
    visibleQuestions,
    answeredCount: getAnsweredCount(answers, questions),
    plannedQuestionCount: getPlannedQuestionCount(
      answers,
      questions,
      branchQuestionId,
    ),
    isComplete,
    resumeQuestion,
    resumeIndex: visibleQuestions.findIndex(
      (question) => question.id === resumeQuestion?.id,
    ),
  };
}

export function indexQuestions(questions: readonly SurveyQuestion[]) {
  return Object.fromEntries(
    questions.map((question) => [question.id, question]),
  );
}
