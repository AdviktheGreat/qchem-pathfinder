import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";
import type { PathfinderModuleManifest } from "@/lib/pathfinder-manifest";

export type InterdisciplinarySearchParams = Record<
  string,
  string | string[] | undefined
>;

export interface InterdisciplinaryArrival {
  bridgeId: string;
  sourcePathfinderId: string;
  sourcePathfinderName: string;
  sourceRoute: string;
  sourceNicheId: string;
  sourceNicheName: string;
  targetPathfinderId: string;
  targetPathfinderName: string;
  targetNicheId: string;
  targetNicheName: string;
  sharedQuestion: string;
}

export interface InterdisciplinaryDestination {
  pathfinderId: string;
  pathfinderName: string;
  route: string;
  nicheId: string;
  nicheName: string;
}

export function resolveInterdisciplinaryDestination(
  link: InterdisciplinaryLink,
  manifests: readonly PathfinderModuleManifest[],
): InterdisciplinaryDestination | undefined {
  const target = manifests.find(
    (manifest) =>
      manifest.lifecycle === "available" &&
      manifest.definition.identity.id === link.targetPathfinderId,
  );
  if (!target || target.lifecycle !== "available") return undefined;

  const niche = target.definition.recommendations.niches.find(
    (candidate) => candidate.id === link.targetNicheId,
  );
  if (!niche) return undefined;

  return {
    pathfinderId: target.definition.identity.id,
    pathfinderName: target.definition.identity.shortName,
    route: target.definition.identity.route,
    nicheId: niche.id,
    nicheName: niche.name,
  };
}

function readSearchParam(
  searchParams: InterdisciplinarySearchParams,
  key: string,
): string | undefined {
  const value = searchParams[key];
  return typeof value === "string" ? value : undefined;
}

export function resolveInterdisciplinaryArrival(
  searchParams: InterdisciplinarySearchParams,
  targetDefinition: PathfinderDefinition,
  manifests: readonly PathfinderModuleManifest[],
): InterdisciplinaryArrival | undefined {
  const sourcePathfinderId = readSearchParam(searchParams, "from");
  const sourceNicheId = readSearchParam(searchParams, "source");
  const bridgeId = readSearchParam(searchParams, "bridge");
  const targetNicheId = readSearchParam(searchParams, "target");
  if (!sourcePathfinderId || !sourceNicheId || !bridgeId || !targetNicheId)
    return undefined;

  const source = manifests.find(
    (manifest) =>
      manifest.lifecycle === "available" &&
      manifest.definition.identity.id === sourcePathfinderId,
  );
  if (!source || source.lifecycle !== "available") return undefined;

  const link = source.definition.interdisciplinaryLinks.find(
    (candidate) =>
      candidate.id === bridgeId &&
      candidate.sourceNicheId === sourceNicheId &&
      candidate.targetPathfinderId === targetDefinition.identity.id &&
      candidate.targetNicheId === targetNicheId,
  );
  if (!link) return undefined;

  const sourceNiche = source.definition.recommendations.niches.find(
    (candidate) => candidate.id === sourceNicheId,
  );
  const targetNiche = targetDefinition.recommendations.niches.find(
    (candidate) => candidate.id === targetNicheId,
  );
  if (!sourceNiche || !targetNiche) return undefined;

  return {
    bridgeId,
    sourcePathfinderId,
    sourcePathfinderName: source.definition.identity.shortName,
    sourceRoute: source.definition.identity.route,
    sourceNicheId,
    sourceNicheName: sourceNiche.name,
    targetPathfinderId: targetDefinition.identity.id,
    targetPathfinderName: targetDefinition.identity.shortName,
    targetNicheId,
    targetNicheName: targetNiche.name,
    sharedQuestion: link.sharedQuestion,
  };
}
