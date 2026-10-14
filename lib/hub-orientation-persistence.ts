import { hubOrientationQuestions } from "@/data/hub-orientation-questions";
import {
  getHubOrientationQuestionPath,
  updateHubOrientationAnswer,
} from "@/lib/hub-orientation-branching";
import type {
  HubOrientationAnswers,
  HubOrientationQuestion,
} from "@/lib/hub-orientation";

export const HUB_ORIENTATION_STORAGE_KEY =
  "research-pathfinder:hub-orientation";
export const HUB_ORIENTATION_STORAGE_VERSION = 1;

export type HubOrientationSavedScreen = "intro" | "question" | "results";

export interface PersistedHubOrientationState {
  version: number;
  screen: HubOrientationSavedScreen;
  answers: Record<string, string>;
  currentQuestionId?: string;
  savedAt: string;
}

function sanitizeHubOrientationAnswers(
  value: unknown,
  questions: readonly HubOrientationQuestion[],
): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  let answers: Record<string, string> = {};
  for (const question of questions) {
    const optionId = (value as Record<string, unknown>)[question.id];
    if (
      typeof optionId === "string" &&
      question.options.some((option) => option.id === optionId)
    )
      answers = updateHubOrientationAnswer(
        questions,
        answers,
        question.id,
        optionId,
      );
  }

  const visibleIds = new Set(
    getHubOrientationQuestionPath(questions, answers).map(
      (question) => question.id,
    ),
  );
  return Object.fromEntries(
    Object.entries(answers).filter(([questionId]) =>
      visibleIds.has(questionId),
    ),
  );
}

export function createHubOrientationState(
  state: Omit<PersistedHubOrientationState, "version" | "savedAt">,
  date = new Date(),
): PersistedHubOrientationState {
  return {
    ...state,
    answers: sanitizeHubOrientationAnswers(
      state.answers,
      hubOrientationQuestions,
    ),
    version: HUB_ORIENTATION_STORAGE_VERSION,
    savedAt: date.toISOString(),
  };
}

export function parseHubOrientationState(
  raw: string | null,
  questions: readonly HubOrientationQuestion[] = hubOrientationQuestions,
): PersistedHubOrientationState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (
      parsed.version !== HUB_ORIENTATION_STORAGE_VERSION ||
      !["intro", "question", "results"].includes(String(parsed.screen)) ||
      typeof parsed.savedAt !== "string" ||
      !Number.isFinite(Date.parse(parsed.savedAt)) ||
      (parsed.currentQuestionId !== undefined &&
        typeof parsed.currentQuestionId !== "string")
    )
      return null;

    return {
      version: HUB_ORIENTATION_STORAGE_VERSION,
      screen: parsed.screen as HubOrientationSavedScreen,
      answers: sanitizeHubOrientationAnswers(parsed.answers, questions),
      currentQuestionId: parsed.currentQuestionId as string | undefined,
      savedAt: parsed.savedAt,
    };
  } catch {
    return null;
  }
}

export function serializeHubOrientationState(
  state: PersistedHubOrientationState,
): string {
  return JSON.stringify(state);
}

export function hasHubOrientationAnswers(
  answers: HubOrientationAnswers,
): boolean {
  return Object.keys(answers).length > 0;
}
