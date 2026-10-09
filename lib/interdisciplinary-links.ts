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
