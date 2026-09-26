import { questionById } from "@/data/questions";
import {
  getAnswerLabels,
  getKnowledgeProfile,
  getRecommendations,
} from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";
import { getPreparationProfile } from "@/lib/preparation";

function selectedLabels(answers: AnswerMap, questionId: string): string[] {
  const question = questionById[questionId];
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
): string {
  const [primary, ...alternatives] = getRecommendations(
    answers,
    primaryOverride,
  );
  const knowledge = getKnowledgeProfile(answers);
  const preparation = getPreparationProfile(answers, primary.niche);
  const directions = [primary, ...alternatives];
  const motivation = selectedLabels(answers, "motivation");
  const questionTypes = selectedLabels(answers, "question-kind");
  const narrowing = getAnswerLabels(answers, "narrowing").map(
    (line) => line.split(": ").at(-1) ?? line,
  );
  const interestThemes = Array.from(new Set([...motivation, ...narrowing]));
  const styles = getAnswerLabels(answers, "style").map(
    (line) => line.split(": ").at(-1) ?? line,
  );

  const lines = [
    "QUANTUM RESEARCH EXPLORATION PROFILE",
    "====================================",
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
    ...knowledge.conceptsToRevisit.map((concept) => `- ${concept}`),
    "",
    "NOTE",
    "This profile is a starting map, not a final research question. Verify citations and read the original sources before relying on them.",
  ];

  return lines.join("\n");
}
