import { pathfinderModules } from "@/data/pathfinder-modules";
import type { PathfinderCatalogStatus } from "@/lib/pathfinder-lifecycle";
import type { PathfinderModuleManifest } from "@/lib/pathfinder-manifest";

export type PathfinderStatus = PathfinderCatalogStatus;

interface PathfinderCatalogBase {
  id: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  outcome: string;
  focusAreas: readonly string[];
  duration: string;
}

export interface AvailablePathfinderCatalogEntry extends PathfinderCatalogBase {
  status: "available";
  href: string;
}

export interface ComingSoonPathfinderCatalogEntry extends PathfinderCatalogBase {
  status: "coming-soon";
  href?: never;
}

export type PathfinderCatalogEntry =
  AvailablePathfinderCatalogEntry | ComingSoonPathfinderCatalogEntry;

export function createPathfinderCatalogEntry(
  moduleEntry: PathfinderModuleManifest,
): PathfinderCatalogEntry {
  const identity =
    moduleEntry.lifecycle === "available"
      ? moduleEntry.definition.identity
      : moduleEntry.identity;

  const catalogIdentity = {
    id: identity.id,
    name: identity.name,
    shortName: identity.shortName,
    ...moduleEntry.catalog,
  };

  if (moduleEntry.lifecycle === "available") {
    return {
      ...catalogIdentity,
      status: "available",
      href: moduleEntry.definition.identity.route,
    };
  }

  return { ...catalogIdentity, status: "coming-soon" };
}

export const pathfinders: readonly PathfinderCatalogEntry[] =
  pathfinderModules.map(createPathfinderCatalogEntry);

export function isAvailablePathfinder(
  pathfinder: PathfinderCatalogEntry,
): pathfinder is AvailablePathfinderCatalogEntry {
  return pathfinder.status === "available";
}

export const availablePathfinders = pathfinders.filter(isAvailablePathfinder);
export const upcomingPathfinders = pathfinders.filter(
  (pathfinder): pathfinder is ComingSoonPathfinderCatalogEntry =>
    pathfinder.status === "coming-soon",
);

export function getPathfinder(id: string): PathfinderCatalogEntry | undefined {
  return pathfinders.find((pathfinder) => pathfinder.id === id);
}
