import { describe, expect, it } from "vitest";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import type { AvailablePathfinderModuleManifest } from "@/lib/pathfinder-manifest";

const exampleManifest = {
  lifecycle: "available",
  definition: quantumChemistryPathfinder,
  catalog: {
    eyebrow: "Molecules, electrons, and computation",
    description: "A test description.",
    outcome: "A test outcome.",
    focusAreas: ["Molecules"],
    duration: "About 10 minutes",
  },
  metadata: {
    description: "A route description.",
    openGraphDescription: "A sharing description.",
  },
} satisfies AvailablePathfinderModuleManifest;

describe("pathfinder module manifest", () => {
  it("keeps definition, catalog, and route metadata together", () => {
    expect(exampleManifest.lifecycle).toBe("available");
    expect(exampleManifest.definition.identity.id).toBe("quantum-chemistry");
    expect(exampleManifest.catalog.focusAreas).toEqual(["Molecules"]);
    expect(exampleManifest.metadata.openGraphDescription).toContain("sharing");
  });
});
