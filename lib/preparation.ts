import {
  codingPreparation,
  mathPreparation,
  explanationGuides,
  knowledgePreparation,
} from "@/data/preparation";
import { questions } from "@/data/questions";
import type { AnswerMap, Niche, SurveyQuestion } from "@/lib/types";
import { getKnowledgeProfile } from "@/lib/recommendation";
import { conceptOverlaps } from "@/data/concept-overlaps";
import { normalizeAnswers } from "@/lib/answer-conflicts";
import type { PathfinderPreparationConfig } from "@/lib/pathfinder-definition";

const defaultPreparationConfig: PathfinderPreparationConfig = {
  mathQuestionId: "math-comfort",
  codingQuestionId: "coding-comfort",
  explanationQuestionId: "explanation-style",
  mathAdvice: mathPreparation,
  codingAdvice: codingPreparation,
  explanationGuides,
  supplementalAdvice: [],
  conceptOverlaps,
  knowledge: knowledgePreparation,
};

export function mergeConcepts(
  concepts: string[],
  overlaps = defaultPreparationConfig.conceptOverlaps,
): string[] {
  const key = (value: string) => value.trim().toLowerCase();
  const present = new Set(concepts.map(key));
  const aliases = new Map<string, string>();
  for (const group of overlaps) {
    if (present.has(key(group.umbrella))) {
      for (const label of group.covered)
        aliases.set(key(label), group.umbrella);
    }
  }
  return [
    ...new Map(
      concepts.map((concept) => {
        const label = aliases.get(key(concept)) ?? concept;
        return [key(label), label];
      }),
    ).values(),
  ];
}

export function getPreparationSteps(
  answers: AnswerMap,
  config: PathfinderPreparationConfig = defaultPreparationConfig,
  questionSet: readonly SurveyQuestion[] = questions,
): string[] {
  const normalized = normalizeAnswers(answers, questionSet);
  return [
    config.mathAdvice[normalized[config.mathQuestionId]?.[0]] ??
      config.mathAdvice.unsure,
    config.codingAdvice[normalized[config.codingQuestionId]?.[0]] ??
      config.codingAdvice.unsure,
    ...config.supplementalAdvice.map(
      ({ questionId, advice }) =>
        advice[normalized[questionId]?.[0]] ?? advice.unsure,
    ),
  ];
}

export function getExplanationGuide(
  answers: AnswerMap,
  config: PathfinderPreparationConfig = defaultPreparationConfig,
  questionSet: readonly SurveyQuestion[] = questions,
) {
  const normalized = normalizeAnswers(answers, questionSet);
  return {
    text:
      config.explanationGuides[normalized[config.explanationQuestionId]?.[0]] ??
      config.explanationGuides.unsure,
    showContextInitially:
      normalized[config.knowledge.memoryQuestionId]?.[0] !==
      config.knowledge.contextReadyOptionId,
  };
}

export function getPreparationProfile(
  answers: AnswerMap,
  niche: Niche,
  config: PathfinderPreparationConfig = defaultPreparationConfig,
  questionSet: readonly SurveyQuestion[] = questions,
) {
  const normalized = normalizeAnswers(answers, questionSet);
  const knowledge = getKnowledgeProfile(normalized, config, questionSet);
  const concepts = mergeConcepts(
    [...niche.concepts, ...knowledge.conceptsToRevisit],
    config.conceptOverlaps,
  );
  return {
    startingPoint: knowledge.startingPoint,
    concepts,
    explanation: getExplanationGuide(normalized, config, questionSet),
    nicheNote: niche.preparation,
    steps: getPreparationSteps(normalized, config, questionSet),
  };
}
