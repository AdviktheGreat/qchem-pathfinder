export const INTERDISCIPLINARY_CONNECTION_KINDS = [
  "shared-system",
  "shared-method",
  "shared-question",
  "shared-data",
  "shared-application",
  "connected-scales",
] as const;

export type InterdisciplinaryConnectionKind =
  (typeof INTERDISCIPLINARY_CONNECTION_KINDS)[number];

export const INTERDISCIPLINARY_CONNECTION_LABELS: Record<
  InterdisciplinaryConnectionKind,
  string
> = {
  "shared-system": "Shared system",
  "shared-method": "Shared method",
  "shared-question": "Shared question",
  "shared-data": "Shared data",
  "shared-application": "Shared application",
  "connected-scales": "Connected scales",
};

export function getInterdisciplinaryConnectionLabel(
  kind: InterdisciplinaryConnectionKind,
): string {
  return INTERDISCIPLINARY_CONNECTION_LABELS[kind];
}

export interface InterdisciplinarySearchSeeds {
  orientation: readonly string[];
  focused: readonly string[];
  review: readonly string[];
}

export interface InterdisciplinarySearchQueries {
  orientation: string;
  focused: string;
  review: string;
}

export interface InterdisciplinaryBridgeNoteContext {
  sourcePathfinderName: string;
  sourceDirectionName: string;
}

export interface InterdisciplinaryNavigationContext {
  sourcePathfinderId: string;
}

export interface InterdisciplinaryLink {
  id: string;
  sourceNicheId: string;
  connectionKinds: readonly InterdisciplinaryConnectionKind[];
  sharedQuestion: string;
  explorationStep: string;
  targetPathfinderId: string;
  targetPathfinderName: string;
  targetNicheId: string;
  targetNicheName: string;
  bridge: string;
  distinction: string;
  sharedKeywords: readonly string[];
  searchSeeds: InterdisciplinarySearchSeeds;
}

export function getInterdisciplinaryLinksForDirection(
  links: readonly InterdisciplinaryLink[],
  nicheId: string,
): InterdisciplinaryLink[] {
  return links.filter((link) => link.sourceNicheId === nicheId);
}

export function getInterdisciplinaryDestination(
  link: InterdisciplinaryLink,
  context?: InterdisciplinaryNavigationContext,
): string {
  const pathname = `/pathfinders/${link.targetPathfinderId}`;
  if (!context) return pathname;

  const params = new URLSearchParams({
    from: context.sourcePathfinderId,
    source: link.sourceNicheId,
    bridge: link.id,
    target: link.targetNicheId,
  });
  return `${pathname}?${params.toString()}`;
}

export function buildInterdisciplinarySearch(
  link: InterdisciplinaryLink,
): string {
  return `${link.sharedKeywords.join(" ")} review`;
}

function formatSearchQuery(
  terms: readonly string[],
  suffixes: readonly string[] = [],
): string {
  const seen = new Set<string>();
  return [...terms, ...suffixes]
    .map((term) => term.trim().replace(/\s+/g, " "))
    .filter((term) => {
      const normalized = term.toLocaleLowerCase();
      if (!normalized || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .join(" ");
}

export function buildInterdisciplinarySearchQueries(
  link: InterdisciplinaryLink,
): InterdisciplinarySearchQueries {
  const seeds = link.searchSeeds;
  return {
    orientation: formatSearchQuery(seeds.orientation, ["overview"]),
    focused: formatSearchQuery(seeds.focused),
    review: formatSearchQuery(seeds.review, ["review", "perspective"]),
  };
}

export function formatInterdisciplinaryBridgeNote(
  link: InterdisciplinaryLink,
  context: InterdisciplinaryBridgeNoteContext,
): string {
  const searches = buildInterdisciplinarySearchQueries(link);
  const connectionLabels = link.connectionKinds
    .map(getInterdisciplinaryConnectionLabel)
    .join(", ");

  return [
    "INTERDISCIPLINARY BRIDGE NOTE",
    "",
    `From: ${context.sourcePathfinderName} — ${context.sourceDirectionName}`,
    `To: ${link.targetPathfinderName} — ${link.targetNicheName}`,
    `Connection: ${connectionLabels}`,
    "",
    `Shared question: ${link.sharedQuestion}`,
    `Why these fields connect: ${link.bridge}`,
    `How the lenses differ: ${link.distinction}`,
    `Try first: ${link.explorationStep}`,
    "",
    `Shared keywords: ${link.sharedKeywords.join(", ")}`,
    `Orientation search: ${searches.orientation}`,
    `Focused search: ${searches.focused}`,
    `Review search: ${searches.review}`,
  ].join("\n");
}
