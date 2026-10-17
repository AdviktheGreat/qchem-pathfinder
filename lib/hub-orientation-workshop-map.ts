import { getPathfinder } from "@/data/pathfinders";
import { pathfinderModules } from "@/data/pathfinder-modules";
import type {
  HubOrientationAnswers,
  HubOrientationQuestion,
  HubOrientationRanking,
  HubOrientationWorkshopDirection,
  HubOrientationWorkshopMap,
} from "@/lib/hub-orientation";

function directionFromRanking(
  ranking: HubOrientationRanking | undefined,
): HubOrientationWorkshopDirection | undefined {
  if (!ranking || ranking.score <= 0) return undefined;
  const catalog = getPathfinder(ranking.pathfinderId);
  const manifest = pathfinderModules.find(
    (candidate) =>
      candidate.lifecycle === "available" &&
      candidate.definition.identity.id === ranking.pathfinderId,
  );
  if (!catalog || catalog.status !== "available" || !manifest?.orientation)
    return undefined;

  return {
    pathfinderId: ranking.pathfinderId,
    name: catalog.name,
    summary: manifest.orientation.summary,
    boundary: manifest.orientation.boundary,
    reasons: ranking.reasons
      .slice(0, 3)
      .map((reason) => `${reason.answerLabel}: ${reason.text}`),
  };
}

export function createHubOrientationWorkshopMap(
  rankings: readonly HubOrientationRanking[],
  questions: readonly HubOrientationQuestion[],
  answers: HubOrientationAnswers,
  date = new Date(),
): HubOrientationWorkshopMap {
  const primary = directionFromRanking(rankings[0]);
  const alternative = directionFromRanking(rankings[1]);

  return {
    title: "Research Pathfinder workshop map",
    generatedOn: date.toISOString().slice(0, 10),
    result: primary ? "suggested" : "open",
    primary,
    alternative,
    choices: questions.flatMap((question) => {
      const option = question.options.find(
        (candidate) => candidate.id === answers[question.id],
      );
      return option
        ? [
            {
              questionId: question.id,
              question: question.title,
              answer: option.label,
              uncertain: Boolean(option.uncertainty),
            },
          ]
        : [];
    }),
    note: "This is a starting map for exploration, not an ability assessment or a final research question. Verify sources and read original papers before relying on them.",
  };
}

function directionLines(
  label: string,
  direction: HubOrientationWorkshopDirection | undefined,
): string[] {
  if (!direction) return [`${label}\nSeveral fields remain open.`];
  return [
    label,
    direction.name,
    direction.summary,
    "Why it stayed in view:",
    ...(direction.reasons.length
      ? direction.reasons.map((reason) => `- ${reason}`)
      : ["- No single preference separated this field from its neighbors."]),
    `Boundary: ${direction.boundary}`,
  ];
}

export function formatHubOrientationWorkshopMap(
  map: HubOrientationWorkshopMap,
): string {
  const choices = map.choices.length
    ? map.choices.map(
        (choice) =>
          `- ${choice.question}: ${choice.answer}${choice.uncertain ? " (kept open)" : ""}`,
      )
    : ["- No guide choices recorded."];

  return [
    map.title.toUpperCase(),
    `Generated: ${map.generatedOn}`,
    "",
    ...directionLines(
      map.result === "open" ? "STARTING POINTS" : "GOOD PLACE TO START",
      map.primary,
    ),
    "",
    ...directionLines("NEARBY ALTERNATIVE", map.alternative),
    "",
    "YOUR ORIENTATION CHOICES",
    ...choices,
    "",
    "NEXT STEP",
    map.result === "open"
      ? "Browse the available pathfinders and open the introduction whose examples make you most curious."
      : "Open either suggested pathfinder and use its deeper survey to narrow toward a literature-search direction.",
    "",
    "NOTE",
    map.note,
  ].join("\n");
}

export function hubOrientationWorkshopMapFilename(date = new Date()): string {
  return `research-pathfinder-workshop-map-${date.toISOString().slice(0, 10)}.txt`;
}
