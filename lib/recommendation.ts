import { niches } from "@/data/niches";
import { openExplorationIds } from "@/data/exploration";
import { questions } from "@/data/questions";
import type {
  AnswerMap,
  KnowledgeProfile,
  Niche,
  RankedNiche,
  SurveyOption,
  SurveyQuestion,
} from "@/lib/types";
import { normalizeAnswers } from "@/lib/answer-conflicts";
import { knowledgePreparation } from "@/data/preparation";
import type { PathfinderPreparationConfig } from "@/lib/pathfinder-definition";

export interface RecommendationContext {
  questions: readonly SurveyQuestion[];
  niches: readonly Niche[];
  openExplorationIds: readonly string[];
  scoring?: RecommendationScoringConfig;
}

export interface RecommendationScoringConfig {
  directBoostMultiplier: number;
  openInterestMultiplier: number;
  uncertaintyBonus: number;
}

const defaultScoring: RecommendationScoringConfig = {
  directBoostMultiplier: 5,
  openInterestMultiplier: 0.75,
  uncertaintyBonus: 0.35,
};

const defaultRecommendationContext: RecommendationContext = {
  questions,
  niches,
  openExplorationIds,
};

function getCalibrationQuestionIds(context: RecommendationContext) {
  return new Set(
    context.questions
      .filter((question) => question.stage === "calibration")
      .map((question) => question.id),
  );
}

function getQuestionMap(context: RecommendationContext) {
  return Object.fromEntries(
    context.questions.map((question) => [question.id, question]),
  );
}

export function getSelectedOptions(
  answers: AnswerMap,
  excludedQuestionIds = new Set<string>(),
  context: RecommendationContext = defaultRecommendationContext,
): SurveyOption[] {
  const normalized = normalizeAnswers(answers, context.questions);
  const contextQuestionById = getQuestionMap(context);
  return Object.entries(normalized).flatMap(([questionId, optionIds]) => {
    const question = contextQuestionById[questionId];
    if (excludedQuestionIds.has(questionId)) return [];
    if (!question) return [];
    return optionIds
      .map((optionId) =>
        question.options.find((option) => option.id === optionId),
      )
      .filter((option): option is SurveyOption => Boolean(option));
  });
}

export function aggregateSignals(
  answers: AnswerMap,
  context: RecommendationContext = defaultRecommendationContext,
): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const option of getSelectedOptions(
    answers,
    getCalibrationQuestionIds(context),
    context,
  )) {
    for (const [signal, value] of Object.entries(option.signals ?? {})) {
      totals[signal] = (totals[signal] ?? 0) + value;
    }
  }
  return totals;
}

export function signalCategory(signal: string): "interest" | "style" {
  return signal.startsWith("interest:") || signal.startsWith("mode:")
    ? "interest"
    : "style";
}

export function rankNiches(
  answers: AnswerMap,
  context: RecommendationContext = defaultRecommendationContext,
): RankedNiche[] {
  const normalized = normalizeAnswers(answers, context.questions);
  const calibrationQuestionIds = getCalibrationQuestionIds(context);
  const signals = aggregateSignals(normalized, context);
  const selectedOptions = getSelectedOptions(
    normalized,
    calibrationQuestionIds,
    context,
  );
  const uncertainCount = getSelectedOptions(
    normalized,
    calibrationQuestionIds,
    context,
  ).filter((option) => option.uncertainty).length;
  const openness = signals["interest:open"] ?? 0;
  const scoring = context.scoring ?? defaultScoring;

  return context.niches
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
        ? openness * scoring.openInterestMultiplier +
          uncertainCount * scoring.uncertaintyBonus
        : 0;
      const preferenceEvidenceCount = context.questions.filter(
        (question) =>
          question.stage !== "calibration" &&
          (normalized[question.id] ?? []).some((id) => {
            const option = question.options.find((item) => item.id === id);
            return (
              option &&
              !option.uncertainty &&
              ((option.nicheBoosts?.[niche.id] ?? 0) > 0 ||
                Object.keys(option.signals ?? {}).some(
                  (signal) =>
                    signal !== "interest:open" &&
                    (niche.affinities[signal] ?? 0) > 0,
                ))
            );
          }),
      ).length;
      const directReasons = selectedOptions
        .map((option) => ({
          boost: option.nicheBoosts?.[niche.id] ?? 0,
          text: `Your choice “${option.label}” directly points toward this direction.`,
        }))
        .filter((reason) => reason.boost > 0)
        .sort((a, b) => b.boost - a.boost)
        .map((reason) => reason.text);
      const interestReasons = [
        ...directReasons,
        ...niche.reasons
          .filter(
            (reason) =>
              reason.category === "interest" &&
              (signals[reason.signal] ?? 0) > 0,
          )
          .sort((a, b) => (signals[b.signal] ?? 0) - (signals[a.signal] ?? 0))
          .map((reason) => reason.text),
      ].slice(0, 2);
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
        score:
          interestScore +
          styleScore +
          directScore * scoring.directBoostMultiplier +
          openBonus,
        interestScore:
          interestScore + directScore * scoring.directBoostMultiplier,
        styleScore,
        directScore,
        explorationBonus: openBonus,
        preferenceEvidenceCount,
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
  context: RecommendationContext = defaultRecommendationContext,
): RankedNiche[] {
  const ranked = rankNiches(answers, context);
  const suggestions = ranked.every(
    (result) => result.preferenceEvidenceCount === 0,
  )
    ? context.openExplorationIds.flatMap((id) =>
        ranked.filter((result) => result.niche.id === id),
      )
    : ranked.slice(0, 3);
  if (!primaryOverride) return suggestions;
  const selected = ranked.find((result) => result.niche.id === primaryOverride);
  if (!selected) return suggestions;
  return [
    selected,
    ...suggestions.filter((result) => result.niche.id !== primaryOverride),
  ].slice(0, 3);
}

function optionLabel(
  answers: AnswerMap,
  questionId: string,
  fallback: string,
  questionSet: readonly SurveyQuestion[] = questions,
): string {
  const optionId = answers[questionId]?.[0];
  const contextQuestion = questionSet.find(
    (question) => question.id === questionId,
  );
  return (
    contextQuestion?.options.find((option) => option.id === optionId)?.label ??
    fallback
  );
}

const defaultPreparationConfig = {
  mathQuestionId: "math-comfort",
  codingQuestionId: "coding-comfort",
  explanationQuestionId: "explanation-style",
  knowledge: knowledgePreparation,
} as Pick<
  PathfinderPreparationConfig,
  "mathQuestionId" | "codingQuestionId" | "explanationQuestionId" | "knowledge"
>;

export function getKnowledgeProfile(
  answers: AnswerMap,
  config: Pick<
    PathfinderPreparationConfig,
    | "mathQuestionId"
    | "codingQuestionId"
    | "explanationQuestionId"
    | "knowledge"
  > = defaultPreparationConfig,
  questionSet: readonly SurveyQuestion[] = questions,
): KnowledgeProfile {
  const normalized = normalizeAnswers(answers, questionSet);
  const memory = normalized[config.knowledge.memoryQuestionId]?.[0];
  const familiar = new Set(
    normalized[config.knowledge.conceptQuestionId] ?? [],
  );
  const conceptsToRevisit = Object.entries(config.knowledge.conceptReviewLabels)
    .filter(([optionId]) => !familiar.has(optionId))
    .map(([, label]) => label);

  const startingPoint =
    config.knowledge.startingPointByAnswer[memory] ??
    config.knowledge.defaultStartingPoint;

  return {
    startingPoint,
    mathComfort: optionLabel(
      normalized,
      config.mathQuestionId,
      config.knowledge.mathFallback,
      questionSet,
    ),
    codingComfort: optionLabel(
      normalized,
      config.codingQuestionId,
      config.knowledge.codingFallback,
      questionSet,
    ),
    explanationPreference: optionLabel(
      normalized,
      config.explanationQuestionId,
      config.knowledge.explanationFallback,
      questionSet,
    ),
    conceptsToRevisit,
  };
}

export function getAnswerLabels(
  answers: AnswerMap,
  stage?: string,
  context: RecommendationContext = defaultRecommendationContext,
): string[] {
  const normalized = normalizeAnswers(answers, context.questions);
  return context.questions
    .filter((question) => !stage || question.stage === stage)
    .flatMap((question) =>
      (normalized[question.id] ?? []).map((optionId) => {
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
): "Strong fit" | "Worth exploring" | "Nearby direction" | "Starting point" {
  if (result.preferenceEvidenceCount === 0) return "Starting point";
  if (
    result.score === bestScore &&
    result.preferenceEvidenceCount >= 2 &&
    result.interestScore > 0
  )
    return "Strong fit";
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

export function explainRecommendationContext(results: RankedNiche[]): string {
  const ordered = [...results].sort((a, b) => b.score - a.score);
  if (ordered.every((result) => result.preferenceEvidenceCount === 0))
    return "Your interests are still open. These are varied starting places to sample; their order is not a measure of personal fit.";
  if (ordered[0]?.preferenceEvidenceCount < 2)
    return "A few preferences are beginning to emerge. Treat these suggestions as possibilities to test through reading.";
  if (ordered[1] && ordered[1].score >= ordered[0].score * 0.9)
    return "Several directions have similar support from your answers. Reading a little in each can help you decide what holds your attention.";
  return "Your answers give one direction more support. The alternatives offer different angles worth comparing through reading.";
}

export interface RecommendationEvidence {
  label: string;
  kind: "Interest" | "Research style";
  strength: number;
}

/** Returns the actual selected options that contributed most to one niche. */
export function getRecommendationEvidence(
  answers: AnswerMap,
  result: RankedNiche,
  limit = 4,
  context: RecommendationContext = defaultRecommendationContext,
): RecommendationEvidence[] {
  const normalized = normalizeAnswers(answers, context.questions);
  return context.questions
    .filter((question) => question.stage !== "calibration")
    .flatMap((question) =>
      (normalized[question.id] ?? []).flatMap((optionId) => {
        const option = question.options.find((item) => item.id === optionId);
        if (!option || option.uncertainty) return [];
        const signalContribution = Object.entries(option.signals ?? {}).reduce(
          (sum, [signal, weight]) =>
            sum + weight * (result.niche.affinities[signal] ?? 0),
          0,
        );
        const strength =
          signalContribution + (option.nicheBoosts?.[result.niche.id] ?? 0) * 5;
        if (strength <= 0) return [];
        return [
          {
            label: option.label,
            kind: question.stage === "style" ? "Research style" : "Interest",
            strength,
          } satisfies RecommendationEvidence,
        ];
      }),
    )
    .sort((a, b) => b.strength - a.strength)
    .filter(
      (evidence, index, all) =>
        all.findIndex((item) => item.label === evidence.label) === index,
    )
    .slice(0, limit);
}
