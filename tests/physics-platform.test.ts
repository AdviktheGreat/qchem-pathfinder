import { describe, expect, it } from "vitest";
import ComputationalPhysicsPathfinderPage, {
  metadata,
} from "@/app/pathfinders/computational-physics/page";
import {
  getPathfinderDefinition,
  pathfinderDefinitions,
} from "@/data/pathfinder-definitions";
import { computationalPhysicsPathfinder } from "@/data/pathfinders/computational-physics";
import { createHubState, getRecentPathfinder } from "@/lib/hub-persistence";

describe("computational physics platform integration", () => {
  it("registers the complete definition exactly once", () => {
    expect(getPathfinderDefinition("computational-physics")).toBe(
      computationalPhysicsPathfinder,
    );
    expect(
      pathfinderDefinitions.filter(
        (definition) => definition.identity.id === "computational-physics",
      ),
    ).toHaveLength(1);
  });

  it("uses the complete definition at its stable route", () => {
    expect(computationalPhysicsPathfinder.identity.route).toBe(
      "/pathfinders/computational-physics",
    );
    expect(ComputationalPhysicsPathfinderPage()).toBeDefined();
  });

  it("publishes subject-specific static metadata", () => {
    expect(metadata).toMatchObject({
      title: "Computational Physics Pathfinder",
      alternates: { canonical: "/pathfinders/computational-physics" },
      openGraph: {
        url: "/pathfinders/computational-physics",
      },
    });
    expect(metadata.description).toContain("literature-search");
  });

  it("accepts physics as a recently explored destination", () => {
    const state = createHubState(
      "computational-physics",
      new Date("2026-10-06T18:00:00.000Z"),
    );
    expect(getRecentPathfinder(JSON.stringify(state))).toMatchObject({
      id: "computational-physics",
      href: "/pathfinders/computational-physics",
    });
  });
});
