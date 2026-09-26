import {
  codingPreparation,
  mathPreparation,
  explanationGuides,
} from "@/data/preparation";
import type { AnswerMap, Niche } from "@/lib/types";
import { getKnowledgeProfile } from "@/lib/recommendation";

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
  return {
    startingPoint: getKnowledgeProfile(answers).startingPoint,
    explanation: getExplanationGuide(answers),
    nicheNote: niche.preparation,
    steps: getPreparationSteps(answers),
  };
}
