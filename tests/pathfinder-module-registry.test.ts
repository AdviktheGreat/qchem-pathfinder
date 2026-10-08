import { describe, expect, it } from "vitest";
import {
  getPathfinderDefinition,
  pathfinderDefinitions,
} from "@/data/pathfinder-definitions";
import { pathfinderModules } from "@/data/pathfinder-modules";
import { pathfinders } from "@/data/pathfinders";

describe("pathfinder module registry", () => {
  it("registers every released module in stable hub order", () => {
    expect(
      pathfinderModules.map(
        (moduleEntry) => moduleEntry.definition.identity.id,
      ),
    ).toEqual([
      "quantum-chemistry",
      "computational-materials",
      "computational-biology",
      "computational-physics",
    ]);
    expect(
      pathfinderModules.every(
        (moduleEntry) => moduleEntry.lifecycle === "available",
      ),
    ).toBe(true);
  });

  it("keeps module identities, routes, and storage namespaces unique", () => {
    const identities = pathfinderModules.map(
      (moduleEntry) => moduleEntry.definition.identity,
    );
    const storageKeys = pathfinderModules.map(
      (moduleEntry) => moduleEntry.definition.storage.key,
    );

    expect(new Set(identities.map((identity) => identity.id)).size).toBe(
      pathfinderModules.length,
    );
    expect(new Set(identities.map((identity) => identity.route)).size).toBe(
      pathfinderModules.length,
    );
    expect(new Set(storageKeys).size).toBe(pathfinderModules.length);
  });

  it("derives definition lookup from the canonical registry", () => {
    expect(pathfinderDefinitions).toEqual(
      pathfinderModules.map((moduleEntry) => moduleEntry.definition),
    );
    for (const moduleEntry of pathfinderModules) {
      expect(getPathfinderDefinition(moduleEntry.definition.identity.id)).toBe(
        moduleEntry.definition,
      );
    }
  });

  it("derives the public catalog without repeating module identity", () => {
    expect(pathfinders).toHaveLength(pathfinderModules.length);
    pathfinders.forEach((entry, index) => {
      const moduleEntry = pathfinderModules[index];
      expect(entry).toMatchObject({
        id: moduleEntry.definition.identity.id,
        name: moduleEntry.definition.identity.name,
        shortName: moduleEntry.definition.identity.shortName,
        href: moduleEntry.definition.identity.route,
        status: moduleEntry.lifecycle,
        eyebrow: moduleEntry.catalog.eyebrow,
      });
    });
  });
});
