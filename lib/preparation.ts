import {
  codingPreparation,
  mathPreparation,
  explanationGuides,
} from "@/data/preparation";
import type { AnswerMap, Niche } from "@/lib/types";
import { getKnowledgeProfile } from "@/lib/recommendation";
import { conceptOverlaps } from "@/data/concept-overlaps";

export function mergeConcepts(concepts: string[]): string[] {
  const key = (value: string) => value.trim().toLowerCase();
  const present = new Set(concepts.map(key));
  const aliases = new Map<string, string>();
  for (const group of conceptOverlaps) {
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

export function getPreparationSteps(answers: AnswerMap): string[] {
  return [
    mathPreparation[answers["math-comfort"]?.[0]] ?? mathPreparation.unsure,
    codingPreparation[answers["coding-comfort"]?.[0]] ??
      codingPreparation.unsure,
  ];
}

export function getExplanationGuide(answers: AnswerMap) {
  return {
    text:
      explanationGuides[answers["explanation-style"]?.[0]] ??
      explanationGuides.unsure,
    showContextInitially: answers["phase-one-memory"]?.[0] !== "fresh",
  };
}

export function getPreparationProfile(answers: AnswerMap, niche: Niche) {
  const knowledge = getKnowledgeProfile(answers);
  const concepts = mergeConcepts([
    ...niche.concepts,
    ...knowledge.conceptsToRevisit,
  ]);
  return {
    startingPoint: knowledge.startingPoint,
    concepts,
    explanation: getExplanationGuide(answers),
    nicheNote: niche.preparation,
    steps: getPreparationSteps(answers),
  };
}
