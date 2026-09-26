import type { AnswerMap, PersistedSurveyState } from "@/lib/types";
import { questions } from "@/data/questions";
import { niches } from "@/data/niches";
import { getVisibleQuestions, pruneHiddenAnswers } from "@/lib/branching";

export const STORAGE_KEY = "quantum-pathfinder:progress";
export const STORAGE_VERSION = 1;

export function createPersistedState(
  state: Omit<PersistedSurveyState, "version" | "savedAt">,
): PersistedSurveyState {
  return {
    ...state,
    version: STORAGE_VERSION,
    savedAt: new Date().toISOString(),
  };
}

export function serializeProgress(state: PersistedSurveyState): string {
  return JSON.stringify(state);
}

function isAnswerMap(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every(
    (answer) =>
      Array.isArray(answer) &&
      answer.every((option) => typeof option === "string"),
  );
}

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === "string";
}

export function sanitizeAnswers(answers: AnswerMap): AnswerMap {
  const clean: AnswerMap = {};
  for (const question of questions) {
    const validIds = new Set(question.options.map((option) => option.id));
    const selected = [...new Set(answers[question.id] ?? [])]
      .filter((id) => validIds.has(id))
      .slice(0, question.type === "single" ? 1 : question.maxSelections);
    if (selected.length) clean[question.id] = selected;
  }
  return clean;
}

export function parseProgress(raw: string | null): PersistedSurveyState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const validScreens = ["intro", "survey", "results", "review"];
    if (
      !parsed ||
      typeof parsed !== "object" ||
      parsed.version !== STORAGE_VERSION ||
      typeof parsed.screen !== "string" ||
      !validScreens.includes(parsed.screen) ||
      !isAnswerMap(parsed.answers) ||
      typeof parsed.savedAt !== "string" ||
      !Number.isFinite(Date.parse(parsed.savedAt)) ||
      !isOptionalString(parsed.currentQuestionId) ||
      !isOptionalString(parsed.primaryOverride) ||
      (parsed.shortcutsEnabled !== undefined &&
        typeof parsed.shortcutsEnabled !== "boolean")
    )
      return null;
    const answers = pruneHiddenAnswers(
      sanitizeAnswers(parsed.answers as AnswerMap),
    );
    const visible = getVisibleQuestions(answers);
    const firstUnanswered = visible.find(
      (question) => !answers[question.id]?.length,
    );
    const incompleteResults =
      (parsed.screen === "results" || parsed.screen === "review") &&
      firstUnanswered;
    const screen = incompleteResults
      ? "survey"
      : (parsed.screen as PersistedSurveyState["screen"]);
    const savedQuestion = visible.find(
      (question) => question.id === parsed.currentQuestionId,
    );
    const currentQuestionId =
      screen === "survey"
        ? (incompleteResults
            ? firstUnanswered
            : (savedQuestion ?? firstUnanswered ?? visible[0])
          )?.id
        : savedQuestion?.id;
    return {
      version: STORAGE_VERSION,
      screen,
      answers,
      savedAt: parsed.savedAt,
      shortcutsEnabled: parsed.shortcutsEnabled as boolean | undefined,
      currentQuestionId,
      primaryOverride: niches.some(
        (niche) => niche.id === parsed.primaryOverride,
      )
        ? (parsed.primaryOverride as string)
        : undefined,
    };
  } catch {
    return null;
  }
}

export function restoreProgress(raw: string | null): {
  state: PersistedSurveyState | null;
  notice?: string;
} {
  const state = parseProgress(raw);
  if (!raw) return { state };
  if (!state)
    return {
      state,
      notice:
        "Your saved exploration could not be restored in this version. Start a new path below.",
    };
  const original = JSON.parse(raw) as PersistedSurveyState;
  const answersChanged =
    Object.keys(original.answers).length !==
      Object.keys(state.answers).length ||
    Object.entries(state.answers).some(
      ([id, values]) =>
        JSON.stringify(values) !== JSON.stringify(original.answers[id]),
    );
  const repaired =
    answersChanged ||
    original.screen !== state.screen ||
    original.currentQuestionId !== state.currentQuestionId ||
    original.primaryOverride !== state.primaryOverride;
  return {
    state,
    notice: repaired
      ? "We updated your saved exploration to match the current questions. Your valid answers are still here."
      : undefined,
  };
}
