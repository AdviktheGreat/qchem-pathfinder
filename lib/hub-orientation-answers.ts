import type {
  HubOrientationAnswers,
  HubOrientationEvidence,
  HubOrientationQuestion,
  HubOrientationRanking,
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

export function explainHubOrientationFit(
  ranking: HubOrientationRanking,
  questions: readonly HubOrientationQuestion[],
  answers: HubOrientationAnswers,
): {
  interestReasons: HubOrientationRanking["reasons"];
  researchStyleReasons: HubOrientationRanking["reasons"];
  uncertainAnswerCount: number;
} {
  const selectedOptions = questions.flatMap((question) => {
    const option = question.options.find(
      (candidate) => candidate.id === answers[question.id],
    );
    return option ? [option] : [];
  });

  return {
    interestReasons: ranking.reasons.filter(
      (reason) =>
        reason.dimension === "motivation" || reason.dimension === "system",
    ),
    researchStyleReasons: ranking.reasons.filter(
      (reason) =>
        reason.dimension === "question" || reason.dimension === "working-style",
    ),
    uncertainAnswerCount: selectedOptions.filter((option) => option.uncertainty)
      .length,
  };
}
