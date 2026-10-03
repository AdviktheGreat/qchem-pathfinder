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

  it.each([
    ["quantum-chemistry", "/pathfinders/quantum-chemistry"],
    ["computational-materials", "/pathfinders/computational-materials"],
    ["computational-biology", "/pathfinders/computational-biology"],
  ])("restores the available %s pathfinder", (id, href) => {
    const state = createHubState(id, new Date("2026-10-03T18:00:00.000Z"));

    expect(getRecentPathfinder(JSON.stringify(state))).toMatchObject({
      id,
      href,
    });
  });

  it("ignores malformed, unavailable, or unknown destinations", () => {
    expect(parseHubState("not json")).toBeNull();
    const unavailableCatalog = pathfinders.map((pathfinder) =>
      pathfinder.id === "computational-biology"
        ? { ...pathfinder, status: "coming-soon" as const, href: undefined }
        : pathfinder,
    );
    expect(
      parseHubState(
        JSON.stringify({
          version: 1,
          lastPathfinderId: "computational-biology",
          lastVisitedAt: "2026-09-29T18:00:00.000Z",
        }),
        unavailableCatalog,
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
