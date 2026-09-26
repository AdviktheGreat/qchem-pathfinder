import { codingPreparation, mathPreparation } from "@/data/preparation";
import type { AnswerMap } from "@/lib/types";

export function getPreparationSteps(answers: AnswerMap): string[] {
  return [
    mathPreparation[answers["math-comfort"]?.[0]] ?? mathPreparation.unsure,
    codingPreparation[answers["coding-comfort"]?.[0]] ??
      codingPreparation.unsure,
  ];
}
