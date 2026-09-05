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

export function parseProgress(raw: string | null): PersistedSurveyState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedSurveyState>;
    if (parsed.version !== STORAGE_VERSION || !parsed.answers || !parsed.screen)
      return null;
    return parsed as PersistedSurveyState;
  } catch {
    return null;
  }
}
