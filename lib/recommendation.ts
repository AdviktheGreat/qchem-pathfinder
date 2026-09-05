import { niches } from "@/data/niches";
import { questionById, questions } from "@/data/questions";
import type {
  AnswerMap,
  KnowledgeProfile,
  RankedNiche,
  SurveyOption,
} from "@/lib/types";

export function getSelectedOptions(answers: AnswerMap): SurveyOption[] {
  return Object.entries(answers).flatMap(([questionId, optionIds]) => {
    const question = questionById[questionId];
    if (!question) return [];
    return optionIds
      .map((optionId) =>
        question.options.find((option) => option.id === optionId),
      )
      .filter((option): option is SurveyOption => Boolean(option));
  });
}

export function aggregateSignals(answers: AnswerMap): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const option of getSelectedOptions(answers)) {
    for (const [signal, value] of Object.entries(option.signals ?? {})) {
      totals[signal] = (totals[signal] ?? 0) + value;
    }
  }
  return totals;
}

function signalCategory(signal: string): "interest" | "style" {
  return signal.startsWith("interest:") || signal.startsWith("mode:")
    ? "interest"
    : "style";
}

export function rankNiches(answers: AnswerMap): RankedNiche[] {
  const signals = aggregateSignals(answers);
  const selectedOptions = getSelectedOptions(answers);
  const uncertainCount = selectedOptions.filter(
    (option) => option.uncertainty,
  ).length;
  const openness = signals["interest:open"] ?? 0;

  return niches
    .map((niche) => {
      let interestScore = 0;
      let styleScore = 0;
      for (const [signal, answerWeight] of Object.entries(signals)) {
        const contribution = answerWeight * (niche.affinities[signal] ?? 0);
        if (signalCategory(signal) === "interest")
          interestScore += contribution;
        else styleScore += contribution;
      }

      const directScore = selectedOptions.reduce(
        (total, option) => total + (option.nicheBoosts?.[niche.id] ?? 0),
        0,
      );
      const openBonus = niche.explorationFriendly
        ? openness * 0.75 + uncertainCount * 0.35
        : 0;
      const interestReasons = niche.reasons
        .filter(
          (reason) =>
            reason.category === "interest" && (signals[reason.signal] ?? 0) > 0,
        )
        .sort((a, b) => (signals[b.signal] ?? 0) - (signals[a.signal] ?? 0))
        .map((reason) => reason.text)
        .slice(0, 2);
      const styleReasons = niche.reasons
        .filter(
          (reason) =>
            reason.category === "style" && (signals[reason.signal] ?? 0) > 0,
        )
        .sort((a, b) => (signals[b.signal] ?? 0) - (signals[a.signal] ?? 0))
        .map((reason) => reason.text)
        .slice(0, 2);

      return {
        niche,
        score: interestScore + styleScore + directScore * 5 + openBonus,
        interestScore: interestScore + directScore * 5,
        styleScore,
        directScore,
        interestReasons:
          interestReasons.length > 0
            ? interestReasons
            : [
                "This direction keeps several scientific doorways open while you build context.",
              ],
        styleReasons:
          styleReasons.length > 0
            ? styleReasons
            : [
                "It can be approached through visual, conceptual, or quantitative work as your preferences develop.",
              ],
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getRecommendations(
  answers: AnswerMap,
  primaryOverride?: string,
): RankedNiche[] {
  const ranked = rankNiches(answers);
  if (!primaryOverride) return ranked.slice(0, 3);
  const selected = ranked.find((result) => result.niche.id === primaryOverride);
  if (!selected) return ranked.slice(0, 3);
  return [
    selected,
    ...ranked.filter((result) => result.niche.id !== primaryOverride),
  ].slice(0, 3);
}

function optionLabel(
  answers: AnswerMap,
  questionId: string,
  fallback: string,
): string {
  const optionId = answers[questionId]?.[0];
  return (
    questionById[questionId]?.options.find((option) => option.id === optionId)
      ?.label ?? fallback
  );
}

export function getKnowledgeProfile(answers: AnswerMap): KnowledgeProfile {
  const memory = answers["phase-one-memory"]?.[0];
  const familiar = new Set(answers["concept-familiarity"] ?? []);
  const conceptsToRevisit: string[] = [];
  if (!familiar.has("orbitals"))
    conceptsToRevisit.push("Orbitals and electron density");
  if (!familiar.has("energy"))
    conceptsToRevisit.push("Potential energy, stability, and energy profiles");
  if (!familiar.has("bonding"))
    conceptsToRevisit.push("Bonding and molecular geometry");
  if (!familiar.has("spectra"))
    conceptsToRevisit.push("Light absorption and molecular spectra");
  if (!familiar.has("methods"))
    conceptsToRevisit.push("What DFT approximates and why methods differ");

  const startingPoint =
    memory === "fresh"
      ? "The Phase 1 big picture feels available; build from it while checking details as needed."
      : memory === "recognize"
        ? "Many Phase 1 ideas are recognizable; a short vocabulary refresh will make the literature easier to enter."
        : "Begin with a concise concept map and definitions. Knowledge gaps are preparation notes, not limits on what you can explore.";

  return {
    startingPoint,
    mathComfort: optionLabel(
      answers,
      "math-comfort",
      "Still exploring how much mathematical detail feels useful",
    ),
    codingComfort: optionLabel(
      answers,
      "coding-comfort",
      "Still exploring comfort with computational tools",
    ),
    explanationPreference: optionLabel(
      answers,
      "explanation-style",
      "Open to different explanation styles",
    ),
    conceptsToRevisit: conceptsToRevisit.slice(0, 4),
  };
}

export function getAnswerLabels(answers: AnswerMap, stage?: string): string[] {
  return questions
    .filter((question) => !stage || question.stage === stage)
    .flatMap((question) =>
      (answers[question.id] ?? []).map((optionId) => {
        const option = question.options.find(
          (candidate) => candidate.id === optionId,
        );
        return option ? `${question.title}: ${option.label}` : "";
      }),
    )
    .filter(Boolean);
}

export function getFitLabel(
  result: RankedNiche,
  bestScore: number,
): "Strong fit" | "Worth exploring" | "Nearby direction" {
  if (result.score === bestScore && bestScore > 0) return "Strong fit";
  if (bestScore === 0 || result.score >= bestScore * 0.72)
    return "Worth exploring";
  return "Nearby direction";
}

export function explainDifference(
  primary: RankedNiche,
  alternative: RankedNiche,
): string {
  if (primary.niche.area === alternative.niche.area)
    return alternative.niche.comparisonLens;
  return `This path shifts the center of attention from ${primary.niche.area.toLowerCase()} toward ${alternative.niche.area.toLowerCase()}. ${alternative.niche.comparisonLens}`;
}
