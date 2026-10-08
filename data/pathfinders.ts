import { pathfinderModules } from "@/data/pathfinder-modules";
import type { PathfinderCatalogStatus } from "@/lib/pathfinder-lifecycle";
import type { PathfinderModuleManifest } from "@/lib/pathfinder-manifest";

export type PathfinderStatus = PathfinderCatalogStatus;

export interface PathfinderCatalogEntry {
  id: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  outcome: string;
  focusAreas: readonly string[];
  duration: string;
  status: PathfinderStatus;
  href?: string;
}

export function createPathfinderCatalogEntry(
  moduleEntry: PathfinderModuleManifest,
): PathfinderCatalogEntry {
  const identity =
    moduleEntry.lifecycle === "available"
      ? moduleEntry.definition.identity
      : moduleEntry.identity;

  return {
    id: identity.id,
    name: identity.name,
    shortName: identity.shortName,
    ...moduleEntry.catalog,
    status: moduleEntry.lifecycle,
    ...(moduleEntry.lifecycle === "available"
      ? { href: moduleEntry.definition.identity.route }
      : {}),
  };
}

export const pathfinders: readonly PathfinderCatalogEntry[] =
  pathfinderModules.map(createPathfinderCatalogEntry);

export function getPathfinder(id: string): PathfinderCatalogEntry | undefined {
  return pathfinders.find((pathfinder) => pathfinder.id === id);
}
