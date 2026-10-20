import type { InterdisciplinaryLink } from "@/lib/interdisciplinary-links";
import type { PathfinderModuleManifest } from "@/lib/pathfinder-manifest";

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
