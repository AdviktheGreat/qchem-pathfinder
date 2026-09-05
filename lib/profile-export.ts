import { questionById } from "@/data/questions";
import {
  getAnswerLabels,
  getKnowledgeProfile,
  getRecommendations,
} from "@/lib/recommendation";
import type { AnswerMap } from "@/lib/types";

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
  const motivation = selectedLabels(answers, "motivation");
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
    ...(motivation.length
      ? motivation.map((item) => `- ${item}`)
      : ["- Still open; sample several areas"]),
    "",
    "PREFERRED RESEARCH STYLE",
    ...(styles.length
      ? styles.map((item) => `- ${item}`)
      : ["- Still developing"]),
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
    primary.niche.keywords.join("; "),
    "",
    "SUGGESTED SEARCHES",
    `1. ${primary.niche.searches.orientation}`,
    `2. ${primary.niche.searches.focused}`,
    `3. ${primary.niche.searches.review}`,
    "",
    "CONCEPTS TO REVISIT",
    ...knowledge.conceptsToRevisit.map((concept) => `- ${concept}`),
    "",
    "NOTE",
    "This profile is a starting map, not a final research question. Verify citations and read the original sources before relying on them.",
  ];

  return lines.join("\n");
}
