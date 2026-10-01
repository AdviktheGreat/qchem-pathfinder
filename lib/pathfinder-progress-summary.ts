import type { PathfinderDefinition } from "@/lib/pathfinder-definition";
import { createPathfinderPersistence } from "@/lib/persistence";
import { getSurveyProgress } from "@/lib/survey-progress";

export interface PathfinderProgressSummary {
  label: string;
  detail: string;
  cta: string;
  complete: boolean;
}

export function getNewPathfinderProgress(
  definition: PathfinderDefinition,
): PathfinderProgressSummary {
  return {
    label: "Ready when you are",
    detail: "No saved answers yet",
    cta: `Open ${definition.identity.shortName.toLowerCase()}`,
    complete: false,
  };
}

export function readPathfinderProgress(
  definition: PathfinderDefinition,
  rawProgress: string | null,
): PathfinderProgressSummary {
  const newProgress = getNewPathfinderProgress(definition);
  const { state } =
    createPathfinderPersistence(definition).restoreProgress(rawProgress);
  if (!state || Object.keys(state.answers).length === 0) return newProgress;

  const progress = getSurveyProgress(
    state.answers,
    state.currentQuestionId,
    definition.survey.questions,
    definition.survey.branchQuestionId,
  );

  if (progress.isComplete) {
    return {
      label: "Research map ready",
      detail: "Your completed exploration is saved on this device",
      cta: `Review my ${definition.identity.shortName.toLowerCase()} map`,
      complete: true,
    };
  }

  return {
    label: "Exploration in progress",
    detail: `${progress.answeredCount} of ${progress.plannedQuestionCount} questions answered`,
    cta: `Continue ${definition.identity.shortName.toLowerCase()}`,
    complete: false,
  };
}
