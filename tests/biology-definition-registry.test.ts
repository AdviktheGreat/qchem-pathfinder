import { describe, expect, it } from "vitest";
import {
  getPathfinderDefinition,
  pathfinderDefinitions,
} from "@/data/pathfinder-definitions";
import { computationalBiologyPathfinder } from "@/data/pathfinders/computational-biology/pathfinder";

describe("computational biology definition registry", () => {
  it("registers the complete definition exactly once", () => {
    expect(getPathfinderDefinition("computational-biology")).toBe(
      computationalBiologyPathfinder,
    );
    expect(
      pathfinderDefinitions.filter(
        (definition) => definition.identity.id === "computational-biology",
      ),
    ).toHaveLength(1);
  });
});
