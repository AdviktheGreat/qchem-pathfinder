import type {
  HubOrientationAnswers,
  HubOrientationEvidence,
  HubOrientationQuestion,
} from "@/lib/hub-orientation";

export function collectHubOrientationEvidence(
  questions: readonly HubOrientationQuestion[],
  answers: HubOrientationAnswers,
): HubOrientationEvidence[] {
  return questions.flatMap((question) => {
    const option = question.options.find(
      (candidate) => candidate.id === answers[question.id],
    );
    if (!option) return [];

    return option.evidence.map((evidence) => ({
      ...evidence,
      uncertainty: option.uncertainty || evidence.uncertainty,
    }));
  });
}
