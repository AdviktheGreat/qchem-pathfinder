import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

export const pathfinderDefinitions = [
  quantumChemistryPathfinder,
  computationalMaterialsPathfinder,
  computationalBiologyPathfinder,
] satisfies readonly PathfinderDefinition[];

export function getPathfinderDefinition(
  id: string,
): PathfinderDefinition | undefined {
  return pathfinderDefinitions.find(
    (definition) => definition.identity.id === id,
  );
}
