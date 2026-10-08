import { describe, expect, it } from "vitest";
import { pathfinderModules } from "@/data/pathfinder-modules";

describe("pathfinder module registry", () => {
  it("registers every released module in stable hub order", () => {
    expect(
      pathfinderModules.map((module) => module.definition.identity.id),
    ).toEqual([
      "quantum-chemistry",
      "computational-materials",
      "computational-biology",
      "computational-physics",
    ]);
    expect(
      pathfinderModules.every((module) => module.lifecycle === "available"),
    ).toBe(true);
  });

  it("keeps module identities, routes, and storage namespaces unique", () => {
    const identities = pathfinderModules.map(
      (module) => module.definition.identity,
    );
    const storageKeys = pathfinderModules.map(
      (module) => module.definition.storage.key,
    );

    expect(new Set(identities.map((identity) => identity.id)).size).toBe(
      pathfinderModules.length,
    );
    expect(new Set(identities.map((identity) => identity.route)).size).toBe(
      pathfinderModules.length,
    );
    expect(new Set(storageKeys).size).toBe(pathfinderModules.length);
  });
});
