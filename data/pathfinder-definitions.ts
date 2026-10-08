import { pathfinderModules } from "@/data/pathfinder-modules";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

export const pathfinderDefinitions: readonly PathfinderDefinition[] =
  pathfinderModules.map((moduleEntry) => moduleEntry.definition);

export function getPathfinderDefinition(
  id: string,
): PathfinderDefinition | undefined {
  return pathfinderDefinitions.find(
    (definition) => definition.identity.id === id,
  );
}
