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

  it("registers computational materials as an available pathfinder", () => {
    expect(getPathfinder("computational-materials")).toMatchObject({
      shortName: "Computational materials",
      status: "available",
      href: "/pathfinders/computational-materials",
    });
  });

  it("registers computational biology as an available pathfinder", () => {
    expect(getPathfinder("computational-biology")).toMatchObject({
      shortName: "Computational biology",
      status: "available",
      href: "/pathfinders/computational-biology",
    });
  });

  it("keeps roadmap previews non-interactive until they are complete", () => {
    const previews = pathfinders.filter(
      (pathfinder) => pathfinder.status === "coming-soon",
    );
    expect(previews.map((pathfinder) => pathfinder.id)).toEqual([]);
    expect(previews.every((pathfinder) => pathfinder.href === undefined)).toBe(
      true,
    );
  });
});
