import type { AnswerMap, PersistedSurveyState } from "@/lib/types";
import { getVisibleQuestions, pruneHiddenAnswers } from "@/lib/branching";
import {
  normalizeAnswers,
  resolveAnswerConflicts,
} from "@/lib/answer-conflicts";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";

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
  return quantumPersistence.sanitizeAnswers(answers);
}

export function createPathfinderPersistence(definition: PathfinderDefinition) {
  const questionSet = definition.survey.questions;
  const nicheIds = new Set(
    definition.recommendations.niches.map((niche) => niche.id),
  );

  function sanitize(answers: AnswerMap): AnswerMap {
    return normalizeAnswers(answers, questionSet);
  }

  function createState(
    state: Omit<PersistedSurveyState, "version" | "savedAt">,
  ): PersistedSurveyState {
    return {
      ...state,
      answers: pruneHiddenAnswers(sanitize(state.answers), questionSet),
      version: definition.storage.version,
      savedAt: new Date().toISOString(),
    };
  }

  function parse(raw: string | null): PersistedSurveyState | null {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const validScreens = ["intro", "survey", "results", "review"];
      if (
        !parsed ||
        typeof parsed !== "object" ||
        parsed.version !== definition.storage.version ||
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
        sanitize(parsed.answers as AnswerMap),
        questionSet,
      );
      const visible = getVisibleQuestions(answers, questionSet);
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
        version: definition.storage.version,
        screen,
        answers,
        savedAt: parsed.savedAt,
        shortcutsEnabled: parsed.shortcutsEnabled as boolean | undefined,
        currentQuestionId,
        primaryOverride: nicheIds.has(parsed.primaryOverride as string)
          ? (parsed.primaryOverride as string)
          : undefined,
      };
    } catch {
      return null;
    }
  }

  function restore(raw: string | null): {
    state: PersistedSurveyState | null;
    notice?: string;
  } {
    const state = parse(raw);
    if (!raw) return { state };
    if (!state)
      return {
        state,
        notice:
          "Your saved exploration could not be restored in this version. Start a new path below.",
      };
    const original = JSON.parse(raw) as PersistedSurveyState;
    const answerConflicts = resolveAnswerConflicts(
      original.answers,
      questionSet,
    ).conflicts;
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
        ? answerConflicts.length
          ? "We found conflicting saved choices and kept the most recent answer for each question. Only those resolved answers will influence your directions and profile."
          : "We updated your saved exploration to match the current questions. Your valid answers are still here."
        : undefined,
    };
  }

  return {
    storageKey: definition.storage.key,
    storageVersion: definition.storage.version,
    createPersistedState: createState,
    serializeProgress: (state: PersistedSurveyState) => JSON.stringify(state),
    sanitizeAnswers: sanitize,
    parseProgress: parse,
    restoreProgress: restore,
  };
}

const quantumPersistence = createPathfinderPersistence(
  quantumChemistryPathfinder,
);

export const STORAGE_KEY = quantumPersistence.storageKey;
export const STORAGE_VERSION = quantumPersistence.storageVersion;
export const createPersistedState = quantumPersistence.createPersistedState;
export const serializeProgress = quantumPersistence.serializeProgress;
export const parseProgress = quantumPersistence.parseProgress;
export const restoreProgress = quantumPersistence.restoreProgress;
