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

export interface InterdisciplinaryLink {
  id: string;
  sourceNicheId: string;
  targetPathfinderId: string;
  targetPathfinderName: string;
  targetNicheId: string;
  targetNicheName: string;
  bridge: string;
  distinction: string;
  sharedKeywords: readonly string[];
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
