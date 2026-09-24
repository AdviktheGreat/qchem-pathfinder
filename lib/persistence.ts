import type { PersistedSurveyState } from "@/lib/types";

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

export function parseProgress(raw: string | null): PersistedSurveyState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const validScreens = ["intro", "survey", "results", "review"];
    if (
      !parsed ||
      typeof parsed !== "object" ||
      parsed.version !== STORAGE_VERSION ||
      !validScreens.includes(String(parsed.screen)) ||
      !isAnswerMap(parsed.answers) ||
      typeof parsed.savedAt !== "string" ||
      !isOptionalString(parsed.currentQuestionId) ||
      !isOptionalString(parsed.primaryOverride)
    )
      return null;
    return parsed as unknown as PersistedSurveyState;
  } catch {
    return null;
  }
}
