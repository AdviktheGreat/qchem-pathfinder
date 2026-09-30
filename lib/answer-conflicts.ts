import { questions } from "@/data/questions";
import type { AnswerMap, SurveyQuestion } from "@/lib/types";

export interface AnswerConflict {
  questionId: string;
  keptOptionIds: string[];
  removedOptionIds: string[];
  reason: "single-choice" | "uncertainty" | "selection-limit";
}

export interface AnswerResolution {
  answers: AnswerMap;
  conflicts: AnswerConflict[];
}

/**
 * Converts any answer map into the same invariant the live controls enforce.
 * For a single-choice conflict, the final entry is treated as the latest edit.
 */
export function resolveAnswerConflicts(
  answers: AnswerMap,
  questionSet: readonly SurveyQuestion[] = questions,
): AnswerResolution {
  const resolved: AnswerMap = {};
  const conflicts: AnswerConflict[] = [];

  for (const question of questionSet) {
    const validIds = new Set(question.options.map((option) => option.id));
    const selected = [...new Set(answers[question.id] ?? [])].filter((id) =>
      validIds.has(id),
    );
    if (!selected.length) continue;

    if (question.type === "single") {
      const keptOptionIds = selected.slice(-1);
      const removedOptionIds = selected.slice(0, -1);
      resolved[question.id] = keptOptionIds;
      if (removedOptionIds.length) {
        conflicts.push({
          questionId: question.id,
          keptOptionIds,
          removedOptionIds,
          reason: "single-choice",
        });
      }
      continue;
    }

    const latestId = selected.at(-1);
    const uncertaintyIds = new Set(
      question.options
        .filter((option) => option.uncertainty)
        .map((option) => option.id),
    );
    const specificIds = selected.filter((id) => !uncertaintyIds.has(id));
    let keptOptionIds = selected;

    if (selected.some((id) => uncertaintyIds.has(id)) && specificIds.length) {
      keptOptionIds =
        latestId && uncertaintyIds.has(latestId) ? [latestId] : specificIds;
      conflicts.push({
        questionId: question.id,
        keptOptionIds,
        removedOptionIds: selected.filter((id) => !keptOptionIds.includes(id)),
        reason: "uncertainty",
      });
    }

    const maxSelections = question.maxSelections ?? Infinity;
    if (keptOptionIds.length > maxSelections) {
      const limited = keptOptionIds.slice(-maxSelections);
      conflicts.push({
        questionId: question.id,
        keptOptionIds: limited,
        removedOptionIds: keptOptionIds.filter((id) => !limited.includes(id)),
        reason: "selection-limit",
      });
      keptOptionIds = limited;
    }

    if (keptOptionIds.length) resolved[question.id] = keptOptionIds;
  }

  return { answers: resolved, conflicts };
}

export function normalizeAnswers(
  answers: AnswerMap,
  questionSet: readonly SurveyQuestion[] = questions,
): AnswerMap {
  return resolveAnswerConflicts(answers, questionSet).answers;
}
