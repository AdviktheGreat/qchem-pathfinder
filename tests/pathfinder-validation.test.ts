import { describe, expect, it } from "vitest";
import { quantumChemistryPathfinder } from "@/data/pathfinders/quantum-chemistry";
import { validatePathfinderDefinition } from "@/lib/pathfinder-validation";
import type { PathfinderDefinition } from "@/lib/pathfinder-definition";

function copyDefinition(): PathfinderDefinition {
  return structuredClone(quantumChemistryPathfinder);
}

describe("pathfinder definition validation", () => {
  it("returns a stable result for a valid definition", () => {
    expect(validatePathfinderDefinition(copyDefinition())).toEqual({
      valid: true,
      issues: [],
    });
  });

  it("reports definitions that cannot cross the server-to-client boundary", () => {
    const definition = copyDefinition();
    const cyclicDefinition = definition as PathfinderDefinition & {
      cycle?: PathfinderDefinition;
    };
    cyclicDefinition.cycle = cyclicDefinition;

    expect(validatePathfinderDefinition(cyclicDefinition)).toEqual({
      valid: false,
      issues: [
        expect.objectContaining({
          code: "definition.not-serializable",
          path: "$",
        }),
      ],
    });
  });
});
