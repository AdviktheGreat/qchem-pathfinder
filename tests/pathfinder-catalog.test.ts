import { describe, expect, it } from "vitest";
import { getPathfinder, pathfinders } from "@/data/pathfinders";

describe("pathfinder catalog", () => {
  it("keeps catalog identities and available routes unambiguous", () => {
    expect(new Set(pathfinders.map((pathfinder) => pathfinder.id)).size).toBe(
      pathfinders.length,
    );
    expect(new Set(pathfinders.map((pathfinder) => pathfinder.name)).size).toBe(
      pathfinders.length,
    );
    for (const pathfinder of pathfinders.filter(
      (entry) => entry.status === "available",
    )) {
      expect(pathfinder.href).toMatch(/^\/pathfinders\//);
    }
  });

  it("registers quantum chemistry as the first available pathfinder", () => {
    expect(getPathfinder("quantum-chemistry")).toMatchObject({
      shortName: "Quantum chemistry",
      status: "available",
      href: "/pathfinders/quantum-chemistry",
    });
  });

  it("keeps roadmap previews non-interactive until they are complete", () => {
    const previews = pathfinders.filter(
      (pathfinder) => pathfinder.status === "coming-soon",
    );
    expect(previews.map((pathfinder) => pathfinder.id)).toEqual([
      "computational-materials",
      "computational-biology",
    ]);
    expect(previews.every((pathfinder) => pathfinder.href === undefined)).toBe(
      true,
    );
  });
});
