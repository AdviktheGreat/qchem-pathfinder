import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import {
  getAnswerLabels,
  getKnowledgeProfile,
  getRecommendations,
  explainRecommendationContext,
  type RecommendationContext,
} from "@/lib/recommendation";
import type { AnswerMap, SurveyQuestion } from "@/lib/types";
import { getPreparationProfile } from "@/lib/preparation";
import { normalizeAnswers } from "@/lib/answer-conflicts";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

export function profileFilename(
  nicheId: string,
  date = new Date(),
  definition: PathfinderDefinition = quantumChemistryPathfinder,
): string {
  const slug =
    nicheId
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "exploration";
  return `${definition.profile.filenamePrefix}-${slug}-${date.toISOString().slice(0, 10)}.txt`;
}

function selectedLabels(
  answers: AnswerMap,
  questionId: string,
  questions: readonly SurveyQuestion[],
): string[] {
  const question = questions.find((item) => item.id === questionId);
  return (answers[questionId] ?? [])
    .map(
      (optionId) =>
        question?.options.find((option) => option.id === optionId)?.label,
    )
    .filter((label): label is string => Boolean(label));
}

export function formatResearchProfile(
  answers: AnswerMap,
  primaryOverride?: string,
  definition: PathfinderDefinition = quantumChemistryPathfinder,
): string {
  const { questions } = definition.survey;
  const recommendationContext: RecommendationContext = {
    questions,
    niches: definition.recommendations.niches,
    openExplorationIds: definition.recommendations.openExplorationIds,
    scoring: definition.recommendations.scoring,
  };
  const normalized = normalizeAnswers(answers, questions);
  const recommendations = getRecommendations(
    normalized,
    primaryOverride,
    recommendationContext,
  );
  const [primary, ...alternatives] = recommendations;
  const knowledge = getKnowledgeProfile(
    normalized,
    definition.preparation,
    questions,
  );
  const preparation = getPreparationProfile(
    normalized,
    primary.niche,
    definition.preparation,
    questions,
  );
  const directions = [primary, ...alternatives];
  const motivation = selectedLabels(
    normalized,
    definition.profile.motivationQuestionId,
    questions,
  );
  const questionTypes = selectedLabels(
    normalized,
    definition.profile.questionTypeQuestionId,
    questions,
  );
  const narrowing = getAnswerLabels(
    normalized,
    "narrowing",
    recommendationContext,
  ).map((line) => line.split(": ").at(-1) ?? line);
  const interestThemes = Array.from(new Set([...motivation, ...narrowing]));
  const styles = questions
    .filter((question) => question.stage === "style")
    .map(
      (question) =>
        `${definition.profile.researchStyleLabels[question.id] ?? question.title}: ${selectedLabels(normalized, question.id, questions).join("; ") || "Not answered yet"}`,
    );

  const lines = [
    definition.profile.exportTitle,
    "=".repeat(definition.profile.exportTitle.length),
    "",
    "KNOWLEDGE STARTING POINT",
    knowledge.startingPoint,
    `Math: ${knowledge.mathComfort}`,
    `Coding/tools: ${knowledge.codingComfort}`,
    `Explanation preference: ${knowledge.explanationPreference}`,
    "",
    "INTEREST THEMES",
    ...(interestThemes.length
      ? interestThemes.map((item) => `- ${item}`)
      : ["- Still open; sample several areas"]),
    "",
    "PREFERRED RESEARCH STYLE",
    ...(styles.length
      ? styles.map((item) => `- ${item}`)
      : ["- Still developing"]),
    "",
    "PREFERRED RESEARCH QUESTION TYPE",
    ...(questionTypes.length
      ? questionTypes.map((label) => `- ${label}`)
      : ["- Still open"]),
    "",
    "PRIMARY DIRECTION",
    `${primary.niche.name} — ${primary.niche.shortDescription}`,
    "",
    "RECOMMENDATION CONTEXT",
    primary.niche.id !==
    getRecommendations(normalized, undefined, recommendationContext)[0].niche.id
      ? "The student selected this alternative as their exploration direction."
      : "This is the original suggested starting direction.",
    explainRecommendationContext(recommendations),
    "",
    "NEARBY ALTERNATIVES",
    ...alternatives.map(
      (result) => `- ${result.niche.name}: ${result.niche.shortDescription}`,
    ),
    "",
    "STARTER KEYWORDS",
    ...directions.flatMap((result) => [
      `${result.niche.name}:`,
      result.niche.keywords.join("; "),
    ]),
    "",
    "RELATED SEARCH PHRASES",
    ...directions.flatMap((result) => [
      result.niche.name,
      result.niche.synonyms.join("; "),
    ]),
    "",
    "SUGGESTED SEARCHES",
    ...directions.flatMap((result) => [
      result.niche.name,
      `- Broad: ${result.niche.searches.orientation}`,
      `- Focused: ${result.niche.searches.focused}`,
      `- Review: ${result.niche.searches.review}`,
    ]),
    "",
    "PREPARATION NOTE",
    preparation.nicheNote,
    preparation.explanation.text,
    ...preparation.steps.map((step) => `- ${step}`),
    "",
    "CONCEPTS TO REVISIT",
    ...preparation.concepts.map((concept) => `- ${concept}`),
    "",
    "NOTE",
    "This profile is a starting map, not a final research question. Verify citations and read the original sources before relying on them.",
  ];

  return lines.join("\n");
}
