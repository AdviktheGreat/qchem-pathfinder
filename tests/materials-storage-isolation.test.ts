import { describe, expect, it } from "vitest";
import {
  computationalMaterialsPathfinder,
  COMPUTATIONAL_MATERIALS_STORAGE_KEY,
  COMPUTATIONAL_MATERIALS_STORAGE_VERSION,
} from "@/data/pathfinders/computational-materials";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { createPathfinderPersistence } from "@/lib/persistence";

describe("computational materials progress isolation", () => {
  it("uses its own explicit, versioned storage record", () => {
    expect(computationalMaterialsPathfinder.storage).toEqual({
      key: COMPUTATIONAL_MATERIALS_STORAGE_KEY,
      version: COMPUTATIONAL_MATERIALS_STORAGE_VERSION,
    });
    expect(COMPUTATIONAL_MATERIALS_STORAGE_KEY).not.toBe(
      quantumChemistryPathfinder.storage.key,
    );
  });

  it("preserves qchem and materials progress independently", () => {
    const qchem = createPathfinderPersistence(quantumChemistryPathfinder);
    const materials = createPathfinderPersistence(
      computationalMaterialsPathfinder,
    );
    const storage = new Map<string, string>();

    storage.set(
      qchem.storageKey,
      qchem.serializeProgress(
        qchem.createPersistedState({
          screen: "survey",
          answers: { "phase-one-memory": ["fresh"] },
          currentQuestionId: "phase-one-memory",
        }),
      ),
    );
    storage.set(
      materials.storageKey,
      materials.serializeProgress(
        materials.createPersistedState({
          screen: "survey",
          answers: { "materials-starting-point": ["recognize"] },
          currentQuestionId: "materials-starting-point",
        }),
      ),
    );

    expect(
      qchem.parseProgress(storage.get(qchem.storageKey) ?? null)?.answers,
    ).toEqual({
      "phase-one-memory": ["fresh"],
    });
    expect(
      materials.parseProgress(storage.get(materials.storageKey) ?? null)
        ?.answers,
    ).toEqual({ "materials-starting-point": ["recognize"] });
  });
});
