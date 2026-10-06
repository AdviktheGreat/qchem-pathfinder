import { describe, expect, it } from "vitest";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import {
  computationalPhysicsStorage,
  COMPUTATIONAL_PHYSICS_STORAGE_KEY,
} from "@/data/pathfinders/computational-physics";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";

describe("computational physics storage", () => {
  it("uses a stable versioned key distinct from every released pathfinder", () => {
    expect(computationalPhysicsStorage).toEqual({
      key: COMPUTATIONAL_PHYSICS_STORAGE_KEY,
      version: 1,
    });
    expect(COMPUTATIONAL_PHYSICS_STORAGE_KEY).toBe(
      "computational-physics-pathfinder:progress",
    );

    const existingKeys = [
      quantumChemistryPathfinder.storage.key,
      computationalMaterialsPathfinder.storage.key,
      computationalBiologyPathfinder.storage.key,
    ];
    expect(existingKeys).not.toContain(computationalPhysicsStorage.key);
    expect(
      new Set([...existingKeys, computationalPhysicsStorage.key]).size,
    ).toBe(4);
  });
});
