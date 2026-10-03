import { describe, expect, it } from "vitest";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";
import { computationalMaterialsPathfinder } from "@/data/pathfinders/computational-materials";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { createPathfinderPersistence } from "@/lib/persistence";

describe("computational biology progress isolation", () => {
  it("uses a distinct, explicitly versioned browser record", () => {
    const storageKeys = [
      quantumChemistryPathfinder.storage.key,
      computationalMaterialsPathfinder.storage.key,
      computationalBiologyPathfinder.storage.key,
    ];

    expect(new Set(storageKeys).size).toBe(3);
    expect(computationalBiologyPathfinder.storage).toEqual({
      key: "computational-biology-pathfinder:progress",
      version: 1,
    });
  });

  it("round-trips biology answers without reading another pathfinder", () => {
    const biology = createPathfinderPersistence(computationalBiologyPathfinder);
    const materials = createPathfinderPersistence(
      computationalMaterialsPathfinder,
    );
    const saved = biology.serializeProgress(
      biology.createPersistedState({
        screen: "survey",
        answers: { "biology-starting-point": ["recognize"] },
        currentQuestionId: "biology-starting-point",
      }),
    );

    expect(biology.parseProgress(saved)?.answers).toEqual({
      "biology-starting-point": ["recognize"],
    });
    expect(materials.parseProgress(saved)?.answers).toEqual({});
    expect(materials.parseProgress(saved)?.currentQuestionId).toBe(
      "materials-starting-point",
    );
  });
});
