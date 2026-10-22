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
): string {
  return `/pathfinders/${link.targetPathfinderId}`;
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
