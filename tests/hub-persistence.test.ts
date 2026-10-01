import { describe, expect, it } from "vitest";
import { pathfinders } from "@/data/pathfinders";
import {
  createHubState,
  getRecentPathfinder,
  parseHubState,
} from "@/lib/hub-persistence";

describe("hub visit persistence", () => {
  it("round-trips the latest available pathfinder", () => {
    const state = createHubState(
      "quantum-chemistry",
      new Date("2026-09-29T18:00:00.000Z"),
    );
    expect(parseHubState(JSON.stringify(state))).toEqual(state);
  });

  it("restores either available pathfinder without path-specific logic", () => {
    const catalog = pathfinders.map((pathfinder) =>
      pathfinder.id === "computational-materials"
        ? {
            ...pathfinder,
            status: "available" as const,
            href: "/pathfinders/computational-materials",
          }
        : pathfinder,
    );
    const state = createHubState(
      "computational-materials",
      new Date("2026-10-01T18:00:00.000Z"),
    );

    expect(getRecentPathfinder(JSON.stringify(state), catalog)).toMatchObject({
      id: "computational-materials",
      href: "/pathfinders/computational-materials",
    });
  });

  it("ignores malformed, unavailable, or unknown destinations", () => {
    expect(parseHubState("not json")).toBeNull();
    expect(
      parseHubState(
        JSON.stringify({
          version: 1,
          lastPathfinderId: "computational-biology",
          lastVisitedAt: "2026-09-29T18:00:00.000Z",
        }),
      ),
    ).toBeNull();
    expect(
      parseHubState(
        JSON.stringify({
          version: 1,
          lastPathfinderId: "unknown",
          lastVisitedAt: "2026-09-29T18:00:00.000Z",
        }),
      ),
    ).toBeNull();
  });
});
